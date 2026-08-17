-- Migration 003: Add icon metadata columns to skills table if not existing

alter table public.skills add column if not exists icon text;
alter table public.skills add column if not exists icon_provider text;
alter table public.skills add column if not exists icon_name text;
