import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSql } from "@/lib/neon/server";
import { isAdminSystemConfigured } from "@/lib/auth/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminSystemConfigured()) {
    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า DATABASE_URL หรือ AUTH_SECRET" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "กรุณากรอกอีเมลและรหัสผ่าน" }, { status: 400 });
  }

  try {
    const sql = getSql();
    let rows = await sql`
      select id, email::text as email, password_hash, display_name, is_active
      from admin_users
      where email = ${email}
      limit 1
    `;

    if (!rows.length) {
      const countRows = await sql`select count(*)::int as count from admin_users`;
      const total = Number((countRows[0] as any)?.count ?? 0);
      const initialEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase() ?? "";
      const initialPassword = process.env.INITIAL_ADMIN_PASSWORD ?? "";

      if (total === 0 && initialPassword && initialPassword.length < 8) {
        return NextResponse.json(
          { error: "INITIAL_ADMIN_PASSWORD ต้องมีอย่างน้อย 8 ตัวอักษร" },
          { status: 503 },
        );
      }

      if (
        total === 0 &&
        initialEmail &&
        initialPassword &&
        email === initialEmail &&
        password === initialPassword
      ) {
        const passwordHash = await bcrypt.hash(password, 12);
        rows = await sql`
          insert into admin_users (email, password_hash, display_name, is_active)
          values (${email}, ${passwordHash}, 'KLOOM Admin', true)
          returning id, email::text as email, password_hash, display_name, is_active
        `;
      } else if (total === 0 && (!initialEmail || !initialPassword)) {
        return NextResponse.json(
          { error: "ยังไม่มีบัญชีผู้ดูแล กรุณาตั้งค่า INITIAL_ADMIN_EMAIL และ INITIAL_ADMIN_PASSWORD ก่อนเข้าสู่ระบบครั้งแรก" },
          { status: 503 },
        );
      }
    }

    const admin = rows[0] as
      | {
          id: string;
          email: string;
          password_hash: string;
          display_name: string | null;
          is_active: boolean;
        }
      | undefined;

    if (!admin?.is_active || !(await bcrypt.compare(password, admin.password_hash))) {
      return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    await sql`update admin_users set last_login_at = now() where id = ${admin.id}::uuid`;
    const token = await createAdminSessionToken({
      adminId: admin.id,
      email: admin.email,
      displayName: admin.display_name || admin.email,
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
    console.error(error);
    return NextResponse.json(
      { error: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล" },
      { status: 500 },
    );
  }
}
