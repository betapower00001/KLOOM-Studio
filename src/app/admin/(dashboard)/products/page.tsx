import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductManager from "@/components/admin/ProductManager";

export default function AdminProductsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Products"
        title="สินค้า สี และราคา"
        description="แก้ไขขนาดสินค้า รูป สี ราคา และตัวเลือกเสริมที่แสดงบนหน้าเว็บ"
      />
      <ProductManager />
    </div>
  );
}
