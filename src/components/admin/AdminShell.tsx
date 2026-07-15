"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Boxes,
  LayoutDashboard,
  LogOut,
  Menu,
  Images,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/admin", label: "ภาพรวม", icon: LayoutDashboard },
  { href: "/admin/products", label: "สินค้าและราคา", icon: Boxes },
  { href: "/admin/articles", label: "บทความ", icon: BookOpen },
  { href: "/admin/portfolio", label: "ตัวอย่างผลงานของเรา", icon: Images },
  { href: "/admin/settings", label: "ข้อมูลเว็บไซต์", icon: Settings },
  { href: "/admin/account", label: "บัญชีผู้ดูแล", icon: UserRound },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f5f2ec] text-slate-900">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-slate-900 p-3 text-white shadow-lg lg:hidden"
        aria-label="เปิดเมนู"
      >
        <Menu size={20} />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/45 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="ปิดเมนู"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#20202b] text-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#deb18a]">KLOOM Studio</p>
              <h1 className="mt-1 text-xl font-semibold">ระบบหลังบ้าน</h1>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
              aria-label="ปิดเมนู"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {links.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[#deb18a] text-[#20202b]"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <p className="truncate px-2 text-xs text-slate-400">{userEmail}</p>
            <button
              type="button"
              onClick={signOut}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-red-500/15 hover:text-red-200"
            >
              <LogOut size={18} />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </aside>

      <main className="min-h-screen px-5 pb-12 pt-20 lg:ml-72 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
