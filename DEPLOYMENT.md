# FSBO Platform - Vercel Deployment Guide

## Overview
This guide will help you deploy the FSBO Platform to Vercel with a cloud database.

## Prerequisites
- Vercel account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)
- Cloud database provider account (recommended: Neon, Supabase, or Railway)

## Step 1: Set Up Cloud Database

### Option A: Neon (Recommended - PostgreSQL)
1. Go to [Neon.tech](https://neon.tech) and create a free account
2. Create a new project called "fsbo-platform"
3. Copy the connection string provided
4. Note down these values:
   - DB_HOST
   - DB_PORT (usually 5432)
   - DB_NAME
   - DB_USER
   - DB_PASSWORD

### Option B: Supabase
1. Go to [Supabase.com](https://supabase.com) and create a free account
2. Create a new project called "fsbo-platform"
3. Go to Settings > Database
4. Copy the connection details

### Option C: Railway
1. Go to [Railway.app](https://railway.app) and create an account
2. Create a new project and add PostgreSQL
3. Copy the connection string from the variables tab

## Step 2: Update Frontend Configuration

Create a file `frontend/.env.local` with:
```bash
# Backend API URL for production
NEXT_PUBLIC_API_URL=https://your-project-name.vercel.app

# Image optimization
NEXT_PUBLIC_IMAGES_DOMAIN=images.unsplash.com
```

## Step 3: Prepare for Deployment

### Update Package.json Scripts
Ensure your root `package.json` has these scripts (already configured):
```json
{
  "scripts": {
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build"
  }
}
```

### Update Backend for Production
The backend is already configured for production with:
- Environment variable support
- SSL database connections
- CORS configuration
- Health check endpoint

## Step 4: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **fsbo-platform**
   - Directory: **/** (root)
   - Override settings? **Y**
   - Build Command: **npm run build**
   - Output Directory: **frontend/.next**
   - Install Command: **npm run install:all**

### Method 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: **/** (leave empty for root)
   - Build Command: **npm run build**
   - Install Command: **npm run install:all**

## Step 5: Configure Environment Variables

In Vercel Dashboard > Project > Settings > Environment Variables, add:

### Production Environment Variables
```bash
# Database
DB_HOST=your-neon-host.neon.tech
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password

# Application
NODE_ENV=production
JWT_SECRET=your-super-secure-jwt-secret-here

# Frontend (these need NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_API_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_IMAGES_DOMAIN=images.unsplash.com
```

## Step 6: Set Up Database Schema

1. Connect to your cloud database using a PostgreSQL client
2. Run the database migration scripts from `/database/` folder
3. Import initial data if needed

## Step 7: Test Deployment

1. Wait for deployment to complete
2. Visit your Vercel URL
3. Test the health endpoint: `https://your-project-name.vercel.app/api/health`
4. Verify the frontend loads properly

## Step 8: Configure Custom Domain (Optional)

1. In Vercel Dashboard > Project > Settings > Domains
2. Add your custom domain
3. Configure DNS settings as instructed

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check that all dependencies are in the right package.json files
   - Ensure TypeScript compilation succeeds locally

2. **Database Connection Issues**
   - Verify environment variables are set correctly
   - Check database allows connections from Vercel IPs
   - Ensure SSL is enabled for production

3. **API Routes Not Working**
   - Verify the vercel.json routing configuration
   - Check backend build succeeds

4. **Images Not Loading**
   - Update next.config.js with allowed image domains
   - Check NEXT_PUBLIC_IMAGES_DOMAIN is set

### Performance Optimization

1. **Enable Vercel Analytics**
   ```bash
   npm i @vercel/analytics
   ```

2. **Add Vercel Speed Insights**
   ```bash
   npm i @vercel/speed-insights
   ```

3. **Configure Caching**
   - API responses can be cached using Vercel's edge cache
   - Static assets are automatically optimized

## Environment-Specific Configurations

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Preview (Vercel branch deployments)
```bash
NEXT_PUBLIC_API_URL=https://your-branch-preview.vercel.app
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://your-production-domain.com
```

## Security Considerations

1. **Environment Variables**: Never commit .env files
2. **JWT Secret**: Use a strong, unique secret
3. **Database**: Enable SSL and use strong passwords
4. **CORS**: Configure appropriate origins
5. **Rate Limiting**: Consider adding rate limiting to API routes

## Monitoring and Maintenance

1. **Vercel Functions**: Monitor function execution in dashboard
2. **Database**: Monitor connection usage and performance
3. **Logs**: Check Vercel function logs for errors
4. **Uptime**: Set up monitoring for critical endpoints

## Scaling Considerations

- **Vercel Pro**: For higher limits and better performance
- **Database**: Consider connection pooling for high traffic
- **CDN**: Vercel automatically provides global CDN
- **Caching**: Implement Redis for session storage and caching

---

For additional help, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Neon Documentation](https://neon.tech/docs) 