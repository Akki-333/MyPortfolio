# Vercel Deployment Guide

To deploy this project on Vercel, follow these steps:

## 1. Environment Variables
Ensure the following environment variables are set in your Vercel project settings:
- `DATABASE_URL`: Your PostgreSQL connection string.
- `SESSION_SECRET`: A random string for session encryption.

## 2. Build Configuration
Vercel should automatically detect the configuration from `vercel.json`. 
- **Build Command**: `npm run build`
- **Output Directory**: `dist` (for the backend) and `dist/public` (for the frontend)

## 3. Database
If you are using Replit's built-in database, you'll need to use an external database provider (like Neon.tech) for Vercel deployment, as Replit's internal database is restricted to the Replit environment.
