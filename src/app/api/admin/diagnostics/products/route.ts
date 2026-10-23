import { NextResponse } from "next/server";
import { authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Admin-only: check whether color variants have actually been saved/published. */
export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const sql = getSql();
    const rows = await sql`
      select v.code, v.label, v.image_url, v.is_active as variant_active,
             p.name as product_name, p.is_active as product_active,
             c.size_label, c.is_active as category_active
      from product_variants v
      join products p on p.id = v.product_id
      join product_categories c on c.id = p.category_id
      where v.code ilike '%sky%' or v.label ilike '%ฟ้า%'
      order by c.sort_order, p.sort_order, v.sort_order
    `;
    const matchingVariants = (rows as any[]).map((row) => ({
      code: row.code,
      label: row.label,
      size: row.size_label,
      product: row.product_name,
      image_url: row.image_url,
      variant_active: row.variant_active,
      product_active: row.product_active,
      category_active: row.category_active,
      visible_on_website: Boolean(row.variant_active && row.product_active && row.category_active),
    }));

    return NextResponse.json(
      { database_query: "ok", matching_variants: matchingVariants },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return apiError(error, "ตรวจสอบตัวเลือกสีสินค้าไม่สำเร็จ");
  }
}
