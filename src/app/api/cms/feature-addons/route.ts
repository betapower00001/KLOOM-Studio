import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSql } from '@/lib/neon/server';
import { isDatabaseConfigured } from '@/lib/neon/config';
import { parseFeatureAddons } from '@/lib/cms/addons';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // ⚡ ปิด Data Cache ทั้งหมดของ Next.js
export const runtime = 'nodejs';

export async function GET() {
  try {
    // ⚡ สั่งเคลียร์ Cache ของ Path นี้ให้อัตโนมัติทุกครั้งที่มีการเรียกดึงข้อมูล
    revalidatePath('/api/cms/feature-addons');
    revalidatePath('/features');
    revalidatePath('/');

    if (!isDatabaseConfigured()) return NextResponse.json({ error: 'DATABASE_URL ไม่ได้ตั้งค่าในระบบที่กำลังรัน' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
    const sql = getSql();
    const rows = await sql`select value from site_settings where key = 'feature_addons' limit 1`;
    if (!rows.length) {
      return NextResponse.json(
        { error: 'ยังไม่มีข้อมูล feature_addons ในฐานข้อมูลของเว็บไซต์นี้ กรุณาบันทึกจากหลังบ้าน Production หรือนำเข้าจากเมนูย้ายข้อมูล CMS' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    const items = parseFeatureAddons(rows[0].value);
    return NextResponse.json(items.filter((item) => item.is_published), {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Cannot load feature addons', error);
    return NextResponse.json({ error: 'ไม่สามารถโหลดฟังก์ชันเสริมได้' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}