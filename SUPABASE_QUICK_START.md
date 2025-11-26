# ⚡ Supabase Quick Start - 5 Minutes

## 🎯 Fast Setup

### 1. Create Supabase Project (2 min)

1. **Go to**: https://supabase.com
2. **Sign up** (use GitHub for fastest setup)
3. **Click "New Project"**
4. **Fill in:**
   - Name: `squadhr`
   - Password: `Create a strong password` ⚠️ **SAVE THIS!**
   - Region: Choose closest
5. **Click "Create new project"**
6. **Wait 2-3 minutes**

---

### 2. Get Connection String (1 min)

1. **Settings** (gear icon) → **Database**
2. **Scroll to "Connection string"**
3. **Click "URI" tab**
4. **Copy the string** (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. **Replace `[YOUR-PASSWORD]`** with your actual password

**Example:**
```
postgresql://postgres:MyPassword123!@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

### 3. Add to Vercel (1 min)

1. **Vercel Dashboard** → Your backend project
2. **Settings** → **Environment Variables**
3. **Add:**
   - Key: `DATABASE_URL`
   - Value: `paste-your-connection-string-here`
4. **Save**

---

### 4. Deploy (1 min)

1. **Deployments** tab
2. **Redeploy**
3. **Done!** ✅

---

## 🔍 Verify It Works

1. **Supabase Dashboard** → **Table Editor**
2. **Should see tables** (User, Employee, etc.)
3. **Backend health**: `https://your-backend.vercel.app/api/health`

---

## 💡 Pro Tip: Use Connection Pooling

For better performance with Vercel:

1. **Supabase** → **Settings** → **Database**
2. **Connection pooling** → **Session mode**
3. **Copy pooled connection string**
4. **Use this instead** (port is `6543`)

---

**That's it!** Your database is ready. 🎉

See `SUPABASE_SETUP_GUIDE.md` for detailed instructions.

