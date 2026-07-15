# รายงานการผสาน KLOOM Studio

## ส่วนที่เก็บจากเว็บไซต์เดิม

- โครงสร้างและลำดับส่วนต่าง ๆ บนหน้าแรก
- สี ระยะห่าง การ์ดสินค้า แอนิเมชัน และการแสดงผลบนมือถือ
- รูปสินค้า วิดีโอ โลโก้ รูปบทความ และรูปรีวิวทั้งหมด
- หน้าแสดงรายการบทความและหน้ารายละเอียดบทความ
- หน้าแกลเลอรีรีวิวและหน้าลิงก์ Facebook/LINE/Shopee/โทรศัพท์

## ส่วนที่เปลี่ยนเป็นระบบใหม่

- สินค้า ราคา สี และตัวเลือกเสริมอ่านจาก Neon ผ่าน `/api/cms/products`
- บทความอ่านจาก Neon ผ่าน `/api/cms/articles`
- รีวิวหน้าแรกอ่านจาก Neon ผ่าน `/api/cms/testimonials`
- Hero และข้อมูลติดต่ออ่านจาก Neon ผ่าน `/api/cms/settings`
- รูปที่อัปโหลดจากหลังบ้านเก็บใน Vercel Blob
- ระบบล็อกอินผู้ดูแลใช้ตาราง `admin_users` และคุกกี้ HTTP-only

## เส้นทางระบบหลังบ้าน

- `/admin`
- `/admin/products`
- `/admin/articles`
- `/admin/testimonials`
- `/admin/settings`
- `/admin/account`

## ผลทดสอบ

- `npm ci`: ผ่าน จำนวน 420 packages
- `npm run typecheck`: ผ่าน
- `npm run lint`: ผ่าน
- `npm run build`: ผ่าน จำนวน 20 routes
- หน้า `/`: HTTP 200
- หน้า `/admin/login`: HTTP 200
- Public CMS APIs: HTTP 200 และใช้ข้อมูลสำรองได้เมื่อยังไม่มี Environment Variables
