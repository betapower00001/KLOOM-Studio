import AdminPageHeader from '@/components/admin/AdminPageHeader';
import FeatureAddonManager from '@/components/admin/FeatureAddonManager';

export default function FeatureAddonsPage() {
  return <div>
    <AdminPageHeader eyebrow="Features" title="ฟังก์ชันเสริมที่เลือกได้" description="จัดการการ์ดฟังก์ชันเสริมบนหน้าแรก เพิ่มรายการ อัปโหลดรูป จัดลำดับและซ่อน/แสดงได้" />
    <FeatureAddonManager />
  </div>;
}
