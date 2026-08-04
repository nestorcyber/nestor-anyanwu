# Keystatic CMS Production Integration Documentation

This document explains the architecture, setup, workflow, and deployment procedures for the **Keystatic CMS** integrated into Nestor Anyanwu's portfolio (`nestor.name.ng`).

---

## 🎯 Architecture Overview

Keystatic is a free, Git-based Content Management System (CMS). Content is authored in MDX/JSON and saved directly to the GitHub repository (`nestorcyber/nestor-anyanwu`).

- **Admin URL**: `/keystatic` (e.g. `https://nestor.name.ng/keystatic`)
- **API Endpoint**: `/api/keystatic`
- **Config File**: [`keystatic.config.ts`](file:///c:/Users/PC/Documents/antigravity/nestor-anyanwu/keystatic.config.ts)
- **Reader Helper**: [`lib/keystatic.ts`](file:///c:/Users/PC/Documents/antigravity/nestor-anyanwu/lib/keystatic.ts)
- **Content Directories**:
  - `content/journal/` — MDX journal articles
  - `content/portfolio/` — MDX portfolio project case studies
  - `content/community/` — MDX community & leadership entries
  - `content/settings/site.json` — Singleton site settings (Hero, Contact, Socials, Analytics)
- **Media Storage**:
  - `public/images/journal/`
  - `public/images/portfolio/`
  - `public/images/community/`

---

## 🔐 Environment Variables & Production Setup

### Local Development Mode
In local development (`npm run dev`), Keystatic runs in **local mode** directly editing files on your disk. No GitHub keys are required.

### Production GitHub OAuth Setup
In production (Vercel), Keystatic uses **GitHub OAuth Storage mode** so changes made via `/keystatic` are committed directly to your GitHub repository, triggering an automated Vercel deployment.

1. **Create GitHub OAuth App**:
   - Go to [GitHub Settings -> Developer Settings -> OAuth Apps -> New OAuth App](https://github.com/settings/developers).
   - **Application Name**: `Nestor Cyber CMS`
   - **Homepage URL**: `https://nestor.name.ng`
   - **Authorization Callback URL**: `https://nestor.name.ng/api/keystatic/github/oauth/callback`

2. **Configure Vercel Environment Variables**:
   Add these environment variables to Vercel and your `.env.local`:
   ```env
   KEYSTATIC_GITHUB_CLIENT_ID=your_github_client_id
   KEYSTATIC_GITHUB_CLIENT_SECRET=your_github_client_secret
   KEYSTATIC_SECRET=ps3kxE/2g92OG2MQxcP7SU6wrkkpXeX02uqmPKbRdeE=
   ```

---

## 📝 Content Management Workflow

1. Visit `/keystatic` and log in with GitHub.
2. Select a collection (**Journal Articles**, **Portfolio Projects**, **Community & Leadership**, or **Site Settings**).
3. Fill in fields, upload images, write MDX content, and click **Publish**.
4. Keystatic creates a git commit on the repository.
5. Vercel automatically detects the commit, builds the dynamic routes, updates the RSS feed (`/feed.xml`), `sitemap.xml`, and universal search index.

---

## 📡 Dynamic Outputs & Feeds

- **RSS Feed**: `/feed.xml` automatically includes all published journal essays.
- **Sitemap**: `sitemap.xml` automatically lists all `/journal/[slug]`, `/portfolio/[slug]`, and `/community/[slug]` URLs.
- **Universal Search**: The site's `⌘K` search automatically indexes new CMS entries dynamically.
