-- Public bucket for card/modal media. App stores only public URLs in projects.image / projects.logo.
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can read project media" on storage.objects;
create policy "Anyone can read project media"
  on storage.objects
  for select
  using (bucket_id = 'project-media');
