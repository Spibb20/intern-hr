
CREATE TABLE IF NOT EXISTS departments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  parent_id   UUID REFERENCES departments(id) ON DELETE SET NULL,
  manager_id  UUID, 
  color       TEXT NOT NULL DEFAULT '#22d3ee',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_positions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employee_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS work_locations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  address       TEXT NOT NULL DEFAULT '',
  location_type TEXT NOT NULL DEFAULT 'office',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tags (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#b45309',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS departure_reasons (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employees (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  active            BOOLEAN NOT NULL DEFAULT true,
  work_email        TEXT NOT NULL DEFAULT '',
  work_phone        TEXT NOT NULL DEFAULT '',
  work_mobile       TEXT NOT NULL DEFAULT '',
  avatar_url        TEXT,
  job_position_id   UUID REFERENCES job_positions(id) ON DELETE SET NULL,
  job_title         TEXT NOT NULL DEFAULT '',
  department_id     UUID REFERENCES departments(id) ON DELETE SET NULL,
  manager_id        UUID REFERENCES employees(id) ON DELETE SET NULL,
  employee_type_id  UUID REFERENCES employee_types(id) ON DELETE SET NULL,
  work_location_id  UUID REFERENCES work_locations(id) ON DELETE SET NULL,
  company           TEXT NOT NULL DEFAULT '',
  private_email     TEXT NOT NULL DEFAULT '',
  private_phone     TEXT NOT NULL DEFAULT '',
  private_address   TEXT NOT NULL DEFAULT '',
  gender            TEXT NOT NULL DEFAULT '',
  date_of_birth     DATE,
  nationality       TEXT NOT NULL DEFAULT '',
  marital_status    TEXT NOT NULL DEFAULT '',
  monthly_hours     INTEGER NOT NULL DEFAULT 0,
  kanban_state      TEXT NOT NULL DEFAULT 'normal',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employee_tags (
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (employee_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_manager ON employees(manager_id);
CREATE INDEX IF NOT EXISTS idx_job_positions_department ON job_positions(department_id);
