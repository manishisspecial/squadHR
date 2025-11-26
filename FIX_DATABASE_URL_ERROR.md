# 🔧 Fix DATABASE_URL Error in Vercel

## 🐛 The Problem

**Error Message:**
```
Error validating datasource 'db': 
the URL must start with the protocol `postgresql://` or `postgres://`
```

**What this means:**
- ❌ `DATABASE_URL` is not set in Vercel backend environment variables
- ❌ OR `DATABASE_URL` is set incorrectly (missing protocol)
- ❌ OR `DATABASE_URL` is empty or malformed

---

## ✅ The Solution

Add the correct `DATABASE_URL` to your backend Vercel project environment variables.

---

## 📋 Step-by-Step Fix

### Step 1: Get Your DATABASE_URL

You need your Supabase PostgreSQL connection string.

1. **Go to**: https://supabase.com
2. **Login** and select your project
3. **Settings** (gear icon) → **Database**
4. **Scroll to "Connection string"** section
5. **Click "URI" tab**
6. **Copy the connection string**

It should look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

7. **Replace `[YOUR-PASSWORD]`** with your actual Supabase database password

**Example:**
```
postgresql://postgres:MyPassword123!@db.xadgahegsmowiguwhkip.supabase.co:5432/postgres
```

---

### Step 2: Add DATABASE_URL to Vercel Backend

1. **Go to**: https://vercel.com/dashboard
2. **Select**: `squad-hr-backend` project
3. **Click**: **Settings** (top navigation)
4. **Click**: **Environment Variables** (left sidebar)
5. **Click**: **"Add New"** or find existing `DATABASE_URL`

6. **Add/Update**:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste your complete connection string (with password)
   - **Environment**: Select all (Production, Preview, Development)

7. **Click "Save"**

---

### Step 3: Verify Format

**✅ Correct Format:**
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

**❌ Wrong Formats:**
```
https://db.xxxxx.supabase.co  ❌ (wrong protocol)
postgres://postgres:password@...  ✅ (also works, but postgresql:// is preferred)
DATABASE_URL=postgresql://...  ❌ (don't include variable name in value)
```

**Important:**
- ✅ Must start with `postgresql://` or `postgres://`
- ✅ Include username (`postgres`)
- ✅ Include password (your actual password)
- ✅ Include host (`db.xxxxx.supabase.co`)
- ✅ Include port (`5432`)
- ✅ Include database name (`postgres`)

---

### Step 4: Redeploy Backend

1. **Go to**: **Deployments** tab
2. **Click**: **"Redeploy"** on latest deployment
3. **Wait** for build to complete (2-3 minutes)
4. **Check build logs** for any errors

---

## 🧪 Step 5: Test

### Test Backend Health:

Visit:
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

### Test Login:

1. **Visit**: https://www.squadhr.in/login
2. **Try to login**
3. **Check**:
   - ✅ No database errors
   - ✅ Login works (if users exist in database)

---

## 🔍 Troubleshooting

### Issue 1: Still Getting Database Error

**Check:**
1. `DATABASE_URL` is set in Vercel (not just local `.env`)
2. Connection string format is correct
3. Password is correct (no typos)
4. Backend was redeployed after adding variable

**Verify in Vercel:**
- Settings → Environment Variables
- Find `DATABASE_URL`
- Make sure value is correct
- Make sure it's enabled for Production environment

### Issue 2: Connection String Format Wrong

**Common mistakes:**
- Missing `postgresql://` at start
- Password has special characters that need URL encoding
- Missing port number
- Wrong database name

**Fix:**
- Use exact format from Supabase
- URL encode special characters in password if needed
- Or use Supabase connection pooling (port 6543)

### Issue 3: Password with Special Characters

If your password has special characters (`@`, `#`, `$`, etc.), they need URL encoding:

**Example:**
- Password: `My@Pass#123`
- Encoded: `My%40Pass%23123`

**Or use connection pooling** (recommended):
- Supabase → Settings → Database → Connection pooling
- Use pooled connection string (port 6543)
- Better for serverless functions

---

## 📝 Complete Environment Variables Checklist

Make sure these are ALL set in Vercel backend:

```env
# Database (REQUIRED - Fix this!)
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-32-character-secret-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://www.squadhr.in

# Environment
NODE_ENV=production
```

---

## 🎯 Quick Fix Summary

1. **Get DATABASE_URL** from Supabase Dashboard
2. **Vercel** → `squad-hr-backend` → Settings → Environment Variables
3. **Add/Update** `DATABASE_URL` with complete connection string
4. **Save**
5. **Redeploy** backend
6. **Test** login

---

## ✅ After Fixing

Once `DATABASE_URL` is correctly set and backend is redeployed:

- ✅ Database connection will work
- ✅ Prisma can connect to Supabase
- ✅ Login will work (if users exist)
- ✅ All API endpoints will work

---

**The error is clear:** Your backend needs `DATABASE_URL` set in Vercel environment variables. Add it and redeploy! 🚀

