import { getSql } from "@/lib/neon/server";

export type AdminVariant = {
  id: string;
  code: string;
  label: string;
  price_text: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminProduct = {
  id: string;
  legacy_id: number | null;
  name: string;
  description: string;
  main_image_url: string;
  sort_order: number;
  is_active: boolean;
  product_variants: AdminVariant[];
};

export type AdminAddon = {
  id: string;
  legacy_id: number | null;
  name: string;
  price_text: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

export type AdminCategory = {
  id: string;
  size_label: string;
  sort_order: number;
  is_active: boolean;
  products: AdminProduct[];
  product_addons: AdminAddon[];
};

export async function getAdminProductCategories(): Promise<AdminCategory[]> {
  const sql = getSql();
  const [categoryRows, productRows, variantRows, addonRows] = await sql.transaction([
    sql`select id, size_label, sort_order, is_active from product_categories order by sort_order, created_at`,
    sql`select id, category_id, legacy_id, name, description, main_image_url, sort_order, is_active from products order by sort_order, created_at`,
    sql`select id, product_id, code, label, price_text, image_url, sort_order, is_active from product_variants order by sort_order, created_at`,
    sql`select id, category_id, legacy_id, name, price_text, image_url, sort_order, is_active from product_addons order by sort_order, created_at`,
  ]);

  const variantsByProduct = new Map<string, AdminVariant[]>();
  for (const row of variantRows as any[]) {
    const list = variantsByProduct.get(row.product_id) ?? [];
    list.push({
      id: row.id,
      code: row.code,
      label: row.label,
      price_text: row.price_text,
      image_url: row.image_url,
      sort_order: row.sort_order,
      is_active: row.is_active,
    });
    variantsByProduct.set(row.product_id, list);
  }

  const productsByCategory = new Map<string, AdminProduct[]>();
  for (const row of productRows as any[]) {
    const list = productsByCategory.get(row.category_id) ?? [];
    list.push({
      id: row.id,
      legacy_id: row.legacy_id,
      name: row.name,
      description: row.description,
      main_image_url: row.main_image_url,
      sort_order: row.sort_order,
      is_active: row.is_active,
      product_variants: variantsByProduct.get(row.id) ?? [],
    });
    productsByCategory.set(row.category_id, list);
  }

  const addonsByCategory = new Map<string, AdminAddon[]>();
  for (const row of addonRows as any[]) {
    const list = addonsByCategory.get(row.category_id) ?? [];
    list.push({
      id: row.id,
      legacy_id: row.legacy_id,
      name: row.name,
      price_text: row.price_text,
      image_url: row.image_url,
      sort_order: row.sort_order,
      is_active: row.is_active,
    });
    addonsByCategory.set(row.category_id, list);
  }

  return (categoryRows as any[]).map((row) => ({
    id: row.id,
    size_label: row.size_label,
    sort_order: row.sort_order,
    is_active: row.is_active,
    products: productsByCategory.get(row.id) ?? [],
    product_addons: addonsByCategory.get(row.id) ?? [],
  }));
}
