-- Migration 002: Add description and image_url to certifications table
alter table if exists public.certifications
  add column if not exists description text,
  add column if not exists image_url text;

-- Notify PostgREST to reload its schema cache
notify pgrst, 'reload schema';
