# 📋 Backend Connection Summary

## ✅ What's Ready

1. **Backend configured for Vercel** ✅
   - `backend/api/index.ts` - Vercel serverless entry point
   - `backend/vercel.json` - Vercel configuration
   - `backend/package.json` - Updated with `vercel-build` script

2. **Frontend ready to connect** ✅
   - Uses `VITE_API_URL` environment variable
   - Already configured in `frontend/src/utils/api.ts`

3. **CORS configured** ✅
   - Backend accepts requests from frontend domain
   - Configured in `backend/src/index.ts`

---

## 🚀 Deployment Steps

### 1. Deploy Backend to Vercel

**In Vercel Dashboard:**

1. **Add New Project** → Import `squadHR` repository
2. **Configure:**
   - **Project Name**: `squad-hr-backend`
   - **Root Directory**: `backend`
   - **Framework**: `Other`
   - **Build Command**: `npm run vercel-build` (or `npm run build`)
   - **Output Directory**: Leave empty (not needed for serverless)
   - **Install Command**: `npm install`

3. **Environment Variables** (Add these):
   ```
   NODE_ENV=production
   DATABASE_URL=your-postgres-connection-string
   JWT_SECRET=your-32-character-secret-key
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://squad-hr.vercel.app
   ```

4. **Deploy** → Wait for build

5. **Get Backend URL**: `https://squad-hr-backend.vercel.app`

---

### 2. Set Up Database

**Option A: Vercel Postgres** (Recommended)
- Vercel Dashboard → Storage → Create Postgres
- Copy connection string → Add as `DATABASE_URL`

**Option B: Supabase** (Free)
- https://supabase.com → Create Project
- Settings → Database → Copy connection string

**After database setup:**
- Run migrations (Vercel will auto-generate Prisma on build)
- Or manually: `npx prisma migrate deploy` (if needed)

---

### 3. Update Frontend Environment Variable

1. **Vercel Dashboard** → Select `squad-hr` (frontend) project
2. **Settings** → **Environment Variables**
3. **Add/Update:**
   ```
   VITE_API_URL=https://squad-hr-backend.vercel.app/api
   ```
4. **Redeploy** frontend

---

### 4. Test Connection

1. **Backend Health Check:**
   ```
   https://squad-hr-backend.vercel.app/api/health
   ```
   Should return: `{"status":"ok","message":"SquadHR API is running"}`

2. **Frontend Test:**
   - Visit: https://squad-hr.vercel.app
   - Try to login
   - Check browser console for API calls
   - Should see requests to your backend URL

---

## 🔧 Configuration Files

### Backend Files Updated:
- ✅ `backend/src/index.ts` - Exports app for Vercel
- ✅ `backend/api/index.ts` - Vercel serverless entry point
- ✅ `backend/vercel.json` - Vercel routing configuration
- ✅ `backend/package.json` - Added `vercel-build` script

### Frontend Files (Already Ready):
- ✅ `frontend/src/utils/api.ts` - Uses `VITE_API_URL`
- ✅ `frontend/vercel.json` - Frontend routing

---

## 📝 Environment Variables Checklist

### Backend (Vercel):
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL=postgresql://...`
- [ ] `JWT_SECRET=your-secret-key`
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `CORS_ORIGIN=https://squad-hr.vercel.app`

### Frontend (Vercel):
- [ ] `VITE_API_URL=https://squad-hr-backend.vercel.app/api`

---

## 🎯 Quick Reference

| Component | URL |
|-----------|-----|
| **Frontend** | `https://squad-hr.vercel.app` |
| **Backend** | `https://squad-hr-backend.vercel.app` |
| **API Health** | `https://squad-hr-backend.vercel.app/api/health` |
| **API Base** | `https://squad-hr-backend.vercel.app/api` |

---

## 🐛 Troubleshooting

### Backend not deploying?
- Check `Root Directory` = `backend`
- Verify `vercel-build` script exists
- Check build logs for errors

### CORS errors?
- Verify `CORS_ORIGIN` matches frontend URL exactly
- Include `https://` protocol
- No trailing slash

### Database connection failed?
- Verify `DATABASE_URL` is correct
- Check database is running
- Test connection string format

### Frontend can't connect?
- Verify `VITE_API_URL` is set correctly
- Must start with `https://`
- Must end with `/api`
- Redeploy frontend after changing env vars

---

## ✅ Success Criteria

- [ ] Backend deployed and accessible
- [ ] Health check returns OK
- [ ] Database connected
- [ ] Frontend environment variable set
- [ ] Frontend redeployed
- [ ] Login works from frontend
- [ ] API calls succeed

---

**Need more details?** See `BACKEND_CONNECTION_GUIDE.md` for comprehensive guide.

