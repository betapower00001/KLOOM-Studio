# KLOOM Studio Website + CMS

เว็บไซต์ Next.js พร้อมระบบหลังบ้านที่ผสานจากไฟล์เดิมและเปลี่ยนระบบข้อมูลเป็น **Neon PostgreSQL + Vercel Blob** เรียบร้อยแล้ว

## เปิดใช้งานบน Windows

อ่าน `START_HERE_TH.txt` แล้วดับเบิลคลิกตามลำดับ:

1. `SETUP_WINDOWS.bat`
2. `DB_SETUP_WINDOWS.bat`
3. `CHECK_SYSTEM_WINDOWS.bat`
4. `RUN_WINDOWS.bat`

- เว็บไซต์: `http://localhost:3000`
- หลังบ้าน: `http://localhost:3000/admin/login`

ไฟล์ `.env.local` ในชุดนี้ถูกใส่ค่าที่ผู้ใช้ให้มาแล้ว จึงไม่ต้องผสานค่าเองอีก

## ระบบหลัก

- Neon PostgreSQL — สินค้า สี ราคา บทความ รีวิว ข้อมูลเว็บไซต์ และบัญชีผู้ดูแล
- Vercel Blob แบบ Public — รูปสินค้า รูปบทความ รูปรีวิว และภาพ Hero
- Signed HTTP-only cookie — ระบบล็อกอินผู้ดูแล
- คำสั่ง `db:setup` — สร้างตาราง ข้อมูลเริ่มต้น และบัญชีผู้ดูแล
- คำสั่ง `services:check` — ตรวจ Neon, ระบบล็อกอิน และ Blob Store

## คำสั่งสำหรับ Terminal

```bash
npm ci --no-audit --no-fund --progress=false
npm run db:setup
npm run services:check
npm run dev
npm run typecheck
npm run lint
npm run build
```

## ไฟล์รูปเดิม

ไฟล์ต้นฉบับไม่มี assets ตัวจริงใน `public` ชุดนี้จึงสร้างภาพสำรองตามชื่อไฟล์เดิมครบเพื่อไม่ให้หน้าเว็บมีรูปแตก เมื่อมีรูปจริงให้นำมาวางทับไฟล์ชื่อเดียวกัน หรืออัปโหลดรูปใหม่จากระบบหลังบ้าน

## ความปลอดภัย

`.env.local` ถูก `.gitignore` ไว้แล้ว ห้ามนำขึ้น Git และควรเปลี่ยน Neon password กับ Blob token ก่อนเปิดใช้งานจริง เนื่องจากค่าชุดเดิมเคยถูกส่งผ่านแชต
