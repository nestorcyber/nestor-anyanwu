# Admin CMS (Supabase + Cloudinary)

The site content is managed from **`/admin`** and stored in **Supabase**. Media uploads go to **Cloudinary**.

## Setup

1. Create a Supabase project and a Cloudinary account.
2. Run [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql) in the Supabase SQL Editor.
3. Create an Auth user with email **`neorxpro@gmail.com`** (Authentication → Users → Add user).
4. Copy env vars into `.env` / Vercel from [`.env.example`](.env.example).
5. Seed existing content: `pnpm seed`

## Admin

- URL: `/admin`
- Login: `neorxpro@gmail.com` + the password you set in Supabase Auth
- Manage: Journal, Portfolio, Community, Journey, Gallery, Services, Skills, Certifications, Stats, Site Settings

## Public site

All public pages read from Supabase via [`lib/content`](lib/content/index.ts). Draft journal/portfolio/community items are hidden from the public site.
