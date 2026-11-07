import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";
import { portfolioCategoryId, selectPortfolioCategories } from "@/lib/cms/portfolio-selection";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PortfolioRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  alt_text: string;
  review_url: string;
  is_published: boolean;
  sort_order: number;
  updated_at: string | Date;
};

function cleanText(value: unknown, maximum: number) {
  return String(value ?? "").trim().slice(0, maximum);
}

function validateImageUrl(value: unknown) {
  const imageUrl = cleanText(value, 2000);
  if (imageUrl && !imageUrl.startsWith("/") && !/^https?:\/\//i.test(imageUrl)) {
    throw new ApiInputError("URL รูปภาพไม่ถูกต้อง");
  }
  return imageUrl;
}

function missingTableMessage(error: unknown) {
  return error instanceof Error && /portfolio_items|review_url|does not exist/i.test(error.message)
    ? "ฐานข้อมูลตัวอย่างผลงานยังไม่อัปเดต กรุณารันไฟล์ APPLY_REVIEW_GALLERY_WINDOWS.bat แล้วเปิดระบบใหม่"
    : null;
}

async function readPortfolioCategories() {
  const sql = getSql();
  const rows = (await sql`
    select id, title, description, category, image_url, alt_text, review_url,
           is_published, sort_order, updated_at
    from portfolio_items
    order by sort_order, updated_at desc
  `) as PortfolioRow[];
  // Read-only, same selection function as the public API.
  return selectPortfolioCategories(rows);
}

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    return NextResponse.json(await readPortfolioCategories(), { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "โหลดตัวอย่างผลงานไม่สำเร็จ");
  }
}

export async function POST() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  return NextResponse.json(
    { error: "ตัวอย่างผลงานถูกล็อกไว้ 3 หมวด ไม่สามารถเพิ่มหมวดใหม่ได้" },
    { status: 405 },
  );
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json()) as {
      id?: string;
      data?: Record<string, unknown>;
    };
    if (!body.id) throw new ApiInputError("ไม่พบรหัสผลงาน");

    const sql = getSql();
    const [existing] = (await sql`
      select id, review_url, sort_order
      from portfolio_items
      where id = ${body.id}::uuid
      limit 1
    `) as PortfolioRow[];
    if (!existing) throw new ApiInputError("ไม่พบรายการผลงานที่ต้องการแก้ไข");

    const categoryId = portfolioCategoryId(existing);
    if (!categoryId) {
      throw new ApiInputError("รายการนี้ไม่ใช่หนึ่งใน 3 หมวดตัวอย่างผลงาน");
    }

    const title = cleanText(body.data?.title, 200);
    if (!title) throw new ApiInputError("กรุณากรอกชื่อหมวด");

    const description = cleanText(body.data?.description, 500);
    const imageUrl = validateImageUrl(body.data?.image_url);
    if (!imageUrl) throw new ApiInputError("กรุณาเลือกรูปปกหมวด");

    const updated = await sql`
      update portfolio_items
      set title = ${title},
          description = ${description},
          category = '',
          image_url = ${imageUrl},
          alt_text = ${title},
          review_url = ${`/review/${categoryId}`},
          is_published = true,
          sort_order = ${categoryId},
          updated_at = now()
      where id = ${body.id}::uuid
      returning id
    `;
    if (!updated.length) throw new ApiInputError('ไม่พบข้อมูลที่แก้ไขในฐานข้อมูล');
    const saved = await readPortfolioCategories();
    const canonical = saved.find((row) => portfolioCategoryId(row) === categoryId);
    if (!canonical || canonical.id !== body.id || canonical.title !== title || canonical.description !== description || canonical.image_url !== imageUrl) {
      return NextResponse.json({ error: 'บันทึกแล้วแต่ข้อมูลที่อ่านกลับจาก Neon ไม่ตรงกับรายการที่แก้ไข อาจมีผลงานซ้ำในหมวดนี้' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
    }
    return NextResponse.json({ ok: true, item: canonical }, { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } });
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "บันทึกตัวอย่างผลงานไม่สำเร็จ");
  }
}

export async function DELETE() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  return NextResponse.json(
    { error: "ตัวอย่างผลงานถูกล็อกไว้ 3 หมวด ไม่สามารถลบหมวดได้" },
    { status: 405 },
  );
}
