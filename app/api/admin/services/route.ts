import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: slug || `hizmet-${Date.now()}`,
        shortDesc: body.shortDesc,
        content: body.content,
        features: body.features ? JSON.stringify(body.features) : null,
        categoryId: body.categoryId,
        published: Boolean(body.published ?? true),
        order: body.order ? parseInt(body.order) : 0,
      },
    });

    return NextResponse.json({ success: true, data: service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Hata oluştu" }, { status: 500 });
  }
}
