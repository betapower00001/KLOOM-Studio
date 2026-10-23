import { NextResponse } from "next/server";
import { getPublicPortfolio } from "@/lib/cms/public";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json(await getPublicPortfolio(), {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (error) {
    console.error("Could not read public portfolio from Neon:", error);
    return NextResponse.json(
      { error: "ระบบตัวอย่างผลงานไม่สามารถเชื่อมต่อฐานข้อมูลได้" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
