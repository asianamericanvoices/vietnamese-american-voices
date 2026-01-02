# Batch Review System Implementation Guide

## Overview
This system enables efficient, conflict-free review of article translations by multiple reviewers working simultaneously, with built-in payment tracking and quality control.

## System Architecture

### Key Features
1. **Batch Assignment**: Admins create batches of articles for specific reviewers
2. **Article Locking**: Prevents concurrent editing conflicts
3. **Auto-Save**: Changes saved every 30 seconds
4. **Audit Trail**: All edits tracked with timestamps
5. **Payment Queue**: Automatic payment calculation upon approval
6. **Performance Tracking**: Reviewer metrics and quality scores

## Implementation Steps

### 1. Database Setup
Run the SQL schema in Supabase:
```bash
# Execute create_review_batches_schema.sql in Supabase SQL Editor
```

### 2. Add Components to Dashboard

#### In your main dashboard (app/page.js), add:
```javascript
import BatchReviewManager from './components/BatchReviewManager';
import BatchReviewInterface from './components/BatchReviewInterface';

// In the render section, add a tab for batch management:
{activeTab === 'batch-review' && userRole === 'admin' && (
  <BatchReviewManager
    userRole={userRole}
    currentUser={user}
  />
)}

// Add reviewer interface for reviewers:
{activeTab === 'my-reviews' && isReviewer && (
  <BatchReviewInterface
    userEmail={user.email}
    userRole={userRole}
  />
)}
```

### 3. Create API Endpoints

#### /api/update-article/route.js
```javascript
export async function POST(request) {
  const { articleId, updates, reviewerEmail } = await request.json();

  // Update article in dashboard data
  const dashboardData = await readDashboardData();
  const articleIndex = dashboardData.articles.findIndex(a => a.id === articleId);

  if (articleIndex !== -1) {
    dashboardData.articles[articleIndex] = {
      ...dashboardData.articles[articleIndex],
      ...updates,
      lastReviewedBy: reviewerEmail,
      lastReviewedAt: new Date().toISOString()
    };

    await writeDashboardData(dashboardData);
  }

  return NextResponse.json({ success: true });
}
```

#### /api/notify-reviewer/route.js
```javascript
export async function POST(request) {
  const { email, batchNumber, articleCount, language } = await request.json();

  // Send email notification to reviewer
  await sendEmail({
    to: email,
    subject: `New Review Batch: ${batchNumber}`,
    body: `You have been assigned ${articleCount} ${language} articles to review.`
  });

  return NextResponse.json({ success: true });
}
```

### 4. User Role Updates

Add new reviewer roles to your authentication system:
```javascript
const ROLES = {
  admin: 'admin',
  chinese_reviewer: 'chinese_reviewer',
  korean_reviewer: 'korean_reviewer',
  both_reviewer: 'both_reviewer', // Can review both languages
  editor: 'editor',
  viewer: 'viewer'
};
```

## Workflow

### For Admins

1. **Create Batch**
   - Select language and reviewer
   - Choose number of articles
   - System automatically locks articles

2. **Monitor Progress**
   - View active batches
   - See completion status
   - Track reviewer performance

3. **Approve & Pay**
   - Review completed batches
   - Approve for payment
   - Export payment reports

### For Reviewers

1. **Access Batch**
   - Log in to see assigned batches
   - Click to start reviewing

2. **Review Articles**
   - See original and translated content side-by-side
   - Make inline edits
   - Auto-save every 30 seconds
   - Navigate between articles

3. **Submit Batch**
   - Review all changes
   - Submit for approval
   - Batch enters payment queue

## Conflict Prevention

### Locking Mechanism
- Articles locked when assigned to batch
- Locks auto-refresh every minute during editing
- Locks expire after 4 hours of inactivity
- Released when batch submitted

