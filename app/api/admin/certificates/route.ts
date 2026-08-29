import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const certs = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(certs);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const cert = await prisma.certificate.create({
      data: {
        title: body.title,
        code: body.code || null,
        issuer: body.issuer || null,
        issueYear: body.issueYear ? parseInt(body.issueYear) : null,
        fileUrl: body.fileUrl || null,
        published: Boolean(body.published ?? true),
      },
    });
    return NextResponse.json({ success: true, data: cert });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Kaydedilemedi" }, { status: 500 });
  }
}
