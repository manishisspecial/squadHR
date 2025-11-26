# Vercel Deployment Guide - SquadHR

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ GitHub account connected to Vercel
- ✅ Vercel account (free tier works)

## Deployment Strategy

We'll deploy **Frontend** and **Backend** separately for better control:

### Option 1: Deploy Frontend Only (Recommended for Start)

Deploy frontend to Vercel, backend separately (Railway, Render, etc.)

### Option 2: Deploy Both (Advanced)

Deploy frontend and backend as separate Vercel projects

---

## Method 1: Deploy Frontend to Vercel

### Step 1: Import Project

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select the repository: `squadhr`

### Step 2: Configure Frontend Project

**Project Settings:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Environment Variables

Add these in Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_ENVIRONMENT=production
```

### Step 4: Deploy

Click **"Deploy"** and wait for build to complete.

---

## Method 2: Deploy Backend to Vercel

### Step 1: Create Backend Project

1. In Vercel, click **"Add New..."** → **"Project"**
2. Import the same repository
3. This time, configure for backend

### Step 2: Configure Backend Project

**Project Settings:**
- **Framework Preset**: Other
- **Root Directory**: `backend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Start Command**: `npm start`

### Step 3: Environment Variables

Add these in Vercel dashboard:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=your-production-database-url
JWT_SECRET=your-strong-jwt-secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Step 4: Deploy

Click **"Deploy"** and wait for build.

---

## Method 3: Deploy Both with Monorepo (Recommended)

### Step 1: Deploy Frontend

1. Import repository to Vercel
2. Configure:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

3. Add environment variable:
   ```
   VITE_API_URL=https://squadhr-backend.vercel.app/api
   ```

### Step 2: Deploy Backend

1. Create new project in Vercel
2. Import same repository
3. Configure:
   - Root Directory: `backend`
   - Framework: Other
   - Build: `npm run build`
   - Output: `dist`
   - Start: `npm start`

4. Add environment variables (see Method 2, Step 3)

### Step 3: Update Frontend URL

After backend deploys, update frontend's `VITE_API_URL` to backend's Vercel URL.

---

## Post-Deployment

### 1. Update CORS

In backend environment variables, set:
```
CORS_ORIGIN=https://your-frontend.vercel.app
```

### 2. Database Setup

**Option A: Use Vercel Postgres (Recommended)**
1. In Vercel dashboard → Storage → Create Database
2. Choose Postgres
3. Copy connection string to `DATABASE_URL`

**Option B: External Database**
- Use Supabase, Railway, or other PostgreSQL provider
- Add connection string to `DATABASE_URL`

### 3. Run Database Migrations

After deployment, you need to run migrations. Options:

**Option A: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel link
cd backend
npx prisma migrate deploy
```

**Option B: Via Vercel Function**
Create a migration endpoint (one-time use)

### 4. Test Deployment

1. Visit your frontend URL
2. Test login/register
3. Check API endpoints
4. Verify database connection

---

## Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic

---

## Troubleshooting

### Build Fails

- Check build logs in Vercel
- Verify all dependencies in package.json
- Check for TypeScript errors

### API Not Working

- Verify `VITE_API_URL` is correct
- Check CORS settings
- Verify backend is deployed and running

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check database is accessible
- Verify migrations have run

---

## Quick Deploy Commands

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod

# Deploy backend
cd ../backend
vercel --prod
```

---

## Recommended Setup

1. **Frontend**: Deploy to Vercel (automatic HTTPS, CDN, fast)
2. **Backend**: Deploy to Vercel or Railway
3. **Database**: Use Vercel Postgres or Supabase (free tier available)

This gives you:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy deployments
- ✅ Free tier available
- ✅ Automatic scaling

