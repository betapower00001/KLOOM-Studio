# แก้ปัญหา localhost เปลี่ยน แต่ www.kloomsuit.com ยังแสดงรูปเก่า

## สาเหตุที่ตรวจพบจากโค้ด
- `/api/cms/feature-addons` เดิมคืนรายการตัวอย่างในโค้ดเมื่อไม่พบ `site_settings.key = feature_addons` ซึ่งตรงกับ JSON ที่ Production คืนมา (`/AddonEx-1.png`)
- ข้อมูลที่บันทึกบน localhost ไม่ได้ถูกส่งไปยัง Production โดยอัตโนมัติ หากใช้คนละ Neon branch/database
- หลังบ้าน Portfolio เดิมเคยแทรกข้อมูลตั้งต้นเมื่อเปิดหน้าแก้ไข และรายการซ้ำอาจทำให้หน้าเว็บเลือกผิดแถว

## สิ่งที่เปลี่ยน
- เพิ่มเมนู **ย้ายข้อมูล CMS** (`/admin/cms-transfer`) สำหรับส่งออก/นำเข้าข้อมูลเฉพาะ 2 หมวด ได้แก่ `portfolio_items` และ `site_settings.feature_addons`
- Import ต้องล็อกอินหลังบ้าน, ตรวจรูปแบบ JSON, แจ้งยืนยันก่อนเขียน และใช้ Transaction; ไม่แตะสินค้าหรือราคา
- หลังบ้าน Portfolio ไม่สร้างข้อมูลตัวอย่างอัตโนมัติเมื่อ GET
- Portfolio PATCH ปิดการเผยแพร่แถวเก่าที่ซ้ำหมวด โดยไม่ลบข้อมูล
- หน้า API feature-addons ไม่ตอบรายการตัวอย่างเงียบ ๆ อีกเมื่อยังไม่มีค่าใน Neon แต่ตอบ 503 พร้อมรายละเอียด
- เลือกรายการ Portfolio ล่าสุดในหมวดเดียวกันก่อนรายการเก่า

## ขั้นตอนใช้งาน (Windows / Vercel)
1. สำรองโปรเจกต์ปัจจุบัน แล้วรวมไฟล์จาก ZIP นี้ไปยังโปรเจกต์ (ไม่เอา .env ของ ZIP เนื่องจากไฟล์สำคัญถูกตัดออกแล้ว)
2. ใช้บัญชีหลังบ้านในเครื่อง เปิด `http://localhost:3000/admin/cms-transfer` (รัน `npm run dev` ก่อน) แล้วกด **ส่งออก JSON** จะได้ `kloom-cms-local-export.json`
3. Deploy โค้ดใหม่ไป Vercel Production จากโฟลเดอร์ที่ link กับ `kloom-studio`: `npx vercel --prod` (หรือ Push Git branch ที่ผูก Production)
4. รอ Deployment Ready และยืนยันว่าโดเมน www.kloomsuit.com ชี้ Deploy ใหม่นี้
5. เข้าหลังบ้าน Production: `https://www.kloomsuit.com/admin/cms-transfer` เลือก JSON ที่ส่งออกจากเครื่อง ตรวจจำนวนหมวด ติ๊กยืนยัน แล้วกด **ยืนยันนำเข้าข้อมูล**
6. ตรวจ `https://www.kloomsuit.com/api/cms/feature-addons` ว่า `image_url` เป็น URL Blob ใหม่ และตรวจ `https://www.kloomsuit.com/api/cms/portfolio` ว่าตรงกับ localhost
7. จากนี้ให้แก้ไขข้อมูลในหลังบ้านของ **โดเมน www.kloomsuit.com** โดยตรง ไม่ใช่ localhost เพื่อให้ Production เปลี่ยนทันที ไม่ต้อง Import ทุกครั้ง

## ข้อควรทราบ
- เมนูย้ายข้อมูลสร้างเพื่อย้ายข้อมูลครั้งแรก ไม่ใช่ระบบ Sync อัตโนมัติระหว่างสอง Neon
- ถ้าใช้ Neon branch เดียวกันทั้งสองฝั่ง ไม่ควรต้องย้ายข้อมูล ให้ตรวจ API Production หลัง Deploy ก่อน Import
- การนำเข้าจะเขียนทับข้อมูล 2 หมวดบน Production เท่านั้น ไม่แตะสินค้า บทความ หรือรูปรีวิวใน `review_gallery_images`
- รูปภาพที่อยู่ใน `public/` เช่น `/EX-1.jpg` ต้องมีไฟล์อยู่ใน Production; รูปที่อัปโหลดใหม่ผ่าน Vercel Blob ใช้ URL เต็ม
- ไฟล์ JSON มีข้อความและ URL รูปภาพ (ไม่มี credential) ควรเก็บเป็นไฟล์สำรองส่วนตัว
- โปรเจกต์ที่ส่งมาเคยมี `.env.local`; ไฟล์ ZIP ที่แก้ไขนี้จงใจไม่นำไฟล์ `.env*` จริงและ `.vercel/` มารวม
- ตรวจไวยากรณ์ TypeScript ไฟล์ที่แก้ไขผ่านแล้ว; ไม่สามารถทดสอบ Next.js Build หรือเชื่อมต่อ Neon/Vercel จริงในสภาพแวดล้อมนี้ เพราะ npm dependencies ไม่พร้อม
