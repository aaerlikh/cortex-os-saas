# ⚡ QUICK DEPLOYMENT (5 minutes)

## **1. Push to GitHub**

```bash
cd cortex-saas-web
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## **2. Go to Vercel**

https://vercel.com → **Import Project** → Select GitHub repo

## **3. Add Environment Variables**

In Vercel dashboard → Settings → Environment Variables:

```
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
NEXT_PUBLIC_PAYMENT_MODE=mock
NEXT_PUBLIC_APP_URL=https://YOUR_VERCEL_URL
YOOKASSA_SHOP_ID=placeholder
YOOKASSA_SECRET_KEY=placeholder
```

## **4. Deploy**

Click **Deploy** button (or `git push` auto-deploys)

## **5. Get Your URL**

```
https://cortex-os-saas.vercel.app
or
https://erlikh.ai (if domain configured)
```

## **6. Update YooKassa**

Copy your Vercel URL → YooKassa form → Update all links → Submit

## **✅ Done!**

YooKassa will now verify your live site.