### Example Lock Check
```javascript
async function canEditArticle(articleId, userEmail) {
  const { data: lock } = await supabase
    .from('article_locks')
    .select('*')
    .eq('article_id', articleId)
    .single();

  if (!lock) return true; // No lock, can edit
  if (lock.locked_by === userEmail) return true; // Own lock
  if (new Date(lock.expires_at) < new Date()) return true; // Expired

  return false; // Locked by someone else
}
```

## Payment Calculation

### Default Rates
```javascript
const PAYMENT_RATES = {
  per_article: 5.00,  // $5 per article
  rush_multiplier: 1.5, // 50% extra for rush jobs
  quality_bonus: 0.10, // 10% bonus for high quality
};

function calculatePayment(articleCount, isRush, qualityScore) {
  let payment = articleCount * PAYMENT_RATES.per_article;

  if (isRush) {
    payment *= PAYMENT_RATES.rush_multiplier;
  }

  if (qualityScore >= 4.5) {
    payment *= (1 + PAYMENT_RATES.quality_bonus);
  }

  return payment;
}
```

## Monitoring & Analytics

### Key Metrics
- Average review time per article
- Reviewer accuracy scores
- Batch completion rates
- Payment totals by period

### SQL Queries for Reports

#### Active Reviewers Report
```sql
SELECT
  rp.name,
  rp.email,
  COUNT(DISTINCT rb.id) as total_batches,
  SUM(ARRAY_LENGTH(rb.article_ids, 1)) as total_articles,
  AVG(EXTRACT(EPOCH FROM (rb.submitted_at - rb.started_at))/3600) as avg_hours_per_batch
FROM reviewer_profiles rp
LEFT JOIN review_batches rb ON rp.email = rb.reviewer_email
WHERE rb.status IN ('submitted', 'approved', 'paid')
  AND rb.created_at >= NOW() - INTERVAL '30 days'
GROUP BY rp.name, rp.email
ORDER BY total_articles DESC;
```

#### Payment Queue Summary
```sql
SELECT
  reviewer_email,
  COUNT(*) as pending_batches,
  SUM(payment_amount) as total_owed
FROM review_batches
WHERE status = 'approved'
GROUP BY reviewer_email
ORDER BY total_owed DESC;
```

## Security Considerations

1. **Row Level Security (RLS)**
   - Reviewers only see their own batches
   - Admins see everything
   - Service role for system operations

2. **Input Validation**
   - Sanitize all text inputs
   - Validate batch sizes
   - Check user permissions

3. **Audit Trail**
   - Log all edits with timestamps
   - Track who approved what
   - Payment records immutable

## Testing Checklist

- [ ] Create test reviewer accounts
- [ ] Assign batch to reviewer
- [ ] Test concurrent editing (should fail)
- [ ] Verify auto-save works
- [ ] Submit batch for approval
- [ ] Approve and check payment queue
- [ ] Test lock expiration
- [ ] Verify email notifications
- [ ] Check performance with large batches
- [ ] Test role-based access control

## Troubleshooting

### Common Issues

1. **Locks not releasing**
   ```sql
   -- Manual lock cleanup
   DELETE FROM article_locks
   WHERE expires_at < NOW();
   ```

2. **Batch stuck in progress**
   ```sql
   -- Reset batch status
   UPDATE review_batches
   SET status = 'assigned', started_at = NULL
   WHERE id = 'batch-id-here';
   ```

3. **Payment calculation mismatch**
   ```sql
   -- Recalculate payment
   UPDATE review_batches
   SET payment_amount = ARRAY_LENGTH(article_ids, 1) * 5.00
   WHERE id = 'batch-id-here';
   ```

## Next Steps

1. **Set up Supabase tables** using the provided schema
2. **Add reviewer profiles** for your review team
3. **Integrate components** into your dashboard
4. **Test with small batches** before full rollout
5. **Set up payment processing** integration
6. **Create reviewer onboarding** documentation

## Support

For issues or questions:
- Check Supabase logs for database errors
- Review browser console for API errors
- Verify environment variables are set
- Check user roles and permissions