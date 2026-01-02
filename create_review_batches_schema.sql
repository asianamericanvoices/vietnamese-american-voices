-- Review Batches System Schema
-- Run this in Supabase SQL Editor

-- 1. Review batches table
CREATE TABLE IF NOT EXISTS review_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_number TEXT UNIQUE NOT NULL,
  reviewer_email TEXT NOT NULL,
  reviewer_name TEXT,
  language TEXT NOT NULL CHECK (language IN ('chinese', 'korean')),
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'submitted', 'approved', 'paid')),
  article_ids TEXT[], -- Array of article IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL, -- Admin who created the batch
  started_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_amount DECIMAL(10,2),
  payment_notes TEXT,
  review_notes TEXT, -- Reviewer's notes
  admin_notes TEXT -- Admin's notes
);

-- 2. Article locks table (prevents conflicts)
CREATE TABLE IF NOT EXISTS article_locks (
  article_id TEXT PRIMARY KEY,
  locked_by TEXT NOT NULL, -- reviewer email
  locked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  batch_id UUID REFERENCES review_batches(id) ON DELETE CASCADE,
  lock_type TEXT DEFAULT 'review' CHECK (lock_type IN ('review', 'edit', 'admin')),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '4 hours')
);

-- 3. Review edits tracking (audit trail)
CREATE TABLE IF NOT EXISTS review_edits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID REFERENCES review_batches(id) ON DELETE CASCADE,
  article_id TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  field_edited TEXT NOT NULL, -- 'title_chinese', 'summary_chinese', 'translation_chinese', etc.
  original_value TEXT,
  new_value TEXT,
  edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  edit_type TEXT DEFAULT 'manual' CHECK (edit_type IN ('manual', 'ai_assisted', 'bulk'))
);

-- 4. Reviewer profiles (track performance)
CREATE TABLE IF NOT EXISTS reviewer_profiles (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  languages TEXT[], -- ['chinese', 'korean']
  role TEXT NOT NULL CHECK (role IN ('chinese_reviewer', 'korean_reviewer', 'both_reviewer')),
  total_articles_reviewed INTEGER DEFAULT 0,
  total_batches_completed INTEGER DEFAULT 0,
  average_review_time_hours DECIMAL(5,2),
  quality_score DECIMAL(3,2) DEFAULT 5.00, -- 1-5 scale
  payment_rate DECIMAL(10,2), -- Per article rate
  preferred_batch_size INTEGER DEFAULT 10,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- 5. Payment queue
CREATE TABLE IF NOT EXISTS payment_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID REFERENCES review_batches(id) ON DELETE CASCADE,
  reviewer_email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  articles_count INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method TEXT, -- 'paypal', 'zelle', 'check', etc.
  payment_reference TEXT, -- Transaction ID
  queued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by TEXT,
  notes TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_review_batches_reviewer ON review_batches(reviewer_email);
CREATE INDEX IF NOT EXISTS idx_review_batches_status ON review_batches(status);
CREATE INDEX IF NOT EXISTS idx_review_batches_language ON review_batches(language);
CREATE INDEX IF NOT EXISTS idx_article_locks_expires ON article_locks(expires_at);
CREATE INDEX IF NOT EXISTS idx_review_edits_article ON review_edits(article_id);
CREATE INDEX IF NOT EXISTS idx_review_edits_batch ON review_edits(batch_id);
CREATE INDEX IF NOT EXISTS idx_payment_queue_status ON payment_queue(status);

-- Function to auto-expire locks
CREATE OR REPLACE FUNCTION cleanup_expired_locks()
RETURNS void AS $$
BEGIN
  DELETE FROM article_locks WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to generate batch number
CREATE OR REPLACE FUNCTION generate_batch_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  -- Format: LANG-YYYYMMDD-XXX (e.g., CHN-20240115-001)
  SELECT
    UPPER(SUBSTRING(TG_ARGV[0], 1, 3)) || '-' ||
    TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
    LPAD(COALESCE(MAX(CAST(SPLIT_PART(batch_number, '-', 3) AS INTEGER)), 0) + 1, 3, '0')
  INTO new_number
  FROM review_batches
  WHERE batch_number LIKE UPPER(SUBSTRING(TG_ARGV[0], 1, 3)) || '-' || TO_CHAR(NOW(), 'YYYYMMDD') || '%';

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE review_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_locks ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_edits ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviewer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_queue ENABLE ROW LEVEL SECURITY;

-- Reviewers can only see their own batches
CREATE POLICY "Reviewers see own batches" ON review_batches
  FOR SELECT USING (
    auth.jwt() ->> 'email' = reviewer_email OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Reviewers can update their own batches
CREATE POLICY "Reviewers update own batches" ON review_batches
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = reviewer_email AND
    status IN ('assigned', 'in_progress')
  );

-- Admins can do everything
CREATE POLICY "Admins manage all batches" ON review_batches
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Similar policies for other tables...

COMMENT ON TABLE review_batches IS 'Tracks batches of articles assigned to reviewers for translation/quality review';
COMMENT ON TABLE article_locks IS 'Prevents concurrent editing conflicts by locking articles during review';
COMMENT ON TABLE review_edits IS 'Audit trail of all edits made by reviewers';
COMMENT ON TABLE reviewer_profiles IS 'Reviewer information and performance metrics';
COMMENT ON TABLE payment_queue IS 'Tracks payments owed to reviewers for completed batches';