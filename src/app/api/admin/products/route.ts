import { NextResponse } from "next/server";
import { ApiInputError, authorizeAdminApi, apiError } from "@/lib/api/admin";
import { getAdminProductCategories } from "@/lib/cms/admin";
import { getSql } from "@/lib/neon/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Entity = "category" | "product" | "variant" | "addon";
const entities = new Set<Entity>(["category", "product", "variant", "addon"]);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function entity(value: unknown): Entity {
  if (typeof value !== "string" || !entities.has(value as Entity)) {
    throw new ApiInputError("ไม่รู้จักประเภทรายการ");
  }
  return value as Entity;
}

function uuid(value: unknown, field = "รหัสรายการ") {
  const result = String(value ?? "").trim();
  if (!uuidPattern.test(result)) throw new ApiInputError(`${field}ไม่ถูกต้อง`);
  return result;
}

function requiredText(value: unknown, label: string, maxLength = 500) {
  const result = String(value ?? "").trim().slice(0, maxLength);
  if (!result) throw new ApiInputError(`กรุณากรอก${label}`);
  return result;
}

function optionalText(value: unknown, maxLength = 2000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function integer(value: unknown, fallback = 0) {
  const result = Number(value);
  return Number.isInteger(result) ? result : fallback;
}

function active(value: unknown) {
  return value === true;
}

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;
  try {
    return NextResponse.json(await getAdminProductCategories());
  } catch (error) {
    return apiError(error, "โหลดข้อมูลสินค้าไม่สำเร็จ");
  }
}

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json().catch(() => ({}))) as {
      entity?: unknown;
      data?: Record<string, unknown>;
    };
    const selectedEntity = entity(body.entity);
    const data = body.data ?? {};
    const sql = getSql();

    if (selectedEntity === "category") {
      await sql`
        insert into product_categories (size_label, sort_order, is_active)
        values (
          ${requiredText(data.size_label, "ชื่อหมวดขนาด", 200)},
          ${integer(data.sort_order)},
          ${active(data.is_active)}
        )
      `;
    } else if (selectedEntity === "product") {
      const inserted = await sql`
        insert into products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
        values (
          ${uuid(data.category_id, "รหัสหมวดสินค้า")}::uuid,
          ${integer(data.legacy_id)},
          ${requiredText(data.name, "ชื่อสินค้า")},
          ${optionalText(data.description, 3000)},
          ${optionalText(data.main_image_url)},
          ${integer(data.sort_order)},
          ${active(data.is_active)}
        )
        returning id
      `;
      const id = String((inserted[0] as { id: string }).id);
      await sql`
        insert into product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
        values (${id}::uuid, 'default', 'สีเริ่มต้น', '0 บาท/โหล', '', 1, false)
      `;
    } else if (selectedEntity === "variant") {
      await sql`
        insert into product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
        values (
          ${uuid(data.product_id, "รหัสสินค้า")}::uuid,
          ${requiredText(data.code, "รหัสสี", 100)},
          ${requiredText(data.label, "ชื่อสี", 200)},
          ${requiredText(data.price_text, "ราคา", 200)},
          ${optionalText(data.image_url)},
          ${integer(data.sort_order)},
          ${active(data.is_active)}
        )
      `;
    } else {
      await sql`
        insert into product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
        values (
          ${uuid(data.category_id, "รหัสหมวดสินค้า")}::uuid,
          ${integer(data.legacy_id)},
          ${requiredText(data.name, "ชื่อตัวเลือกเสริม")},
          ${requiredText(data.price_text, "ราคา", 200)},
          ${optionalText(data.image_url)},
          ${integer(data.sort_order)},
          ${active(data.is_active)}
        )
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "เพิ่มข้อมูลไม่สำเร็จ");
  }
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json().catch(() => ({}))) as {
      entity?: unknown;
      id?: unknown;
      data?: Record<string, unknown>;
    };
    const selectedEntity = entity(body.entity);
    const id = uuid(body.id);
    const data = body.data ?? {};
    const sql = getSql();

    if (selectedEntity === "category") {
      await sql`
        update product_categories
        set size_label = ${requiredText(data.size_label, "ชื่อหมวดขนาด", 200)},
            sort_order = ${integer(data.sort_order)},
            is_active = ${active(data.is_active)}
        where id = ${id}::uuid
      `;
    } else if (selectedEntity === "product") {
      await sql`
        update products
        set name = ${requiredText(data.name, "ชื่อสินค้า")},
            description = ${optionalText(data.description, 3000)},
            main_image_url = ${optionalText(data.main_image_url)},
            sort_order = ${integer(data.sort_order)},
            is_active = ${active(data.is_active)}
        where id = ${id}::uuid
      `;
    } else if (selectedEntity === "variant") {
      await sql`
        update product_variants
        set code = ${requiredText(data.code, "รหัสสี", 100)},
            label = ${requiredText(data.label, "ชื่อสี", 200)},
            price_text = ${requiredText(data.price_text, "ราคา", 200)},
            image_url = ${optionalText(data.image_url)},
            sort_order = ${integer(data.sort_order)},
            is_active = ${active(data.is_active)}
        where id = ${id}::uuid
      `;
    } else {
      await sql`
        update product_addons
        set name = ${requiredText(data.name, "ชื่อตัวเลือกเสริม")},
            price_text = ${requiredText(data.price_text, "ราคา", 200)},
            image_url = ${optionalText(data.image_url)},
            sort_order = ${integer(data.sort_order)},
            is_active = ${active(data.is_active)}
        where id = ${id}::uuid
      `;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "บันทึกข้อมูลไม่สำเร็จ");
  }
}

export async function DELETE(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json().catch(() => ({}))) as {
      entity?: unknown;
      id?: unknown;
    };
    const selectedEntity = entity(body.entity);
    const id = uuid(body.id);
    const sql = getSql();

    if (selectedEntity === "category") {
      await sql`delete from product_categories where id = ${id}::uuid`;
    } else if (selectedEntity === "product") {
      await sql`delete from products where id = ${id}::uuid`;
    } else if (selectedEntity === "variant") {
      await sql`delete from product_variants where id = ${id}::uuid`;
    } else {
      await sql`delete from product_addons where id = ${id}::uuid`;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, "ลบข้อมูลไม่สำเร็จ");
  }
}
