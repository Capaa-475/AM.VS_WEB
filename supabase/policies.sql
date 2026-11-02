-- RLS para tablas públicas y privadas.
-- En Supabase, activa la seguridad por fila en cada tabla con ALTER TABLE ... ENABLE ROW LEVEL SECURITY.

alter table profiles enable row level security;
alter table events enable row level security;
alter table news enable row level security;
alter table repertoire enable row level security;
alter table gallery_albums enable row level security;
alter table gallery_items enable row level security;
alter table members enable row level security;
alter table sponsors enable row level security;
alter table contact_requests enable row level security;
alter table timeline enable row level security;
alter table site_settings enable row level security;

-- Lectura pública: acceso anónimo a contenido que debe mostrarse en la web pública.
create policy "Public read access to published content" on news
for select using (estado = 'publicada');

create policy "Public read access to visible members" on members
for select using (visible = true);

create policy "Public read access to active sponsors" on sponsors
for select using (activo = true);

create policy "Public read access to timeline" on timeline
for select using (true);

create policy "Public read access to repertoire" on repertoire
for select using (true);

create policy "Public read access to gallery albums" on gallery_albums
for select using (true);

create policy "Public read access to gallery items" on gallery_items
for select using (true);

create policy "Public read access to events" on events
for select using (true);

create policy "Public read access to site settings" on site_settings
for select using (true);

-- Escritura segura: sólo administradores autorizados pueden gestionar contenido.
create policy "Admins manage all content" on news
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Admins manage events" on events
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Editors manage allowed content" on repertoire
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador', 'Editor')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador', 'Editor')
  )
);

create policy "Admins manage gallery" on gallery_albums
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Admins manage members" on members
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Admins manage sponsors" on sponsors
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Admins manage contact requests" on contact_requests
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol in ('Superadministrador', 'Administrador')
  )
);

create policy "Public can insert contact requests" on contact_requests
for insert with check (true);

create policy "Admins manage site settings" on site_settings
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol = 'Superadministrador'
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol = 'Superadministrador'
  )
);

create policy "Role management for superadmins" on profiles
for all using (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol = 'Superadministrador'
  )
) with check (
  auth.uid() is not null and exists (
    select 1 from profiles p where p.id = auth.uid() and p.activo = true and p.rol = 'Superadministrador'
  )
);
