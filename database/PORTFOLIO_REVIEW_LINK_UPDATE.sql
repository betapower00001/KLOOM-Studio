-- เพิ่มลิงก์หน้ารีวิวให้แต่ละรายการในเมนู "ตัวอย่างผลงานของเรา"
-- แก้เฉพาะระบบหลังบ้าน ไม่แก้ไฟล์หรือการแสดงผลของหน้าบ้าน

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

-- ผูกข้อมูลเดิมกับหน้ารีวิวเดิม โดยไม่ทับลิงก์ที่ผู้ดูแลกรอกไว้แล้ว
update public.portfolio_items
set review_url = '/review/1'
where image_url = '/EX-1.jpg' and coalesce(review_url, '') = '';

update public.portfolio_items
set review_url = '/review/2'
where image_url = '/EX-2.jpg' and coalesce(review_url, '') = '';

update public.portfolio_items
set review_url = '/review/3'
where image_url = '/EX-3.jpg' and coalesce(review_url, '') = '';
