import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ArticleManager from "@/components/admin/ArticleManager";

export default function AdminArticlesPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Articles"
        title="จัดการบทความ"
        description="เพิ่ม แก้ไข ซ่อน หรือเผยแพร่บทความบนเว็บไซต์"
      />
      <ArticleManager />
    </div>
  );
}
