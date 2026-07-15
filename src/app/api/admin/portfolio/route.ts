import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const fixedPortfolio = [
  {
    categoryId: 1,
    title: "เรียบหรู",
    description: "ออกแบบและพัฒนางานถุงคลุมชุดที่ดูดี เหมาะกับภาพลักษณ์ของร้าน",
    imageUrl: "/EX-1.jpg",
  },
  {
    categoryId: 2,
    title: "นำซีนแฟชั่น",
    description: "ดีไซน์งานให้มีเอกลักษณ์ สวยทันสมัย และช่วยเสริมภาพลักษณ์แบรนด์",
    imageUrl: "/EX-2.jpg",
  },
  {
    categoryId: 3,
    title: "ดีไซน์เป็นเอกลักษณ์",
    description: "รวบรวมผลงานจริงและภาพรีวิวจากลูกค้าในแต่ละรูปแบบงาน",
    imageUrl: "/EX-3.jpg",
  },
] as const;

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
};

function cleanText(value: unknown, maximum: number) {
  return String(value ?? "").trim().slice(0, maximum);
}

function fixedCategoryFromRow(row: Pick<PortfolioRow, "review_url" | "sort_order">) {
  const match = String(row.review_url || "").match(/\/review\/(1|2|3)(?:\/|$|\?)/i);
  if (match) return Number(match[1]);
  const order = Number(row.sort_order);
  return order >= 1 && order <= 3 ? order : null;
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

async function ensureFixedPortfolio() {
  const sql = getSql();
  const current = (await sql`
    select id, title, description, category, image_url, alt_text, review_url,
           is_published, sort_order
    from portfolio_items
    order by sort_order, created_at
  `) as PortfolioRow[];

  const usedIds = new Set<string>();

  for (const preset of fixedPortfolio) {
    let row = current.find(
      (item) => !usedIds.has(item.id) && fixedCategoryFromRow(item) === preset.categoryId,
    );

    if (!row) {
      row = current.find(
        (item) => !usedIds.has(item.id) && Number(item.sort_order) === preset.categoryId,
      );
    }

    if (!row) {
      const [created] = (await sql`
        insert into portfolio_items (
          title, description, category, image_url, alt_text, review_url, is_published, sort_order
        ) values (
          ${preset.title}, ${preset.description}, '', ${preset.imageUrl}, ${preset.title},
          ${`/review/${preset.categoryId}`}, true, ${preset.categoryId}
        )
        returning id, title, description, category, image_url, alt_text, review_url,
                  is_published, sort_order
      `) as PortfolioRow[];
      if (created) {
        current.push(created);
        row = created;
      }
    } else {
      const [updated] = (await sql`
        update portfolio_items
        set review_url = ${`/review/${preset.categoryId}`},
            sort_order = ${preset.categoryId},
            is_published = true,
            category = '',
            alt_text = case when trim(coalesce(alt_text, '')) = '' then title else alt_text end
        where id = ${row.id}::uuid
        returning id, title, description, category, image_url, alt_text, review_url,
                  is_published, sort_order
      `) as PortfolioRow[];
      if (updated) row = updated;
    }

    if (row) usedIds.add(row.id);
  }

  const refreshed = (await sql`
    select id, title, description, category, image_url, alt_text, review_url,
           is_published, sort_order
    from portfolio_items
    where review_url in ('/review/1', '/review/2', '/review/3')
    order by sort_order
  `) as PortfolioRow[];

  return fixedPortfolio
    .map((preset) =>
      refreshed.find((row) => fixedCategoryFromRow(row) === preset.categoryId),
    )
    .filter((row): row is PortfolioRow => Boolean(row));
}

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    return NextResponse.json(await ensureFixedPortfolio());
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

    const categoryId = fixedCategoryFromRow(existing);
    if (!categoryId) {
      throw new ApiInputError("รายการนี้ไม่ใช่หนึ่งใน 3 หมวดตัวอย่างผลงาน");
    }

    const title = cleanText(body.data?.title, 200);
    if (!title) throw new ApiInputError("กรุณากรอกชื่อหมวด");

    const description = cleanText(body.data?.description, 500);
    const imageUrl = validateImageUrl(body.data?.image_url);
    if (!imageUrl) throw new ApiInputError("กรุณาเลือกรูปปกหมวด");

    await sql`
      update portfolio_items
      set title = ${title},
          description = ${description},
          category = '',
          image_url = ${imageUrl},
          alt_text = ${title},
          review_url = ${`/review/${categoryId}`},
          is_published = true,
          sort_order = ${categoryId}
      where id = ${body.id}::uuid
    `;

    return NextResponse.json({ ok: true });
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
