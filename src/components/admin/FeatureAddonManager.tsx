'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import MediaUpload from './MediaUpload';
import { adminFetch } from '@/lib/admin/api';
import type { FeatureAddon } from '@/lib/cms/addons';
import { announceCmsChange } from '@/lib/cms/live-sync';

export default function FeatureAddonManager() {
  const [items, setItems] = useState<FeatureAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    try { setItems(await adminFetch<FeatureAddon[]>('/api/admin/feature-addons')); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'โหลดข้อมูลไม่สำเร็จ'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const update = (id: string, patch: Partial<FeatureAddon>) =>
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));

  const move = (index: number, offset: number) => setItems((current) => {
    const next = [...current];
    const target = index + offset;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });

  async function save() {
    setSaving(true); setMessage('');
    try {
      const data = items.map((item, index) => ({ ...item, sort_order: index + 1 }));
      const result = await adminFetch<{ ok: boolean; items: FeatureAddon[] }>('/api/admin/feature-addons', { method: 'PUT', body: JSON.stringify(data) });
      if (!result.ok || !Array.isArray(result.items)) throw new Error('เซิร์ฟเวอร์ไม่ได้ยืนยันข้อมูลที่บันทึก');
      setItems(result.items);
      announceCmsChange('feature-addons');
      try {
        const publicItems = await adminFetch<FeatureAddon[]>('/api/cms/feature-addons');
        const expected = result.items.filter((item) => item.is_published);
        const matches = expected.length === publicItems.length && expected.every((item) =>
          publicItems.some((publicItem) => publicItem.id === item.id && publicItem.title === item.title && publicItem.description === item.description && publicItem.image_url === item.image_url)
        );
        setMessage(matches ? 'บันทึกและตรวจสอบ API หน้าเว็บเรียบร้อยแล้ว' : 'บันทึกลงฐานข้อมูลแล้ว แต่ API หน้าเว็บแสดงข้อมูลไม่ตรงกัน');
      } catch (verificationError) {
        setMessage(`บันทึกลงฐานข้อมูลแล้ว แต่ตรวจสอบ API หน้าเว็บไม่ได้: ${verificationError instanceof Error ? verificationError.message : 'ไม่ทราบสาเหตุ'}`);
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'บันทึกไม่สำเร็จ'); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="flex min-h-64 items-center justify-center"><Loader2 className="animate-spin" /></div>;
  return <div className="space-y-6">
    <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">เพิ่ม/ลบ แก้ไขรูป ชื่อ คำอธิบาย สลับลำดับ และเลือกแสดงบนหน้าเว็บได้ กดบันทึกหลังแก้ไขทุกครั้ง</p>
    {message && <div role="status" className="rounded-xl bg-slate-900 p-4 text-sm text-white">{message}</div>}
    <div className="grid gap-5 lg:grid-cols-2">
      {items.map((item, index) => <article key={item.id} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-2">
          <strong>รายการ {index + 1}</strong>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="เลื่อนขึ้น" className="rounded-lg border p-2 disabled:opacity-30"><ArrowUp size={17}/></button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="เลื่อนลง" className="rounded-lg border p-2 disabled:opacity-30"><ArrowDown size={17}/></button>
            <button type="button" onClick={() => setItems((current) => current.filter((x) => x.id !== item.id))} aria-label="ลบรายการ" className="rounded-lg border border-red-200 p-2 text-red-600"><Trash2 size={17}/></button>
          </div>
        </div>
        <div><label className="mb-2 block text-sm">รูปภาพ</label><MediaUpload value={item.image_url} onChange={(url) => update(item.id, { image_url: url })} folder="feature-addons" /></div>
        <label className="block text-sm">ชื่อฟังก์ชันเสริม<input value={item.title} onChange={(e) => update(item.id, { title: e.target.value })} maxLength={200} className="mt-2 w-full rounded-xl border p-3" /></label>
        <label className="block text-sm">คำอธิบาย<textarea value={item.description} onChange={(e) => update(item.id, { description: e.target.value })} rows={3} maxLength={500} className="mt-2 w-full rounded-xl border p-3" /></label>
        <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={item.is_published} onChange={(e) => update(item.id, { is_published: e.target.checked })} />แสดงบนเว็บไซต์</label>
      </article>)}
    </div>
    <div className="flex flex-wrap gap-3">
      <button type="button" disabled={items.length >= 30} onClick={() => setItems((current) => [...current, { id: `feature-${crypto.randomUUID()}`, title: 'ฟังก์ชันเสริมใหม่', description: '', image_url: '', is_published: false, sort_order: current.length + 1 }])} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 disabled:opacity-50"><Plus size={18}/>เพิ่มรายการ</button>
      <button type="button" disabled={saving} onClick={() => void save()} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white disabled:opacity-50">{saving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>}บันทึกทั้งหมด</button>
    </div>
  </div>;
}
