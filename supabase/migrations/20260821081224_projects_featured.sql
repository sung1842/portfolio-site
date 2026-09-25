alter table public.projects
  add column if not exists featured boolean not null default true;

comment on column public.projects.featured is 'When false, hide from the home carousel (still shown in View All).';
