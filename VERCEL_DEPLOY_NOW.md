# 🚀 Deploy to Vercel - Your Code is on GitHub!

Your code is now at: **https://github.com/manishisspecial/squadHR**

## Next Step: Deploy to Vercel

### Step 1: Deploy Frontend

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New..." → "Project"**
4. **Import Repository**: Select `squadHR` from the list
5. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Environment Variables** (Click "Environment Variables"):
   ```
   VITE_API_URL = http://localhost:5000/api
   ```
   (We'll update this after backend deploys)
7. **Click "Deploy"**

**After deployment, save your frontend URL!** (e.g., `https://squadhr-frontend.vercel.app`)

---

### Step 2: Set Up Database

**Option A: Vercel Postgres (Recommended)**
1. In Vercel Dashboard → **Storage** tab
2. Click **"Create Database"**
3. Choose **Postgres**
4. Copy the connection string
5. Save it for backend deployment

**Option B: Supabase (Free)**
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database

---

### Step 3: Deploy Backend

1. **In Vercel**, click **"Add New..." → "Project"**
2. **Import same repository**: `squadHR`
3. **Configure**:
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables** (Add all):
   ```
   NODE_ENV = production
   PORT = 5000
   DATABASE_URL = your-database-connection-string-here
   JWT_SECRET = generate-strong-secret-here
   JWT_EXPIRES_IN = 7d
   CORS_ORIGIN = https://your-frontend-url.vercel.app
   ```

   **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
5. **Click "Deploy"**

**After deployment, save your backend URL!** (e.g., `https://squadhr-backend.vercel.app`)

---

### Step 4: Update Frontend with Backend URL

1. Go to **Frontend project** in Vercel
2. **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to: `https://your-backend-url.vercel.app/api`
4. Go to **Deployments** tab
5. Click **"Redeploy"** on the latest deployment

---

### Step 5: Run Database Migrations

**Install Vercel CLI and run migrations:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to backend project
cd backend
vercel link

# Run migrations
npx prisma migrate deploy
```

---

### Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test registration
3. Test login
4. Test all features
5. Check for any errors

---

## ✅ Success Checklist

- [x] Code pushed to GitHub ✅
- [ ] Frontend deployed to Vercel
- [ ] Database set up
- [ ] Backend deployed to Vercel
- [ ] Environment variables configured
- [ ] Frontend URL updated
- [ ] Database migrations run
- [ ] Everything tested

---

## 🎉 You're Almost There!

Your code is on GitHub. Now deploy to Vercel and you'll be live!

**Repository**: https://github.com/manishisspecial/squadHR

---

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify Root Directory is set correctly (`frontend` or `backend`)
- Check for TypeScript errors

### API Not Working
- Verify `VITE_API_URL` matches your backend URL
- Check CORS settings in backend
- Verify backend is deployed

### Database Issues
- Verify `DATABASE_URL` is correct
- Check database is accessible
- Run migrations: `npx prisma migrate deploy`

