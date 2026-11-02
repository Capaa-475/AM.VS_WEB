create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text unique not null,
  rol text not null default 'Administrador' check (rol in ('Superadministrador', 'Administrador', 'Editor')),
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  fecha date,
  hora time,
  localidad text,
  lugar text,
  tipo text not null default 'Procesión',
  estado text not null default 'proxima' check (estado in ('proxima', 'celebrada', 'cancelada')),
  imagen text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  resumen text,
  contenido text,
  imagen text,
  categoria text not null default 'General',
  estado text not null default 'borrador' check (estado in ('borrador', 'publicada')),
  fecha_publicacion date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists repertoire (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  autor text,
  categoria text,
  anio integer,
  descripcion text,
  audio_url text,
  video_url text,
  imagen_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gallery_albums (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  categoria text not null default 'Semana Santa',
  fecha date,
  portada text,
  created_at timestamptz not null default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references gallery_albums(id) on delete cascade,
  titulo text,
  descripcion text,
  archivo_url text not null,
  tipo text not null default 'image' check (tipo in ('image', 'video')),
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  instrumento text,
  seccion text,
  cargo text,
  fotografia text,
  visible boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists sponsors (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  logotipo text,
  enlace text,
  activo boolean not null default true,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  entidad text,
  email text not null,
  telefono text not null,
  localidad text,
  fecha_evento date,
  tipo_evento text,
  mensaje text not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'contactado', 'rechazado')),
  created_at timestamptz not null default now()
);

create table if not exists timeline (
  id uuid primary key default gen_random_uuid(),
  anio text not null,
  fecha date,
  titulo text not null,
  descripcion text,
  imagen text,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  valor text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_events_estado on events(estado);
create index if not exists idx_events_fecha on events(fecha);
create index if not exists idx_news_estado on news(estado);
create index if not exists idx_repertoire_categoria on repertoire(categoria);
create index if not exists idx_gallery_albums_categoria on gallery_albums(categoria);
create index if not exists idx_members_visible on members(visible);
create index if not exists idx_sponsors_activo on sponsors(activo);
create index if not exists idx_contact_requests_estado on contact_requests(estado);
create index if not exists idx_timeline_orden on timeline(orden);
