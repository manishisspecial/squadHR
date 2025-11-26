# 🔧 Setting Up Environment Variables

## 📋 Quick Setup

### Backend `.env` File

1. **Go to**: `backend` folder
2. **Open or create**: `.env` file
3. **Copy the template** (if needed):
   ```bash
   cd backend
   cp .env.template .env
   ```
4. **Add these variables** with your values:

```env
# Database (from Supabase)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-generated-secret-key-here

# JWT Expiration
JWT_EXPIRES_IN=7d

# CORS (frontend URL)
CORS_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=development

# Port
PORT=5000
```

---

### Frontend `.env` File

1. **Go to**: `frontend` folder
2. **Create**: `.env` file
3. **Copy the template** (if needed):
   ```bash
   cd frontend
   cp .env.template .env
   ```
4. **Add this variable**:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

---

## 🔍 Where to Get Values

### DATABASE_URL (Backend)

1. **Supabase Dashboard** → **Settings** → **Database**
2. **Connection string** → **URI tab**
3. **Copy the string**:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. **Replace `[YOUR-PASSWORD]`** with your actual password

**Example:**
```
DATABASE_URL=postgresql://postgres:MyPassword123!@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

### JWT_SECRET (Backend)

**Generate a random secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copy the output** and use it as `JWT_SECRET`

---

### VITE_API_URL (Frontend)

**For Development:**
```
VITE_API_URL=http://localhost:5000/api
```

**For Production (after backend is deployed):**
```
VITE_API_URL=https://squad-hr-backend.vercel.app/api
```

---

## ✅ Checklist

### Backend `.env`:
- [ ] `DATABASE_URL` - From Supabase
- [ ] `JWT_SECRET` - Generated random string
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `CORS_ORIGIN=http://localhost:3000`
- [ ] `NODE_ENV=development`
- [ ] `PORT=5000`

### Frontend `.env`:
- [ ] `VITE_API_URL=http://localhost:5000/api`

---

## 🚫 Remove These (If Present)

If you have these in your `.env`, **remove them** (not needed):
- ❌ `NEXT_PUBLIC_SUPABASE_URL`
- ❌ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These are only for Next.js projects using Supabase SDK. We're using Prisma instead.

---

## 📝 File Locations

```
HR_Solutions/
├── backend/
│   ├── .env              ← Backend environment variables
│   └── .env.template     ← Template (copy this)
├── frontend/
│   ├── .env              ← Frontend environment variables
│   └── .env.template     ← Template (copy this)
```

---

## 🔒 Security

- ✅ `.env` files are in `.gitignore` (won't be committed)
- ✅ Never commit `.env` files to Git
- ✅ Use `.env.template` for examples (safe to commit)
- ✅ Keep passwords secret

---

## 🧪 Test Your Setup

### Test Backend:
```bash
cd backend
npm run dev
```

Should connect to database without errors.

### Test Frontend:
```bash
cd frontend
npm run dev
```

Should connect to backend API.

---

**Need help?** See `SUPABASE_SETUP_GUIDE.md` for getting `DATABASE_URL`.

