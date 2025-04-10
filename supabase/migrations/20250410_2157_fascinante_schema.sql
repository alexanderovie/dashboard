-- Tabla de usuarios
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  country text,
  language text,
  preferences jsonb,
  role text default 'admin', -- admin, editor, viewer
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tabla de negocios
create table businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  website text,
  phone text,
  address_1 text,
  address_2 text,
  city text,
  state text,
  postal_code text,
  country text,
  latitude double precision,
  longitude double precision,
  google_place_id text,
  gmb_data jsonb, -- Datos de Google My Business completos
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tabla de ubicaciones por negocio
create table locations (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade,
  name text,
  address text,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Tabla de tokens por usuario y servicio
create table tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  service text not null, -- instagram, facebook, gmb, pagespeed, etc.
  access_token text not null,
  refresh_token text,
  expires_at timestamp with time zone,
  business_id uuid references businesses(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Auditorías de velocidad, SEO, errores, etc.
create table audits (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  type text, -- seo, speed, errors, etc.
  result jsonb,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Planes
create table plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null, -- Free, Pro, Agency
  max_businesses int,
  max_credits int,
  features jsonb,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Suscripciones de usuario a planes
create table user_plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  plan_id uuid references plans(id),
  active boolean default true,
  credits int default 3,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Alertas automáticas
create table alerts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  business_id uuid references businesses(id) on delete cascade,
  type text, -- "speed_drop", "seo_issue", etc.
  message text,
  sent_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);