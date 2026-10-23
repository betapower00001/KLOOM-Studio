import { NextResponse } from "next/server";
import { getPublicProducts } from "@/lib/cms/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const noCache = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    return NextResponse.json(await getPublicProducts(), { headers: noCache });
  } catch (error) {
    console.error("Public product CMS failed (check Neon tables and schema)", error);
    return NextResponse.json(
      { error: "โหลดข้อมูลสินค้าจากฐานข้อมูลไม่สำเร็จ กรุณาตรวจสอบตารางสินค้าใน Neon" },
      { status: 503, headers: noCache },
    );
  }
}
