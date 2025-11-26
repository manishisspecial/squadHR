# 🗄️ Supabase Database Setup Guide - SquadHR

## Why Supabase?

✅ **Free tier** with generous limits  
✅ **Easy setup** - no credit card required  
✅ **Built-in dashboard** for managing data  
✅ **Automatic backups**  
✅ **Great documentation**  

---

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Account

1. **Go to**: https://supabase.com
2. **Click "Start your project"** or **"Sign up"**
3. **Sign up with GitHub** (recommended) or email
4. **Verify your email** if needed

---

### Step 2: Create New Project

1. **After login**, click **"New Project"** (green button)
2. **Fill in project details:**
   - **Name**: `squadhr` (or any name you like)
   - **Database Password**: 
     - ⚠️ **Create a STRONG password** (save it somewhere safe!)
     - Minimum 8 characters
     - Mix of letters, numbers, symbols
     - Example: `SquadHR@2024!Secure`
   - **Region**: Choose closest to you
     - Examples: `Southeast Asia (Singapore)`, `US East (Ohio)`, etc.
3. **Click "Create new project"**
4. **Wait 2-3 minutes** for database to be created

---

### Step 3: Get Database Connection String

1. **After project is created**, you'll be in the dashboard
2. **Go to**: **Settings** (gear icon in left sidebar)
3. **Click**: **"Database"** (under Project Settings)
4. **Scroll down** to **"Connection string"** section
5. **Select**: **"URI"** tab (not "JDBC" or "Golang")
6. **Copy the connection string**

   It will look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

7. **⚠️ IMPORTANT**: Replace `[YOUR-PASSWORD]` with the password you created in Step 2

   **Example** (if your password was `SquadHR@2024!Secure`):
   ```
   postgresql://postgres:SquadHR@2024!Secure@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```

---

### Step 4: Add to Vercel Backend Environment Variables

1. **Go to Vercel Dashboard**
2. **Select your backend project** (`squad-hr-backend`)
3. **Go to**: **Settings** → **Environment Variables**
4. **Add new variable:**
   - **Key**: `DATABASE_URL`
   - **Value**: Paste your complete connection string (with password replaced)
   - **Environment**: Select all (Production, Preview, Development)
5. **Click "Save"**

---

### Step 5: Set Up Other Environment Variables

While you're in Environment Variables, also add:

```env
NODE_ENV=production
JWT_SECRET=your-32-character-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://squad-hr.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 6: Deploy/Redeploy Backend

1. **Go to**: **Deployments** tab
2. **Click "Redeploy"** on latest deployment
3. **Wait for build** to complete
4. **Check build logs** for any errors

---

### Step 7: Run Database Migrations

After deployment, Prisma will automatically:
- Generate Prisma Client
- Create database tables (if migrations are set up)

**To verify tables were created:**

1. **Go back to Supabase Dashboard**
2. **Click**: **"Table Editor"** (left sidebar)
3. **You should see tables** like:
   - `User`
   - `Employee`
   - `Leave`
   - `Attendance`
   - etc.

**If tables don't exist**, you may need to run migrations manually (see troubleshooting below).

---

## ✅ Verification Steps

### 1. Test Database Connection

**In Supabase Dashboard:**
1. Go to **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Run:
   ```sql
   SELECT version();
   ```
4. Should return PostgreSQL version

### 2. Test Backend Health

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

### 3. Test Database Connection from Backend

If backend is running, check logs for:
- ✅ No connection errors
- ✅ Prisma Client generated successfully

---

## 🔧 Troubleshooting

### Issue 1: Connection String Format Wrong

**Error**: `P1000: Authentication failed`

**Fix**:
- Make sure you replaced `[YOUR-PASSWORD]` with actual password
- Check password doesn't have special characters that need URL encoding
- Verify connection string format is correct

**URL Encode Special Characters:**
If password has special characters, encode them:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- etc.

Or use Supabase's **"Connection pooling"** mode (see below).

---

### Issue 2: Tables Not Created

**Problem**: Database connected but no tables exist

**Solution 1: Use Prisma Migrate**
```bash
# In your local backend directory
cd backend
npx prisma migrate deploy
```

**Solution 2: Push Schema Directly**
```bash
cd backend
npx prisma db push
```

**Solution 3: Manual Migration via Supabase**
1. Go to Supabase → SQL Editor
2. Copy schema from `backend/prisma/schema.prisma`
3. Convert to SQL and run manually

---

### Issue 3: Connection Pooling (Recommended for Production)

Supabase recommends using **Connection Pooling** for serverless functions (like Vercel).

**Get Pooled Connection String:**
1. Supabase Dashboard → Settings → Database
2. Scroll to **"Connection pooling"** section
3. Select **"Session"** mode
4. Copy the **pooled connection string**
5. Use this instead of the regular connection string

**Pooled URL format:**
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note**: Port is `6543` (not `5432`) for pooled connections.

---

### Issue 4: SSL Connection Required

**Error**: `SSL connection required`

**Fix**: Add `?sslmode=require` to connection string:
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres?sslmode=require
```

---

## 🔒 Security Best Practices

### ✅ Do:
- ✅ Use **Connection Pooling** for production
- ✅ Store password securely (never commit to Git)
- ✅ Use environment variables
- ✅ Enable SSL (`sslmode=require`)
- ✅ Rotate passwords regularly

### ❌ Don't:
- ❌ Commit connection strings to Git
- ❌ Share passwords publicly
- ❌ Use weak passwords
- ❌ Use same password for multiple projects

---

## 📊 Supabase Dashboard Features

Once set up, you can use Supabase for:

1. **Table Editor**: View/edit data visually
2. **SQL Editor**: Run SQL queries
3. **API**: Auto-generated REST API (bonus!)
4. **Auth**: Built-in authentication (if needed later)
5. **Storage**: File storage (for documents)

---

## 🎯 Quick Reference

| Item | Value |
|------|-------|
| **Supabase URL** | https://supabase.com |
| **Connection String Location** | Settings → Database → Connection string → URI |
| **Port (Direct)** | `5432` |
| **Port (Pooled)** | `6543` |
| **Database Name** | `postgres` (default) |
| **Username** | `postgres` (default) |

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Saved database password securely
- [ ] Copied connection string
- [ ] Replaced `[YOUR-PASSWORD]` in connection string
- [ ] Added `DATABASE_URL` to Vercel environment variables
- [ ] Added other environment variables (JWT_SECRET, etc.)
- [ ] Redeployed backend
- [ ] Verified tables created in Supabase
- [ ] Tested backend health endpoint
- [ ] Tested database connection

---

## 🚀 Next Steps

After Supabase is connected:

1. ✅ **Update Frontend** to connect to backend
   - Add `VITE_API_URL` in frontend environment variables
   - See `BACKEND_CONNECTION_GUIDE.md`

2. ✅ **Test Full Stack**
   - Try login from frontend
   - Verify API calls work

3. ✅ **Seed Test Data** (optional)
   - Use `backend/seed-users.js` to add test users

---

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Connection Strings**: https://supabase.com/docs/guides/database/connecting-to-postgres
- **Connection Pooling**: https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler

---

**Need help?** Check Supabase dashboard → Settings → Database for connection details, or see troubleshooting section above.

