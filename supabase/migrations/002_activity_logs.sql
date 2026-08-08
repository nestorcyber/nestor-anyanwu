-- Migration 002: Add admin activity logs table and post scheduling support

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  resource text not null,
  resource_id text,
  details text,
  admin_email text not null default 'neorxpro@gmail.com',
  created_at timestamptz not null default now()
);

alter table public.admin_activity_logs enable row level security;

create policy "Public read activity logs" on public.admin_activity_logs
  for select using (public.is_admin());

create policy "Admin insert activity logs" on public.admin_activity_logs
  for insert with check (public.is_admin());

-- Add scheduled publishing date column to journal_articles if not present
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name='journal_articles' and column_name='scheduled_at'
  ) then
    alter table public.journal_articles add column scheduled_at timestamptz;
  end if;
end;
$$;
