import { NextResponse } from 'next/server';
import { ApiInputError, authorizeAdminApi, apiError } from '@/lib/api/admin';
import { getSql } from '@/lib/neon/server';
import { parseFeatureAddons, type FeatureAddon } from '@/lib/cms/addons';
import { portfolioCategoryId, selectPortfolioCategories, type PortfolioCategoryRow } from '@/lib/cms/portfolio-selection';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type TransferPortfolio = { category_id: number; title: string; description: string; image_url: string };
type TransferPayload = { format: 'kloom-cms-transfer-v1'; portfolio: TransferPortfolio[]; feature_addons: FeatureAddon[] };
const uncached = { 'Cache-Control': 'no-store' };

function imageUrl(value: unknown) {
  const url = String(value ?? '').trim();
  if (!url || url.length > 2000 || (!url.startsWith('/') && !/^https?:\/\//i.test(url))) {
    throw new ApiInputError('URL รูปภาพต้องเป็น path หรือ HTTPS URL ที่ถูกต้อง');
  }
  return url;
}

function validate(payload: unknown): TransferPayload {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new ApiInputError('รูปแบบไฟล์ไม่ถูกต้อง');
  const data = payload as Record<string, unknown>;
  if (data.format !== 'kloom-cms-transfer-v1' || !Array.isArray(data.portfolio) || !Array.isArray(data.feature_addons)) {
    throw new ApiInputError('กรุณาใช้ไฟล์ JSON ที่ส่งออกจากเมนูย้ายข้อมูล CMS');
  }
  if (data.portfolio.length !== 3 || data.feature_addons.length > 30) throw new ApiInputError('ต้องมีผลงาน 3 หมวด และฟังก์ชันเสริมไม่เกิน 30 รายการ');
  const portfolio = data.portfolio.map((value) => {
    if (!value || typeof value !== 'object') throw new ApiInputError('รายการผลงานไม่ถูกต้อง');
    const row = value as Record<string, unknown>;
    const category_id = Number(row.category_id);
    const title = String(row.title ?? '').trim().slice(0, 200);
    if (![1,2,3].includes(category_id) || !title || title.length > 200) throw new ApiInputError('ชื่อหรือหมวดผลงานไม่ถูกต้อง');
    return { category_id, title, description: String(row.description ?? '').slice(0, 500), image_url: imageUrl(row.image_url) };
  });
  if (new Set(portfolio.map((x) => x.category_id)).size !== 3) throw new ApiInputError('หมวดผลงานซ้ำกัน');
  const addons = parseFeatureAddons(data.feature_addons);
  if (addons.length !== data.feature_addons.length || addons.some((x) => !x.title.trim() || (x.image_url && !x.image_url.startsWith('/') && !/^https?:\/\//i.test(x.image_url)))) {
    throw new ApiInputError('ข้อมูลฟังก์ชันเสริมไม่ถูกต้อง');
  }
  if (new Set(addons.map((x) => x.id)).size !== addons.length) throw new ApiInputError('รหัสฟังก์ชันเสริมซ้ำกัน');
  return { format: 'kloom-cms-transfer-v1', portfolio, feature_addons: addons };
}

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const sql = getSql();
    const [portfolioRows, settingRows] = await sql.transaction([
      sql`select id, title, description, image_url, review_url, sort_order, is_published, updated_at from portfolio_items where is_published = true order by sort_order, updated_at desc`,
      sql`select value from site_settings where key = 'feature_addons' limit 1`,
    ]);
    const portfolio = selectPortfolioCategories(portfolioRows as PortfolioCategoryRow[]).map((row) => ({
      category_id: portfolioCategoryId(row)!, title: row.title, description: row.description, image_url: row.image_url,
    }));
    // Never export demo defaults: otherwise imports could accidentally overwrite real data.
    if (portfolio.length !== 3 || settingRows.length !== 1) {
      return NextResponse.json({ error: 'ฐานข้อมูลนี้ยังไม่มีข้อมูลจริงครบสองหมวด ไม่สามารถส่งออกได้', portfolio_count: portfolio.length, addons_saved: settingRows.length === 1 }, { status: 409, headers: uncached });
    }
    return NextResponse.json({ format: 'kloom-cms-transfer-v1', portfolio, feature_addons: parseFeatureAddons(settingRows[0].value) }, { headers: uncached });
  } catch (e) { return apiError(e, 'ส่งออกข้อมูล CMS ไม่สำเร็จ'); }
}

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const payload = validate(await request.json());
    const sql = getSql();
    const rows = await sql`select id, title, description, image_url, review_url, sort_order, is_published, updated_at from portfolio_items order by sort_order, updated_at desc` as PortfolioCategoryRow[];
    const operations = [] as ReturnType<typeof sql>[];
    for (const entry of payload.portfolio) {
      const reviewUrl = `/review/${entry.category_id}`;
      const candidates = selectPortfolioCategories(rows.filter((r) => portfolioCategoryId(r) === entry.category_id));
      const selected = candidates[0];
      if (selected) {
        operations.push(sql`update portfolio_items set title = ${entry.title}, description = ${entry.description}, image_url = ${entry.image_url}, alt_text = ${entry.title}, review_url = ${reviewUrl}, is_published = true, sort_order = ${entry.category_id} where id = ${selected.id}::uuid`);
        operations.push(sql`update portfolio_items set is_published = false where id <> ${selected.id}::uuid and (review_url = ${reviewUrl} or (coalesce(review_url, '') = '' and sort_order = ${entry.category_id}))`);
      } else {
        operations.push(sql`insert into portfolio_items (title, description, category, image_url, alt_text, review_url, is_published, sort_order) values (${entry.title}, ${entry.description}, '', ${entry.image_url}, ${entry.title}, ${reviewUrl}, true, ${entry.category_id})`);
      }
    }
    operations.push(sql`insert into site_settings (key, value) values ('feature_addons', ${JSON.stringify(payload.feature_addons)}::jsonb) on conflict (key) do update set value = excluded.value, updated_at = now()`);
    // All portfolio and add-on changes commit or roll back together.
    await sql.transaction(operations);
    return NextResponse.json({ ok: true, imported_portfolio: payload.portfolio.length, imported_addons: payload.feature_addons.length }, { headers: uncached });
  } catch (e) { return apiError(e, 'นำเข้าข้อมูล CMS ไม่สำเร็จ'); }
}
