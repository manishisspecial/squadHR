# ✅ Final Setup Checklist - Connect Frontend to Backend

## 🎯 Current Status

- ✅ Backend deployed: `https://squad-hr-backend.vercel.app`
- ✅ Backend health check working: `/api/health` returns OK
- ✅ Frontend deployed: `https://www.squadhr.in`
- ⚠️ CORS error blocking frontend requests
- ⚠️ Need to update environment variables

---

## 🔧 Step 1: Fix CORS in Backend (Vercel)

### Update Backend Environment Variables:

1. **Go to**: Vercel Dashboard → `squad-hr-backend` project
2. **Settings** → **Environment Variables**
3. **Update `CORS_ORIGIN`**:
   ```
   https://www.squadhr.in
   ```
   
   **OR if you have multiple URLs:**
   ```
   https://www.squadhr.in,https://squadhr.in,https://squad-8b1zb5rks-manish-kumar-shahs-projects.vercel.app
   ```

4. **Save**
5. **Redeploy** backend (Deployments → Redeploy)

---

## 🔧 Step 2: Update Frontend Environment Variable (Vercel)

### Update Frontend Environment Variables:

1. **Go to**: Vercel Dashboard → `squad-hr` (frontend) project
2. **Settings** → **Environment Variables**
3. **Add/Update `VITE_API_URL`**:
   ```
   https://squad-hr-backend.vercel.app/api
   ```
   
   **Important:**
   - ✅ Must start with `https://`
   - ✅ Must end with `/api`
   - ✅ Use your actual backend URL

4. **Save**
5. **Redeploy** frontend (Deployments → Redeploy)

---

## 📝 Step 3: Fix Local .env Files

### Backend `.env` (Remove VITE_API_URL)

Your `backend/.env` should have:

```env
# Database
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Server
NODE_ENV=development
PORT=5000
```

**Remove:**
- ❌ `VITE_API_URL` (this is for frontend only!)

### Frontend `.env` (Add VITE_API_URL)

Your `frontend/.env` should have:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# For production, this will be set in Vercel
# VITE_API_URL=https://squad-hr-backend.vercel.app/api
```

---

## ✅ Step 4: Verify Everything Works

### Test Backend:

1. **Health Check**: https://squad-hr-backend.vercel.app/api/health
   - Should return: `{"status":"ok","message":"SquadHR API is running"}`

### Test Frontend:

1. **Visit**: https://www.squadhr.in/login
2. **Open DevTools** (F12) → Console tab
3. **Try to login** with:
   - Email: `admin@squadhr.com`
   - Password: `Admin@123` (or your test password)
4. **Check**:
   - ✅ No CORS errors
   - ✅ API requests succeed (check Network tab)
   - ✅ Login works
   - ✅ Redirects to dashboard

---

## 📋 Complete Environment Variables Checklist

### Backend (Vercel):

- [ ] `DATABASE_URL` - Supabase PostgreSQL connection string
- [ ] `JWT_SECRET` - Random 32+ character string
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `CORS_ORIGIN=https://www.squadhr.in` ⚠️ **MUST MATCH FRONTEND URL**
- [ ] `NODE_ENV=production`
- [ ] ❌ **NO** `VITE_API_URL` (frontend only!)

### Frontend (Vercel):

- [ ] `VITE_API_URL=https://squad-hr-backend.vercel.app/api` ⚠️ **MUST POINT TO BACKEND**
- [ ] ❌ **NO** `DATABASE_URL` (backend only!)
- [ ] ❌ **NO** `JWT_SECRET` (backend only!)

---

## 🐛 Troubleshooting

### Still Getting CORS Errors?

1. **Check `CORS_ORIGIN`** matches frontend URL exactly:
   - Include `https://`
   - No trailing slash
   - Match `www.` if present

2. **Redeploy backend** after updating `CORS_ORIGIN`

3. **Clear browser cache** and try again

### Frontend Can't Connect?

1. **Check `VITE_API_URL`** in frontend Vercel settings
2. **Must end with `/api`**
3. **Redeploy frontend** after updating

### Login Fails?

1. **Check backend logs** in Vercel
2. **Verify database connection** (check `DATABASE_URL`)
3. **Check if test users exist** in database
4. **Verify password** matches what's in database

---

## 🎯 Quick Fix Summary

1. **Backend Vercel**: Update `CORS_ORIGIN` = `https://www.squadhr.in` → Redeploy
2. **Frontend Vercel**: Update `VITE_API_URL` = `https://squad-hr-backend.vercel.app/api` → Redeploy
3. **Test**: Visit frontend → Try login → Should work!

---

## 🎉 Success Indicators

After completing all steps:

- ✅ No CORS errors in browser console
- ✅ API requests succeed (200 status)
- ✅ Login works
- ✅ Dashboard loads
- ✅ All features functional

---

**You're almost there!** Just update the environment variables in Vercel and redeploy both projects. 🚀

