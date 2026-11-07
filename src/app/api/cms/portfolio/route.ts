import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPublicPortfolio } from "@/lib/cms/public";

export const dynamic = "force-dynamic";
export const revalidate = 0; // ⚡ กำหนด revalidate เป็น 0 เพื่อปิดการเก็บ Cache ทุกรูปแบบของ Next.js
export const runtime = "nodejs";

export async function GET() {
  try {
    // ⚡ สั่งล้าง Cache ของ Path นี้ทุกครั้งที่มีการเรียก GET
    revalidatePath("/api/cms/portfolio");
    revalidatePath("/portfolio");

    const data = await getPublicPortfolio();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Could not read public portfolio from Neon:", error);
    return NextResponse.json(
      { error: "ระบบตัวอย่างผลงานไม่สามารถเชื่อมต่อฐานข้อมูลได้" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}