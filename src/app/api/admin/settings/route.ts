import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const sql = getSql();
    return NextResponse.json(await sql`
      select key, value from site_settings where key in ('contact', 'hero')
    `);
  } catch (error) {
    return apiError(error, "โหลดข้อมูลเว็บไซต์ไม่สำเร็จ");
  }
}

function text(value: unknown, maxLength = 500) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function PUT(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const body = (await request.json().catch(() => ({}))) as {
      contact?: Record<string, unknown>;
      hero?: Record<string, unknown>;
    };
    if (!body.contact || !body.hero) {
      throw new ApiInputError("ข้อมูลเว็บไซต์ไม่ครบถ้วน");
    }

    const contact = {
      phone: text(body.contact.phone, 100),
      line: text(body.contact.line, 100),
      email: text(body.contact.email, 200),
      address: text(body.contact.address, 1000),
    };
    const hero = {
      title: text(body.hero.title, 300),
      subtitle: text(body.hero.subtitle, 500),
      image_url: text(body.hero.image_url, 2000),
      button_text: text(body.hero.button_text, 100),
    };

    if (!hero.title) throw new ApiInputError("กรุณากรอกหัวข้อหน้าแรก");

    const sql = getSql();
    await sql.transaction([
      sql`
        insert into site_settings (key, value)
        values ('contact', ${JSON.stringify(contact)}::jsonb)
        on conflict (key) do update set value = excluded.value, updated_at = now()
      `,
      sql`
        insert into site_settings (key, value)
        values ('hero', ${JSON.stringify(hero)}::jsonb)
        on conflict (key) do update set value = excluded.value, updated_at = now()
      `,
    ]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "บันทึกข้อมูลเว็บไซต์ไม่สำเร็จ");
  }
}
