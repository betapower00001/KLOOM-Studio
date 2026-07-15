-- Generated from the current hard-coded website content.
-- Run after database/schema.sql.

begin;

insert into public.product_categories (size_label, sort_order, is_active) values ('25x37 นิ้ว', 1, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x37 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 1, 'พีวีซีใส / พีวีซีใส', 'ขนาด 25x37 นิ้ว', '/PVC-Clear-25x37.png', 1, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'clear', 'ใส', '400 บาท/โหล', '/PVC-Clear-25x37.png', 1, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x37 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 2, 'พีวีซีใส / สปันบอนด์', 'ขนาด 25x37 นิ้ว', '/PVC-Spon-white.png', 2, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '400 บาท/โหล', '/PVC-Spon-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '400 บาท/โหล', '/PVC-Spon-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '400 บาท/โหล', '/PVC-Spon-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '400 บาท/โหล', '/PVC-Spon-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '400 บาท/โหล', '/PVC-Spon-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '400 บาท/โหล', '/PVC-Spon-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '400 บาท/โหล', '/PVC-Spon-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '400 บาท/โหล', '/PVC-Spon-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x37 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 3, 'สปันบอนด์ / สปันบอนด์', 'ขนาด 25x37 นิ้ว', '/Spon-Spon-white.png', 3, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '500 บาท/โหล', '/Spon-Spon-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '500 บาท/โหล', '/Spon-Spon-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '500 บาท/โหล', '/Spon-Spon-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '500 บาท/โหล', '/Spon-Spon-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '500 บาท/โหล', '/Spon-Spon-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '500 บาท/โหล', '/Spon-Spon-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '500 บาท/โหล', '/Spon-Spon-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '500 บาท/โหล', '/Spon-Spon-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 101, 'หมวกด้านหน้า', '50 บาท/โหล', '/Addon-1.png', 1, true from public.product_categories where size_label = '25x37 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 102, 'หูหิ้ว บน-ล่าง', '50 บาท/โหล', '/Addon-2.png', 2, true from public.product_categories where size_label = '25x37 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 103, 'กระดุม บน-ล่าง', '50 บาท/โหล', '/Addon-3.png', 3, true from public.product_categories where size_label = '25x37 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_categories (size_label, sort_order, is_active) values ('25x55 นิ้ว', 2, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x55 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 4, 'พีวีซีใส / พีวีซีใส', 'ขนาด 25x55 นิ้ว', '/PVC-Clear-25x55.png', 1, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'clear', 'ใส', '700 บาท/โหล', '/PVC-Clear-25x55.png', 1, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x55 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 5, 'พีวีซีใส / สปันบอนด์', 'ขนาด 25x55 นิ้ว', '/PVC-spon25x55-white.png', 2, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '700 บาท/โหล', '/PVC-spon25x55-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '700 บาท/โหล', '/PVC-spon25x55-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '700 บาท/โหล', '/PVC-spon25x55-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '700 บาท/โหล', '/PVC-spon25x55-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '700 บาท/โหล', '/PVC-spon25x55-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '700 บาท/โหล', '/PVC-spon25x55-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '700 บาท/โหล', '/PVC-spon25x55-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '700 บาท/โหล', '/PVC-spon25x55-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x55 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 6, 'สปันบอนด์ / สปันบอนด์', 'ขนาด 25x55 นิ้ว', '/spon25x55-white.png', 3, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '900 บาท/โหล', '/spon25x55-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '900 บาท/โหล', '/spon25x55-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '900 บาท/โหล', '/spon25x55-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '900 บาท/โหล', '/spon25x55-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '900 บาท/โหล', '/spon25x55-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '900 บาท/โหล', '/spon25x55-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '900 บาท/โหล', '/spon25x55-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '900 บาท/โหล', '/spon25x55-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 101, 'หมวกด้านหน้า', '50 บาท/โหล', '/Addon-1.png', 1, true from public.product_categories where size_label = '25x55 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 102, 'หูหิ้ว บน-ล่าง', '50 บาท/โหล', '/Addon-2.png', 2, true from public.product_categories where size_label = '25x55 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 103, 'กระดุม บน-ล่าง', '50 บาท/โหล', '/Addon-3.png', 3, true from public.product_categories where size_label = '25x55 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_categories (size_label, sort_order, is_active) values ('25x65 นิ้ว', 3, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x65 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 7, 'พีวีซีใส / พีวีซีใส', 'ขนาด 25x65 นิ้ว', '/PVC-Clear-25x65.png', 1, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'clear', 'ใส', '800 บาท/โหล', '/PVC-Clear-25x65.png', 1, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x65 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 8, 'พีวีซีใส / สปันบอนด์', 'ขนาด 25x65 นิ้ว', '/PVCspon-25x65---white.png', 2, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '800 บาท/โหล', '/PVCspon-25x65---white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '800 บาท/โหล', '/PVCspon-25x65---gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '800 บาท/โหล', '/PVCspon-25x65---beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '800 บาท/โหล', '/PVCspon-25x65---brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '800 บาท/โหล', '/PVCspon-25x65---blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '800 บาท/โหล', '/PVCspon-25x65---black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '800 บาท/โหล', '/PVCspon-25x65---green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '800 บาท/โหล', '/PVCspon-25x65---red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x65 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 9, 'สปันบอนด์ / สปันบอนด์', 'ขนาด 25x65 นิ้ว', '/spon-25x65---white.png', 3, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '1,000 บาท/โหล', '/spon-25x65---white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '1,000 บาท/โหล', '/spon-25x65---gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '1,000 บาท/โหล', '/spon-25x65---beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '1,000 บาท/โหล', '/spon-25x65---brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '1,000 บาท/โหล', '/spon-25x65---blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '1,000 บาท/โหล', '/spon-25x65---black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '1,000 บาท/โหล', '/spon-25x65---green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '1,000 บาท/โหล', '/spon-25x65---red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 101, 'หมวกด้านหน้า', '50 บาท/โหล', '/Addon-1.png', 1, true from public.product_categories where size_label = '25x65 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 102, 'หูหิ้ว บน-ล่าง', '50 บาท/โหล', '/Addon-2.png', 2, true from public.product_categories where size_label = '25x65 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 103, 'กระดุม บน-ล่าง', '50 บาท/โหล', '/Addon-3.png', 3, true from public.product_categories where size_label = '25x65 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_categories (size_label, sort_order, is_active) values ('25x70 นิ้ว', 4, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x70 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 10, 'พีวีซีใส / พีวีซีใส', 'ขนาด 25x70 นิ้ว', '/PVC-Clear-25x70.png', 1, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'clear', 'ใส', '900 บาท/โหล', '/PVC-Clear-25x70.png', 1, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x70 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 11, 'พีวีซีใส / สปันบอนด์', 'ขนาด 25x70 นิ้ว', '/PVC-Spanpon-25x70-white.png', 2, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '900 บาท/โหล', '/PVC-Spanpon-25x70-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '900 บาท/โหล', '/PVC-Spanpon-25x70-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '900 บาท/โหล', '/PVC-Spanpon-25x70-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '900 บาท/โหล', '/PVC-Spanpon-25x70-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '900 บาท/โหล', '/PVC-Spanpon-25x70-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '900 บาท/โหล', '/PVC-Spanpon-25x70-black.png', 6, true from product_row
union all
select id, 'geeen', 'เขียว', '900 บาท/โหล', '/PVC-Spanpon-25x70-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '900 บาท/โหล', '/PVC-Spanpon-25x70-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x70 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 12, 'สปันบอนด์ / สปันบอนด์', 'ขนาด 25x70 นิ้ว', '/Spanpon-25x70-white.png', 3, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '1,100 บาท/โหล', '/Spanpon-25x70-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '1,000 บาท/โหล', '/Spanpon-25x70-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '1,100 บาท/โหล', '/Spanpon-25x70-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '1,100 บาท/โหล', '/Spanpon-25x70-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '1,100 บาท/โหล', '/Spanpon-25x70-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '1,100 บาท/โหล', '/Spanpon-25x70-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '1,100 บาท/โหล', '/Spanpon-25x70-geen.png', 7, true from product_row
union all
select id, 'red', 'แดง', '1,100 บาท/โหล', '/Spanpon-25x70-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 101, 'หมวกด้านหน้า', '50 บาท/โหล', '/Addon-1.png', 1, true from public.product_categories where size_label = '25x70 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 102, 'หูหิ้ว บน-ล่าง', '50 บาท/โหล', '/Addon-2.png', 2, true from public.product_categories where size_label = '25x70 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 103, 'กระดุม บน-ล่าง', '50 บาท/โหล', '/Addon-3.png', 3, true from public.product_categories where size_label = '25x70 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_categories (size_label, sort_order, is_active) values ('25x75 นิ้ว', 5, true) on conflict (size_label) do update set sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x75 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 13, 'พีวีซีใส / พีวีซีใส', 'ขนาด 25x75 นิ้ว', '/PVC-Clear-25x75.png', 1, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'clear', 'ใส', '1,000 บาท/โหล', '/PVC-Clear-25x75.png', 1, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x75 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 14, 'พีวีซีใส / สปันบอนด์', 'ขนาด 25x75 นิ้ว', '/PVC-Spanpon-25x75-white.png', 2, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-black.png', 6, true from product_row
union all
select id, 'geeen', 'เขียว', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '1,000 บาท/โหล', '/PVC-Spanpon-25x75-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
with c as (select id from public.product_categories where size_label = '25x75 นิ้ว'),
product_row as (
  insert into public.products (category_id, legacy_id, name, description, main_image_url, sort_order, is_active)
  select c.id, 15, 'สปันบอนด์ / สปันบอนด์', 'ขนาด 25x75 นิ้ว', '/Spanpon-25x75-white.png', 3, true from c
  on conflict (category_id, legacy_id) do update set name = excluded.name, description = excluded.description, main_image_url = excluded.main_image_url, sort_order = excluded.sort_order, is_active = true
  returning id
)
insert into public.product_variants (product_id, code, label, price_text, image_url, sort_order, is_active)
select id, 'white', 'ขาว', '1,200 บาท/โหล', '/Spanpon-25x75-white.png', 1, true from product_row
union all
select id, 'gray', 'เทา', '1,200 บาท/โหล', '/Spanpon-25x75-gray.png', 2, true from product_row
union all
select id, 'beige', 'เบจ(เนื้อ)', '1,200บาท/โหล', '/Spanpon-25x75-beige.png', 3, true from product_row
union all
select id, 'brow', 'น้ำตาลช็อคโกแลต', '1,200 บาท/โหล', '/Spanpon-25x75-brow.png', 4, true from product_row
union all
select id, 'blue', 'กรมท่า', '1,200 บาท/โหล', '/Spanpon-25x75-blue.png', 5, true from product_row
union all
select id, 'black', 'ดำ', '1,200 บาท/โหล', '/Spanpon-25x75-black.png', 6, true from product_row
union all
select id, 'green', 'เขียว', '1,200 บาท/โหล', '/Spanpon-25x75-green.png', 7, true from product_row
union all
select id, 'red', 'แดง', '1,200 บาท/โหล', '/Spanpon-25x75-red.png', 8, true from product_row
on conflict (product_id, code) do update set label = excluded.label, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 101, 'หมวกด้านหน้า', '50 บาท/โหล', '/Addon-1.png', 1, true from public.product_categories where size_label = '25x75 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 102, 'หูหิ้ว บน-ล่าง', '50 บาท/โหล', '/Addon-2.png', 2, true from public.product_categories where size_label = '25x75 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.product_addons (category_id, legacy_id, name, price_text, image_url, sort_order, is_active)
select id, 103, 'กระดุม บน-ล่าง', '50 บาท/โหล', '/Addon-3.png', 3, true from public.product_categories where size_label = '25x75 นิ้ว'
on conflict (category_id, legacy_id) do update set name = excluded.name, price_text = excluded.price_text, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = true;
insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values ('luxury-dress-cover', 'ทำไมห้องเสื้อควรใช้ถุงคลุมชุดพร้อมสกรีนโลโก้', 'รายละเอียดเล็ก ๆ ที่ช่วยยกระดับภาพลักษณ์และความหรูของแบรนด์แฟชั่น.', '/Picblog-1.jpg', '
      <h2>ทำไมห้องเสื้อควรใช้ถุงคลุมชุดพร้อมสกรีนโลโก้</h2>
      <p>ในอุตสาหกรรมแฟชั่นไทย ไม่ว่าจะเป็น ห้องเสื้อ ร้านตัดสูท ร้านเช่าชุดไทย หรือร้านให้เช่าชุดราตรี
      สิ่งหนึ่งที่สะท้อนความเป็นมืออาชีพและช่วยสร้างภาพลักษณ์ให้แบรนด์ได้อย่างชัดเจน คือ
      <strong>“ถุงคลุมชุดพร้อมสกรีนโลโก้”</strong> ซึ่งปัจจุบันกลายเป็นมาตรฐานใหม่ของธุรกิจเสื้อผ้าแฟชั่นระดับพรีเมียม</p>
      
      <hr/>

      <h3>1. ถุงคลุมชุดคือสิ่งที่มากกว่า “บรรจุภัณฑ์”</h3>
      <p>สำหรับห้องเสื้อทั่วไป ถุงคลุมชุด อาจดูเหมือนแค่ของใช้เพื่อเก็บหรือขนส่งสินค้า
      แต่ในมุมมองของแบรนด์มืออาชีพ ถุงคลุมคือ <strong>“เครื่องมือสื่อสารแบรนด์”</strong> ที่ทรงพลัง:</p>
      <ul>
        <li>ช่วยสร้างความรู้สึกคุณค่า (Value Perception): ลูกค้าจะสัมผัสได้ถึงความใส่ใจตั้งแต่รับชุดในถุงที่ดูสะอาด เรียบหรู และมีโลโก้ร้านอย่างชัดเจน</li>
        <li>เสริมความมั่นใจและความน่าเชื่อถือ (Trust & Professionalism): การที่แบรนด์ลงทุนในถุงคลุมคุณภาพดีพร้อมโลโก้ ช่วยให้ลูกค้าเชื่อมั่นในมาตรฐานของร้าน</li>
        <li>ปกป้องชุดได้จริง: ผลิตจากวัสดุที่ช่วยป้องกันฝุ่น ความชื้น และรอยยับ</li>
      </ul>

      <hr/>

      <h3>2. เหตุผลที่ “ควรสกรีนโลโก้” บนถุงคลุมชุด</h3>
      <ol>
        <li><strong>สร้างการจดจำแบรนด์ (Brand Awareness)</strong>: ลูกค้าที่ถือถุงโลโก้ของร้านไปในงานต่าง ๆ คือการประชาสัมพันธ์ฟรี</li>
        <li><strong>เพิ่มความหรูหราและเอกลักษณ์</strong>: ยกระดับภาพลักษณ์ร้านให้แตกต่างจากคู่แข่ง</li>
        <li><strong>เสริมความเชื่อมั่นและความภาคภูมิใจ</strong>: ช่วยให้ลูกค้ารู้สึกมั่นใจเวลานำชุดออกไปใช้งาน</li>
        <li><strong>ใช้เป็นของที่ระลึกหรือของพรีเมียม</strong>: เป็นของแถมสำหรับลูกค้าที่ตัดชุดใหม่ เพิ่มความประทับใจ</li>
      </ol>

      <hr/>

      <h3>3. ประโยชน์ของการสั่งผลิตกับโรงงานโดยตรง</h3>
      <p>การเลือกผลิตกับโรงงานรับทำถุงคลุมชุดขายส่ง เช่น KLOOM STUDIO
      ช่วยให้ห้องเสื้อได้ทั้งคุณภาพที่สม่ำเสมอและราคาที่คุ้มค่า</p>
      <ul>
        <li>เลือกวัสดุได้ตามการใช้งาน:
          <ul>
            <li>หน้าใส–หลังใส (PVC ใส) – เหมาะสำหรับโชว์ชุดในร้าน</li>
            <li>หน้าใส–หลังสปันบอนด์ – ผสมสวยและแข็งแรง</li>
            <li>สปันบอนด์ทั้งชิ้น – เหมาะสำหรับเก็บชุดไทยหรือชุดราตรี</li>
          </ul>
        </li>
        <li>มีหลากหลายสีให้เลือก: ขาว / เทา / เบจ / ช็อคโกแลต / กรมท่า / ดำ / แดงเลือดหมู / เขียวหัวเป็ด</li>
        <li>ขนาดครบทุกประเภท:
          <ul>
            <li>25×37 นิ้ว สำหรับชุดสูทหรือชุดข้าราชการ</li>
            <li>25×55 นิ้ว สำหรับชุดไทย</li>
            <li>25×65–25×75 นิ้ว สำหรับชุดราตรีและเจ้าสาว</li>
          </ul>
        </li>
      </ul>

      <hr/>

      <h3>4. เงื่อนไขการสกรีนและคำแนะนำ</h3>
      <ul>
        <li>ขั้นต่ำเพียง 5 โหล (60 ใบ)</li>
        <li>สามารถคละขนาดได้</li>
        <li>มีบริการสกรีนโลโก้สีเดียว หรือสองสี</li>
        <li>ลูกค้าต้องส่งไฟล์โลโก้ Ai / PDF</li>
        <li>ไม่มีบริการออกแบบโลโก้</li>
      </ul>
      <p>สำหรับร้านที่สั่งน้อยกว่า 5 โหล สามารถสกรีนได้ตั้งแต่ 2 โหลขึ้นไป โดยคิดเพิ่ม 20 บาท/จุดสกรีน</p>

      <hr/>

      <h3>5. สรุป: ถุงคลุมพร้อมสกรีนโลโก้ = การลงทุนที่คุ้มค่า</h3>
      <p>ถุงคลุมชุดไม่เพียงช่วยปกป้องชุด แต่ยังช่วย <strong>ปกป้องแบรนด์</strong> ของคุณในระยะยาว
      สำหรับห้องเสื้อ ร้านตัดสูท และร้านเช่าชุดที่ต้องการความแตกต่าง
      ถุงคลุมชุดพร้อมสกรีนโลโก้ คือเครื่องมือการตลาดเงียบที่ทรงพลังที่สุด</p>
      <p>“เพราะภาพลักษณ์ที่ดี เริ่มต้นได้จากรายละเอียดเล็ก ๆ อย่างถุงคลุมชุด”</p>

      <hr/>

      <h3>📲 สนใจผลิตถุงคลุมชุดคุณภาพ</h3>
      <p>Line: @kloomstudio<br/>
      โทร: 088-642-4699</p>
    ', true, 1) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;
insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values ('select-size-suit-cover', 'วิธีเลือกขนาดถุงคลุมสูทให้เหมาะกับชุด', 'เลือกถุงคลุมชุดไทย–ชุดราตรี ให้เหมาะกับประเภทของชุด.', '/Picblog-2.jpg', '
    <h2>การเลือกขนาดถุงคลุมสูทให้เหมาะกับชุด</h2>
    <p>การเลือก ถุงคลุมชุดสูท หรือ ถุงคลุมชุดไทย–ชุดราตรี ให้เหมาะกับประเภทของชุด ถือเป็นรายละเอียดเล็ก ๆ 
    ที่ส่งผลต่อการปกป้องและภาพลักษณ์ของแบรนด์โดยตรง ไม่ว่าจะเป็น ห้องเสื้อ ร้านตัดสูท ร้านเช่าชุดราตรี 
    หรือแม้แต่ร้านชุดข้าราชการ การเลือกขนาดและวัสดุที่เหมาะสมคือสิ่งที่ช่วยยืดอายุการใช้งานของชุด 
    และทำให้ลูกค้ารู้สึกถึงความใส่ใจในทุกขั้นตอน</p>

    <hr/>

    <h3>1. ทำไมการเลือกขนาดถุงคลุมชุดจึงสำคัญ</h3>
    <p>หลายคนอาจคิดว่าขนาดของถุงคลุมไม่ได้มีผลมากนัก แต่ในความเป็นจริง ถุงที่เล็กเกินไปอาจทำให้ชุดเกิดรอยยับหรือหักงอ 
    ส่วนถุงที่ใหญ่เกินไปก็อาจทำให้การจัดเก็บไม่เป็นระเบียบ และดูไม่สวยงาม</p>
    <p>การเลือกขนาดถุงที่เหมาะสมจึงควรพิจารณาจาก:</p>
    <ul>
      <li>ประเภทของชุด เช่น สูท, ชุดไทย, ชุดราตรี</li>
      <li>ความยาวของชุด และลักษณะของแขนเสื้อหรือกระโปรง</li>
      <li>พื้นที่จัดเก็บ เช่น ในร้านโชว์, ห้องเก็บชุด หรือใช้เดินทาง</li>
    </ul>

    <hr/>

    <h3>2. ตารางแนะนำขนาดถุงคลุมชุดจาก KLOOM STUDIO</h3>
    <table>
      <thead>
        <tr>
          <th>ประเภทชุด</th>
          <th>ขนาดที่แนะนำ</th>
          <th>ลักษณะการใช้งาน</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>เสื้อสูท / ชุดข้าราชการ</td>
          <td>25×37 นิ้ว</td>
          <td>เหมาะสำหรับชุดครึ่งตัวหรือเสื้อสูททั่วไป ใช้งานสะดวก พกพาง่าย</td>
        </tr>
        <tr>
          <td>ชุดไทยประยุกต์ / ชุดพิธีการ</td>
          <td>25×55 นิ้ว</td>
          <td>รองรับความยาวช่วงกระโปรงได้ดี ไม่ยับง่าย</td>
        </tr>
        <tr>
          <td>ชุดราตรีสั้น / ชุดเพื่อนเจ้าสาว</td>
          <td>25×65 นิ้ว</td>
          <td>เหมาะสำหรับชุดยาวระดับกลาง ดูเรียบร้อยและถนอมผ้า</td>
        </tr>
        <tr>
          <td>ชุดราตรียาว / ชุดเจ้าสาวหางปลา</td>
          <td>25×75 นิ้ว</td>
          <td>ยาวพิเศษ รองรับความยาวของกระโปรงหางปลาได้อย่างดี</td>
        </tr>
      </tbody>
    </table>
    <p>📌 หากเป็นร้านที่มีชุดหลายประเภท แนะนำให้สั่งคละขนาดได้ เพื่อให้เหมาะกับทุกการใช้งาน</p>

    <hr/>

    <h3>3. เลือกวัสดุให้เหมาะกับลักษณะการใช้งาน</h3>
    <p>การเลือกวัสดุของถุงคลุมมีผลต่อความคงทนและความหรูหรา KLOOM STUDIO มีวัสดุให้เลือกหลายรูปแบบ:</p>
    <ul>
      <li>🎯 <strong>แบบที่ 1: หน้าใส–หลังใส (PVC ใส)</strong>
        <ul>
          <li>เนื้อ PVC ใสพรีเมียม</li>
          <li>กันน้ำ กันฝุ่น</li>
          <li>เหมาะสำหรับโชว์ชุดสูทหรือชุดราตรีในร้าน</li>
        </ul>
      </li>
      <li>🎯 <strong>แบบที่ 2: หน้าใส–หลังสปันบอนด์</strong>
        <ul>
          <li>ด้านหน้าโชว์ชุดได้ ด้านหลังช่วยป้องกันแสงและความชื้น</li>
          <li>มีหลายสี เช่น ขาว, เบจ, เทา, ช็อคโกแลต, กรมท่า, ดำ</li>
        </ul>
      </li>
      <li>🎯 <strong>แบบที่ 3: สปันบอนด์ทั้งชิ้น</strong>
        <ul>
          <li>เนื้อผ้าหนานุ่ม น้ำหนักเบา ไม่อับชื้น</li>
          <li>เหมาะกับถุงคลุมชุดไทยหรือชุดราตรีที่ต้องการความปลอดภัยสูงสุด</li>
        </ul>
      </li>
    </ul>

    <hr/>

    <h3>4. เพิ่มดีเทลเพื่อการใช้งานที่สะดวกยิ่งขึ้น</h3>
    <ul>
      <li>เพิ่มหูจับบน–ล่าง : สะดวกสำหรับการพับและถือเดินทาง</li>
      <li>เพิ่มหมวกคลุมด้านบน : ช่วยกันฝุ่นส่วนหัวไหล่ของชุด</li>
      <li>เพิ่มกระดุมบน–ล่าง : ช่วยให้ถุงอยู่ทรง ไม่หักงอ</li>
    </ul>
    <p>📌 เพิ่มดีเทลได้เพียง 50 บาทต่อโหลเท่านั้น</p>

    <hr/>

    <h3>5. ถุงคลุมพร้อมสกรีนโลโก้ เพิ่มคุณค่าให้แบรนด์</h3>
    <p>สำหรับห้องเสื้อที่ต้องการสร้างความแตกต่าง ถุงคลุมชุดพร้อมสกรีนโลโก้คือคำตอบที่คุ้มค่า
    ไม่เพียงช่วยปกป้องชุด แต่ยังช่วย “ปกป้องภาพลักษณ์แบรนด์” ด้วย</p>
    <ul>
      <li>เพิ่มความน่าเชื่อถือให้ร้าน</li>
      <li>ทำให้ลูกค้าจดจำแบรนด์ได้</li>
      <li>ช่วยโฆษณาทางอ้อมเมื่อถุงถูกพกพาออกนอกสถานที่</li>
    </ul>
    <p>📍 ขั้นต่ำเพียง 5 โหล (60 ใบ) เลือกสกรีนได้ทั้ง ด้านหน้า / ด้านหลัง / ทั้งสองจุด
    และสามารถเลือกสีสกรีนให้เข้ากับถุงได้ตามต้องการ</p>

    <hr/>

    <h3>6. ถุงคลุมชุดขายส่ง — ทางเลือกที่คุ้มค่ากว่าสำหรับห้องเสื้อ</h3>
    <p>การสั่งผลิตแบบขายส่งจากโรงงานช่วยลดต้นทุนและได้คุณภาพสม่ำเสมอ</p>
    <ul>
      <li>ราคาต่อชิ้นประหยัดกว่า</li>
      <li>คุณภาพมาตรฐานเดียวกันทุกใบ</li>
      <li>สามารถคละขนาด คละสีได้</li>
      <li>มีทีมงานตรวจสอบก่อนจัดส่งทุกครั้ง</li>
    </ul>

    <hr/>

    <h3>7. สรุป: เลือกขนาดที่ใช่ เพื่อภาพลักษณ์ที่เหนือระดับ</h3>
    <p>การเลือกขนาดของถุงคลุมชุดให้เหมาะกับประเภทของชุด เป็นสิ่งที่ช่วยยกระดับทั้งคุณค่าและภาพลักษณ์ของร้าน
    เพราะ “ถุงคลุมชุด” ไม่ใช่แค่สิ่งห่อหุ้ม แต่คือส่วนหนึ่งของมาตรฐานความเป็นมืออาชีพ</p>
    <p>KLOOM STUDIO พร้อมผลิตถุงคลุมชุดสูท ถุงคลุมชุดไทย และถุงคลุมชุดราตรีทุกขนาด
    ด้วยวัสดุคุณภาพสูง งานเย็บละเอียด และบริการสกรีนโลโก้ครบวงจร</p>

    <hr/>

    <h3>📲 สนใจผลิตถุงคลุมชุดคุณภาพ</h3>
    <p>Line: @kloomstudio<br/>
    โทร: 088-642-4699</p>
  ', true, 2) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;
insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values ('wholesale-cover-benefits', 'ข้อดีของถุงคลุมชุดแบบขายส่ง', 'เหมาะกับธุรกิจแฟชั่นที่ต้องการลดต้นทุนโดยไม่ลดความพรีเมียม.', '/Picblog-3.jpg', '
    <h2>ข้อดีของถุงคลุมชุดแบบขายส่ง</h2>
    <p>ในธุรกิจห้องเสื้อ ร้านตัดสูท หรือร้านเช่าชุด การเลือกใช้ถุงคลุมชุดคุณภาพดี เป็นสิ่งจำเป็นที่ช่วยเพิ่มมูลค่าและภาพลักษณ์ให้กับร้านค้า
    โดยเฉพาะอย่างยิ่งการสั่งผลิตถุงคลุมชุดแบบขายส่ง ซึ่งไม่เพียงช่วยลดต้นทุนต่อชิ้น แต่ยังได้มาตรฐานการผลิตที่สม่ำเสมอและดูมืออาชีพกว่า</p>

    <hr/>

    <h3>1. ถุงคลุมชุดแบบขายส่งคืออะไร?</h3>
    <p>“ถุงคลุมชุดแบบขายส่ง” คือการสั่งผลิตถุงคลุมจำนวนมากโดยตรงจากโรงงานผู้ผลิต เช่น KLOOM STUDIO 
    ซึ่งสามารถกำหนดขนาด วัสดุ สี และรูปแบบได้เองตามความต้องการของร้าน</p>
    <p>เหมาะสำหรับธุรกิจที่ต้องใช้จำนวนมาก เช่น:</p>
    <ul>
      <li>ห้องเสื้อที่มีลูกค้าเข้าออกต่อเนื่อง</li>
      <li>ร้านตัดสูทที่มีชุดใหม่เข้าทุกเดือน</li>
      <li>ร้านเช่าชุดไทยหรือชุดราตรี ที่ต้องจัดเก็บและส่งคืนชุดอยู่เสมอ</li>
    </ul>

    <hr/>

    <h3>2. ประโยชน์ของการสั่งผลิตถุงคลุมแบบขายส่ง</h3>
    <ol>
      <li>
        <strong>ประหยัดต้นทุนต่อหน่วย</strong>
        <p>การสั่งผลิตในจำนวนมากช่วยลดต้นทุนต่อใบอย่างชัดเจน เมื่อเทียบกับการซื้อปลีกเป็นรายชุด
        และยังลดค่าใช้จ่ายในการขนส่ง เพราะจัดส่งรวดเดียวได้ครบ</p>
      </li>
      <li>
        <strong>ได้มาตรฐานการผลิตที่สม่ำเสมอ</strong>
        <p>งานเย็บ ซิป และขนาดมีความเที่ยงตรง ถุงทุกใบจึงมีคุณภาพและมาตรฐานเดียวกัน เหมาะสำหรับร้านที่ต้องการความเป็นมืออาชีพ</p>
      </li>
      <li>
        <strong>ปรับแต่งได้ตามความต้องการ</strong>
        <p>สามารถเลือกได้ทั้งวัสดุ, สี, ขนาด รวมถึงเพิ่มดีเทลพิเศษ เช่น:</p>
        <ul>
          <li>หมวกคาดหน้า</li>
          <li>หูจับบน–ล่าง</li>
          <li>กระดุมติดบน–ล่าง</li>
        </ul>
        <p>เพิ่มได้ในราคาย่อมเยาเพียง 50 บาทต่อโหล</p>
      </li>
      <li>
        <strong>สร้างภาพลักษณ์แบรนด์ด้วยโลโก้</strong>
        <p>KLOOM STUDIO มีบริการสกรีนโลโก้บนถุงคลุมชุด เพื่อช่วยให้ร้านมีเอกลักษณ์เฉพาะตัว
        สามารถสกรีนได้ทั้งด้านหน้า ด้านหลัง หรือทั้งสองตำแหน่ง ขั้นต่ำเพียง 5 โหล
        หรือเริ่มต้นเล็ก ๆ 2 โหล เพิ่ม 20 บาทต่อจุดสกรีน</p>
      </li>
    </ol>

    <hr/>

    <h3>3. วัสดุและขนาดที่เหมาะกับการสั่งขายส่ง</h3>
    <p>🎨 วัสดุยอดนิยม 3 ประเภท:</p>
    <ul>
      <li>หน้าใส–หลังใส (PVC ใส) – โชว์ชุดได้ชัด เหมาะกับร้านโชว์สินค้า</li>
      <li>หน้าใส–หลังสปันบอนด์ – ดูหรูหรา เหมาะกับร้านสูทหรือชุดราตรี</li>
      <li>สปันบอนด์ทั้งชิ้น – เบา ระบายอากาศดี เหมาะกับการเก็บระยะยาว</li>
    </ul>

    <p>📏 ขนาดยอดนิยม 5 ไซต์:</p>
    <ul>
      <li>25×37 นิ้ว – เสื้อสูท / ชุดข้าราชการ</li>
      <li>25×45 นิ้ว – ชุดไทยประยุกต์สั้น</li>
      <li>25×55 นิ้ว – ชุดไทยทั่วไป</li>
      <li>25×65 นิ้ว – ชุดราตรีระดับกลาง</li>
      <li>25×75 นิ้ว – ชุดราตรียาว / ชุดเจ้าสาว</li>
    </ul>

    <p>สีให้เลือกมากกว่า 7 เฉด: ขาว / เทา / เบจ / ช็อคโกแลต / กรมท่า / ดำ / แดงเลือดหมู / เขียวหัวเป็ด</p>

    <hr/>

    <h3>4. ทำไมควรสั่งผลิตกับโรงงานโดยตรง</h3>
    <ul>
      <li>🏭 ได้งานคุณภาพระดับอุตสาหกรรม – เครื่องจักรเย็บมาตรฐาน วัสดุคุณภาพสูง ซิปเย็บแน่น ทนต่อการใช้งาน</li>
      <li>📦 จัดส่งทั่วประเทศ – รับสินค้าได้ภายใน 7–10 วันทำการ พร้อมแพ็กปลอดภัย</li>
      <li>🧾 มีระบบออกบิล / ใบกำกับภาษี – เหมาะสำหรับร้านและบริษัทที่ต้องการเอกสารทางบัญชี</li>
    </ul>

    <hr/>

    <h3>5. ตัวอย่างธุรกิจที่เหมาะกับการใช้ถุงคลุมชุดขายส่ง</h3>
    <ul>
      <li>ห้องเสื้อแฟชั่นไทย ที่ต้องเก็บชุดลูกค้าเป็นจำนวนมาก</li>
      <li>ร้านตัดสูทหรือร้านเช่าชุดสูท สำหรับนักเรียนและข้าราชการ</li>
      <li>ร้านเช่าชุดราตรี / ชุดเจ้าสาว ที่มีการหมุนเวียนชุดสูง</li>
      <li>โรงงานผลิตเสื้อผ้าแฟชั่น ที่ต้องจัดส่งสินค้าหลายชุดต่อรอบ</li>
    </ul>

    <hr/>

    <h3>6. สรุป: ถุงคลุมชุดขายส่ง คือการลงทุนที่คืนกำไรได้จริง</h3>
    <p>การเลือกใช้ ถุงคลุมชุดสูท ถุงคลุมชุดไทย และถุงคลุมชุดราตรี แบบขายส่ง
    ไม่เพียงช่วยลดต้นทุน แต่ยังช่วยให้แบรนด์ดูมีมาตรฐานมากขึ้น
    เมื่อนำการสกรีนโลโก้ร้านบนถุงคลุม ก็จะยิ่งเสริมภาพลักษณ์ความเป็นมืออาชีพ
    และสร้างการจดจำให้ลูกค้าในระยะยาว</p>

    <p>“รายละเอียดเล็ก ๆ อย่างถุงคลุมชุด อาจเป็นสิ่งที่สร้างความแตกต่างใหญ่ให้กับแบรนด์ของคุณ”</p>

    <hr/>

    <h3>📲 สนใจสั่งผลิตถุงคลุมชุดคุณภาพสูง</h3>
    <p>Line: @kloomstudio<br/>
    โทร: 088-642-4699</p>
  ', true, 3) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;
insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values ('pvc-material-0.8mm', 'พีวีซีใส 0.8 มิล วัสดุถุงคลุมชุดสูท', 'วัสดุโปร่งใส เรียบหรู เหมาะกับแบรนด์ที่ต้องการโชว์คุณภาพของสินค้า.', '/Picblog-4.jpg', '
    <h2>วัสดุ: พีวีซีใส 0.8 มิล</h2>
    <p>วัสดุที่นิยมใช้มากในงานผลิตถุงคลุมชุดสูท ชุดไทย และชุดราตรี โดยเฉพาะรุ่น “หน้าใส” เพราะให้ทั้งความแข็งแรงและความสวยงามในเวลาเดียวกัน มาดูรายละเอียดกันค่ะ 👇</p>

    <hr/>

    <h3>🔍 พีวีซีใส 0.8 มิล คืออะไร</h3>
    <p>PVC (Polyvinyl Chloride) คือพลาสติกชนิดหนึ่งที่มีความยืดหยุ่นสูง ทนต่อแรงดึง และกันน้ำได้ดี</p>
    <p>ส่วนตัวเลข “0.8 มิล” หมายถึง <strong>ความหนา</strong> ของแผ่นพีวีซี — ซึ่งถือว่าเป็นระดับหนาปานกลางถึงหนา เหมาะสำหรับงานที่ต้องการความแข็งแรง แต่ยังคงพับได้ไม่แตกกรอบ</p>
    <p>ในงานถุงคลุมชุด จะนิยมใช้ พีวีซีใส 0.8 มิล เป็น “ด้านหน้า” ของถุง เพื่อให้มองเห็นชุดภายในได้ชัดเจน เช่น สูท ชุดไทย หรือชุดราตรี</p>

    <hr/>

    <h3>✅ ข้อดีของพีวีซีใส 0.8 มิล</h3>
    <ul>
      <li><strong>1. มองเห็นชุดชัดเจน สวยงาม</strong><br/>
          เนื้อใสเคลียร์ เหมาะกับการโชว์ดีไซน์ของชุดโดยไม่ต้องเปิดถุง
          เหมาะสำหรับห้องเสื้อ ร้านเช่าชุด หรือร้านขายชุดสูทที่ต้องการความหรูหรา
      </li>
      <li><strong>2. กันน้ำและกันฝุ่น 100%</strong><br/>
          พีวีซีเป็นวัสดุที่ไม่ดูดซับความชื้นและไม่ซึมน้ำ
          ช่วยป้องกันชุดจากฝุ่นละออง น้ำฝน หรือไอน้ำได้อย่างมีประสิทธิภาพ
      </li>
      <li><strong>3. หนา แข็งแรง ไม่ย่นง่าย</strong><br/>
          ด้วยความหนา 0.8 มิล ทำให้ถุงดูทรงสวย ไม่ยับง่าย
          เหมาะกับงานพรีเมียม หรือชุดที่ต้องการความพิถีพิถันในการเก็บรักษา
      </li>
      <li><strong>4. คงรูป ไม่เหลืองง่าย</strong><br/>
          พีวีซีใสคุณภาพดีผ่านกระบวนการกัน UV
          ทำให้ถุงยังคงใสและไม่เหลือง แม้ใช้งานเป็นเวลานาน
      </li>
      <li><strong>5. พิมพ์สกรีนได้</strong><br/>
          สามารถสกรีนโลโก้ร้าน หรือชื่อแบรนด์บนถุงได้
          ไม่หลุดลอกง่าย และช่วยเพิ่มความพรีเมียมให้กับสินค้า
      </li>
    </ul>

    <hr/>

    <h3>💡 สรุป</h3>
    <p>ถ้าคุณต้องการถุงคลุมชุดที่ดูสวย เรียบหรู และมีความคงทน วัสดุ <strong>พีวีซีใส 0.8 มิล</strong> คือทางเลือกที่เหมาะที่สุดสำหรับ ห้องเสื้อ ร้านตัดสูท ร้านเช่าชุดราตรี และร้านชุดไทยระดับพรีเมียม</p>
  ', true, 4) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;
insert into public.articles (slug, title, excerpt, cover_image_url, content_html, is_published, sort_order) values ('nonwoven-material', 'ผ้าสปันบอนด์ วัสดุถุงคลุมชุดสูท', 'วัสดุยอดนิยมในวงการแฟชั่น ด้วยความแข็งแรง น้ำหนักเบา และดูดี.', '/Picblog-5.jpg', '
    <h2>วัสดุ: ผ้าสปันบอนด์ (Spunbond)</h2>
    <p>เป็นวัสดุหลักที่นิยมใช้มากที่สุดในการผลิต ถุงคลุมชุดสูท ถุงคลุมชุดไทย และถุงคลุมชุดราตรี เพราะมีน้ำหนักเบา แต่ทนทาน ดูเรียบร้อยและมีความยืดหยุ่นสูง เหมาะกับงานที่ต้องการความสะอาดและระบายอากาศได้ดี</p>

    <hr/>

    <h3>🧵 ลักษณะของผ้าสปันบอนด์</h3>
    <p>ผ้าสปันบอนด์คือ ผ้าไม่ถักไม่ทอ (Non-Woven Fabric) ผลิตจากเส้นใยโพลีโพรพิลีน (PP) ที่ผ่านกระบวนการหลอมและฉีดเส้นใยให้เกาะกันด้วยความร้อน</p>
    <p>ไม่ใช้การเย็บหรือถักแบบผ้าทั่วไป แต่เชื่อมกันด้วยแรงดันและอุณหภูมิสูง จึงได้ผ้าที่มีผิวเรียบ เบา และแข็งแรงในเวลาเดียวกัน</p>

    <hr/>

    <h3>✅ ข้อดีของผ้าสปันบอนด์</h3>
    <ul>
      <li><strong>1. น้ำหนักเบา แต่แข็งแรง</strong><br/>
          ผ้ามีความหนาแน่นสูง แม้บางแต่ไม่ขาดง่าย เหมาะกับการเย็บถุงคลุมที่ต้องรับน้ำหนักของชุดได้โดยไม่ยับหรือเสียรูป
      </li>
      <li><strong>2. ระบายอากาศดี ไม่อับชื้น</strong><br/>
          เส้นใยของผ้ามีรูพรุนเล็ก ๆ ทำให้อากาศถ่ายเทได้ดี ลดปัญหากลิ่นอับและเชื้อรา เหมาะกับชุดที่ต้องเก็บในระยะยาว
      </li>
      <li><strong>3. กันฝุ่นได้ดี</strong><br/>
          ผิวผ้าสปันบอนด์เรียบแน่น ช่วยกันฝุ่นและละอองได้ดี เหมาะกับห้องเสื้อและร้านเช่าชุดที่ต้องจัดเก็บสินค้าเป็นประจำ
      </li>
      <li><strong>4. ไม่ลามไฟ</strong><br/>
          เพิ่มความปลอดภัยในการจัดเก็บในพื้นที่ปิด เช่น ตู้เก็บชุดหรือโกดัง
      </li>
      <li><strong>5. เป็นมิตรต่อสิ่งแวดล้อม</strong><br/>
          ผลิตจากวัสดุรีไซเคิลได้ 100% และสามารถนำกลับมาใช้ซ้ำได้หลายครั้ง
      </li>
      <li><strong>6. ราคาเหมาะสม</strong><br/>
          เมื่อเทียบกับวัสดุชนิดอื่น เช่น ผ้าไนลอนหรือผ้าโพลีเอสเตอร์ สปันบอนด์มีต้นทุนที่คุ้มค่า เหมาะสำหรับงานผลิตจำนวนมากหรือขายส่ง
      </li>
    </ul>

    <hr/>

    <h3>🎨 การใช้งานในถุงคลุมชุด</h3>
    <ul>
      <li>ใช้ได้ทั้ง หน้า–หลังสปันบอนด์ (แบบทึบ) หรือ หน้าใส–หลังสปันบอนด์ (โชว์ชุดได้ด้านหน้า)</li>
      <li>มีให้เลือกหลายสี เช่น ขาว, เทา, เบจ, ช็อคโกแลต, กรมท่า, ดำ, เขียวหัวเป็ด, แดงเลือดหมู</li>
      <li>สามารถสกรีนโลโก้ร้านได้ เพิ่มความพรีเมียมให้กับภาพลักษณ์</li>
    </ul>

    <hr/>

    <h3>💼 สรุป</h3>
    <p>ผ้าสปันบอนด์คือวัสดุที่ลงตัวที่สุดสำหรับงาน ถุงคลุมชุดสูท ถุงคลุมชุดไทย และถุงคลุมชุดราตรี เพราะให้ทั้งความทนทาน ระบายอากาศดี น้ำหนักเบา และราคาย่อมเยา เหมาะสำหรับทั้งห้องเสื้อ ร้านเช่าชุด และธุรกิจแฟชั่นทุกประเภท</p>
  ', true, 5) on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, cover_image_url = excluded.cover_image_url, content_html = excluded.content_html, is_published = true, sort_order = excluded.sort_order;

insert into public.testimonials (customer_name, quote, is_published, sort_order)
select 'KLOOM Studio', 'KLOOM Studio — เติมเต็มความเนี๊ยบให้ทุกการแต่งตัว', true, 1
where not exists (select 1 from public.testimonials);

commit;
