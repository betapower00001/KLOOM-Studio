import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PortfolioManager from "@/components/admin/PortfolioManager";

export default function AdminPortfolioPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Portfolio"
        title="ตัวอย่างผลงานของเรา"
        description="จัดการรูปปก ชื่อ คำอธิบาย และภาพรีวิวของ 3 หมวดที่แสดงบนหน้าเว็บไซต์"
      />
      <PortfolioManager />
    </div>
  );
}
