import fs from 'node:fs';

const products = JSON.parse(fs.readFileSync('src/data/fallback-products.json', 'utf8'));
const articles = JSON.parse(fs.readFileSync('src/data/fallback-articles.json', 'utf8'));
const q = (value) => `'${String(value ?? '').replaceAll("'", "''")}'`;

let sql = `-- Generated from the current hard-coded website content.\n-- Run after database/schema.sql.\n\nbegin;\n\n`;

for (const [categoryIndex, category] of products.entries()) {
  sql += `insert into public.product_categories (size_label, sort_order, is_active) values (${q(category.size)}, ${categoryIndex + 1}, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;\n`;
  for (const [productIndex, product] of category.products.entries()) {
    sql += `with c as (select id from public.product_categories where size_label = ${q(category.size)}),\nproduct_row as (\n  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)\n  select c.id, ${Number(product.id)}, ${q(product.name)}, ${q(product.desc)}, ${q(product.mainImage ?? product.colors?.[0]?.image ?? '')}, ${productIndex + 1}, true from c\n  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true\n  returning id\n)\n`;
    product.colors.forEach((color, colorIndex) => {
      sql += `${colorIndex ? '' : 'insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)\n'}select id, ${q(color.id)}, ${q(color.label)}, ${q(color.price)}, ${q(color.image)}, ${colorIndex + 1}, true from product_row${colorIndex === product.colors.length - 1 ? '\non conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;\n' : '\nunion all\n'}`;
    });
  }
  for (const [addonIndex, addon] of (category.addons ?? []).entries()) {
    sql += `insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)\nselect id, ${Number(addon.id)}, ${q(addon.name)}, ${q(addon.price)}, ${q(addon.image)}, ${addonIndex + 1}, true from public.product_categories where size_label = ${q(category.size)}\non conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;\n`;
  }
}

for (const [index, article] of articles.entries()) {
  sql += `insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values (${q(article.slug)}, ${q(article.title)}, ${q(article.excerpt)}, ${q(article.cover_image_url)}, ${q(article.content_html)}, true, ${article.sort_order ?? index + 1}) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;\n`;
}

sql += `\ninsert into public.testimonials (customer_name, quote, is_published, sort_order)\nselect 'KLOOM Studio', 'KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว', true, 1\nwhere not exists (select 1 from public.testimonials);\n\ncommit;\n`;
fs.writeFileSync('database/seed.sql', sql);
console.log('Generated database/seed.sql');
