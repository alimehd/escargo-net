-- Run this file once on your Neon database to initialize the schema.
-- You can run it from the Neon SQL editor in the dashboard.

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255),
  pin         CHAR(4),
  role        VARCHAR(20) NOT NULL DEFAULT 'booker',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id           SERIAL PRIMARY KEY,
  user_email   VARCHAR(255) NOT NULL,
  user_name    VARCHAR(255) NOT NULL,
  spot_type    VARCHAR(10)  NOT NULL CHECK (spot_type IN ('bed', 'camp')),
  spot_number  INTEGER      NOT NULL CHECK (spot_number BETWEEN 1 AND 6),
  start_date   DATE         NOT NULL,
  end_date     DATE         NOT NULL,
  notes        TEXT,
  is_public    BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CONSTRAINT no_end_before_start CHECK (end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_reservations_dates
  ON reservations (spot_type, spot_number, start_date, end_date);

CREATE TABLE IF NOT EXISTS access_requests (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL,
  name        VARCHAR(255),
  status      VARCHAR(20)  NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'denied')),
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
