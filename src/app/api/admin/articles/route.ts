import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function normalizeSlug(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9ก-๙_-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function articleValues(data: Record<string, unknown>) {
  const slug = normalizeSlug(data.slug);
  const title = String(data.title ?? "").trim();
  if (!slug) throw new ApiInputError("กรุณากรอก Slug URL");
  if (!title) throw new ApiInputError("กรุณากรอกชื่อบทความ");
  return {
    slug,
    title,
    excerpt: String(data.excerpt ?? "").trim(),
    coverImageUrl: String(data.cover_image_url ?? "").trim(),
    contentHtml: String(data.content_html ?? ""),
    isPublished: data.is_published === true,
    sortOrder: Number.isFinite(Number(data.sort_order)) ? Number(data.sort_order) : 0,
  };
}

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const sql = getSql();
    const rows = await sql`
      select id, slug, title, excerpt, cover_image_url, content_html, is_published, sort_order
      from articles
      order by sort_order, created_at
    `;
    return NextResponse.json(rows);
  } catch (error) {
    return apiError(error, "โหลดบทความไม่สำเร็จ");
  }
}

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const data = articleValues((await request.json()) as Record<string, unknown>);
    const sql = getSql();
    await sql`
      insert into articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order)
      values (
        ${data.slug}, ${data.title}, ${data.excerpt}, ${data.coverImageUrl},
        ${data.contentHtml}, ${data.isPublished}, ${data.sortOrder}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "เพิ่มบทความไม่สำเร็จ");
  }
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const body = (await request.json()) as { id: string; data: Record<string, unknown> };
    const data = articleValues(body.data ?? {});
    const sql = getSql();
    await sql`
      update articles
      set slug = ${data.slug}, title = ${data.title}, excerpt = ${data.excerpt},
          cover_image_url = ${data.coverImageUrl}, content_html = ${data.contentHtml},
          is_published = ${data.isPublished}, sort_order = ${data.sortOrder}
      where id = ${body.id}::uuid
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "บันทึกบทความไม่สำเร็จ");
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    const body = (await request.json()) as { id: string };
    const sql = getSql();
    await sql`delete from articles where id = ${body.id}::uuid`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "ลบบทความไม่สำเร็จ");
  }
}
