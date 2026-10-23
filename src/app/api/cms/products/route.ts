import { NextResponse } from "next/server";
import { getPublicProducts } from "@/lib/cms/public";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    const products = await getPublicProducts();
    return NextResponse.json(products, { headers });
  } catch (error) {
    console.error("GET /api/cms/products failed", error);
    return NextResponse.json(
      { error: "ไม่สามารถโหลดข้อมูลสินค้าจากฐานข้อมูลได้" },
      { status: 503, headers },
    );
  }
}
