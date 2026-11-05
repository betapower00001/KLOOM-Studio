'use client';

import { useState } from 'react';
import { adminFetch } from '@/lib/admin/api';

type Payload = {
  format: string;
  portfolio: { category_id: number; title: string; description: string; image_url: string }[];
  feature_addons: { id: string; title: string; description: string; image_url: string; is_published: boolean; sort_order: number }[];
};

export default function CmsTransferManager() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [confirm, setConfirm] = useState(false);

  async function exportData() {
    setBusy(true); setMessage('');
    try {
      const data = await adminFetch<Payload>('/api/admin/cms-transfer');
      const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url; link.download = 'kloom-cms-local-export.json'; link.click();
      URL.revokeObjectURL(url);
      setMessage(`ส่งออกสำเร็จ: ผลงาน ${data.portfolio.length} หมวด และฟังก์ชันเสริม ${data.feature_addons.length} รายการ`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'ส่งออกไม่สำเร็จ'); }
    finally { setBusy(false); }
  }

  async function chooseFile(file: File | undefined) {
    setPayload(null); setConfirm(false); setMessage('');
    if (!file) return;
    try {
      if (file.size > 300000) throw new Error('ไฟล์มีขนาดใหญ่เกินไป');
      const data: unknown = JSON.parse(await file.text());
      if (!data || typeof data !== 'object' || !('format' in data) || (data as Payload).format !== 'kloom-cms-transfer-v1') throw new Error('รูปแบบไฟล์ไม่ถูกต้อง');
      const candidate = data as Payload;
      if (!Array.isArray(candidate.portfolio) || !Array.isArray(candidate.feature_addons)) throw new Error('ไฟล์ไม่มีรายการผลงานและฟังก์ชันเสริม');
      setPayload(candidate);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'เปิดไฟล์ไม่ได้'); }
  }

  async function importData() {
    if (!payload || !confirm) return;
    setBusy(true); setMessage('');
    try {
      const result = await adminFetch<{ ok: boolean; imported_portfolio: number; imported_addons: number }>('/api/admin/cms-transfer', {
        method: 'POST', body: JSON.stringify(payload),
      });
      if (!result.ok) throw new Error('การนำเข้ายังไม่สำเร็จ');
      setMessage(`นำเข้าสำเร็จ ${result.imported_portfolio} หมวดผลงาน และ ${result.imported_addons} ฟังก์ชันเสริม — ตรวจหน้าเว็บและ API ได้เลย`);
      setPayload(null); setConfirm(false);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'นำเข้าไม่สำเร็จ'); }
    finally { setBusy(false); }
  }

  return <div className="max-w-3xl space-y-6">
    <div className="rounded-2xl border bg-white p-6 space-y-3">
      <h2 className="text-lg font-semibold">1. ส่งออกจาก localhost</h2>
      <p className="text-sm text-slate-600">เปิด http://localhost:3000/admin/cms-transfer หลัง Login แล้วดาวน์โหลดไฟล์ JSON ของสองหมวดจาก Neon ในเครื่อง</p>
      <button type="button" disabled={busy} onClick={() => void exportData()} className="rounded-xl bg-slate-900 px-5 py-3 text-white disabled:opacity-50">ส่งออก JSON</button>
    </div>
    <div className="rounded-2xl border bg-white p-6 space-y-4">
      <h2 className="text-lg font-semibold">2. นำเข้าเว็บไซต์จริง</h2>
      <p className="text-sm text-slate-600">เปิด https://www.kloomsuit.com/admin/cms-transfer ด้วยบัญชีผู้ดูแล แล้วเลือกไฟล์ที่ส่งออกจาก localhost ระบบจะเปลี่ยนเฉพาะสองหมวดนี้ ไม่แตะสินค้าและราคา</p>
      <input type="file" accept=".json,application/json" onChange={(e) => void chooseFile(e.target.files?.[0])} className="block w-full text-sm" />
      {payload && <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
        <p>ตรวจรายการก่อนนำเข้า: <strong>{payload.portfolio.length} หมวดผลงาน</strong> และ <strong>{payload.feature_addons.length} ฟังก์ชันเสริม</strong></p>
        <ul className="list-disc pl-5">{payload.portfolio.map((row) => <li key={row.category_id}>{row.category_id}. {row.title}</li>)}</ul>
        <label className="flex items-start gap-2"><input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} /> ยืนยันเขียนทับข้อมูลสองหมวดในฐานข้อมูลของเว็บไซต์นี้ (ไม่ลบหรือเปลี่ยนข้อมูลสินค้า)</label>
        <button type="button" disabled={!confirm || busy} onClick={() => void importData()} className="rounded-xl bg-slate-900 px-5 py-3 text-white disabled:opacity-50">ยืนยันนำเข้าข้อมูล</button>
      </div>}
    </div>
    {message && <p role="status" className="rounded-xl bg-slate-900 p-4 text-white text-sm">{message}</p>}
  </div>;
}
