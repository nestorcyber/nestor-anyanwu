-- Nestor portfolio CMS schema
-- Run this in the Supabase SQL Editor

create extension if not exists "pgcrypto";

-- ─── helpers ─────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'neorxpro@gmail.com';
$$;

-- ─── site_settings (singleton) ───────────────────────────────────────────────
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'Nestor Cyber',
  author_name text not null default 'Nestor Anyanwu',
  tagline text not null default '',
  hero_title text not null default '',
  hero_subtitle text not null default '',
  contact_email text not null default '',
  location text not null default '',
  availability_status text not null default '',
  social_github text not null default '',
  social_linkedin text not null default '',
  social_twitter text not null default '',
  social_behance text not null default '',
  social_whatsapp text not null default '',
  google_analytics_id text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ─── journal_articles ────────────────────────────────────────────────────────
create table if not exists public.journal_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  cover_image text,
  category text not null default 'Technology',
  tags text[] not null default '{}',
  featured boolean not null default false,
  pinned boolean not null default false,
  published_date date,
  scheduled_at timestamptz,
  last_updated date,
  author text not null default 'Nestor Anyanwu',
  seo_title text,
  seo_description text,
  draft boolean not null default false,
  content text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger journal_articles_updated_at
  before update on public.journal_articles
  for each row execute function public.set_updated_at();

-- ─── portfolio_projects ──────────────────────────────────────────────────────
create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null default '',
  cover_image text,
  gallery text[] not null default '{}',
  category text not null default 'Software',
  technologies text[] not null default '{}',
  status text not null default 'Completed',
  client text,
  role text,
  github_url text,
  live_url text,
  case_study_url text,
  featured boolean not null default false,
  completion_date date,
  full_description text not null default '',
  draft boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger portfolio_projects_updated_at
  before update on public.portfolio_projects
  for each row execute function public.set_updated_at();

-- ─── community_entries ───────────────────────────────────────────────────────
create table if not exists public.community_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  organization text not null,
  role text not null default '',
  duration text not null default '',
  cover_image text,
  gallery text[] not null default '{}',
  achievements text[] not null default '{}',
  impact_stats jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  tags text[] not null default '{}',
  description text not null default '',
  draft boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger community_entries_updated_at
  before update on public.community_entries
  for each row execute function public.set_updated_at();

-- ─── journey_items ───────────────────────────────────────────────────────────
create table if not exists public.journey_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null default '',
  role text,
  date_label text not null default '',
  description text not null default '',
  type text not null default 'work'
    check (type in ('work', 'volunteer', 'membership', 'milestone')),
  details text[] not null default '{}',
  images text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger journey_items_updated_at
  before update on public.journey_items
  for each row execute function public.set_updated_at();

-- ─── portfolio_stats ─────────────────────────────────────────────────────────
create table if not exists public.portfolio_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger portfolio_stats_updated_at
  before update on public.portfolio_stats
  for each row execute function public.set_updated_at();

-- ─── services ────────────────────────────────────────────────────────────────
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  icon_name text not null default 'Code',
  cta_text text not null default 'Learn more',
  cta_href text not null default '/contact',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- ─── skill_groups + skills ───────────────────────────────────────────────────
create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger skill_groups_updated_at
  before update on public.skill_groups
  for each row execute function public.set_updated_at();

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.skill_groups(id) on delete cascade,
  name text not null,
  experience_level text,
  years text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger skills_updated_at
  before update on public.skills
  for each row execute function public.set_updated_at();

-- ─── certifications ──────────────────────────────────────────────────────────
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  provider text not null default '',
  date_label text not null default '',
  credential_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger certifications_updated_at
  before update on public.certifications
  for each row execute function public.set_updated_at();

-- ─── gallery_images ──────────────────────────────────────────────────────────
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  image_url text not null,
  alt text,
  cloudinary_public_id text,
  width int,
  height int,
  category text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger gallery_images_updated_at
  before update on public.gallery_images
  for each row execute function public.set_updated_at();

-- ─── brand_partners ──────────────────────────────────────────────────────────
create table if not exists public.brand_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  website_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger brand_partners_updated_at
  before update on public.brand_partners
  for each row execute function public.set_updated_at();

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table public.site_settings enable row level security;
alter table public.journal_articles enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.community_entries enable row level security;
alter table public.journey_items enable row level security;
alter table public.portfolio_stats enable row level security;
alter table public.services enable row level security;
alter table public.skill_groups enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.gallery_images enable row level security;
alter table public.brand_partners enable row level security;

-- Public read
create policy "Public read site_settings" on public.site_settings
  for select using (true);

create policy "Public read published journal" on public.journal_articles
  for select using (draft = false or public.is_admin());

create policy "Public read published portfolio" on public.portfolio_projects
  for select using (draft = false or public.is_admin());

create policy "Public read published community" on public.community_entries
  for select using (draft = false or public.is_admin());

create policy "Public read journey" on public.journey_items
  for select using (true);

create policy "Public read portfolio_stats" on public.portfolio_stats
  for select using (true);

create policy "Public read services" on public.services
  for select using (true);

create policy "Public read skill_groups" on public.skill_groups
  for select using (true);

create policy "Public read skills" on public.skills
  for select using (true);

create policy "Public read certifications" on public.certifications
  for select using (true);

create policy "Public read gallery" on public.gallery_images
  for select using (true);

create policy "Public read brand_partners" on public.brand_partners
  for select using (true);

-- Admin write (all tables)
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings',
    'journal_articles',
    'portfolio_projects',
    'community_entries',
    'journey_items',
    'portfolio_stats',
    'services',
    'skill_groups',
    'skills',
    'certifications',
    'gallery_images',
    'brand_partners'
  ]
  loop
    execute format(
      'create policy "Admin insert %1$s" on public.%1$s for insert with check (public.is_admin());',
      t
    );
    execute format(
      'create policy "Admin update %1$s" on public.%1$s for update using (public.is_admin()) with check (public.is_admin());',
      t
    );
    execute format(
      'create policy "Admin delete %1$s" on public.%1$s for delete using (public.is_admin());',
      t
    );
  end loop;
end;
$$;

-- Seed singleton row if empty
insert into public.site_settings (site_name)
select 'Nestor Cyber'
where not exists (select 1 from public.site_settings);
