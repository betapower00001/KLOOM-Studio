import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/api/admin";
import { getSql } from "@/lib/neon/server";
import { getDatabaseUrl } from "@/lib/neon/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  const databaseUrl = getDatabaseUrl();
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  let databaseHost: string | null = null;
  let databaseConnected = false;
  let blobConnected = false;

  if (databaseUrl) {
    try {
      databaseHost = new URL(databaseUrl).hostname;
      const sql = getSql();
      await sql`select 1 as ok`;
      databaseConnected = true;
    } catch (error) {
      console.error("CMS diagnostics: database connection failed", error);
    }
  }

  if (blobToken) {
    try {
      await list({ limit: 1, token: blobToken });
      blobConnected = true;
    } catch (error) {
      console.error("CMS diagnostics: Vercel Blob connection failed", error);
    }
  }

  const healthy = databaseConnected && blobConnected;
  return NextResponse.json(
    {
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
      database: { configured: Boolean(databaseUrl), connected: databaseConnected, host: databaseHost },
      blob: { configured: Boolean(blobToken), connected: blobConnected },
      note: "เข้าถึงได้เฉพาะผู้ดูแลระบบที่เข้าสู่ระบบแล้วเท่านั้น",
    },
    { status: healthy ? 200 : 503, headers: { "Cache-Control": "no-store" } },
  );
}
