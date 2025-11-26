# Deployment Guide - SquadHR

## Pre-Deployment Checklist

### 1. Environment Setup

#### Backend Environment Variables
Create `backend/.env` with production values:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/squadhr_prod?schema=public
JWT_SECRET=<generate-strong-secret-min-32-chars>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-app-password
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Frontend Environment Variables
Create `frontend/.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_ENVIRONMENT=production
```

### 2. Database Setup

```bash
# 1. Create production database
# 2. Update DATABASE_URL in .env
# 3. Run migrations
cd backend
npm run prisma:generate
npx prisma migrate deploy
```

### 3. Build for Production

#### Backend
```bash
cd backend
npm install --production
npm run build
```

#### Frontend
```bash
cd frontend
npm install
npm run build
# Output will be in frontend/dist/
```

## Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Deploy: `vercel --prod`
4. Configure environment variables in Vercel dashboard

#### Backend Deployment (Vercel)
1. Create `vercel.json` in backend:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/index.js"
    }
  ]
}
```
2. Deploy: `vercel --prod`

### Option 2: Railway

1. Connect GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy automatically on push

### Option 3: DigitalOcean App Platform

1. Create new app
2. Connect repository
3. Add PostgreSQL database
4. Configure build commands:
   - Backend: `npm install && npm run build && npm start`
   - Frontend: `npm install && npm run build`
5. Set environment variables

### Option 4: Docker Deployment

#### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

#### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: squadhr
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:${DB_PASSWORD}@postgres:5432/squadhr
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Post-Deployment

### 1. Verify Deployment
- [ ] Test API endpoints
- [ ] Test frontend functionality
- [ ] Check database connection
- [ ] Verify authentication flow

### 2. Set Up Monitoring
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

### 3. SSL/HTTPS
- [ ] Obtain SSL certificate (Let's Encrypt)
- [ ] Configure HTTPS redirect
- [ ] Update CORS_ORIGIN to HTTPS URLs

### 4. Backup Strategy
- [ ] Set up automated database backups
- [ ] Test restore process
- [ ] Document backup procedures

## Maintenance

### Regular Tasks
- Monitor error logs
- Review performance metrics
- Update dependencies
- Backup database
- Review security logs

### Updates
1. Test in staging environment
2. Run database migrations
3. Deploy backend
4. Deploy frontend
5. Verify functionality
6. Monitor for errors

