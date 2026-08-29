import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(news);
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

    const article = await prisma.news.create({
      data: {
        title: body.title,
        slug: slug || `haber-${Date.now()}`,
        summary: body.summary,
        content: body.content,
        category: body.category || "Teknik",
        coverImage: body.coverImage || null,
        published: Boolean(body.published ?? true),
      },
    });

    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Haber kaydedilemedi" }, { status: 500 });
  }
}
