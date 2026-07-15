import fallbackProducts from "@/data/fallback-products.json";
import fallbackArticles from "@/data/fallback-articles.json";
import type { CmsArticle, CmsSettings, CmsTestimonial, ProductCategory } from "./types";
import { isDatabaseConfigured } from "@/lib/neon/config";
import { getSql } from "@/lib/neon/server";

function hashId(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const fallbackSettings: CmsSettings = {
  contact: {
    phone: "088-642-4699",
    line: "@kloomstudio",
    email: "gowgalz@gmail.com",
    address: "215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160",
  },
  hero: {
    title: "เพราะสไตล์ของคุณ…ไม่เหมือนใคร",
    subtitle: "เราพร้อมออกแบบลุคในแบบที่เป็นตัวคุณ",
    image_url: "/image-1.jpg",
    button_text: "Discover More",
  },
};

const fallbackTestimonials: CmsTestimonial[] = [
  {
    customer_name: "KLOOM Studio",
    quote: "KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว",
    image_url: "",
    published: true,
    sort_order: 1,
  },
];

export async function getPublicProducts(): Promise<ProductCategory[]> {
  if (!isDatabaseConfigured()) return fallbackProducts as ProductCategory[];

  try {
    const sql = getSql();
    const [categoryRows, productRows, variantRows, addonRows] = await sql.transaction([
      sql`select id, size_label, sort_order from product_categories where is_active = true order by sort_order, created_at`,
      sql`
        select p.id, p.category_id, p.legacy_id, p.name, p.description, p.main_image_url, p.sort_order
        from products p
        join product_categories c on c.id = p.category_id
        where p.is_active = true and c.is_active = true
        order by p.sort_order, p.created_at
      `,
      sql`
        select v.id, v.product_id, v.code, v.label, v.price_text, v.image_url, v.sort_order
        from product_variants v
        join products p on p.id = v.product_id
        join product_categories c on c.id = p.category_id
        where v.is_active = true and p.is_active = true and c.is_active = true
        order by v.sort_order, v.created_at
      `,
      sql`
        select a.id, a.category_id, a.legacy_id, a.name, a.price_text, a.image_url, a.sort_order
        from product_addons a
        join product_categories c on c.id = a.category_id
        where a.is_active = true and c.is_active = true
        order by a.sort_order, a.created_at
      `,
    ]);

    const variantsByProduct = new Map<string, any[]>();
    for (const row of variantRows as any[]) {
      const list = variantsByProduct.get(row.product_id) ?? [];
      list.push(row);
      variantsByProduct.set(row.product_id, list);
    }

    const productsByCategory = new Map<string, any[]>();
    for (const row of productRows as any[]) {
      const list = productsByCategory.get(row.category_id) ?? [];
      list.push(row);
      productsByCategory.set(row.category_id, list);
    }

    const addonsByCategory = new Map<string, any[]>();
    for (const row of addonRows as any[]) {
      const list = addonsByCategory.get(row.category_id) ?? [];
      list.push(row);
      addonsByCategory.set(row.category_id, list);
    }

    return (categoryRows as any[]).map((category) => ({
      id: category.id,
      size: category.size_label,
      products: (productsByCategory.get(category.id) ?? []).map((product) => ({
        id: product.legacy_id ?? hashId(product.id),
        dbId: product.id,
        name: product.name,
        desc: product.description,
        mainImage: product.main_image_url,
        colors: (variantsByProduct.get(product.id) ?? []).map((variant) => ({
          id: variant.code,
          image: variant.image_url,
          label: variant.label,
          price: variant.price_text,
        })),
      })),
      addons: (addonsByCategory.get(category.id) ?? []).map((addon) => ({
        id: addon.legacy_id ?? hashId(addon.id),
        dbId: addon.id,
        name: addon.name,
        image: addon.image_url,
        price: addon.price_text,
      })),
    }));
  } catch {
    return fallbackProducts as ProductCategory[];
  }
}

export async function getPublicArticles(): Promise<CmsArticle[]> {
  if (!isDatabaseConfigured()) return fallbackArticles as CmsArticle[];

  try {
    const sql = getSql();
    const rows = await sql`
      select id, slug, title, excerpt, cover_image_url, content_html, is_published, sort_order
      from articles
      where is_published = true
      order by sort_order, created_at
    `;
    return (rows as any[]).map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      cover_image_url: article.cover_image_url,
      content_html: article.content_html,
      published: article.is_published,
      sort_order: article.sort_order,
    }));
  } catch {
    return fallbackArticles as CmsArticle[];
  }
}

