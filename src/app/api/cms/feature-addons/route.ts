import { NextResponse } from 'next/server';
import { getSql } from '@/lib/neon/server';
import { isDatabaseConfigured } from '@/lib/neon/config';
import { defaultFeatureAddons, parseFeatureAddons } from '@/lib/cms/addons';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!isDatabaseConfigured()) return NextResponse.json(defaultFeatureAddons);
    const sql = getSql();
    const rows = await sql`select value from site_settings where key = 'feature_addons' limit 1`;
    const items = rows.length ? parseFeatureAddons(rows[0].value) : defaultFeatureAddons;
    return NextResponse.json(items.filter((item) => item.is_published), {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (error) {
    console.error('Cannot load feature addons', error);
    return NextResponse.json({ error: 'ไม่สามารถโหลดฟังก์ชันเสริมได้' }, { status: 503 });
  }
}
