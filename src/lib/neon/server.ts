import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { getDatabaseUrl, isDatabaseConfigured } from "./config";

let cachedSql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!isDatabaseConfigured()) {
    throw new Error("Neon is not configured. Add DATABASE_URL to the environment variables.");
  }

  if (!cachedSql) cachedSql = neon(getDatabaseUrl());
  return cachedSql;
}
