-- ใช้ไฟล์นี้เมื่อต้องการเพิ่มระบบ "ตัวอย่างผลงานของเรา" ให้ฐานข้อมูลเดิม
-- ไม่เปลี่ยนแปลงตารางหรือข้อมูลที่หน้าเว็บไซต์เดิมกำลังใช้งาน

create extension if not exists pgcrypto;

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

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_items_updated_at on public.portfolio_items;
create trigger set_portfolio_items_updated_at
before update on public.portfolio_items
for each row execute function public.set_updated_at();

create index if not exists idx_portfolio_items_published_sort
  on public.portfolio_items (is_published, sort_order);

create index if not exists idx_portfolio_items_category_sort
  on public.portfolio_items (category, sort_order);

-- นำตัวอย่างผลงานเดิม 3 รายการจากหน้าเว็บไซต์มาแสดงในระบบหลังบ้าน
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
