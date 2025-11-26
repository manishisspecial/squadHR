# 🚀 Deployment Steps: GitHub → Vercel

## ✅ Step 1: Push to GitHub (Do This First)

### 1.1 Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `squadhr`
3. Description: "Complete HR Solution Application - SquadHR"
4. Choose **Public** or **Private**
5. **DO NOT** check any initialization options
6. Click **"Create repository"**

### 1.2 Connect and Push

Run these commands in your project root:

```bash
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/squadhr.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If authentication fails:**
- Use GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
- Or use GitHub Desktop
- Or set up SSH keys

---

## ✅ Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account

1. Go to: https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### 2.2 Deploy Frontend

1. Click **"Add New..."** → **"Project"**
2. Import repository: Select `squadhr`
3. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` ⚠️ Important!
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Environment Variables** (click "Environment Variables"):
   ```
   VITE_API_URL = http://localhost:5000/api
   ```
   (We'll update this after backend deploys)
5. Click **"Deploy"**

### 2.3 Note Your Frontend URL

After deployment, you'll get a URL like:
`https://squadhr-frontend.vercel.app`

**Save this URL!** You'll need it for backend CORS configuration.

---

## ✅ Step 3: Set Up Database

### Option A: Vercel Postgres (Easiest)

1. In Vercel dashboard → **Storage** tab
2. Click **"Create Database"**
3. Choose **Postgres**
4. Copy the connection string
5. Save it - you'll need it for backend

### Option B: Supabase (Free Tier)

1. Go to: https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Save it

### Option C: Railway (Free Tier)

1. Go to: https://railway.app
2. Create new project
3. Add PostgreSQL service
4. Copy connection string

---

## ✅ Step 4: Deploy Backend to Vercel

### 4.1 Create Backend Project

1. In Vercel, click **"Add New..."** → **"Project"**
2. Import the **same repository**: `squadhr`
3. **Configure Project**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `backend` ⚠️ Important!
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`

### 4.2 Add Environment Variables

Click **"Environment Variables"** and add:

```
NODE_ENV = production
PORT = 5000
DATABASE_URL = your-database-connection-string
JWT_SECRET = generate-strong-secret-here
JWT_EXPIRES_IN = 7d
CORS_ORIGIN = https://your-frontend-url.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4.3 Deploy

Click **"Deploy"** and wait for build.

### 4.4 Note Your Backend URL

After deployment, you'll get a URL like:
`https://squadhr-backend.vercel.app`

**Save this URL!**

---

## ✅ Step 5: Update Frontend with Backend URL

1. Go to Frontend project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to: `https://your-backend-url.vercel.app/api`
4. Go to **Deployments** tab
5. Click **"Redeploy"** on latest deployment

---

## ✅ Step 6: Run Database Migrations

### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
cd backend
vercel link

# Run migrations
npx prisma migrate deploy
```

### Option B: Via Vercel Function (One-time)

Create a temporary migration endpoint, call it once, then remove it.

---

## ✅ Step 7: Test Everything

1. Visit your frontend URL
2. Test registration
3. Test login
4. Test all features
5. Check browser console for errors
6. Check Vercel function logs

---

## 🎯 Quick Command Reference

```bash
# Git Commands
git remote add origin https://github.com/YOUR_USERNAME/squadhr.git
git branch -M main
git push -u origin main

# Vercel CLI (if needed)
npm i -g vercel
vercel login
vercel link
vercel --prod
```

---

## 📝 Important Notes

1. **Two Separate Projects**: Frontend and Backend are separate Vercel projects
2. **Environment Variables**: Must be set in each project
3. **Database**: Set up before deploying backend
4. **CORS**: Must match your frontend URL exactly
5. **Migrations**: Must run after database is set up

---

## 🆘 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all dependencies
- Check for TypeScript errors

### API Not Working
- Verify `VITE_API_URL` is correct
- Check CORS settings
- Verify backend is deployed

### Database Issues
- Verify `DATABASE_URL` is correct
- Check database is accessible
- Run migrations

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Database set up
- [ ] Backend deployed to Vercel
- [ ] Environment variables configured
- [ ] Frontend URL updated
- [ ] Database migrations run
- [ ] Everything tested and working

🎉 **You're live!**

