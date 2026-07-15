import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SetupRequired from "@/components/admin/SetupRequired";
import { getCurrentAdmin, isAdminSystemConfigured } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminSystemConfigured()) return <SetupRequired />;

  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return <AdminShell userEmail={admin.email}>{children}</AdminShell>;
}
