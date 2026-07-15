export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}
