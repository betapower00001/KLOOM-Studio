import { NextResponse } from "next/server";
import { getPublicTestimonials } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublicTestimonials(), {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
