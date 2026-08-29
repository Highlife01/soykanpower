import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
  return NextResponse.json(projects);
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

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: slug || `proje-${Date.now()}`,
        client: body.client || null,
        location: body.location || null,
        year: body.year ? parseInt(body.year) : null,
        categoryType: body.categoryType || "ELEKTRIK",
        scope: body.scope || null,
        workDone: body.workDone ? JSON.stringify(body.workDone) : null,
        technologies: body.technologies ? JSON.stringify(body.technologies) : null,
        capacity: body.capacity || null,
        coverImage: body.coverImage || null,
        status: body.status || "COMPLETED",
        featured: Boolean(body.featured),
        published: Boolean(body.published ?? true),
      },
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error: any) {
    console.error("Project Create Error:", error);
    return NextResponse.json({ error: error.message || "Proje kaydedilemedi" }, { status: 500 });
  }
}
