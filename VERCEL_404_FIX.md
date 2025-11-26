# Fixing 404 Error on Vercel

## Common Causes & Solutions

### 1. Check Vercel Project Settings

In your Vercel project dashboard, verify:

**Root Directory**: Must be `frontend` (not `./` or empty)
**Framework Preset**: `Vite` (or auto-detected)
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 2. Check Build Logs

1. Go to Vercel Dashboard → Your Project
2. Click on **Deployments** tab
3. Click on the latest deployment
4. Check **Build Logs** for errors

Common issues:
- Build failing
- TypeScript errors
- Missing dependencies
- Output directory not found

### 3. Verify Build Output

The build should create a `dist` folder with:
- `index.html`
- `assets/` folder with JS and CSS files

### 4. Redeploy

After fixing settings:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Or push a new commit to trigger auto-deploy

### 5. Check vercel.json

The `frontend/vercel.json` should have:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes serve `index.html` for React Router.

## Quick Fix Steps

1. **Verify Root Directory** in Vercel settings = `frontend`
2. **Check Build Logs** for errors
3. **Redeploy** the project
4. **Wait 2-3 minutes** for build to complete
5. **Refresh** your site

## If Still Not Working

Share:
- Build logs from Vercel
- Project settings screenshot
- Any error messages

