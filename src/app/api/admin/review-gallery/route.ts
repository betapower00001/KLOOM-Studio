import { del as deleteBlob } from "@vercel/blob";
import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function cleanText(value: unknown, maximum: number) {
  return String(value ?? "").trim().slice(0, maximum);
}

function categoryValue(value: unknown) {
  const categoryId = Number(value);
  if (!Number.isInteger(categoryId) || categoryId < 1 || categoryId > 3) {
    throw new ApiInputError("หมวดรีวิวต้องเป็น 1, 2 หรือ 3");
  }
  return categoryId;
}

function imageValues(data: Record<string, unknown>) {
  const categoryId = categoryValue(data.category_id);
  const imageUrl = cleanText(data.image_url, 2000);
  if (!imageUrl) throw new ApiInputError("กรุณาอัปโหลดรูปรีวิว");
  if (!imageUrl.startsWith("/") && !/^https?:\/\//i.test(imageUrl)) {
    throw new ApiInputError("URL รูปภาพไม่ถูกต้อง");
  }

  const sortOrder = Number(data.sort_order);
  return {
    categoryId,
    imageUrl,
    altText: cleanText(data.alt_text, 250),
    isPublished: data.is_published !== false,
    sortOrder: Number.isFinite(sortOrder) ? Math.trunc(sortOrder) : 0,
  };
}

function missingTableMessage(error: unknown) {
  return error instanceof Error && /review_gallery_images|does not exist/i.test(error.message)
    ? "ฐานข้อมูลภาพรีวิวยังไม่อัปเดต กรุณารัน APPLY_REVIEW_GALLERY_WINDOWS.bat แล้วเปิดระบบใหม่"
    : null;
}

export async function GET(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const url = new URL(request.url);
    const rawCategory = url.searchParams.get("category");
    const sql = getSql();

    if (rawCategory) {
      const categoryId = categoryValue(rawCategory);
      return NextResponse.json(await sql`
        select id, category_id, image_url, alt_text, is_published, sort_order
        from review_gallery_images
        where category_id = ${categoryId}
        order by sort_order, created_at
      `);
    }

    return NextResponse.json(await sql`
      select id, category_id, image_url, alt_text, is_published, sort_order
      from review_gallery_images
      order by category_id, sort_order, created_at
    `);
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "โหลดภาพรีวิวไม่สำเร็จ");
  }
}

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const data = imageValues((await request.json()) as Record<string, unknown>);
    const sql = getSql();
    const [created] = await sql`
      insert into review_gallery_images (
        category_id, image_url, alt_text, is_published, sort_order
      ) values (
        ${data.categoryId}, ${data.imageUrl}, ${data.altText},
        ${data.isPublished}, ${data.sortOrder}
      )
      on conflict (category_id, image_url) do update
      set alt_text = excluded.alt_text,
          is_published = excluded.is_published,
          sort_order = excluded.sort_order
      returning id
    `;
    return NextResponse.json({ ok: true, id: created?.id });
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "เพิ่มภาพรีวิวไม่สำเร็จ");
  }
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json()) as {
      id?: string;
      data?: Record<string, unknown>;
    };
    if (!body.id) throw new ApiInputError("ไม่พบรหัสรูปรีวิว");

    const data = imageValues(body.data ?? {});
    const sql = getSql();
    const result = await sql`
      update review_gallery_images
      set category_id = ${data.categoryId},
          image_url = ${data.imageUrl},
          alt_text = ${data.altText},
          is_published = ${data.isPublished},
          sort_order = ${data.sortOrder}
      where id = ${body.id}::uuid
      returning id
    `;
    if (result.length === 0) throw new ApiInputError("ไม่พบรูปรีวิวที่ต้องการแก้ไข");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "บันทึกภาพรีวิวไม่สำเร็จ");
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) throw new ApiInputError("ไม่พบรหัสรูปรีวิว");

    const sql = getSql();
    const result = await sql`
      delete from review_gallery_images
      where id = ${body.id}::uuid
      returning id, image_url
    `;
    const removed = result[0] as { id?: string; image_url?: string } | undefined;
    if (!removed?.id) throw new ApiInputError("ไม่พบรูปรีวิวที่ต้องการลบ");

    if (
      removed.image_url?.startsWith("https://") &&
      removed.image_url.includes("blob.vercel-storage.com") &&
      process.env.BLOB_READ_WRITE_TOKEN
    ) {
      try {
        await deleteBlob(removed.image_url);
      } catch (blobError) {
        console.warn("ลบไฟล์จาก Vercel Blob ไม่สำเร็จ แต่ลบออกจากแกลเลอรีแล้ว", blobError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = missingTableMessage(error);
    if (message) return NextResponse.json({ error: message }, { status: 503 });
    return apiError(error, "ลบภาพรีวิวไม่สำเร็จ");
  }
}
