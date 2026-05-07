# 🔴 TECH DEBT — Cortex OS SaaS Frontend
**Created:** May 6, 2026  
**Status:** 5 Critical Issues Blocking Production  
**Total Points:** 89 (est. 40 hours to resolve)

---

## 🚨 CRITICAL (Blocks Launch)

### 1. Vercel Build Failure
**Priority:** 🔴 CRITICAL  
**Points:** 21  
**Status:** Active Blocker  

**Problem:**
- Multiple failed deployments (2c3V8SZZd, 2RuQUPqod, 65lv5)
- Build logs inaccessible from web dashboard
- Error: `DEPLOYMENT_NOT_FOUND` after 404
- Unknown TypeScript/Next.js compilation error

**Root Cause (Suspected):**
- Environment variables incomplete or misnamed
- Possible import error in React/Next.js files
- prisma/schema.prisma may reference undefined models

**Solution:**
1. Run `npm run build` locally and capture full error output
2. Check TypeScript compilation errors in `dist/` folder
3. Verify all imports in src/app/** and src/components/**
4. Test with `vercel build` CLI command locally

**Acceptance Criteria:**
- Build succeeds locally
- Vercel deployment shows "Ready" status
- URL accessible at https://cortex-os-saas.vercel.app

**Owner:** Frontend Developer  
**Deadline:** May 7, 2026

---

### 2. YooKassa Credentials Missing
**Priority:** 🔴 CRITICAL  
**Points:** 13  
**Status:** Awaiting External Input  

**Problem:**
- YOOKASSA_SHOP_ID = "placeholder" (dummy value)
- YOOKASSA_SECRET_KEY = "placeholder" (dummy value)
- Production payment flow cannot activate without real credentials

**Dependencies:**
- YooKassa merchant account approval (in progress, ~2 days)
- User receives email with credentials
- Must be inserted into Vercel Environment Variables

**Solution:**
1. Wait for YooKassa approval email (eta: May 8)
2. Extract SHOP_ID and SECRET_KEY from dashboard
3. Update Vercel Environment Variables
4. Change NEXT_PUBLIC_PAYMENT_MODE from "mock" → "production"
5. Redeploy

**Acceptance Criteria:**
- Real payment test succeeds
- YooKassa dashboard shows transaction

**Owner:** Project Manager (user)  
**Deadline:** May 9, 2026 (dependent on YooKassa)

---

### 3. Database Schema Not Implemented
**Priority:** 🔴 CRITICAL  
**Points:** 26  
**Status:** Not Started  

**Problem:**
- Prisma schema incomplete (only basic User model)
- No Subscription model for tracking paid plans
- No Payment history table for receipts
- No QueryQuota model for usage limits
- Payment webhook has "TODO: update database" comments

**Impact:**
- Cannot persist subscription purchases
- No way to track user usage
- Payment history lost after session

**Solution:**
1. Create Prisma schema with models:
   ```
   - User (extend with subscription fields)
   - Subscription (plan, status, next_billing_date)
   - Payment (amount, yookassa_id, status, created_at)
   - QueryQuota (user_id, monthly_limit, used_count)
   ```
2. Run `prisma migrate dev --name init`
3. Update webhook `/api/payment/webhook` to insert Payment record
4. Add subscription check middleware to /api/dispatch

**Acceptance Criteria:**
- Prisma schema compiles without errors
- Migrations run successfully
- Payment webhook inserts records

**Owner:** Backend Developer  
**Deadline:** May 9, 2026

---

### 4. Backend API Endpoints Not Tested
**Priority:** 🔴 CRITICAL  
**Points:** 15  
**Status:** Code Present, Not Verified  

**Problem:**
- `/api/dispatch` (LLM query handler) - code exists but not tested
- `/api/chat/history` (message persistence) - no real database integration
- `ChatPanel.tsx` fetches from these endpoints but they may not work

**Impact:**
- Chat interface will fail when user sends message
- LLM responses not returned
- Message history lost

**Solution:**
1. Verify `/api/dispatch` receives POST with { query, context, userId, tier }
2. Verify `/api/chat/history` receives POST with { userId, userMessage, agentResponse }
3. Mock backend responses in development
4. Test ChatPanel message flow end-to-end
5. Document expected request/response format

**Acceptance Criteria:**
- ChatPanel successfully sends/receives messages
- No 400/500 errors in browser console
- Messages appear with correct formatting

**Owner:** Backend + Frontend Developer  
**Deadline:** May 10, 2026

---

### 5. Environment Variables Incomplete
**Priority:** 🔴 CRITICAL  
**Points:** 14  
**Status:** Partially Fixed  

**Problem:**
- NEXT_PUBLIC_PAYMENT_MODE correctly set to "mock"
- NEXT_PUBLIC_APP_URL partially configured
- NEXTAUTH_SECRET present but may need rotation
- Missing: error logging, analytics, optional configs

**Solution:**
1. Verify all 5 required variables in Vercel Production environment
2. Add optional variables:
   - NEXT_PUBLIC_GA_ID (Google Analytics - optional)
   - SENTRY_DSN (Error tracking - optional)
   - LOG_LEVEL (Logging - optional)
3. Document which are required vs optional in README

**Acceptance Criteria:**
- All required vars present in Vercel dashboard
- Build completes successfully with current vars
- No undefined variable warnings in logs

**Owner:** DevOps / Frontend  
**Deadline:** May 7, 2026

---

## ⚠️ HIGH PRIORITY (Launch Blocker)

### 6. Payment Webhook Integration
**Priority:** ⚠️ HIGH  
**Points:** 18  
**Status:** Stub Code Only  

**Problem:**
- `/api/payment/webhook` receives YooKassa notifications
- Code has comment: "TODO: update database subscription"
- Code has comment: "TODO: send email confirmation"
- Webhook doesn't persist successful payments

**Impact:**
- User pays but subscription not activated
- No receipt email sent
- Payment records lost

**Solution:**
```typescript
// webhook handler should:
1. Verify signature with verifyWebhookSignature()
2. On payment.succeeded:
   - Find user by email
   - Create Subscription record
   - Create Payment record
   - Send confirmation email
   - Return { status: 'ok' }
3. On payment.canceled:
   - Mark Subscription as canceled
   - Log cancellation
```

**Acceptance Criteria:**
- Webhook receives YooKassa event
- Database updated with subscription
- Email sent to user

**Owner:** Backend Developer  
**Deadline:** May 12, 2026

---

### 7. Mock Mode → Production Migration Path
**Priority:** ⚠️ HIGH  
**Points:** 12  
**Status:** Documented But Not Implemented  

**Problem:**
- Currently in "mock" mode (test payments don't charge)
- Switching to production requires:
  1. YOOKASSA_SHOP_ID + SECRET_KEY
  2. Change NEXT_PUBLIC_PAYMENT_MODE env var
  3. Update test suite for real payments
  4. Manual testing of payment flow
- No runbook for migration

**Solution:**
Create MIGRATION.md with steps:
```
1. Receive YooKassa credentials
2. Update .env.local (local dev only)
3. Update Vercel Environment Variables
4. Change NEXT_PUBLIC_PAYMENT_MODE to "production"
5. Redeploy: git commit && git push
6. Test checkout flow manually
7. Monitor YooKassa dashboard for transaction
```

**Acceptance Criteria:**
- MIGRATION.md exists
- Real payment test succeeds
- Transaction visible in YooKassa

**Owner:** DevOps  
**Deadline:** May 9, 2026 (after YooKassa approval)

---

## 📋 MEDIUM PRIORITY (Nice to Have)

### 8. User Subscription Enforcement
**Priority:** 📋 MEDIUM  
**Points:** 16  
**Status:** Not Started  

**Problem:**
- No check if user paid before accessing ChatPanel
- Free users can use Pro features
- Query quota not enforced

**Solution:**
Add middleware to `/api/dispatch`:
```typescript
1. Get user subscription from database
2. Check if plan is "free" or "pro"
3. Check monthly query usage
4. Block if quota exceeded
5. Return { error: "Upgrade required" }
```

**Deadline:** May 15, 2026

---

### 9. Error Logging & Monitoring
**Priority:** 📋 MEDIUM  
**Points:** 14  
**Status:** Basic try/catch Only  

**Problem:**
- No centralized error logging
- No crash monitoring
- No performance metrics
- Errors only visible in browser console

**Solution:**
1. Integrate Sentry or similar service
2. Log errors to centralized dashboard
3. Alert on critical errors
4. Track performance metrics

**Deadline:** May 20, 2026

---

### 10. Query Quota System
**Priority:** 📋 MEDIUM  
**Points:** 12  
**Status:** Designed, Not Implemented  

**Problem:**
- No limit on LLM queries per user
- Free users could spam API
- No cost control

**Solution:**
1. Implement QueryQuota model
2. Track queries in `/api/dispatch`
3. Return 429 (Too Many Requests) if exceeded
4. Reset quota monthly

**Deadline:** May 20, 2026

---

## 🟡 LOW PRIORITY (Enhancements)

### 11. Analytics Integration
**Priority:** 🟡 LOW  
**Points:** 8  
**Status:** Not Started  

**Add:** Google Analytics tracking for:
- User signup funnel
- Pricing page views
- Checkout conversions
- LLM usage patterns

**Deadline:** May 25, 2026

---

### 12. Rate Limiting
**Priority:** 🟡 LOW  
**Points:** 10  
**Status:** Not Started  

**Add:** API rate limiting:
- 100 requests/minute per user
- 1000 requests/hour per IP
- Exponential backoff

**Deadline:** May 25, 2026

---

## 📊 Tech Debt Summary

| Category | Count | Points | Status |
|:---|:---|:---|:---|
| **CRITICAL** | 5 | 89 | 🔴 Blocking |
| **HIGH** | 2 | 30 | ⚠️ Important |
| **MEDIUM** | 3 | 42 | 📋 Soon |
| **LOW** | 2 | 18 | 🟡 Later |
| **TOTAL** | **12** | **179** | — |

**Estimated Effort:** ~85 hours  
**Estimated Timeline:** 3-4 weeks to resolve all items

---

## 🎯 Prioritized Roadmap

### Week 1 (May 6-12) — CRITICAL
- [ ] Fix Vercel build (Debug locally first)
- [ ] Implement Database Schema
- [ ] Update Environment Variables
- [ ] Create Payment Webhook Integration
- [ ] Test Backend API Endpoints

### Week 2 (May 13-19) — HIGH + MEDIUM
- [ ] Subscription Enforcement Middleware
- [ ] Mock → Production Migration
- [ ] Error Logging Setup
- [ ] Query Quota System

### Week 3+ (May 20+) — LOW + ENHANCEMENTS
- [ ] Analytics Integration
- [ ] Rate Limiting
- [ ] Performance Optimization
- [ ] Security Audit

---

## 📝 How to Track

```bash
# Check remaining tech debt
grep -r "TODO\|FIXME\|XXX" src/

# Build and test locally before pushing
npm run build
npm run lint
npm test

# Use git commits to track progress
git commit -m "fix: resolve Vercel build issue #1"
```

---

**Owner:** Andrey Erlikh  
**Last Updated:** May 6, 2026  
**Next Review:** May 8, 2026 (after YooKassa approval)
