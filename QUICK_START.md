# Quick Start: Push to GitHub & Deploy to Vercel

## 🚀 Step-by-Step Guide

### Part 1: Push to GitHub

#### 1. Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: SquadHR - Complete HR Solution"
```

#### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `squadhr` (or your choice)
3. Description: "Complete HR Solution Application"
4. Choose **Public** or **Private**
5. **DO NOT** check any boxes (no README, .gitignore, license)
6. Click **"Create repository"**

#### 3. Connect and Push

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/squadhr.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication error:**
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop app
- Or use SSH keys

---

### Part 2: Deploy to Vercel

#### Option A: Deploy Frontend First (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "Add New..." → "Project"**
4. **Import your repository**: Select `squadhr`
5. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `http://localhost:5000/api` (we'll update this later)
7. **Click "Deploy"**

#### Option B: Deploy Backend to Vercel

1. **Create New Project** in Vercel
2. **Import same repository**: `squadhr`
3. **Configure**:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=your-database-url
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
5. **Click "Deploy"**

#### After Backend Deploys:

1. Copy backend URL (e.g., `https://squadhr-backend.vercel.app`)
2. Go to Frontend project settings
3. Update `VITE_API_URL` to: `https://squadhr-backend.vercel.app/api`
4. Redeploy frontend

---

## 📋 Quick Checklist

### Before Pushing to GitHub
- [x] Git initialized
- [x] .gitignore configured
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Remote added

### Before Deploying to Vercel
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Database set up (Vercel Postgres or external)
- [ ] Environment variables ready

### After Deployment
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] Test login/register
- [ ] Test all features

---

## 🔧 Common Issues

### Git Push Fails
- Check if you're authenticated
- Use Personal Access Token
- Or use GitHub Desktop

### Vercel Build Fails
- Check build logs
- Verify all dependencies
- Check for TypeScript errors

### Database Connection
- Verify DATABASE_URL is correct
- Check database is accessible
- Run migrations: `npx prisma migrate deploy`

---

## 🎯 Recommended Deployment Order

1. **Push to GitHub** ✅
2. **Set up Database** (Vercel Postgres or Supabase)
3. **Deploy Backend** to Vercel
4. **Deploy Frontend** to Vercel
5. **Update Frontend** with backend URL
6. **Run Migrations**
7. **Test Everything**

---

## Need Help?

- See `GITHUB_SETUP.md` for detailed GitHub setup
- See `VERCEL_DEPLOYMENT.md` for detailed Vercel deployment
- Check Vercel documentation: https://vercel.com/docs

