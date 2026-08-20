-- Migration 004: Ensure gallery_images columns exist, enable RLS, and reload PostgREST schema cache
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Create table if not exists
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  image_url text not null,
  alt text,
  cloudinary_public_id text,
  width int,
  height int,
  category text default 'General',
  location text,
  event_date text,
  external_link text,
  video_url text,
  video_duration text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Add any missing columns to existing table
alter table public.gallery_images add column if not exists caption text;
alter table public.gallery_images add column if not exists title text;
alter table public.gallery_images add column if not exists image_url text;
alter table public.gallery_images add column if not exists alt text;
alter table public.gallery_images add column if not exists cloudinary_public_id text;
alter table public.gallery_images add column if not exists width int;
alter table public.gallery_images add column if not exists height int;
alter table public.gallery_images add column if not exists category text default 'General';
alter table public.gallery_images add column if not exists location text;
alter table public.gallery_images add column if not exists event_date text;
alter table public.gallery_images add column if not exists external_link text;
alter table public.gallery_images add column if not exists video_url text;
alter table public.gallery_images add column if not exists video_duration text;
alter table public.gallery_images add column if not exists featured boolean not null default false;
alter table public.gallery_images add column if not exists sort_order int not null default 0;

-- 3. Enable Row Level Security (RLS)
alter table public.gallery_images enable row level security;

-- 4. Public read policy (allows website visitors to view images)
drop policy if exists "Public read gallery" on public.gallery_images;
create policy "Public read gallery" on public.gallery_images
  for select using (true);

-- 5. Admin write policies
drop policy if exists "Admin insert gallery_images" on public.gallery_images;
create policy "Admin insert gallery_images" on public.gallery_images
  for insert with check (public.is_admin());

drop policy if exists "Admin update gallery_images" on public.gallery_images;
create policy "Admin update gallery_images" on public.gallery_images
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admin delete gallery_images" on public.gallery_images;
create policy "Admin delete gallery_images" on public.gallery_images
  for delete using (public.is_admin());

-- 6. Refresh Supabase PostgREST schema cache
notify pgrst, 'reload schema';
