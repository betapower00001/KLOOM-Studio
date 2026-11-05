import AdminPageHeader from '@/components/admin/AdminPageHeader';
import CmsTransferManager from '@/components/admin/CmsTransferManager';

export default function CmsTransferPage() {
  return <div>
    <AdminPageHeader eyebrow="CMS Transfer" title="ย้ายข้อมูลสองหมวดไปเว็บไซต์จริง" description="ส่งออกตัวอย่างผลงานและฟังก์ชันเสริมจาก localhost แล้วนำเข้า Production โดยไม่แตะข้อมูลสินค้า" />
    <CmsTransferManager />
  </div>;
}
