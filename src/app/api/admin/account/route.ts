import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/lib/auth/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  return NextResponse.json({
    email: auth.admin.email,
    display_name: auth.admin.displayName,
  });
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      display_name?: string;
      current_password?: string;
      new_password?: string;
    };

    const email = body.email?.trim().toLowerCase() ?? "";
    const displayName = body.display_name?.trim() ?? "";
    const currentPassword = body.current_password ?? "";
    const newPassword = body.new_password ?? "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "กรุณากรอกอีเมลให้ถูกต้อง" }, { status: 400 });
    }
    if (!currentPassword) {
      return NextResponse.json({ error: "กรุณากรอกรหัสผ่านปัจจุบัน" }, { status: 400 });
    }
    if (newPassword && newPassword.length < 8) {
      return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" }, { status: 400 });
    }

    const sql = getSql();
    const rows = await sql`
      select id, password_hash
      from admin_users
      where id = ${auth.admin.id}::uuid and is_active = true
      limit 1
    `;
    const current = rows[0] as { id: string; password_hash: string } | undefined;
    if (!current || !(await bcrypt.compare(currentPassword, current.password_hash))) {
      return NextResponse.json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" }, { status: 401 });
    }

    const passwordHash = newPassword
      ? await bcrypt.hash(newPassword, 12)
      : current.password_hash;

    const updatedRows = await sql`
      update admin_users
      set email = ${email},
          display_name = ${displayName || null},
          password_hash = ${passwordHash}
      where id = ${auth.admin.id}::uuid
      returning id, email::text as email, display_name
    `;
    const updated = updatedRows[0] as {
      id: string;
      email: string;
      display_name: string | null;
    };

    const token = await createAdminSessionToken({
      adminId: updated.id,
      email: updated.email,
      displayName: updated.display_name || updated.email,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    return apiError(error, "บันทึกบัญชีผู้ดูแลไม่สำเร็จ");
  }
}
