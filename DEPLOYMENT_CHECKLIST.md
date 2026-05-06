# 🚀 DEPLOYMENT CHECKLIST — erlikh.ai

**Status:** Ready for deployment (May 6, 2026)  
**Frontend:** ✅ 100% Complete  
**Payment Integration:** ✅ Mock Mode Ready (Production Ready on YooKassa Approval)

---

## ✅ Frontend Implementation

- ✅ Global design system (Glassmorphism, dark mode)
- ✅ Authentication (NextAuth with OAuth + Email/Password)
- ✅ 3-panel SaaS layout (Sidebar + ChatPanel + StatusPanel)
- ✅ Landing page with hero, features, CTA
- ✅ Pricing page (3 tiers: Free/Pro/Enterprise)
- ✅ Checkout flow (order summary + payment form)
- ✅ Payment success/cancel pages
- ✅ Legal pages (Terms, Privacy, Company, Contact)
- ✅ Responsive design (mobile, tablet, desktop)

---

## ✅ Payment System

### **Current State: Mock Mode**
- ✅ Mock payment session creation
- ✅ Mock payment verification
- ✅ No real charges
- ✅ Full UI flow testing

### **When YooKassa Approves (in 2 days)**
1. Get YOOKASSA_SHOP_ID from dashboard
2. Get YOOKASSA_SECRET_KEY from dashboard
3. Update .env variables:
   ```env
   NEXT_PUBLIC_PAYMENT_MODE=production
   YOOKASSA_SHOP_ID=actual_id
   YOOKASSA_SECRET_KEY=actual_key
   ```
4. Test end-to-end with real payments
5. Deploy to production

---

## 📋 Pre-Deployment Checklist

### **Local Testing**

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Test flows:
# - Login: http://localhost:3000/login
# - Pricing: http://localhost:3000/pricing
# - Checkout: http://localhost:3000/pricing → select plan
# - Success: automatic after mock payment
```

### **Environment Variables**

```
✅ .env.local created with mock mode
✅ NEXT_PUBLIC_PAYMENT_MODE=mock (for testing)
✅ NEXTAUTH_SECRET configured
✅ NEXT_PUBLIC_APP_URL set to http://localhost:3000
```

### **Database** (Optional for MVP)

- ⏳ Prisma schema (not yet created)
- ⏳ Database migrations (not yet created)
- ⏳ Payment webhook database integration (in TODO)

**Current:** All payment data stays in-memory (sufficient for MVP)

---

## 🌐 Deployment to Production (erlikh.ai)

### **Option 1: Vercel (Recommended)**

```bash
# 1. Push to GitHub
git add .
git commit -m "Payment system with mock mode"
git push origin main

# 2. Deploy to Vercel
vercel deploy --prod

# 3. Set environment variables in Vercel dashboard:
NEXTAUTH_SECRET=<generate-secure-key>
NEXT_PUBLIC_PAYMENT_MODE=mock (or production after YooKassa approval)
YOOKASSA_SHOP_ID=<will-fill-later>
YOOKASSA_SECRET_KEY=<will-fill-later>
```

### **Option 2: Custom Server (Node.js/Docker)**

```bash
# 1. Build optimized bundle
npm run build

# 2. Start production server
npm start

# 3. Use reverse proxy (Nginx) to handle SSL
```

---

## 🎯 Deployment Timeline

```
May 6, 2026 (TODAY)
├─ ✅ Mock mode ready
├─ ✅ All frontend pages complete
├─ ⏳ Optional: Deploy to staging
│
May 8, 2026 (YooKassa approval expected)
├─ Receive SHOP_ID + SECRET_KEY
├─ Update .env.local with production credentials
├─ Test end-to-end with real payments
├─ Deploy to production: erlikh.ai
│
Post-Deployment
├─ Monitor payment flow
├─ Setup database (if needed)
├─ Enable subscription tracking
└─ Scale as needed
```

---

## 🔍 Testing Checklist (Mock Mode)

### **User Flow Test**

- [ ] Homepage loads (unauthenticated)
- [ ] Login works (Google OAuth / Email)
- [ ] MainLayout displays (authenticated)
- [ ] Sidebar navigation works
- [ ] ChatPanel sends messages
- [ ] StatusPanel shows agent status

### **Payment Flow Test**

- [ ] Pricing page shows 3 plans
- [ ] Annual billing toggle works (15% discount calculated)
- [ ] Select Pro plan → redirects to /checkout
- [ ] Checkout shows order summary
- [ ] Click "Complete Payment" → mock payment processes
- [ ] Redirects to /checkout/success
- [ ] Success page shows "Payment Successful"
- [ ] Subscription status: "Active"

### **Legal Pages Test**

- [ ] /terms loads correctly
- [ ] /privacy loads correctly
- [ ] /company shows INN + OGRN
- [ ] /contact form interactive

---

## 📊 Production Monitoring

Once deployed, monitor:

```
✅ Page load times (target: < 2s)
✅ Mock payments (should be instant)
✅ Real payments (once YooKassa active)
✅ User authentication success rate
✅ Error rates and logs
✅ Database queries (if enabled)
```

---

## ⚡ Quick Start Commands

```bash
# Local development
npm install
npm run dev
# → Open http://localhost:3000

# Production build
npm run build
npm start

# Deploy to Vercel
vercel deploy --prod

# Check environment
cat .env.local
```

---

## 🆘 Troubleshooting

### **Mock payment not working?**

```
1. Check: NEXT_PUBLIC_PAYMENT_MODE=mock in .env.local
2. Check: Dev server restarted after .env change
3. Check: Browser console for errors (F12)
4. Check: Network tab for /api/checkout response
```

### **Production payment errors?**

```
1. Verify YooKassa SHOP_ID and SECRET_KEY
2. Check API credentials in Vercel dashboard
3. Test webhook signature verification
4. Enable YooKassa test mode temporarily
```

---

## 📞 Support Contacts

- **Technical:** [support@erlikh.ai](mailto:support@erlikh.ai)
- **YooKassa:** [https://yookassa.ru/support](https://yookassa.ru/support)
- **Vercel:** [https://vercel.com/support](https://vercel.com/support)

---

**Status:** ✅ Ready to deploy! 🚀
