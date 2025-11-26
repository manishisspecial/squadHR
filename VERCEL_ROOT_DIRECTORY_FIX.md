# Fix: Root Directory Not Editable in Vercel

## Problem
Root Directory field is disabled/not editable in Vercel settings.

## Solution: Recreate Project with Correct Root Directory

### Step 1: Delete Current Project (Optional)
1. Go to Vercel Dashboard
2. Select your `squad-hr` project
3. Go to **Settings** → **General**
4. Scroll to bottom → **Delete Project**
5. Confirm deletion

### Step 2: Create New Project with Correct Settings

1. **Go to Vercel Dashboard**
2. **Click "Add New..." → "Project"**
3. **Import Repository**: Select `squadHR` from GitHub
4. **IMPORTANT: Configure BEFORE Deploying**

   **In the configuration screen, set:**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` ⚠️ **SET THIS NOW!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables** (Click "Environment Variables"):
   ```
   VITE_API_URL = http://localhost:5000/api
   ```
   (We'll update this after backend deploys)

6. **Click "Deploy"**

## Alternative: Use Vercel CLI

If web UI doesn't work, use CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Set root directory
vercel --cwd frontend

# Deploy
vercel --prod
```

## Why This Happens

- Root Directory can only be set during project creation
- Or it's locked if project was auto-detected
- General settings might not allow editing if project is already deployed

## After Recreation

Your site should work at: `squad-hr.vercel.app`

---

**Note**: If you have a custom domain, you'll need to reconnect it after recreating the project.

