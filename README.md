# Personal Portfolio - Imtius Ahmad

A modern, responsive portfolio website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL** (via Prisma ORM).

## Features

- Fully responsive design (mobile, tablet, desktop)
- Hero section with typing animation
- Skills section with card icons
- Projects with detail pages
- Resume page with PDF download (print to PDF)
- Contact form
- Admin dashboard for content management
- Works without database (mock data fallback)

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL + Prisma ORM
- **Hosting:** Vercel (free tier)

---

## Quick Start (No Database)

The portfolio works **without a database** using mock data. Just run:

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# Go to http://localhost:3000
```

That's it! The portfolio loads with all your data from mock files.

---

## Full Setup with Database (Optional)

If you want the admin dashboard to save changes, set up a database.

### Step 1: Create a Free PostgreSQL Database (Supabase)

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for free
3. Click **"New Project"**
4. Fill in:
   - **Project Name:** `my-portfolio`
   - **Database Password:** (choose any password, save it somewhere)
   - **Region:** Choose closest to you
5. Click **"Create new project"** and wait 1-2 minutes
6. Go to **Settings** (gear icon) → **Database**
7. Copy the **Connection string** → **URI**
8. It looks like: `postgresql://postgres.xxxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`

### Step 2: Update Your .env File

Open the `.env` file in your project folder and replace the DATABASE_URL:

```env
DATABASE_URL="paste-your-supabase-connection-string-here"
```

**Important:** Add `?pgbouncer=true` at the end if using Supabase:

```env
DATABASE_URL="postgresql://postgres.xxxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Step 3: Set Up the Database

```bash
# Push your schema to the database
npx prisma db push

# Fill the database with your data
npx prisma db seed
```

### Step 4: Restart the Server

```bash
npm run dev
```

Now the dashboard at `http://localhost:3000/dashboard` will work!

---

## How to Edit Your Content

### Option 1: Edit the Mock Data File (Easy - No Database Needed)

Open `src/lib/mockData.ts` and change your info:

```typescript
export const mockProfile: ProfileData = {
  name: "Your Name",
  designation: "Your Title",
  email: "your@email.com",
  // ... edit anything
};
```

### Option 2: Use the Dashboard (Requires Database)

1. Go to `http://localhost:3000/dashboard`
2. Click on the section you want to edit
3. Add, edit, or delete items

---

## How to Add Your Profile Photo

1. Put your photo at: `public/images/profile.jpg`
2. That's it! The site will show your photo.

---

## Project Structure

```
portfolio/
├── public/
│   └── images/
│       └── profile.jpg      ← Your photo goes here
├── prisma/
│   ├── schema.prisma        ← Database schema
│   └── seed.ts              ← Sample data for database
├── src/
│   ├── app/
│   │   ├── page.tsx          ← Main portfolio page
│   │   ├── resume/page.tsx   ← Resume page
│   │   ├── projects/
│   │   │   ├── page.tsx      ← All projects
│   │   │   └── [id]/page.tsx ← Project detail
│   │   ├── dashboard/        ← Admin dashboard
│   │   └── api/              ← Backend API routes
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   └── lib/
│       ├── mockData.ts       ← Your portfolio data (edit this!)
│       ├── types.ts          ← TypeScript types
│       └── prisma.ts         ← Database connection
├── .env                      ← Environment variables
├── package.json
└── next.config.ts
```

---

## Deploy to Vercel (Free)

### Option A: Deploy from GitHub (Recommended)

1. **Create a GitHub account** at [https://github.com](https://github.com) (if you don't have one)

2. **Install Git** on your computer:
   - Windows: Download from [https://git-scm.com](https://git-scm.com)
   - Mac: Run `brew install git` or install Xcode Command Line Tools
   - Linux: `sudo apt install git`

3. **Upload your project to GitHub:**

```bash
# Go to your project folder
cd portfolio

# Initialize git
git init
git add .
git commit -m "first commit"

# Create a repository on GitHub (do this on github.com first)
# Then run:
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

4. **Deploy on Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click **"Add New Project"**
   - Select your `portfolio` repository
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Done! Your site is live at `https://your-project.vercel.app`

### Option B: Deploy with Vercel CLI

```bash
# Install Vercel
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema
npx prisma db push

# Seed database with sample data
npx prisma db seed

# Open Prisma Studio (visual database editor)
npx prisma studio
```

---

## Troubleshooting

### "Module not found" error
```bash
npm install
```

### Database connection error
- Make sure your `.env` file has the correct `DATABASE_URL`
- Make sure you ran `npx prisma db push`

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Dashboard shows "Database Not Connected"
- This is normal without a database
- The portfolio still works with mock data
- To fix: set up PostgreSQL (see "Full Setup" above)

---

## Need Help?

- Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)
- Prisma docs: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- Vercel docs: [https://vercel.com/docs](https://vercel.com/docs)
