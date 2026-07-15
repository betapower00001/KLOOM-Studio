import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/server";

export class ApiInputError extends Error {}

export async function authorizeAdminApi() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return {
      admin: null,
      response: NextResponse.json({ error: "กรุณาเข้าสู่ระบบใหม่" }, { status: 401 }),
    };
  }
  return { admin, response: null };
}

export function apiError(error: unknown, fallback = "เกิดข้อผิดพลาด") {
  if (error instanceof ApiInputError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.error(error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}
