import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import SetupRequired from "@/components/admin/SetupRequired";
import { getCurrentAdmin, isAdminSystemConfigured } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (!isAdminSystemConfigured()) return <SetupRequired />;
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#20202b] text-white">
          กำลังโหลด...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
