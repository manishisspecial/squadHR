# ✅ Next Steps After Database Setup

## 🎉 You've Set Up DATABASE_URL!

Now let's verify everything works and prepare for deployment.

---

## 🧪 Step 1: Test Database Connection Locally

### Test Backend Connection:

```bash
# Navigate to backend
cd backend

# Install dependencies (if not done)
npm install

# Generate Prisma Client
npx prisma generate

# Test database connection
npm run dev
```

**What to check:**
- ✅ No connection errors in console
- ✅ Server starts on port 5000
- ✅ No Prisma errors

**If you see errors:**
- Check `DATABASE_URL` format in `.env`
- Verify password is correct
- Make sure database is accessible

---

## 📊 Step 2: Run Database Migrations

Create tables in your database:

```bash
cd backend

# Push schema to database (creates tables)
npx prisma db push

# Or use migrations (recommended for production)
npx prisma migrate dev --name init
```

**What this does:**
- Creates all tables (User, Employee, Leave, Attendance, etc.)
- Sets up relationships
- Prepares database for use

**Verify tables created:**
1. Go to **Supabase Dashboard** → **Table Editor**
2. You should see tables like:
   - `User`
   - `Employee`
   - `Leave`
   - `Attendance`
   - `Payroll`
   - etc.

---

## 🌱 Step 3: Seed Test Users (Optional)

Add test users to database:

```bash
cd backend

# Run seed script
npm run seed
```

**This creates:**
- Admin user: `admin@squadhr.com` / `Admin@123`
- HR user: `hr@squadhr.com` / `HR@123`
- Employee user: `employee@squadhr.com` / `Employee@123`

---

## 🚀 Step 4: Deploy Backend to Vercel

### 4.1 Create Backend Project in Vercel

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "Add New..." → "Project"
3. **Import**: `squadHR` repository
4. **Configure**:
   - **Project Name**: `squad-hr-backend`
   - **Root Directory**: `backend`
   - **Framework**: `Other`
   - **Build Command**: `npm run vercel-build`
   - **Install Command**: `npm install`
   - **Output Directory**: Leave empty

### 4.2 Add Environment Variables in Vercel

**In Vercel project settings**, add these:

```env
# Database (from Supabase)
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://squad-hr.vercel.app

# Environment
NODE_ENV=production
```

**Important:**
- Use the **same** `DATABASE_URL` from your local `.env`
- Generate a new `JWT_SECRET` or use the same one
- Update `CORS_ORIGIN` to your frontend URL

### 4.3 Deploy

1. **Click "Deploy"**
2. **Wait for build** to complete
3. **Copy backend URL**: `https://squad-hr-backend.vercel.app`

---

## 🔗 Step 5: Update Frontend

### 5.1 Update Frontend Environment Variable

1. **Vercel Dashboard** → Select `squad-hr` (frontend) project
2. **Settings** → **Environment Variables**
3. **Add/Update**:
   ```
   VITE_API_URL=https://squad-hr-backend.vercel.app/api
   ```
4. **Redeploy** frontend

### 5.2 Or Update Local Frontend `.env`

Create/update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, use your deployed backend URL.

---

## ✅ Step 6: Verify Everything Works

### Test Backend:

1. **Health Check**:
   ```
   https://squad-hr-backend.vercel.app/api/health
   ```
   Should return: `{"status":"ok","message":"SquadHR API is running"}`

2. **Test Login** (from frontend):
   - Visit: https://squad-hr.vercel.app
   - Try to login with test credentials
   - Check browser console for API calls

### Test Frontend:

1. **Visit**: https://squad-hr.vercel.app
2. **Open DevTools** (F12) → Network tab
3. **Try to login**
4. **Check**:
   - ✅ API calls go to your backend URL
   - ✅ No CORS errors
   - ✅ Login works

---

## 📋 Checklist

### Local Development:
- [ ] Backend `.env` has `DATABASE_URL`
- [ ] Backend connects to database
- [ ] Database migrations run successfully
- [ ] Tables created in Supabase
- [ ] Test users seeded (optional)
- [ ] Backend runs on `http://localhost:5000`
- [ ] Frontend `.env` has `VITE_API_URL`
- [ ] Frontend connects to backend

### Production (Vercel):
- [ ] Backend deployed to Vercel
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
- [ ] Login works from frontend

---

## 🐛 Troubleshooting

### Database Connection Failed

**Error**: `P1000: Authentication failed`

**Fix**:
- Check `DATABASE_URL` format
- Verify password is correct
- Make sure no special characters need URL encoding

### Tables Not Created

**Fix**:
```bash
cd backend
npx prisma db push
```

### CORS Errors

**Error**: `Access to fetch blocked by CORS`

**Fix**:
- Check `CORS_ORIGIN` in backend env vars
- Make sure it matches frontend URL exactly
- Include `https://` protocol

### Frontend Can't Connect

**Error**: `404` or `Network Error`

**Fix**:
- Verify `VITE_API_URL` is correct
- Must end with `/api`
- Check backend is deployed and running
- Verify backend health endpoint works

---

## 🎯 What's Next?

After everything is working:

1. ✅ **Test all features**:
   - Login/Register
   - Dashboard
   - Employee management
   - Leave requests
   - Attendance tracking
   - Payroll

2. ✅ **Add more users** (via seed or manually)

3. ✅ **Customize**:
   - Company name
   - Colors/branding
   - Features

4. ✅ **Monitor**:
   - Check Vercel logs
   - Monitor Supabase usage
   - Set up error tracking (optional)

---

## 📚 Reference

- **Backend Setup**: `BACKEND_CONNECTION_GUIDE.md`
- **Supabase Setup**: `SUPABASE_SETUP_GUIDE.md`
- **Environment Variables**: `SETUP_ENV_FILES.md`
- **Database URL**: `GET_DATABASE_URL_FROM_SUPABASE.md`

---

**Congratulations!** 🎉 Your database is connected. Now deploy and test!

