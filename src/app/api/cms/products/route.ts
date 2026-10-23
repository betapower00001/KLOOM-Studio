import { NextResponse } from "next/server";
import { getPublicProducts } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getPublicProducts();
  return NextResponse.json(products, {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}
