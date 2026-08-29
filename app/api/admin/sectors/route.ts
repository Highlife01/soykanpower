import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const sectors = await prisma.sector.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(sectors);
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

    const sector = await prisma.sector.create({
      data: {
        title: body.title,
        slug: slug || `sektor-${Date.now()}`,
        shortDesc: body.shortDesc,
        content: body.content,
        solutions: body.solutions ? JSON.stringify(body.solutions) : null,
        published: Boolean(body.published ?? true),
        order: body.order ? parseInt(body.order) : 0,
      },
    });

    return NextResponse.json({ success: true, data: sector });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Sektör kaydedilemedi" }, { status: 500 });
  }
}
