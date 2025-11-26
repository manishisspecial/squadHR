# 🗄️ Database URL Explained

## What is a Database URL?

A **Database URL** (also called a **Connection String**) is a single string that contains all the information needed to connect to your PostgreSQL database. It includes:
- Database server address
- Port number
- Database name
- Username
- Password
- SSL settings

---

## 📋 Database URL Format

### PostgreSQL Connection String Format:

```
postgresql://[username]:[password]@[host]:[port]/[database_name]?[parameters]
```

### Example:

```
postgresql://myuser:mypassword@db.example.com:5432/squadhr?sslmode=require
```

**Breaking it down:**
- `postgresql://` - Protocol (always starts with this)
- `myuser` - Your database username
- `mypassword` - Your database password
- `db.example.com` - Database server hostname/IP
- `5432` - Port (5432 is default for PostgreSQL)
- `squadhr` - Database name
- `?sslmode=require` - SSL connection parameter

---

## 🔍 How to Get a Database URL

### Option 1: Vercel Postgres (Recommended - Easiest)

1. **Go to Vercel Dashboard**
2. **Click "Storage" tab** (in top navigation)
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Create Database** (give it a name like `squadhr-db`)
6. **After creation**, you'll see:
   - **Connection String** (this is your `DATABASE_URL`)
   - It looks like: `postgres://default:xxxxx@ep-xxxxx.us-east-1.postgres.vercel-storage.com:5432/verceldb`

7. **Copy the entire connection string** - this is your `DATABASE_URL`

**Example Vercel Postgres URL:**
```
postgres://default:AbCdEf123456@ep-cool-name-123456.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require
```

---

### Option 2: Supabase (Free Tier Available)

1. **Go to**: https://supabase.com
2. **Sign up/Login** (free account)
3. **Click "New Project"**
4. **Fill in:**
   - Project Name: `squadhr`
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
5. **Click "Create new project"**
6. **Wait 2-3 minutes** for database to be created
7. **Go to**: Settings → Database
8. **Find "Connection string"** section
9. **Select "URI"** tab
10. **Copy the connection string** - this is your `DATABASE_URL`

**Example Supabase URL:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**Note:** Replace `[YOUR-PASSWORD]` with the password you set when creating the project.

---

### Option 3: Railway (Paid, but Easy)

1. **Go to**: https://railway.app
2. **Sign up/Login**
3. **Click "New Project"**
4. **Click "New" → "Database" → "PostgreSQL"**
5. **Database will be created automatically**
6. **Click on the database**
7. **Go to "Variables" tab**
8. **Find `DATABASE_URL`** - copy this value

**Example Railway URL:**
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

---

### Option 4: Local PostgreSQL (For Development)

If you have PostgreSQL installed locally:

```
postgresql://postgres:yourpassword@localhost:5432/squadhr
```

**To create local database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE squadhr;

# Exit
\q
```

---

## ✅ How to Use Database URL

### In Vercel (Backend Project):

1. **Go to your backend project** in Vercel Dashboard
2. **Settings** → **Environment Variables**
3. **Add new variable:**
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://user:pass@host:5432/dbname`
   - **Paste your entire connection string here**
4. **Click "Save"**
5. **Redeploy** your backend

### In Local Development:

1. **Create/Edit** `backend/.env` file:
   ```env
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```
2. **Save the file**
3. **Restart your backend server**

---

## 🔒 Security Notes

### ⚠️ Important:
- **Never commit** your `DATABASE_URL` to GitHub
- **Never share** your database URL publicly
- **Use environment variables** (not hardcoded in code)
- **Rotate passwords** regularly

### ✅ Safe Practices:
- ✅ Store in `.env` file (already in `.gitignore`)
- ✅ Use Vercel Environment Variables
- ✅ Use strong passwords
- ✅ Enable SSL (`sslmode=require`)

---

## 🧪 Test Your Database URL

### Test Connection Locally:

```bash
# Using psql (if installed)
psql "postgresql://user:pass@host:5432/dbname"

# Or test with Node.js
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => console.log('Connected!')).catch(e => console.error(e));"
```

### Test in Your Backend:

1. **Set `DATABASE_URL` in environment**
2. **Run backend:**
   ```bash
   cd backend
   npm run dev
   ```
3. **Check console** - should see no connection errors
4. **Test API endpoint:**
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## 📝 Quick Checklist

- [ ] Choose database provider (Vercel/Supabase/Railway)
- [ ] Create database
- [ ] Copy connection string
- [ ] Add as `DATABASE_URL` in Vercel environment variables
- [ ] Test connection
- [ ] Run migrations (Prisma will handle this on build)

---

## 🎯 Recommended: Vercel Postgres

**Why Vercel Postgres?**
- ✅ Easiest setup (built into Vercel)
- ✅ Automatic SSL
- ✅ Works seamlessly with Vercel deployments
- ✅ Free tier available
- ✅ No separate account needed

**Steps:**
1. Vercel Dashboard → Storage
2. Create Postgres
3. Copy connection string
4. Add to backend environment variables
5. Done! ✅

---

## ❓ Common Questions

### Q: Do I need to create tables manually?
**A:** No! Prisma will automatically create tables when you deploy. The `prisma generate` command in your build script handles this.

### Q: Can I use the same database for development and production?
**A:** It's better to use separate databases. Use local PostgreSQL for development and a cloud database for production.

### Q: What if I lose my database URL?
**A:** You can usually find it again in your database provider's dashboard under "Connection Settings" or "Connection String".

### Q: Can I change the database later?
**A:** Yes! Just update the `DATABASE_URL` environment variable and redeploy. Make sure to migrate your data first.

---

**Need help?** Check your database provider's documentation or see `BACKEND_CONNECTION_GUIDE.md` for more details.

