-- KLOOM Studio CMS schema for Neon PostgreSQL
-- Run this file once in Neon SQL Editor, then run database/seed.sql.

create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  password_hash text not null,
  display_name text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  size_label text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_categories(id) on delete cascade,
  legacy_id integer,
  name text not null,
  description text not null default '',
  main_image_url text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(category_id, legacy_id)
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  code text not null,
  label text not null,
  price_text text not null,
  image_url text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(product_id, code)
);

create table if not exists public.product_addons (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.product_categories(id) on delete cascade,
  legacy_id integer,
  name text not null,
  price_text text not null,
  image_url text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(category_id, legacy_id)
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  cover_image_url text not null default '',
  content_html text not null default '',
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null default '',
  quote text not null,
  image_url text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ข้อมูลตัวอย่างผลงานสำหรับระบบหลังบ้าน
-- ยังไม่เชื่อมกับหน้าเว็บไซต์เดิมจนกว่าจะมีการเปลี่ยนแปลงส่วนหน้าในอนาคต
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default '',
  image_url text not null default '',
  alt_text text not null default '',
  review_url text not null default '',
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_items
  add column if not exists review_url text not null default '';

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_admin_users_updated_at on public.admin_users;
create trigger set_admin_users_updated_at before update on public.admin_users
for each row execute function public.set_updated_at();

drop trigger if exists set_product_categories_updated_at on public.product_categories;
create trigger set_product_categories_updated_at before update on public.product_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_product_variants_updated_at on public.product_variants;
create trigger set_product_variants_updated_at before update on public.product_variants
for each row execute function public.set_updated_at();

drop trigger if exists set_product_addons_updated_at on public.product_addons;
create trigger set_product_addons_updated_at before update on public.product_addons
for each row execute function public.set_updated_at();

drop trigger if exists set_articles_updated_at on public.articles;
create trigger set_articles_updated_at before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;
create trigger set_portfolio_items_updated_at before update on public.portfolio_items
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

insert into public.site_settings (key, value)
values
  ('contact', '{"phone":"088-642-4699","line":"@kloomstudio","email":"gowgalz@gmail.com","address":"215 เพชรเกษม 28 แยก 22 เขตภาษีเจริญ กรุงเทพมหานคร 10160"}'::jsonb),
  ('hero', '{"title":"เพราะสไตล์ของคุณ…ไม่เหมือนใคร","subtitle":"เราพร้อมออกแบบลุคในแบบที่เป็นตัวคุณ","image_url":"/image-1.jpg","button_text":"Discover More"}'::jsonb)
on conflict (key) do nothing;

-- Indexes used by public pages and the administrator dashboard.
create index if not exists idx_product_categories_active_sort
  on public.product_categories (is_active, sort_order);
create index if not exists idx_products_category_active_sort
  on public.products (category_id, is_active, sort_order);
create index if not exists idx_product_variants_product_active_sort
  on public.product_variants (product_id, is_active, sort_order);
create index if not exists idx_product_addons_category_active_sort
  on public.product_addons (category_id, is_active, sort_order);
create index if not exists idx_articles_published_sort
  on public.articles (is_published, sort_order);
create index if not exists idx_testimonials_published_sort
  on public.testimonials (is_published, sort_order);
create index if not exists idx_portfolio_items_published_sort
  on public.portfolio_items (is_published, sort_order);
create index if not exists idx_portfolio_items_category_sort
  on public.portfolio_items (category, sort_order);

-- นำข้อมูลตัวอย่างผลงานเดิมจากหน้าเว็บไซต์เข้าสู่ระบบหลังบ้าน
-- เพิ่มเฉพาะรายการที่ยังไม่มี URL รูปนี้ จึงรันซ้ำได้โดยไม่เกิดข้อมูลซ้ำ
insert into public.portfolio_items (title, description, category, image_url, alt_text, review_url, is_published, sort_order)
select 'เรียบหรู',
       'ออกแบบและพัฒนาเว็บไซต์สั่งตัดสูทเฉพาะบุคคลด้วยดีไซน์เรียบหรู',
       'ผลงานเดิมจากหน้าเว็บไซต์', '/EX-1.jpg',
       'ตัวอย่างผลงาน KLOOM Studio รูปที่ 1', '/review/1', true, 1
where not exists (select 1 from public.portfolio_items where image_url = '/EX-1.jpg');

insert into public.portfolio_items (title, description, category, image_url, alt_text, review_url, is_published, sort_order)
select 'นำชันแฟชั่น',
       'ดีไซน์เว็บไซต์นำเสนอคอลเลกชันเสื้อผ้าแฟชั่นในสไตล์โมเดิร์น',
       'ผลงานเดิมจากหน้าเว็บไซต์', '/EX-2.jpg',
       'ตัวอย่างผลงาน KLOOM Studio รูปที่ 2', '/review/2', true, 2
where not exists (select 1 from public.portfolio_items where image_url = '/EX-2.jpg');

insert into public.portfolio_items (title, description, category, image_url, alt_text, review_url, is_published, sort_order)
select 'ดีไซน์เป็นเอกลักษณ์',
       'จัดทำเว็บไซต์พอร์ตโฟลิโอสำหรับดีไซเนอร์พร้อมระบบแกลเลอรี',
       'ผลงานเดิมจากหน้าเว็บไซต์', '/EX-3.jpg',
       'ตัวอย่างผลงาน KLOOM Studio รูปที่ 3', '/review/3', true, 3
where not exists (select 1 from public.portfolio_items where image_url = '/EX-3.jpg');


-- ผูกผลงานเดิมกับหน้ารีวิวเดิม โดยไม่ทับค่าที่ผู้ดูแลกำหนดไว้แล้ว
update public.portfolio_items set review_url = '/review/1'
where image_url = '/EX-1.jpg' and coalesce(review_url, '') = '';
update public.portfolio_items set review_url = '/review/2'
where image_url = '/EX-2.jpg' and coalesce(review_url, '') = '';
update public.portfolio_items set review_url = '/review/3'
where image_url = '/EX-3.jpg' and coalesce(review_url, '') = '';

-- ============================================================
-- ระบบจัดการภาพรีวิวแยก 3 หมวด (/review/1, /review/2, /review/3)
-- ============================================================
create table if not exists public.review_gallery_images (
  id uuid primary key default gen_random_uuid(),
  category_id integer not null check (category_id between 1 and 3),
  image_url text not null,
  alt_text text not null default '',
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, image_url)
);

create index if not exists idx_review_gallery_category_published_sort
  on public.review_gallery_images (category_id, is_published, sort_order, created_at);

drop trigger if exists set_review_gallery_images_updated_at on public.review_gallery_images;
create trigger set_review_gallery_images_updated_at
before update on public.review_gallery_images
for each row execute function public.set_updated_at();

insert into public.review_gallery_images (
  category_id, image_url, alt_text, is_published, sort_order
)
select
  category_id,
  '/review/reviwe-' || image_number || '.jpg',
  'ภาพรีวิวหมวด ' || category_id || ' รูปที่ ' || image_number,
  true,
  image_number
from generate_series(1, 3) as category_id
cross join generate_series(1, 180) as image_number
on conflict (category_id, image_url) do nothing;
