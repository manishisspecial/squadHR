# 🔧 Fix CORS Error - Backend Not Allowing Frontend Requests

## 🐛 The Problem

**Error Message:**
```
Access to XMLHttpRequest at 'https://squad-hr-backend.vercel.app/api/...' 
from origin 'https://www.squadhr.in' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**What this means:**
- Your backend is deployed and working ✅
- Your frontend is trying to connect ✅
- But backend is **blocking** frontend requests ❌
- The `CORS_ORIGIN` environment variable doesn't match your frontend URL

---

## ✅ The Solution

Update the `CORS_ORIGIN` environment variable in your backend Vercel project to include your frontend domain.

---

## 📋 Step-by-Step Fix

### Step 1: Go to Vercel Backend Project

1. **Go to**: https://vercel.com/dashboard
2. **Select**: `squad-hr-backend` project

### Step 2: Update Environment Variables

1. **Click**: **Settings** (in top navigation)
2. **Click**: **Environment Variables** (in left sidebar)
3. **Find**: `CORS_ORIGIN` variable
4. **Click** the variable to edit it

### Step 3: Update CORS_ORIGIN Value

**Your frontend URL is:** `https://www.squadhr.in`

**Update `CORS_ORIGIN` to:**

```
https://www.squadhr.in
```

**OR if you have multiple frontend URLs, separate with commas:**

```
https://www.squadhr.in,https://squadhr.in,https://squad-8b1zb5rks-manish-kumar-shahs-projects.vercel.app
```

**Important:**
- ✅ Include `https://` protocol
- ✅ No trailing slash (`/`)
- ✅ Match the exact domain (including `www.` if present)
- ✅ Separate multiple URLs with commas (no spaces)

### Step 4: Save and Redeploy

1. **Click "Save"** after updating
2. **Go to**: **Deployments** tab
3. **Click "Redeploy"** on the latest deployment
4. **Wait** for build to complete (2-3 minutes)

---

## 🧪 Test After Fix

1. **Visit**: https://www.squadhr.in/login
2. **Open DevTools** (F12) → Console tab
3. **Try to login**
4. **Check**:
   - ✅ No CORS errors
   - ✅ API requests succeed
   - ✅ Login works

---

## 📝 All Environment Variables Checklist

Make sure these are set in your backend Vercel project:

```env
# Database
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# CORS - MUST MATCH YOUR FRONTEND URL
CORS_ORIGIN=https://www.squadhr.in

# Environment
NODE_ENV=production
```

---

## 🔍 Verify CORS Configuration

After redeploying, test the backend:

**Option 1: Test with curl**
```bash
curl -H "Origin: https://www.squadhr.in" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://squad-hr-backend.vercel.app/api/auth/login \
     -v
```

Should return headers including:
```
Access-Control-Allow-Origin: https://www.squadhr.in
```

**Option 2: Test from Browser**

1. Visit: https://www.squadhr.in/login
2. Try to login
3. Check console - should see no CORS errors

---

## 🎯 Common CORS Issues

### Issue 1: Wrong Domain

**Problem**: `CORS_ORIGIN` doesn't match frontend URL exactly

**Fix**: 
- Check your exact frontend URL (with/without `www.`)
- Update `CORS_ORIGIN` to match exactly

### Issue 2: Missing Protocol

**Problem**: `CORS_ORIGIN=http://localhost:3000` (missing `https://`)

**Fix**: Always include `https://` for production

### Issue 3: Trailing Slash

**Problem**: `CORS_ORIGIN=https://www.squadhr.in/` (has trailing slash)

**Fix**: Remove trailing slash: `https://www.squadhr.in`

### Issue 4: Multiple Domains

**Problem**: Need to support multiple frontend URLs

**Fix**: Separate with commas:
```
CORS_ORIGIN=https://www.squadhr.in,https://squadhr.in,https://squad-8b1zb5rks-manish-kumar-shahs-projects.vercel.app
```

---

## ✅ After Fixing

Once `CORS_ORIGIN` is updated and backend is redeployed:

1. ✅ CORS errors will disappear
2. ✅ Frontend can connect to backend
3. ✅ Login will work
4. ✅ All API calls will succeed

---

## 🚀 Quick Fix Summary

1. **Vercel Dashboard** → `squad-hr-backend` project
2. **Settings** → **Environment Variables**
3. **Update** `CORS_ORIGIN` = `https://www.squadhr.in`
4. **Save**
5. **Redeploy** backend
6. **Test** login from frontend

---

**That's it!** After redeploying with the correct `CORS_ORIGIN`, your frontend will be able to connect to the backend. 🎉

