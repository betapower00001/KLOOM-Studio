import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";
import { getPublicProducts } from "@/lib/cms/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

type VariantDiagnostic = {
  code: string;
  label: string;
  image_url: string;
  variant_active: boolean;
  product_name: string;
  product_active: boolean;
  size_label: string;
  category_active: boolean;
};

/** Admin-only checks that go beyond SELECT 1: tables, publishing, image URL, CMS read. */
export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const sql = getSql();
    const existence = await sql`
      select
        to_regclass('public.product_categories') is not null as categories_ready,
        to_regclass('public.products') is not null as products_ready,
        to_regclass('public.product_variants') is not null as variants_ready,
        to_regclass('public.product_addons') is not null as addons_ready
    `;
    const tables = existence[0] as {
      categories_ready: boolean;
      products_ready: boolean;
      variants_ready: boolean;
      addons_ready: boolean;
    };
    if (!Object.values(tables).every(Boolean)) {
      return NextResponse.json(
        {
          status: "database_tables_missing",
          tables,
          action: "ตรวจว่าฐานข้อมูล Production ได้รัน database/schema.sql ครบแล้วหรือไม่ ห้ามรัน seed.sql ทับข้อมูลจริง",
        },
        { status: 503, headers },
      );
    }

    // These queries test the same table joins and active filters used by public CMS.
    const [counts, variants, recentlyModified] = await sql.transaction([
      sql`
        select
          (select count(*)::int from product_categories) as categories_total,
          (select count(*)::int from products) as products_total,
          (select count(*)::int from product_variants) as variants_total,
          (select count(*)::int from product_variants where is_active = true) as variants_enabled,
          (select count(*)::int from product_variants where length(trim(image_url)) > 0) as variants_with_images
      `,
      sql`
        select v.code, v.label, v.image_url, v.is_active as variant_active,
               p.name as product_name, p.is_active as product_active,
               c.size_label, c.is_active as category_active
        from product_variants v
        join products p on p.id = v.product_id
        join product_categories c on c.id = p.category_id
        where v.code ilike '%sky%' or v.label ilike '%ฟ้า%'
        order by c.sort_order, p.sort_order, v.sort_order
        limit 50
      `,
      sql`
        select v.code, v.label, v.image_url, v.is_active as variant_active,
               p.name as product_name, p.is_active as product_active,
               c.size_label, c.is_active as category_active
        from product_variants v
        join products p on p.id = v.product_id
        join product_categories c on c.id = p.category_id
        order by v.updated_at desc
        limit 15
      `,
    ]);

    let publicRead: Record<string, unknown>;
    try {
      const publishedCategories = await getPublicProducts();
      const liveColors = publishedCategories.flatMap((category) =>
        category.products.flatMap((product) =>
          product.colors.map((color) => ({
            category: category.size,
            product: product.name,
            code: color.id,
            label: color.label,
          })),
        ),
      );
      publicRead = {
        status: "ok",
        categories: publishedCategories.length,
        products: publishedCategories.reduce((count, item) => count + item.products.length, 0),
        variants: liveColors.length,
        blue_sky_on_website: liveColors.filter((v) =>
          /sky/i.test(v.code) || /ฟ้า/i.test(v.label),
        ),
      };
    } catch (error) {
      publicRead = {
        status: "error",
        detail: error instanceof Error ? error.message : "Unknown CMS query error",
      };
    }

    const format = (row: VariantDiagnostic) => ({
      code: row.code,
      label: row.label,
      size: row.size_label,
      product: row.product_name,
      image_url: row.image_url,
      has_image: Boolean(row.image_url?.trim()),
      variant_active: row.variant_active,
      product_active: row.product_active,
      category_active: row.category_active,
      visible_on_website: Boolean(
        row.variant_active && row.product_active && row.category_active,
      ),
    });

    return NextResponse.json(
      {
        status: publicRead.status === "ok" ? "ok" : "public_cms_error",
        tables,
        counts: counts[0],
        blue_sky_matching_variants: (variants as VariantDiagnostic[]).map(format),
        recent_variant_updates: (recentlyModified as VariantDiagnostic[]).map(format),
        public_cms: publicRead,
        note: "ถ้าสีอยู่ในฐานข้อมูลแต่ visible_on_website=false ให้บันทึกติ๊กแสดงทั้งหมวด สินค้า และสี",
      },
      { status: publicRead.status === "ok" ? 200 : 503, headers },
    );
  } catch (error) {
    console.error("Product diagnostics failed:", error);
    return NextResponse.json(
      { status: "database_query_error", error: error instanceof Error ? error.message : "Unknown database error" },
      { status: 503, headers },
    );
  }
}
