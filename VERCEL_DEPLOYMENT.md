# 🚀 DEPLOYMENT TO VERCEL — Step by Step

**Timeline:** 5-10 minutes  
**Status:** ✅ Ready

---

## **STEP 1: Prepare GitHub Repository**

```bash
cd cortex-saas-web

# Initialize Git (if not already)
git init
git add .
git commit -m "feat: cortex os saas frontend - mock payment system ready"

# Create GitHub repository
# 1. Go to https://github.com/new
# 2. Create new repo: cortex-os-saas
# 3. Push code:

git remote add origin https://github.com/YOUR_USERNAME/cortex-os-saas.git
git branch -M main
git push -u origin main
```

---

## **STEP 2: Connect to Vercel**

**Option A: Via Dashboard (Easiest)**

1. Go to **https://vercel.com**
2. Sign up / Log in (use GitHub OAuth)
3. Click **"New Project"**
4. Import GitHub repo: `cortex-os-saas`
5. Click **"Import"**

**Option B: Via CLI**

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts to deploy
```

---

## **STEP 3: Configure Environment Variables**

In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
NEXTAUTH_SECRET = <generate secure key>
NEXT_PUBLIC_PAYMENT_MODE = mock
YOOKASSA_SHOP_ID = placeholder
YOOKASSA_SECRET_KEY = placeholder
NEXT_PUBLIC_APP_URL = https://YOUR_PROJECT.vercel.app
```

**How to generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
# Output: example_FaXxC3vF4kL9pQwErT2yUiOpLkJhGfD=
```

Copy this value to Vercel dashboard.

---

## **STEP 4: Deploy**

```bash
# From root directory
cd cortex-saas-web
vercel deploy --prod
```

Or simply push to main branch (auto-deploys):

```bash
git push origin main
# Vercel auto-detects and deploys
```

---

## **STEP 5: Set Custom Domain (erlikh.ai)**

### **Option A: Point existing domain**

If you own `erlikh.ai`:

1. Go to Vercel Project → **Settings** → **Domains**
2. Add domain: `erlikh.ai`
3. Follow DNS instructions (update A records)
4. Wait 5-15 minutes for propagation

**DNS Records to add (example):**

```
A Record:
Name: @
Value: 76.76.19.195 (Vercel IP)
TTL: 3600
```

**Or CNAME (if subdomain):**

```
CNAME Record:
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### **Option B: Use Vercel subdomain**

Use automatically: `cortex-os-saas.vercel.app`

Then tell YooKassa to check: `https://cortex-os-saas.vercel.app`

---

## **STEP 6: Verify Deployment**

```bash
# Test homepage
curl https://YOUR_PROJECT.vercel.app

# Test pricing page
curl https://YOUR_PROJECT.vercel.app/pricing

# Test legal pages
curl https://YOUR_PROJECT.vercel.app/terms
curl https://YOUR_PROJECT.vercel.app/contact
```

Or simply open in browser:

- Homepage: **https://YOUR_PROJECT.vercel.app**
- Pricing: **https://YOUR_PROJECT.vercel.app/pricing**
- Login: **https://YOUR_PROJECT.vercel.app/login**

---

## **STEP 7: Update YooKassa with New URL**

Go back to YooKassa form:

1. Update **Website URL** to your Vercel URL:
   ```
   https://cortex-os-saas.vercel.app
   OR
   https://erlikh.ai (if domain configured)
   ```

2. Update **Company details link**:
   ```
   https://YOUR_URL/company
   ```

3. Repeat for Terms, Privacy, Contact

4. Click **"Send application for review"**

YooKassa will now verify your live site ✅

---

## **Quick Reference**

| Step | Command | Time |
|:---|:---|:---|
| **1. GitHub** | `git push` | 1 min |
| **2. Vercel** | Sign up + import | 2 min |
| **3. Env Vars** | Paste variables | 1 min |
| **4. Deploy** | `vercel deploy --prod` | 1 min |
| **5. Domain** | DNS update (wait) | 10 min |
| **6. Verify** | Test in browser | 1 min |
| **7. YooKassa** | Update URLs | 1 min |
| **TOTAL** | | **~17 min** |

---

## **Troubleshooting**

### **Build fails?**

```bash
# Check build locally first
npm run build

# If error, check logs
npm run lint
```

### **Env variables not loading?**

```bash
# Redeploy after adding variables
vercel deploy --prod --force
```

### **Domain not resolving?**

```bash
# Check DNS propagation
nslookup erlikh.ai
# Or use: https://www.whatsmydns.net/
```

### **Next.js 500 error?**

Check Vercel logs:

```bash
vercel logs
# Or in dashboard: Deployments → Logs
```

---

## **After Deployment**

✅ **Do:**
- Test payment flow end-to-end
- Check mobile responsiveness
- Monitor performance (Vercel dashboard)
- Setup error logging (optional)

❌ **Don't:**
- Commit `.env.local` to GitHub
- Use development URLs in production
- Keep Sourcemaps in production

---

## **Next: YooKassa Approval**

Once deployed:

1. Get new Vercel URL (or custom domain)
2. Update YooKassa merchant form
3. Resubmit for verification
4. Wait 2 days for approval
5. Get SHOP_ID + SECRET_KEY
6. Update environment variables
7. Switch to `PAYMENT_MODE=production`

---

## **Support**

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Support:** https://vercel.com/support

---

**Ready to deploy?** Let's go! 🚀
