# ตั้งค่า Neon + Vercel Blob

ชุดนี้มีไฟล์ `.env.local` ที่ผสานค่าตามข้อมูลที่ผู้ใช้ให้มาแล้ว สำหรับเปิดใช้งานในเครื่องให้ทำตาม `START_HERE_TH.txt`

## ค่าที่ระบบใช้

```env
DATABASE_URL=...
DATABASE_URL_UNPOOLED=...
AUTH_SECRET=...                  # อย่างน้อย 32 ตัวอักษร
INITIAL_ADMIN_EMAIL=...
INITIAL_ADMIN_PASSWORD=...       # อย่างน้อย 8 ตัวอักษร
BLOB_READ_WRITE_TOKEN=...
```

ห้ามตั้ง Secret เหล่านี้ให้ขึ้นต้นด้วย `NEXT_PUBLIC_`

## ติดตั้งแพ็กเกจ

ใช้ Node.js 20 หรือ 22 และ npm 10:

```bat
npm ci --no-audit --no-fund --progress=false
```

หรือดับเบิลคลิก `SETUP_WINDOWS.bat`

## สร้างฐานข้อมูล

```bat
npm run db:setup
```

หรือดับเบิลคลิก `DB_SETUP_WINDOWS.bat`

คำสั่งนี้จะ:

1. สร้างตารางทั้งหมด
2. เพิ่มข้อมูลสินค้า/บทความเริ่มต้น
3. สร้างหรืออัปเดตบัญชีผู้ดูแลจาก `INITIAL_ADMIN_EMAIL` และ `INITIAL_ADMIN_PASSWORD` ให้ล็อกอินได้ทันที

## ตรวจระบบทั้งหมด

```bat
npm run services:check
```

หรือดับเบิลคลิก `CHECK_SYSTEM_WINDOWS.bat`

## เปิดเว็บไซต์

```bat
npm run dev
```

- เว็บไซต์: `http://localhost:3000`
- หลังบ้าน: `http://localhost:3000/admin/login`

## Deploy บน Vercel

ต้องเพิ่ม Environment Variables ชุดเดียวกันใน Vercel Project แล้ว Redeploy โดยไม่ต้องใส่ `BLOB_STORE_ID` หรือ `VERCEL_OIDC_TOKEN` ในโค้ด

## ความปลอดภัย

Connection String และ Blob Token ชุดเดิมเคยถูกส่งผ่านแชต ควร Reset password ใน Neon และหมุนเวียน Blob Token ก่อนเปิดใช้งานจริง จากนั้นแก้ค่าทั้งใน `.env.local` และ Vercel Environment Variables

## ปัญหาที่พบบ่อย

### `Vercel Blob: This store does not exist`
Token ไม่ตรงกับ Blob Store หรือ Store ถูกลบ ให้สร้าง Token ใหม่จาก `kloom-studio-blob` แล้วอัปเดต `BLOB_READ_WRITE_TOKEN`

### `Can't resolve '@supabase/ssr'`
กำลังเปิดโปรเจกต์เก่าที่มีไฟล์ Supabase ค้างอยู่ ให้ใช้โฟลเดอร์จาก ZIP ชุดนี้แบบแยกใหม่

### `'next' is not recognized`
ยังไม่ได้รัน `SETUP_WINDOWS.bat` หรือ `npm ci`
