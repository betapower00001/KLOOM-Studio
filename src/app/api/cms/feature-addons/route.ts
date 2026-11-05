import { NextResponse } from 'next/server';
import { getSql } from '@/lib/neon/server';
import { isDatabaseConfigured } from '@/lib/neon/config';
import { parseFeatureAddons } from '@/lib/cms/addons';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!isDatabaseConfigured()) return NextResponse.json({ error: 'DATABASE_URL ไม่ได้ตั้งค่าในระบบที่กำลังรัน' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    const sql = getSql();
    const rows = await sql`select value from site_settings where key = 'feature_addons' limit 1`;
    if (!rows.length) {
      return NextResponse.json(
        { error: 'Production ยังไม่มีข้อมูล feature_addons ใน site_settings กรุณานำเข้าข้อมูลผ่าน /admin/cms-transfer' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    const items = parseFeatureAddons(rows[0].value);
    return NextResponse.json(items.filter((item) => item.is_published), {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (error) {
    console.error('Cannot load feature addons', error);
    return NextResponse.json({ error: 'ไม่สามารถโหลดฟังก์ชันเสริมได้' }, { status: 503 });
  }
}
