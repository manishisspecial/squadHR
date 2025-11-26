# GitHub Setup Guide - SquadHR

## Step 1: Initialize Git Repository

If you haven't already initialized git, run:

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: SquadHR - Complete HR Solution"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right
3. Select "New repository"
4. Repository name: `squadhr` (or your preferred name)
5. Description: "Complete HR Solution Application - SquadHR"
6. Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 5: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/squadhr.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify

1. Go to your GitHub repository
2. Verify all files are uploaded
3. Check that .gitignore is working (no .env files, node_modules, etc.)

## Important: Add Environment Variables to GitHub Secrets

For CI/CD (if using GitHub Actions):

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `DATABASE_URL` - Your production database URL
   - `JWT_SECRET` - Your JWT secret
   - `VITE_API_URL` - Your API URL

## Next Steps

After pushing to GitHub, proceed to Vercel deployment (see VERCEL_DEPLOYMENT.md)

