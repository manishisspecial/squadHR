# 🔗 Connecting Frontend to Backend - SquadHR

## Overview

Your frontend is deployed on Vercel. Now you need to:
1. **Deploy the backend** (choose a platform)
2. **Update frontend API URL** to point to backend
3. **Configure CORS** on backend
4. **Set environment variables** on both

---

## 🎯 Step 1: Choose Backend Deployment Platform

### Option A: Deploy Backend on Vercel (Recommended)

**Pros:**
- Same platform as frontend
- Easy to manage
- Free tier available
- Automatic deployments

**Cons:**
- Serverless functions (may need adjustments)
- Cold starts possible

### Option B: Deploy Backend on Railway

**Pros:**
- Full Node.js support
- Easy PostgreSQL setup
- $5/month with free trial

**Cons:**
- Paid after trial

### Option C: Deploy Backend on Render

**Pros:**
- Free tier available
- Full Node.js support
- Easy setup

**Cons:**
- Free tier spins down after inactivity

---

## 🚀 Step 2: Deploy Backend on Vercel

### 2.1 Create Backend Project in Vercel

1. **Go to Vercel Dashboard**
2. **Click "Add New..." → "Project"**
3. **Import Repository**: Select `squadHR` (same repo)
4. **Configure Project**:

   **Project Settings:**
   - **Project Name**: `squad-hr-backend` (or any name)
   - **Framework Preset**: `Other`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`

5. **Environment Variables** (Click "Environment Variables"):

   Add these variables:

   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=your-postgresql-connection-string
   JWT_SECRET=your-very-strong-secret-key-here-min-32-chars
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://squad-hr.vercel.app
   ```

   **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Click "Deploy"**

### 2.2 Get Backend URL

After deployment:
- Your backend URL will be: `https://squad-hr-backend.vercel.app`
- API endpoint: `https://squad-hr-backend.vercel.app/api`

---

## 🗄️ Step 3: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. **In Vercel Dashboard** → **Storage** tab
2. **Click "Create Database"**
3. **Choose "Postgres"**
4. **Create Database**
5. **Copy Connection String** (looks like: `postgresql://user:pass@host:5432/dbname`)
6. **Add to Backend Environment Variables** as `DATABASE_URL`

### Option B: Supabase (Free)

1. **Go to**: https://supabase.com
2. **Sign up/Login**
3. **Create New Project**
4. **Go to**: Settings → Database
5. **Copy Connection String** (URI format)
6. **Add to Backend Environment Variables** as `DATABASE_URL`

### Option C: Railway Postgres

1. **Go to**: https://railway.app
2. **Create New Project**
3. **Add Postgres Database**
4. **Copy Connection String**
5. **Add to Backend Environment Variables** as `DATABASE_URL`

### 3.1 Run Database Migrations

After setting up database:

1. **SSH into your backend** (or use Vercel CLI)
2. **Run migrations**:

   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma generate
   ```

   Or if using Vercel, add to `package.json`:

   ```json
   "postinstall": "prisma generate",
   "vercel-build": "prisma generate && npm run build"
   ```

---

## 🔧 Step 4: Update Frontend API URL

### 4.1 Update Vercel Environment Variables

1. **Go to Vercel Dashboard**
2. **Select your `squad-hr` (frontend) project**
3. **Go to**: Settings → Environment Variables
4. **Add/Update**:

   ```
   VITE_API_URL = https://squad-hr-backend.vercel.app/api
   ```

   **Important**: 
   - Variable name must be `VITE_API_URL` (Vite prefix required)
   - No quotes needed
   - Use your actual backend URL

5. **Click "Save"**

### 4.2 Redeploy Frontend

1. **Go to**: Deployments tab
2. **Click "Redeploy"** on latest deployment
3. **Wait for build** to complete

---

## 🔒 Step 5: Configure CORS

Your backend already has CORS configured in `backend/src/index.ts`:

```typescript
const corsOptions = {
  origin: process.env.CORS_ORIGIN || process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000']
    : true,
  credentials: true,
  optionsSuccessStatus: 200,
};
```

**Make sure** `CORS_ORIGIN` in backend environment variables is:
```
CORS_ORIGIN=https://squad-hr.vercel.app
```

If you have multiple frontend URLs, separate with commas:
```
CORS_ORIGIN=https://squad-hr.vercel.app,https://www.squad-hr.vercel.app
```

---

## ✅ Step 6: Test Connection

### 6.1 Test Backend Health

Visit in browser:
```
https://squad-hr-backend.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "SquadHR API is running"
}
```

### 6.2 Test Frontend Connection

1. **Visit**: https://squad-hr.vercel.app
2. **Open Browser DevTools** (F12)
3. **Go to Network tab**
4. **Try to login** or make any API call
5. **Check**:
   - ✅ Requests go to your backend URL
   - ✅ No CORS errors
   - ✅ Responses received

### 6.3 Test Login

Use test credentials:
- **Email**: `admin@squadhr.com`
- **Password**: `Admin@123`

---

## 🐛 Troubleshooting

### Issue 1: CORS Error

**Error**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Fix**:
1. Check `CORS_ORIGIN` in backend env vars
2. Make sure it matches your frontend URL exactly
3. Include protocol (`https://`)
4. No trailing slash

### Issue 2: 404 on API Calls

**Error**: `404 Not Found`

**Fix**:
1. Check `VITE_API_URL` in frontend env vars
2. Make sure it ends with `/api`
3. Verify backend is deployed and running

### Issue 3: Database Connection Error

**Error**: `P1000: Authentication failed` or `Can't reach database server`

**Fix**:
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Verify connection string format
4. Check firewall/network settings

### Issue 4: JWT Errors

**Error**: `jwt malformed` or `invalid token`

**Fix**:
1. Verify `JWT_SECRET` is set in backend
2. Make sure it's the same across deployments
3. Check token expiration settings

---

## 📋 Quick Checklist

- [ ] Backend deployed on Vercel/Railway/Render
- [ ] Database created and connected
- [ ] Database migrations run
- [ ] Backend environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `JWT_SECRET`
  - [ ] `CORS_ORIGIN`
  - [ ] `NODE_ENV=production`
- [ ] Frontend environment variable set:
  - [ ] `VITE_API_URL`
- [ ] Frontend redeployed
- [ ] Backend health check works
- [ ] Frontend can connect to backend
- [ ] Login works with test credentials

---

## 🎉 After Setup

Your full stack is now connected:
- **Frontend**: https://squad-hr.vercel.app
- **Backend**: https://squad-hr-backend.vercel.app/api
- **Database**: Connected and running

You can now:
- ✅ Login/Register users
- ✅ Manage employees
- ✅ Track attendance
- ✅ Handle leaves
- ✅ Process payroll
- ✅ All features working!

---

## 📚 Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

