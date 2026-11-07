import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// ฟังก์ชันอ่านค่า DATABASE_URL จากไฟล์ .env.local โดยไม่พึ่ง dotenv
function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^DATABASE_URL=(.+)$/m);
    if (match) {
      return match[1].trim().replace(/^["']|["']$/g, '');
    }
  } catch (err) {
    // อ่านไฟล์ไม่ได้
  }
  return null;
}

const dbUrl = getDatabaseUrl();

if (!dbUrl) {
  console.error('❌ ไม่พบ DATABASE_URL ในไฟล์ .env.local หรือ environment variables');
  process.exit(1);
}

const sql = neon(dbUrl);

async function main() {
  console.log('⚡ กำลังเชื่อมต่อ Neon DB เพื่อนำเข้ารูปภาพจาก public...');

  // 1. รายการรูปภาพสินค้า (PVC และ Pro)
  const productImages = [
    { title: 'PVC Clear 25x37', image_url: '/PVC-Clear-25x37.png', category: 'pvc' },
    { title: 'PVC Clear 25x55', image_url: '/PVC-Clear-25x55.png', category: 'pvc' },
    { title: 'PVC Clear 25x65', image_url: '/PVC-Clear-25x65.png', category: 'pvc' },
    { title: 'PVC Clear 25x70', image_url: '/PVC-Clear-25x70.png', category: 'pvc' },
    { title: 'PVC Clear 25x75', image_url: '/PVC-Clear-25x75.png', category: 'pvc' },
    { title: 'PVC Clear Standard', image_url: '/PVC-Clear.png', category: 'pvc' },
    { title: 'PVC Spanpon 25x70 Beige', image_url: '/PVC-Spanpon-25x70-beige.png', category: 'pvc' },
    { title: 'Pro-1', image_url: '/Pro-1.png', category: 'pro' },
    { title: 'Pro-2 Blue', image_url: '/Pro-2---blue.png', category: 'pro' },
    { title: 'Pro-2 Red', image_url: '/Pro-2---red.png', category: 'pro' },
    { title: 'Pro-2', image_url: '/Pro-2.png', category: 'pro' },
  ];

  // 2. รายการรูปภาพข่าวสาร / บทความ (Picblog)
  const blogImages = [
    { title: 'บทความตัวอย่าง 1', image_url: '/Picblog-1.jpg' },
    { title: 'บทความตัวอย่าง 2', image_url: '/Picblog-2.jpg' },
    { title: 'บทความตัวอย่าง 3', image_url: '/Picblog-3.jpg' },
    { title: 'บทความตัวอย่าง 4', image_url: '/Picblog-4.jpg' },
    { title: 'บทความตัวอย่าง 5', image_url: '/Picblog-5.jpg' },
  ];

  try {
    // บันทึกรายการรูปสินค้า
    await sql`
      insert into site_settings (key, value)
      values ('local_product_images', ${JSON.stringify(productImages)}::jsonb)
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `;

    // บันทึกรายการรูปบทความ
    await sql`
      insert into site_settings (key, value)
      values ('local_blog_images', ${JSON.stringify(blogImages)}::jsonb)
      on conflict (key) do update set value = excluded.value, updated_at = now()
    `;

    console.log('✅ นำเข้ารูปภาพลงฐานข้อมูล Neon สำเร็จเรียบร้อยแล้ว!');
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการนำเข้าข้อมูล:', error);
  }
}

main();