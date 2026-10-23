import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublicSettings(), {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
