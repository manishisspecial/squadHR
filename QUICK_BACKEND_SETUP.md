# ⚡ Quick Backend Setup Guide

## 🎯 Fastest Way: Deploy Backend on Vercel

### Step 1: Create Backend Project (5 minutes)

1. **Vercel Dashboard** → **Add New Project**
2. **Import** `squadHR` repository
3. **Configure**:
   - **Root Directory**: `backend`
   - **Framework**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Start Command**: `npm start`

### Step 2: Set Environment Variables

Add these in Vercel:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=generate-random-32-char-string
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://squad-hr.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Get Database

**Option A: Vercel Postgres** (Easiest)
- Vercel Dashboard → Storage → Create Postgres
- Copy connection string → Add as `DATABASE_URL`

**Option B: Supabase** (Free)
- https://supabase.com → Create Project
- Settings → Database → Copy connection string

### Step 4: Update Frontend

1. **Get backend URL**: `https://your-backend-name.vercel.app`
2. **Frontend project** → Settings → Environment Variables
3. **Add**: `VITE_API_URL = https://your-backend-name.vercel.app/api`
4. **Redeploy frontend**

### Step 5: Test

1. Visit: `https://your-backend-name.vercel.app/api/health`
2. Should see: `{"status":"ok","message":"SquadHR API is running"}`
3. Try login on frontend

---

## ✅ Done!

Your stack is connected:
- Frontend → Vercel ✅
- Backend → Vercel ✅
- Database → Connected ✅

---

**Need help?** See `BACKEND_CONNECTION_GUIDE.md` for detailed steps.

