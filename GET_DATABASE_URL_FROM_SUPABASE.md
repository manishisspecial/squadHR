# 🔍 How to Get DATABASE_URL from Supabase

## ⚠️ Important Distinction

**What you have:**
```
https://xadgahegsmowiguwhkip.supabase.co
```
This is your **Supabase project URL** (for dashboard/API access)

**What you need:**
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```
This is your **PostgreSQL connection string** (DATABASE_URL)

---

## 📋 Step-by-Step: Get DATABASE_URL

### Step 1: Go to Supabase Dashboard

1. **Visit**: https://supabase.com
2. **Login** to your account
3. **Select your project**: `squadhr` (or whatever you named it)

---

### Step 2: Navigate to Database Settings

1. **Click** the **Settings** icon (⚙️ gear icon) in the left sidebar
2. **Click** **"Database"** under "Project Settings"

---

### Step 3: Find Connection String

1. **Scroll down** to the **"Connection string"** section
2. You'll see tabs: **"URI"**, **"JDBC"**, **"Golang"**, etc.
3. **Click the "URI" tab** (this is what we need)

---

### Step 4: Copy Connection String

You'll see something like:

```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

OR

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

### Step 5: Replace [YOUR-PASSWORD]

**⚠️ IMPORTANT**: The connection string will have `[YOUR-PASSWORD]` placeholder.

**You need to replace it** with the actual password you set when creating the Supabase project.

**Example:**
```
Before: postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres

After:  postgresql://postgres:MyPassword123!@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

## 🎯 Two Types of Connection Strings

### Option 1: Direct Connection (Port 5432)
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```
- **Use this for**: Local development
- **Port**: `5432`

### Option 2: Connection Pooling (Port 6543) - **Recommended for Vercel**
```
postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres
```
- **Use this for**: Production/Vercel (better for serverless)
- **Port**: `6543`
- **Better performance** for serverless functions

---

## 📝 Quick Reference

**Your Supabase Project:**
- **URL**: `https://xadgahegsmowiguwhkip.supabase.co`
- **Project Ref**: `xadgahegsmowiguwhkip`

**What you need:**
1. Go to: Settings → Database → Connection string → URI tab
2. Copy the connection string
3. Replace `[YOUR-PASSWORD]` with your actual password
4. Use this as `DATABASE_URL` in your `.env`

---

## ✅ Example DATABASE_URL

Based on your project URL, your DATABASE_URL should look like:

**Direct Connection:**
```
postgresql://postgres:YOUR_PASSWORD@db.xadgahegsmowiguwhkip.supabase.co:5432/postgres
```

**Pooled Connection (Recommended):**
```
postgresql://postgres.xadgahegsmowiguwhkip:YOUR_PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres
```

**Replace `YOUR_PASSWORD`** with the password you set when creating the Supabase project.

---

## 🔒 Forgot Your Password?

If you forgot your database password:

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Scroll to "Database password"** section
3. **Click "Reset database password"**
4. **Set a new password** (save it securely!)
5. **Update your connection string** with the new password

---

## 🧪 Test Your Connection String

After getting your DATABASE_URL, test it:

```bash
# In backend directory
cd backend

# Test connection (if you have psql installed)
psql "postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"

# Or test with Node.js
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => { console.log('✅ Connected!'); process.exit(0); }).catch(e => { console.error('❌ Error:', e.message); process.exit(1); });"
```

---

## 📋 Checklist

- [ ] Logged into Supabase Dashboard
- [ ] Selected your project
- [ ] Went to Settings → Database
- [ ] Found "Connection string" section
- [ ] Clicked "URI" tab
- [ ] Copied connection string
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] Added to `backend/.env` as `DATABASE_URL`
- [ ] Tested connection

---

**Need help?** If you can't find the connection string, check the screenshots in `SUPABASE_SETUP_GUIDE.md` or ask for assistance.

