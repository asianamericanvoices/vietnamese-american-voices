# Dashboard Integration Guide - Batch Review System

## What You'll See in Your Current Dashboard

### 1. In Your Article Pipeline View

Each article card will show a **visual indicator** of its batch status:

```
┌─────────────────────────────────────┐
│ Article Title                       │
│ Source • Date                       │
│                                     │
│ [🔒 In Review (Jane Smith)]        │ <- New batch status indicator
│                                     │
│ [Translate] [Publish] [Edit]       │
└─────────────────────────────────────┘
```

**Status Indicators You'll See:**
- 🟢 **Available** - Article can be assigned to a batch
- 🟡 **Assigned to [Name]** - In a batch, waiting for reviewer to start
- 🔵 **In Review ([Name])** - Reviewer is actively working on it
- 🟣 **Review Complete** - Submitted, awaiting your approval
- ✅ **Approved for Payment** - Review approved, in payment queue
- 🔒 **Locked** - Article is locked to prevent conflicts

### 2. New Dashboard Section: Batch Management

Add a new tab to your dashboard navigation:

```javascript
// In your app/page.js file, add to your tabs:

const tabs = [
  'Pipeline',
  'Analytics',
  'Batch Review', // <- New tab
  'Settings'
];

// In your render section:
{activeTab === 'Batch Review' && (
  <BatchReviewManagerV2
    userRole={userRole}
    currentUser={user}
    dashboardArticles={articles} // Pass your current articles
  />
)}
```

### 3. Integration Code for Your Existing Dashboard

Here's exactly how to modify your current dashboard to show batch status:

```javascript
// In your article card component (where you display each article):

import ArticleStatusIndicator from './components/ArticleStatusIndicator';

// Inside your article card render:
<div className="border rounded-lg p-4">
  <h3>{article.title}</h3>
  <p>{article.source} • {article.date}</p>

  {/* Add this line to show batch status */}
  <ArticleStatusIndicator
    articleId={article.id}
    onStatusClick={(batchInfo) => {
      // Optional: Show batch details when clicked
      console.log('Batch info:', batchInfo);
    }}
  />

  {/* Your existing buttons */}
  <div className="flex gap-2 mt-2">
    {/* Only show edit buttons if article is not locked */}
    <button disabled={article.isLocked}>Edit</button>
    <button disabled={article.isLocked}>Translate</button>
  </div>
</div>
```

### 4. Checking Article Lock Status

Before allowing edits in your dashboard, check if the article is locked:

```javascript
// Add this function to your dashboard:
async function checkArticleLocked(articleId) {
  const { data: lock } = await supabase
    .from('article_locks')
    .select('*')
    .eq('article_id', articleId)
    .gte('expires_at', new Date().toISOString())
    .single();

  return !!lock;
}

// Before opening edit modal:
const handleEditArticle = async (article) => {
  const isLocked = await checkArticleLocked(article.id);

  if (isLocked) {
    alert('This article is currently being reviewed and cannot be edited.');
    return;
  }

  // Continue with your normal edit flow
  openEditModal(article);
};
```

## Payment Structure

### Fixed Batch System
- **Batch Size**: Exactly 20 articles
- **Payment**: $40 per completed batch
- **No Partial Payments**: Reviewer must complete all 20 articles

### What You'll See in Payment Queue:
```
┌──────────────────────────────────────────┐
│ Payment Queue                            │
├──────────────────────────────────────────┤
│ Jane Smith                               │
│ Batch CHN-20240115-001 • 20 articles    │
│ Submitted Jan 15, 2024                   │
│                                    $40   │
│ [Mark as Paid]                          │
├──────────────────────────────────────────┤
│ John Doe                                │
│ Batch KOR-20240115-002 • 20 articles    │
│ Submitted Jan 15, 2024                   │
│                                    $40   │
│ [Mark as Paid]                          │
├──────────────────────────────────────────┤
│ Total Outstanding: $80                   │
└──────────────────────────────────────────┘
```

## Quick Implementation Steps

### 1. Add to Your Existing Dashboard

```javascript
// app/page.js - Add these imports
import BatchReviewManagerV2 from './components/BatchReviewManagerV2';
import ArticleStatusIndicator from './components/ArticleStatusIndicator';

// Add to your state
const [showBatchManager, setShowBatchManager] = useState(false);

// Add button to your admin controls
{userRole === 'admin' && (
  <button
    onClick={() => setShowBatchManager(!showBatchManager)}
    className="px-4 py-2 bg-purple-600 text-white rounded"
  >
    Manage Review Batches
  </button>
)}

// Show batch manager when toggled
{showBatchManager && (
  <BatchReviewManagerV2
    userRole={userRole}
    currentUser={user}
    dashboardArticles={articles}
  />
)}

// In your article cards, add status indicator
{articles.map(article => (
  <div key={article.id} className="...">
    {/* Your existing article display */}

    {/* Add this to show batch status */}
    <ArticleStatusIndicator articleId={article.id} />

    {/* Disable edit buttons if locked */}
    <button
      onClick={() => handleEdit(article)}
      disabled={article.isLocked}
      className={article.isLocked ? 'opacity-50 cursor-not-allowed' : ''}
    >
      Edit
    </button>
  </div>
))}
```

### 2. Filter Articles by Batch Status

```javascript
// Add filter options to your existing filters
const batchStatusFilters = [
  { value: 'available', label: 'Available for Review' },
  { value: 'in_batch', label: 'In Review Batch' },
  { value: 'review_complete', label: 'Review Complete' },
];

// Filter function
const filterByBatchStatus = (articles, status) => {
  switch (status) {
    case 'available':
      return articles.filter(a => !a.batchId);
    case 'in_batch':
      return articles.filter(a => a.batchId && a.batchStatus !== 'submitted');
    case 'review_complete':
      return articles.filter(a => a.batchStatus === 'submitted');
    default:
      return articles;
  }
};
```

## Benefits of This Integration

1. **No Duplicate Work**: Articles locked to one reviewer at a time
2. **Clear Visibility**: See at a glance which articles are being reviewed
3. **Streamlined Payment**: Fixed $40 per 20-article batch, no calculations needed
4. **Quality Control**: Review all changes before approval
5. **Audit Trail**: Complete history of who edited what and when

## Database Queries You Can Run

### See All Articles in Active Batches
```sql
SELECT
  rb.batch_number,
  rb.reviewer_name,
  rb.status,
  COUNT(UNNEST(rb.article_ids)) as article_count
FROM review_batches rb
WHERE rb.status IN ('assigned', 'in_progress')
GROUP BY rb.batch_number, rb.reviewer_name, rb.status;
```

### Check Payment Summary
```sql
SELECT
  reviewer_name,
  COUNT(*) as batches_to_pay,
  SUM(payment_amount) as total_owed
FROM review_batches
WHERE status = 'approved'
GROUP BY reviewer_name;
```

## Testing the Integration

1. **Create a test batch** with 20 articles
2. **Check your pipeline** - those 20 articles should show as locked
3. **Try editing a locked article** - should be disabled
4. **Have reviewer complete the batch**
5. **Approve for payment** - should show $40 in queue
6. **Mark as paid** - articles become available again

This system ensures clean, conflict-free review workflow with straightforward $40 payments per 20-article batch!