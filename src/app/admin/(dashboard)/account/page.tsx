import AccountManager from "@/components/admin/AccountManager";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminAccountPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Administrator"
        title="บัญชีผู้ดูแล"
        description="แก้ชื่อ อีเมล และรหัสผ่านสำหรับเข้าสู่ระบบหลังบ้าน"
      />
      <AccountManager />
    </div>
  );
}