export async function getPublicArticle(slug: string): Promise<CmsArticle | null> {
  if (!isDatabaseConfigured()) {
    return (fallbackArticles as CmsArticle[]).find((article) => article.slug === slug) ?? null;
  }

  try {
    const sql = getSql();
    const rows = await sql`
      select id, slug, title, excerpt, cover_image_url, content_html, is_published, sort_order
      from articles
      where slug = ${slug} and is_published = true
      limit 1
    `;
    const article = rows[0] as any;
    if (!article) return null;
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      cover_image_url: article.cover_image_url,
      content_html: article.content_html,
      published: article.is_published,
      sort_order: article.sort_order,
    };
  } catch {
    return (fallbackArticles as CmsArticle[]).find((article) => article.slug === slug) ?? null;
  }
}

export async function getPublicTestimonials(): Promise<CmsTestimonial[]> {
  if (!isDatabaseConfigured()) return fallbackTestimonials;

  try {
    const sql = getSql();
    const rows = await sql`
      select id, customer_name, quote, image_url, is_published, sort_order
      from testimonials
      where is_published = true
      order by sort_order, created_at
    `;
    return (rows as any[]).map((item) => ({
      id: item.id,
      customer_name: item.customer_name,
      quote: item.quote,
      image_url: item.image_url,
      published: item.is_published,
      sort_order: item.sort_order,
    }));
  } catch {
    return fallbackTestimonials;
  }
}

export async function getPublicSettings(): Promise<CmsSettings> {
  if (!isDatabaseConfigured()) return fallbackSettings;

  try {
    const sql = getSql();
    const rows = await sql`
      select key, value
      from site_settings
      where key in ('contact', 'hero')
    `;

    const settings: CmsSettings = structuredClone(fallbackSettings);
    for (const row of rows as any[]) {
      const value = typeof row.value === "string" ? JSON.parse(row.value) : row.value;
      if (row.key === "contact") settings.contact = { ...settings.contact, ...value };
      if (row.key === "hero") settings.hero = { ...settings.hero, ...value };
    }
    return settings;
  } catch {
    return fallbackSettings;
  }
}


export type PublicReviewGalleryImage = {
  id?: string;
  image_url: string;
  alt_text: string;
};

function fallbackReviewGallery(categoryId: number): PublicReviewGalleryImage[] {
  if (![1, 2, 3].includes(categoryId)) return [];
  return Array.from({ length: 180 }, (_, index) => ({
    image_url: `/review/reviwe-${index + 1}.jpg`,
    alt_text: `ภาพรีวิวหมวด ${categoryId} รูปที่ ${index + 1}`,
  }));
}

export async function getPublicReviewGallery(
  categoryId: number,
): Promise<PublicReviewGalleryImage[]> {
  if (![1, 2, 3].includes(categoryId)) return [];
  if (!isDatabaseConfigured()) return fallbackReviewGallery(categoryId);

  try {
    const sql = getSql();
    const rows = await sql`
      select id, image_url, alt_text
      from review_gallery_images
      where category_id = ${categoryId} and is_published = true
      order by sort_order, created_at
    `;

    return (rows as any[]).map((item) => ({
      id: item.id,
      image_url: item.image_url,
      alt_text: item.alt_text,
    }));
  } catch (error) {
    if (error instanceof Error && /review_gallery_images|does not exist/i.test(error.message)) {
      return fallbackReviewGallery(categoryId);
    }
    return fallbackReviewGallery(categoryId);
  }
}
