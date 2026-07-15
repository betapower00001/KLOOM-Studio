"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ImageOff, ImagePlus, Loader2 } from "lucide-react";
import { upload as uploadBlob } from "@vercel/blob/client";

function getPreviewSource(value: string) {
  const normalized = value.trim().replace(/\\/g, "/");
  if (!normalized) return "";

  if (/^(https?:|data:|blob:)/i.test(normalized)) {
    return normalized;
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

export default function MediaUpload({
  value,
  onChange,
  folder = "general",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewFailed, setPreviewFailed] = useState(false);

  const previewSource = useMemo(() => getPreviewSource(value), [value]);

  useEffect(() => {
    setPreviewFailed(false);
  }, [previewSource]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("รองรับเฉพาะไฟล์รูปภาพ");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("รูปต้องมีขนาดไม่เกิน 10 MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, "-");
      const safeName = file.name
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9._-]/g, "-")
        .replace(/-+/g, "-");
      const pathname = `cms/${safeFolder}/${Date.now()}-${safeName || "image"}`;
      const blob = await uploadBlob(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: file.size > 4 * 1024 * 1024,
      });

      onChange(blob.url);
      setPreviewFailed(false);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "อัปโหลดรูปไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {previewSource && (
        <div className="flex min-h-24 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
            {previewFailed ? (
              <div className="flex flex-col items-center gap-1 px-1 text-center text-[10px] leading-tight text-slate-400">
                <ImageOff size={20} />
                ไม่พบรูป
              </div>
            ) : (
              // ใช้ img เพื่อรองรับทั้งไฟล์เก่าใน public และ URL จาก Vercel Blob โดยไม่ต้องกำหนด hostname
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewSource}
                alt="ตัวอย่างรูปที่เลือก"
                className="h-full w-full object-contain"
                onError={() => setPreviewFailed(true)}
              />
            )}
          </div>

          <div className="min-w-0 text-xs text-slate-500">
            <p className="font-medium text-slate-700">
              {previewFailed ? "ไม่สามารถโหลดรูปนี้ได้" : "ภาพตัวอย่าง"}
            </p>
            <p className="mt-1 break-all leading-relaxed">{value}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => {
            setError("");
            onChange(event.target.value);
          }}
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#b78b64]"
          placeholder="URL รูปภาพ หรือ /ชื่อไฟล์ใน public"
        />

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-[#a6784f]">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
          <span className="hidden sm:inline">อัปโหลด</span>
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
