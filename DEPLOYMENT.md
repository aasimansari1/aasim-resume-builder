# Aasim Resume Builder - Deployment Guide

## Project Structure

```
aasim-resume-builder/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # Backend API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   │   ├── [...nextauth]/route.ts
│   │   │   │   └── signup/route.ts
│   │   │   ├── resume/         # Resume CRUD
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── upload/route.ts # File upload
│   │   │   └── admin/route.ts  # Admin analytics
│   │   ├── auth/               # Auth pages (login/signup)
│   │   ├── builder/            # Resume builder page
│   │   ├── dashboard/          # User dashboard
│   │   ├── pricing/            # Pricing page
│   │   ├── upload/             # Upload resume page
│   │   ├── admin/              # Admin panel
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── landing/            # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Templates.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── shared/             # Shared components
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── Providers.tsx
│   ├── lib/                    # Utilities
│   │   ├── auth.ts             # NextAuth config
│   │   ├── mongodb.ts          # Database connection
│   │   ├── templates.ts        # Template definitions
│   │   └── atsScorer.ts        # ATS scoring logic
│   ├── models/                 # Mongoose models
│   │   ├── User.ts
│   │   └── Resume.ts
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Database Schema

### User Collection
| Field     | Type   | Description          |
|-----------|--------|----------------------|
| name      | String | User's full name     |
| email     | String | Unique email         |
| password  | String | Hashed (bcrypt)      |
| image     | String | Profile image URL    |
| plan      | Enum   | "free" or "pro"      |
| role      | Enum   | "user" or "admin"    |
| provider  | String | "credentials"/"google"|

### Resume Collection
| Field        | Type     | Description              |
|--------------|----------|--------------------------|
| userId       | ObjectId | Reference to User        |
| title        | String   | Resume title             |
| template     | String   | Template ID              |
| personalInfo | Object   | Name, email, phone, etc. |
| summary      | String   | Professional summary     |
| experience   | Array    | Work experience entries  |
| education    | Array    | Education entries        |
| skills       | Array    | Skill strings            |
| projects     | Array    | Project entries          |
| certifications| Array   | Certification entries    |
| atsScore     | Number   | ATS compatibility score  |

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```bash
cp .env.example .env.local
```

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `NEXTAUTH_SECRET` - Random secret (run `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### 3. MongoDB Setup
1. Create a free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a database user
3. Whitelist your IP (or 0.0.0.0/0 for all)
4. Copy the connection string to `MONGODB_URI`

### 4. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Set authorized redirect URI: `https://technobites.tech/api/auth/callback/google`
6. Copy Client ID and Secret to env vars

### 5. Run Development Server
```bash
npm run dev
```
Open http://localhost:3000

### 6. Build for Production
```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Custom Domain (technobites.tech)
1. In Vercel dashboard, go to project Settings > Domains
2. Add `technobites.tech`
3. Update DNS records as instructed by Vercel
4. Update `NEXTAUTH_URL` to `https://technobites.tech`

## API Endpoints

| Method | Endpoint              | Description          | Auth |
|--------|-----------------------|----------------------|------|
| POST   | /api/auth/signup      | Register new user    | No   |
| *      | /api/auth/[...nextauth]| NextAuth handlers   | No   |
| GET    | /api/resume           | List user's resumes  | Yes  |
| POST   | /api/resume           | Create new resume    | Yes  |
| GET    | /api/resume/[id]      | Get single resume    | Yes  |
| PUT    | /api/resume/[id]      | Update resume        | Yes  |
| DELETE | /api/resume/[id]      | Delete resume        | Yes  |
| POST   | /api/upload           | Upload PDF/DOCX      | Yes  |
| GET    | /api/admin            | Admin analytics      | Admin|

## Tech Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 3, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose
- **PDF Export**: html2canvas + jsPDF
- **Auth**: NextAuth (Google OAuth + Credentials)
- **Deployment**: Vercel
