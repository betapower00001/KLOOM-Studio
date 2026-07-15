import fs from 'node:fs';
const products = JSON.parse(fs.readFileSync('src/data/fallback-products.json', 'utf8'));
const articles = JSON.parse(fs.readFileSync('src/data/fallback-articles.json', 'utf8'));
const q = (value) => `'${String(value ?? '').replaceAll("'", "''")}'`;
let sql = `-- Generated from the current hard-coded website content.\n-- Run after supabase/schema.sql.\n\nbegin;\n\n`;
for (let ci = 0; ci < products.length; ci++) {
  const category = products[ci];
  sql += `insert into public.product_categories (size_label, sort_order, is_active) values (${q(category.size)}, ${ci + 1}, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;\n`;
  for (let pi = 0; pi < category.products.length; pi++) {
    const p = category.products[pi];
    sql += `with c as (select id from public.product_categories where size_label = ${q(category.size)}),\nproduct_row as (\n  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)\n  select c.id, ${Number(p.id)}, ${q(p.name)}, ${q(p.desc)}, ${q(p.mainImage || p.colors?.[0]?.image || '')}, ${pi + 1}, true from c\n  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true\n  returning id\n)\n`;
    p.colors.forEach((v, vi) => {
      if (vi > 0) {
        sql += `with c as (select id from public.product_categories where size_label = ${q(category.size)}), product_row as (select p2.id from public.products p2 join c on p2.category_id = c.id where p2.legacy_id = ${Number(p.id)} limit 1)\n`;
      }
      sql += `insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)\nselect id, ${q(v.id)}, ${q(v.label)}, ${q(v.price)}, ${q(v.image)}, ${vi + 1}, true from product_row\non conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;\n`;
    });
  }
  for (let ai = 0; ai < category.addons.length; ai++) {
    const a = category.addons[ai];
    sql += `insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)\nselect id, ${Number(a.id)}, ${q(a.name)}, ${q(a.price)}, ${q(a.image)}, ${ai + 1}, true from public.product_categories where size_label = ${q(category.size)}\non conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;\n`;
  }
  sql += '\n';
}
for (const a of articles) {
  sql += `insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order)\nvalues (${q(a.slug)}, ${q(a.title)}, ${q(a.excerpt)}, ${q(a.cover_image_url)}, ${q(a.content_html)}, true, ${Number(a.sort_order)})\non conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = excluded.is_published, sort_order = excluded.sort_order;\n\n`;
}
sql += `insert into public.testimonials (customer_name, quote, is_published, sort_order)\nselect 'KLOOM Studio', 'KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว', true, 1\nwhere not exists (select 1 from public.testimonials);\n\ncommit;\n`;
fs.writeFileSync('supabase/seed.sql', sql);
console.log('Generated supabase/seed.sql');
