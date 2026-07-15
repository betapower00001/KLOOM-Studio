"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "เข้าสู่ระบบไม่สำเร็จ");

      const requestedPath = searchParams.get("next");
      const safePath =
        requestedPath?.startsWith("/admin") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/admin";

      router.replace(safePath);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#20202b] via-[#2e2b31] to-[#7f6047] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6784f]">KLOOM Studio</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">เข้าสู่ระบบหลังบ้าน</h1>
        <p className="mt-2 text-sm text-slate-500">สำหรับผู้ดูแลเว็บไซต์เท่านั้น</p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">อีเมล</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#b78b64] focus-within:ring-2 focus-within:ring-[#b78b64]/20">
              <Mail size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                spellCheck={false}
                disabled={loading}
                className="w-full bg-white py-3 text-slate-900 caret-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="admin@example.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">รหัสผ่าน</span>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#b78b64] focus-within:ring-2 focus-within:ring-[#b78b64]/20">
              <LockKeyhole size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                disabled={loading}
                className="w-full bg-white py-3 text-slate-900 caret-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#20202b] px-5 py-3.5 font-semibold text-white transition hover:bg-[#b78b64] focus:outline-none focus:ring-2 focus:ring-[#b78b64] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </main>
  );
}
