import { NextResponse } from "next/server";
import { getPublicArticles } from "@/lib/cms/public";

export const dynamic = "force-dynamic";

export async function GET() {
  const articles = await getPublicArticles();
  return NextResponse.json(articles, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
