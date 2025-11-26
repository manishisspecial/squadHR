# ✅ Testing Your Deployed Backend on Vercel

## 🎯 Understanding the "Cannot GET /" Error

**This is NORMAL!** ✅

Your backend is an **API server**, not a website. It doesn't serve HTML pages at the root URL (`/`).

Instead, it serves API endpoints like:
- `/api/health`
- `/api/auth/login`
- `/api/employees`
- etc.

---

## 🧪 Test Your Backend

### 1. Test Health Endpoint

Visit in your browser:
```
https://squad-hr-backend.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "SquadHR API is running"
}
```

✅ **If you see this**, your backend is working correctly!

---

### 2. Test Other Endpoints

**Login Endpoint:**
```
https://squad-hr-backend.vercel.app/api/auth/login
```
(Will return an error without credentials, but confirms endpoint exists)

**All API endpoints start with `/api/`**

---

## 🔍 Verify Backend Configuration

### Check Vercel Deployment:

1. **Go to**: Vercel Dashboard → Your `squad-hr-backend` project
2. **Check**:
   - ✅ Build completed successfully
   - ✅ No errors in build logs
   - ✅ Environment variables are set

### Check Environment Variables:

Make sure these are set in Vercel:
- `DATABASE_URL` - Your Supabase connection string
- `JWT_SECRET` - Your JWT secret key
- `JWT_EXPIRES_IN=7d`
- `CORS_ORIGIN=https://squad-hr.vercel.app`
- `NODE_ENV=production`

---

## 🔗 Next Step: Connect Frontend

Now that your backend is deployed, update your frontend:

### 1. Update Frontend Environment Variable

1. **Vercel Dashboard** → Select `squad-hr` (frontend) project
2. **Settings** → **Environment Variables**
3. **Add/Update**:
   ```
   VITE_API_URL=https://squad-hr-backend.vercel.app/api
   ```
4. **Save**

### 2. Redeploy Frontend

1. **Deployments** tab
2. **Redeploy** latest deployment
3. **Wait for build** to complete

### 3. Test Full Stack

1. **Visit**: https://squad-hr.vercel.app
2. **Try to login**
3. **Check browser console** (F12) → Network tab
4. **Verify** API calls go to: `https://squad-hr-backend.vercel.app/api`

---

## ✅ Success Checklist

- [ ] Backend deployed to Vercel
- [ ] Health endpoint works: `/api/health`
- [ ] Environment variables set in Vercel
- [ ] Frontend `VITE_API_URL` updated
- [ ] Frontend redeployed
- [ ] Full stack connection works

---

## 🐛 Troubleshooting

### Health Endpoint Not Working?

**Check:**
1. Build logs in Vercel for errors
2. Environment variables are set correctly
3. `DATABASE_URL` is correct
4. Backend routes are configured properly

### CORS Errors?

**Fix:**
- Update `CORS_ORIGIN` in backend env vars
- Must match frontend URL exactly: `https://squad-hr.vercel.app`
- Include `https://` protocol

### Database Connection Errors?

**Check:**
- `DATABASE_URL` is correct
- Supabase database is accessible
- Connection string format is correct

---

## 🎉 You're Almost Done!

Once the health endpoint works, you're ready to:
1. ✅ Update frontend to use backend URL
2. ✅ Test login from frontend
3. ✅ Verify full stack works

**Your backend is deployed!** Now connect the frontend. 🚀

