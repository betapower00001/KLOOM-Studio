"use client";

export async function adminFetch<T>(
  input: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  if (response.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("กรุณาเข้าสู่ระบบใหม่");
  }

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string;
  } & T;

  if (!response.ok) {
    throw new Error(payload.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }

  return payload;
}
