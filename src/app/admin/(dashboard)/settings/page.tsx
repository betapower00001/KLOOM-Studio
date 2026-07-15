import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SettingsManager from "@/components/admin/SettingsManager";

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminPageHeader eyebrow="Website Settings" title="ข้อมูลเว็บไซต์" description="แก้ไขข้อความหน้าแรก ภาพพื้นหลัง และข้อมูลติดต่อ" />
      <SettingsManager />
    </div>
  );
}
