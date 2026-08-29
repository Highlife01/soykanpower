import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const redirects = await prisma.redirect.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(redirects);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const sourcePath = body.sourcePath.startsWith("/") ? body.sourcePath : `/${body.sourcePath}`;
    const targetPath = body.targetPath.startsWith("/") ? body.targetPath : `/${body.targetPath}`;

    const redirect = await prisma.redirect.create({
      data: {
        sourcePath,
        targetPath,
        statusCode: body.statusCode ? parseInt(body.statusCode) : 301,
        active: Boolean(body.active ?? true),
      },
    });

    return NextResponse.json({ success: true, data: redirect });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Yönlendirme oluşturulamadı" }, { status: 500 });
  }
}
