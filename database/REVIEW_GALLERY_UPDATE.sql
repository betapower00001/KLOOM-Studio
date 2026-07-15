-- KLOOM Studio: ระบบจัดการภาพรีวิวแยก 3 หมวด
-- รันซ้ำได้โดยไม่สร้างข้อมูลซ้ำ

create extension if not exists pgcrypto;

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_review_gallery_images_updated_at on public.review_gallery_images;
create trigger set_review_gallery_images_updated_at
before update on public.review_gallery_images
for each row execute function public.set_updated_at();

-- ดึงภาพรีวิวเดิมเข้าฐานข้อมูล เพื่อให้หน้า /review/1, /review/2, /review/3
-- แสดงเหมือนเดิมทันทีหลังติดตั้ง ระบบเดิมใช้ชื่อไฟล์ reviwe-1.jpg ถึง reviwe-180.jpg
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
