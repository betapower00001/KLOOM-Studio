import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/api/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await authorizeAdminApi();
  if (auth.response) return auth.response;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "ยังไม่ได้เชื่อม Vercel Blob หรือไม่มี BLOB_READ_WRITE_TOKEN" },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("cms/")) throw new Error("Invalid upload path");

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
          ],
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
          tokenPayload: JSON.stringify({ adminId: auth.admin.id }),
        };
      },
      onUploadCompleted: async () => {
        // URL จะถูกบันทึกเมื่อผู้ดูแลกดบันทึกฟอร์ม
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "";
    const userMessage = message.includes("store does not exist")
      ? "Vercel Blob Store ไม่ตรงกับ BLOB_READ_WRITE_TOKEN หรือ Store ถูกลบ กรุณาตรวจ Token แล้วเปิดเซิร์ฟเวอร์ใหม่"
      : message.includes("BLOB_READ_WRITE_TOKEN")
        ? "ยังไม่ได้ตั้งค่า BLOB_READ_WRITE_TOKEN ให้ถูกต้อง"
        : "อัปโหลดรูปไม่สำเร็จ กรุณาตรวจการเชื่อมต่อ Vercel Blob";
    return NextResponse.json({ error: userMessage }, { status: 400 });
  }
}
