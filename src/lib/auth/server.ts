import { cookies } from "next/headers";
import { getSql } from "@/lib/neon/server";
import { isDatabaseConfigured } from "@/lib/neon/config";
import {
  ADMIN_SESSION_COOKIE,
  isAuthConfigured,
  verifyAdminSessionToken,
} from "./session";

export type CurrentAdmin = {
  id: string;
  email: string;
  displayName: string;
};

export function isAdminSystemConfigured() {
  return isDatabaseConfigured() && isAuthConfigured();
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (!isAdminSystemConfigured()) return null;

  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifyAdminSessionToken(token);
  if (!session) return null;

  try {
    const sql = getSql();
    const rows = await sql`
      select id, email::text as email, display_name, is_active
      from admin_users
      where id = ${session.adminId}::uuid
      limit 1
    `;
    const row = rows[0] as
      | { id: string; email: string; display_name: string | null; is_active: boolean }
      | undefined;

    if (!row?.is_active) return null;
    return {
      id: row.id,
      email: row.email,
      displayName: row.display_name || row.email,
    };
  } catch {
    return null;
  }
}
