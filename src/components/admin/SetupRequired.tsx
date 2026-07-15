export default function SetupRequired() {
  return (
    <div className="min-h-screen bg-[#f5f2ec] px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6784f]">KLOOM Studio CMS</p>
        <h1 className="mt-3 text-3xl font-bold">ต้องเชื่อม Neon ก่อนใช้งานหลังบ้าน</h1>
        <p className="mt-4 leading-7 text-slate-600">
          ตัวระบบถูกติดตั้งแล้ว แต่ยังไม่มีค่าฐานข้อมูลหรือ Secret สำหรับการล็อกอิน จึงยังไม่สามารถบันทึกข้อมูลออนไลน์ได้
        </p>
        <ol className="mt-7 space-y-3 rounded-2xl bg-slate-50 p-6 text-sm leading-6 text-slate-700">
          <li>1. สร้างและเชื่อมฐานข้อมูล Neon กับโปรเจกต์ Vercel</li>
          <li>2. รัน <code>npm run db:setup</code> หรือดับเบิลคลิก <code>DB_SETUP_WINDOWS.bat</code></li>
          <li>3. สร้าง Vercel Blob แบบ Public สำหรับเก็บรูปภาพ</li>
          <li>4. เพิ่ม <code>AUTH_SECRET</code>, <code>INITIAL_ADMIN_EMAIL</code> และ <code>INITIAL_ADMIN_PASSWORD</code></li>
          <li>5. เปิดระบบใหม่และเข้าสู่ระบบด้วยบัญชีที่ตั้งไว้ใน <code>.env.local</code></li>
        </ol>
        <p className="mt-5 text-sm text-slate-500">
          ดูขั้นตอนแบบสั้นใน <code>START_HERE_TH.txt</code> และรายละเอียดใน <code>DATABASE_SETUP_TH.md</code>
        </p>
      </div>
    </div>
  );
}
