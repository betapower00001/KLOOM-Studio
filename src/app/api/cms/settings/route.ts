import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublicSettings(), {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
