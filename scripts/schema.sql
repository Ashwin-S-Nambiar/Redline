create table if not exists projects (
  slug text primary key,
  name text not null,
  formerly text[] not null default '{}',
  blurb text not null default '',
  url text not null default '',
  repo text not null default '',
  note text not null default '',
  sort integer not null default 0
);

create table if not exists releases (
  id uuid primary key default gen_random_uuid(),
  project text not null references projects (slug) on update cascade on delete cascade,
  version text not null,
  day date not null,
  title text not null,
  changes jsonb not null default '[]',
  notes text not null default '',
  commits text[] not null default '{}',
  created_at timestamptz not null default clock_timestamp(),
  unique (project, version)
);

create index if not exists releases_newest on releases (day desc, created_at desc);

create table if not exists admins (
  email text primary key,
  password text not null
);
