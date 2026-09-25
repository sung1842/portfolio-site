-- Portfolio project cards. Media lives in Storage; this table stores URLs only.
create table if not exists public.projects (
  id bigint primary key,
  title text not null,
  description text not null,
  tagline text not null,
  category text not null,
  color text not null,
  image text not null default '',
  logo text,
  hide_title boolean not null default false,
  tech text[] not null default '{}',
  card_tech text[],
  roles jsonb,
  why_developed text,
  flow_steps jsonb,
  troubleshooting jsonb,
  tech_decisions jsonb,
  tech_flow jsonb,
  neon jsonb,
  github text not null default '',
  live text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists "Anyone can read projects" on public.projects;
create policy "Anyone can read projects"
  on public.projects
  for select
  using (true);
