# BizHealth SaaS Implementation Guide

This guide walks you through setting up the complete BizHealth SaaS platform with user authentication, Stripe payments, questionnaire, and report generation.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Database Setup](#database-setup)
4. [Stripe Configuration](#stripe-configuration)
5. [Supabase Edge Functions](#supabase-edge-functions)
6. [Frontend Integration](#frontend-integration)
7. [Pipeline Connection](#pipeline-connection)
8. [Testing Checklist](#testing-checklist)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Flow                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Register/Login ──► 2. Purchase ──► 3. Take Quiz             │
│         │                   │               │                    │
│         ▼                   ▼               ▼                    │
│    Supabase Auth      Stripe Checkout   Questionnaire UI        │
│                             │               │                    │
│                             ▼               ▼                    │
│                      Webhook Handler   Save to Database          │
│                             │               │                    │
│                             ▼               ▼                    │
│                      Create Order     Trigger Pipeline           │
│                                             │                    │
│                                             ▼                    │
│  4. View Reports ◄── 5. Reports Generated ◄─┘                   │
│         │                                                        │
│         ▼                                                        │
│    User Dashboard                                                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React + Vite + TypeScript | User interface |
| Auth | Supabase Auth | User authentication |
| Database | Supabase (PostgreSQL) | Data storage |
| Payments | Stripe Checkout | Payment processing |
| Backend | Supabase Edge Functions | Serverless API |
| Pipeline | Node.js (BizHealth-Manus) | Report generation |

---

## Prerequisites

Before starting, ensure you have:

- [ ] Supabase project created
- [ ] Stripe account (test mode for development)
- [ ] Node.js 18+ installed
- [ ] Supabase CLI installed (`npm install -g supabase`)

---

## Database Setup

### Step 1: Run the Migration

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_bizhealth_schema.sql`
4. Run the migration

This creates the following tables:
- `orders` - Payment and purchase records
- `questionnaires` - Assessment responses
- `reports` - Generated reports
- `pipeline_queue` - Pipeline job queue
- `profiles` - Extended user profiles

### Step 2: Verify Tables

In Supabase Dashboard > Table Editor, confirm all tables exist with proper columns and RLS policies.

---

## Stripe Configuration

### Step 1: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 2: Configure Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click **Add endpoint**
3. Enter URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the **Signing secret** (starts with `whsec_`)

### Step 3: Set Environment Variables

In your `.env` file:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
```

In Supabase Dashboard > Edge Functions > Secrets:
```
STRIPE_SECRET_KEY=sk_test_your-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

---

## Supabase Edge Functions

### Step 1: Deploy Functions

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy all functions
supabase functions deploy create-checkout-session
supabase functions deploy verify-payment
supabase functions deploy trigger-pipeline
supabase functions deploy stripe-webhook
```

### Step 2: Set Function Secrets

```bash
# Set Stripe secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_your-key
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your-secret

# Set pipeline secrets (if using external pipeline)
supabase secrets set PIPELINE_API_URL=https://your-pipeline.com/api
supabase secrets set PIPELINE_API_KEY=your-api-key
```

### Step 3: Verify Deployment

Test each function:
```bash
# Test checkout session creation
curl -X POST https://your-project.supabase.co/functions/v1/create-checkout-session \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{"product_id": "standard", "user_id": "test", "user_email": "test@example.com", "success_url": "http://localhost:5173/success", "cancel_url": "http://localhost:5173/cancel"}'
```

---

## Frontend Integration

### Step 1: Install Dependencies

```bash
cd bizhealth-saas
npm install canvas-confetti date-fns
npm install -D @types/canvas-confetti
```

### Step 2: Update App.tsx Routes

Add the new routes to your `App.tsx`:

```tsx
import Questionnaire from './pages/Questionnaire';
import CheckoutNew from './pages/CheckoutNew';
import CheckoutSuccess from './pages/CheckoutSuccess';
import PortalNew from './pages/PortalNew';

// In your Routes component:
<Route path="/questionnaire" element={<Questionnaire />} />
<Route path="/checkout" element={<CheckoutNew />} />
<Route path="/checkout/success" element={<CheckoutSuccess />} />
<Route path="/portal" element={<PortalNew />} />
```

### Step 3: Update Navigation Links

Update your navigation to include links to:
- `/pricing` - Pricing page
- `/checkout` - Checkout page
- `/questionnaire` - Assessment
- `/portal` - User dashboard

---

## Pipeline Connection

### Option A: External Pipeline API

If running the BizHealth pipeline as a separate service:

1. Deploy the pipeline to a server (e.g., AWS, Railway, Render)
2. Create an API endpoint that accepts the questionnaire payload
3. Set the `PIPELINE_API_URL` and `PIPELINE_API_KEY` secrets
4. The `trigger-pipeline` function will call your API

### Option B: Queue-Based Processing

If processing pipelines manually or via scheduled jobs:

1. The `trigger-pipeline` function stores jobs in `pipeline_queue` table
2. Create a worker that polls the queue and processes jobs
3. Update report status when complete

### Pipeline Callback

When reports are generated, update the database:

```sql
-- Update report with generated content
UPDATE reports 
SET 
  status = 'completed',
  html_content = 'your-html-content',
  file_url = 'https://storage.url/report.html',
  summary = '{"overall_score": 76, "key_insights": ["insight1", "insight2"]}',
  generated_at = NOW()
WHERE questionnaire_id = 'questionnaire-uuid';
```

---

## Testing Checklist

### Authentication
- [ ] User can register with email/password
- [ ] User can login
- [ ] User can logout
- [ ] Protected routes redirect to login

### Payments
- [ ] Checkout page displays correctly
- [ ] Promo codes apply discounts
- [ ] Stripe Checkout redirects properly
- [ ] Success page shows after payment
- [ ] Webhook creates order record
- [ ] User gains access after payment

### Questionnaire
- [ ] Business overview section works
- [ ] All 12 dimensions display correctly
- [ ] Progress saves automatically
- [ ] Can navigate between sections
- [ ] Review section shows completion status
- [ ] Submit triggers pipeline

### Dashboard
- [ ] Shows user's assessments
- [ ] Shows generated reports
- [ ] Reports can be viewed
- [ ] Reports can be downloaded
- [ ] Order history displays

### Stripe Test Cards

Use these test cards in Stripe test mode:

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 9995 | Insufficient funds |

---

## File Structure

```
bizhealth-saas/
├── src/
│   ├── components/
│   │   └── questionnaire/
│   │       ├── BusinessOverviewSection.tsx
│   │       ├── QuestionSection.tsx
│   │       └── ReviewSection.tsx
│   ├── data/
│   │   ├── questionnaire-data.ts
│   │   ├── questionnaire-data-part2.ts
│   │   └── questionnaire-index.ts
│   ├── pages/
│   │   ├── Questionnaire.tsx
│   │   ├── CheckoutNew.tsx
│   │   ├── CheckoutSuccess.tsx
│   │   └── PortalNew.tsx
│   └── ...
├── supabase/
│   ├── functions/
│   │   ├── create-checkout-session/
│   │   ├── verify-payment/
│   │   ├── trigger-pipeline/
│   │   └── stripe-webhook/
│   └── migrations/
│       └── 001_bizhealth_schema.sql
├── .env.example
└── SAAS_IMPLEMENTATION_GUIDE.md
```

---

## Support

For questions or issues:
- Review the Supabase documentation: https://supabase.com/docs
- Review the Stripe documentation: https://stripe.com/docs
- Check the console for error messages
- Verify all environment variables are set correctly

---

## Next Steps

After completing this setup:

1. **Customize pricing** - Update product prices in `CheckoutNew.tsx` and `create-checkout-session`
2. **Add email notifications** - Integrate with Resend, SendGrid, or similar
3. **Set up monitoring** - Add error tracking with Sentry
4. **Configure production** - Switch to Stripe live mode
5. **Add analytics** - Track user behavior and conversions
