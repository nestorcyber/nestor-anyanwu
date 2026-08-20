-- Migration 004: Ensure all gallery_images columns exist and reload PostgREST schema cache
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

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

-- Ensure all columns exist if table was previously created with older schema
alter table public.gallery_images add column if not exists title text;
alter table public.gallery_images add column if not exists caption text;
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
alter table public.gallery_images add column if not exists created_at timestamptz not null default now();
alter table public.gallery_images add column if not exists updated_at timestamptz not null default now();

-- Reload Supabase PostgREST API schema cache
notify pgrst, 'reload schema';
