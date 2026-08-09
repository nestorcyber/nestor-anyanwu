-- Migration: Create brand_partners table for brand logo management

create table if not exists public.brand_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  website_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.brand_partners enable row level security;

-- Public read access
create policy "Public read brand_partners" on public.brand_partners
  for select using (true);

-- Admin full access policies
create policy "Admin insert brand_partners" on public.brand_partners
  for insert with check (public.is_admin());

create policy "Admin update brand_partners" on public.brand_partners
  for update using (public.is_admin()) with check (public.is_admin());

create policy "Admin delete brand_partners" on public.brand_partners
  for delete using (public.is_admin());

-- Updated at trigger
create trigger brand_partners_updated_at
  before update on public.brand_partners
  for each row execute function public.set_updated_at();
