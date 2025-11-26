# ⚡ Quick Vercel Deployment Guide

## Prerequisites
- ✅ Code pushed to GitHub
- ✅ Vercel account (sign up at vercel.com with GitHub)

---

## 🎯 Deploy Frontend (5 minutes)

### Step 1: Import Project
1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your `squadhr` repository

### Step 2: Configure
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend` ⚠️
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Environment Variables
Add:
```
VITE_API_URL = http://localhost:5000/api
```
(Update after backend deploys)

### Step 4: Deploy
Click **"Deploy"** → Wait 2-3 minutes

**Save your frontend URL!** (e.g., `https://squadhr-frontend.vercel.app`)

---

## 🎯 Deploy Backend (10 minutes)

### Step 1: Set Up Database First

**Option A: Vercel Postgres (Easiest)**
1. Vercel Dashboard → **Storage** → **Create Database**
2. Choose **Postgres**
3. Copy connection string

**Option B: Supabase (Free)**
1. Go to supabase.com
2. Create project
3. Copy connection string from Settings → Database

### Step 2: Create Backend Project
1. Vercel → **"Add New..."** → **"Project"**
2. Import **same repository**: `squadhr`
3. **Configure**:
   - **Root Directory**: `backend` ⚠️
   - **Framework**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Start Command**: `npm start`

### Step 3: Environment Variables
Add all of these:

```
NODE_ENV = production
PORT = 5000
DATABASE_URL = your-database-connection-string
JWT_SECRET = paste-generated-secret-here
JWT_EXPIRES_IN = 7d
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy
Click **"Deploy"** → Wait 3-5 minutes

**Save your backend URL!** (e.g., `https://squadhr-backend.vercel.app`)

---

## 🔄 Update Frontend

1. Go to Frontend project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` to: `https://your-backend-url.vercel.app/api`
3. Go to **Deployments** → Click **"Redeploy"**

---

## 🗄️ Run Database Migrations

### Via Vercel CLI:
```bash
npm i -g vercel
vercel login
cd backend
vercel link
npx prisma migrate deploy
```

---

## ✅ Test

1. Visit frontend URL
2. Try registering
3. Try logging in
4. Test features

---

## 🎉 You're Live!

Your app is now deployed and accessible worldwide!

---

## 📝 Quick Reference

- **Frontend URL**: `https://squadhr-frontend.vercel.app`
- **Backend URL**: `https://squadhr-backend.vercel.app`
- **API Endpoint**: `https://squadhr-backend.vercel.app/api`

---

## 🆘 Need Help?

- Check Vercel build logs
- Verify environment variables
- Check database connection
- See DEPLOY_STEPS.md for detailed guide

