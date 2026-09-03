-- RI$E Finance — Supabase schema
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.

-- 1. Profiles: one row per user, holds their display name.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 2. Auto-create a profile row whenever someone signs up.
-- The display name is passed in as `data: { name }` on signUp() from the frontend.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'RI$E Learner'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Progress: one row per user, holds everything that used to live only in
-- localStorage — completed modules, challenge answers, streak/visit log.
-- Stored as JSONB so it maps directly onto the existing client-side shapes
-- (a Set of module ids, and a { [challengeIndex]: optionIndex } map) with no
-- need to normalize into extra tables right now.
create table if not exists public.user_progress (
  user_id uuid references auth.users on delete cascade primary key,
  completed_modules jsonb not null default '[]'::jsonb,
  challenge_answers jsonb not null default '{}'::jsonb,
  visit_log jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);
