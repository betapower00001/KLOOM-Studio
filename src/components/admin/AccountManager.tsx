"use client";

import { FormEvent, useEffect, useState } from "react";
import { KeyRound, Loader2, Save, UserRound } from "lucide-react";
import { adminFetch } from "@/lib/admin/api";

export default function AccountManager() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<{ email: string; display_name: string }>("/api/admin/account")
      .then((data) => {
        setEmail(data.email);
        setDisplayName(data.display_name);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "โหลดบัญชีไม่สำเร็จ");
      })
      .finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("ยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }

    setBusy(true);
    try {
      await adminFetch("/api/admin/account", {
        method: "PATCH",
        body: JSON.stringify({
          email,
          display_name: displayName,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("บันทึกบัญชีผู้ดูแลเรียบร้อยแล้ว");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "บันทึกบัญชีไม่สำเร็จ");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-white">
        <Loader2 className="animate-spin text-[#a6784f]" size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      {message && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-800">{message}</p>}
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-red-700">{error}</p>}

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
        <div className="flex items-center gap-3">
          <UserRound className="text-[#a6784f]" />
          <h2 className="text-xl font-bold">ข้อมูลผู้ดูแล</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">ชื่อที่แสดง</span>
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">อีเมลสำหรับล็อกอิน</span>
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
        <div className="flex items-center gap-3">
          <KeyRound className="text-[#a6784f]" />
          <h2 className="text-xl font-bold">รหัสผ่าน</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">ต้องกรอกรหัสผ่านปัจจุบันทุกครั้งที่บันทึก ปล่อยรหัสผ่านใหม่ว่างไว้ได้เมื่อไม่ต้องการเปลี่ยน</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-600">รหัสผ่านปัจจุบัน</span>
            <input type="password" required autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">รหัสผ่านใหม่</span>
            <input type="password" minLength={8} autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium text-slate-600">ยืนยันรหัสผ่านใหม่</span>
            <input type="password" minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
          </label>
        </div>
      </section>

      <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-[#a6784f] disabled:opacity-60">
        {busy ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        บันทึกบัญชี
      </button>
    </form>
  );
}
