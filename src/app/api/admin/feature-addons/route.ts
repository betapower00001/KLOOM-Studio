import { NextResponse } from 'next/server';
import { ApiInputError, authorizeAdminApi, apiError } from '@/lib/api/admin';
import { getSql } from '@/lib/neon/server';
import { defaultFeatureAddons, parseFeatureAddons } from '@/lib/cms/addons';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const sql = getSql();
    const rows = await sql`select value from site_settings where key = 'feature_addons' limit 1`;
    return NextResponse.json(rows.length ? parseFeatureAddons(rows[0].value) : defaultFeatureAddons);
  } catch (error) { return apiError(error, 'โหลดฟังก์ชันเสริมไม่สำเร็จ'); }
}

export async function PUT(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const body: unknown = await request.json();
    if (!Array.isArray(body) || body.length > 30) throw new ApiInputError('รองรับฟังก์ชันเสริมได้สูงสุด 30 รายการ');
    if (body.some((item) => !item || typeof item !== 'object' || !String(item.title ?? '').trim())) {
      throw new ApiInputError('กรุณาระบุชื่อฟังก์ชันเสริมทุกรายการ');
    }
    const items = parseFeatureAddons(body);
    if (new Set(items.map((item) => item.id)).size !== items.length) throw new ApiInputError('รหัสรายการซ้ำกัน');
    if (items.some((item) => item.image_url && !item.image_url.startsWith('/') && !/^https?:\/\//i.test(item.image_url))) {
      throw new ApiInputError('URL รูปภาพไม่ถูกต้อง');
    }
    const sql = getSql();
    await sql`
      insert into site_settings (key, value)
      values ('feature_addons', ${JSON.stringify(items)}::jsonb)
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `;
    return NextResponse.json({ ok: true, items });
  } catch (error) { return apiError(error, 'บันทึกฟังก์ชันเสริมไม่สำเร็จ'); }
}
