# Supabase CMS Setup Guide

## Step 1: Create Database Table

1. Open your Supabase Dashboard: [https://supabase.com/dashboard/project/ngtqirwawuocqmgbtirk](https://supabase.com/dashboard/project/ngtqirwawuocqmgbtirk)
2. Go to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `supabase-setup.sql` file
5. Click **Run** to execute the SQL

This will create:
- `portfolio_data` table to store all your content (projects, certifications, text, etc.)
- Public read policies so visitors can see your portfolio
- Public write policies so admin mode can save changes

## Step 2: Create Storage Bucket for Images

1. In your Supabase Dashboard, go to **Storage** (in the left sidebar)
2. Click **New bucket**
3. Name it: `portfolio-uploads`
4. Set it to **Public bucket** (toggle on)
5. Click **Create bucket**

This bucket will store all uploaded project photos and certification images.

## Step 3: Configure Vercel Environment Variables

1. Go to your Vercel Dashboard: [https://vercel.com](https://vercel.com)
2. Select your `portfolio` project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

```
VITE_SUPABASE_URL=https://ngtqirwawuocqmgbtirk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndHFpcndhd3VvY3FtZ2J0aXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxMTc3NjIsImV4cCI6MjEwNzY5Mzc2Mn0.c4n3AUOXMnCNyfV-ZFOTEcpol75t3NEjLkSOmKdixJ0
VITE_ADMIN_EMAIL=glenrykian@gmail.com
```

5. Save and **Redeploy** your project

## Step 4: Test Your CMS

1. Visit your deployed Vercel website
2. Click the logo 5 times to open Admin Login
3. Log in with your admin credentials
4. Make changes (upload photos, edit text)
5. Click **Publish to Customers**
6. Open your website link in a different browser/incognito/device
7. Verify the changes appear instantly!

## How It Works

- **Admin Mode**: When you upload photos or edit text, changes are saved to Supabase database and storage
- **Customer View**: When anyone visits your public link, they fetch the latest data from Supabase
- **Real-time Updates**: No code deployment needed for content changes
- **Cache Busting**: Images include `?v=timestamp` to prevent browser caching issues

## Troubleshooting

If changes don't appear:
1. Verify the SQL table was created successfully
2. Verify the storage bucket exists and is public
3. Verify Vercel environment variables are set correctly
4. Check browser console for any errors
5. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

Your portfolio is now a fully dynamic CMS! 🎉
