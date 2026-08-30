import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const regions = await prisma.region.findMany({
      include: {
        districts: true,
        regionServices: {
          include: {
            service: { select: { title: true, slug: true } },
          },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(regions);
  } catch (error) {
    console.error("GET /api/admin/regions error:", error);
    return NextResponse.json({ error: "Bölgeler yüklenemedi" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description, shortDescription, isFeatured, isPublished, indexable, sortOrder, metaTitle, metaDesc } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Şehir adı ve slug zorunludur" }, { status: 400 });
    }

    const region = await prisma.region.create({
      data: {
        name,
        slug: slug.toLowerCase().trim(),
        description,
        shortDescription,
        isFeatured: Boolean(isFeatured),
        isPublished: Boolean(isPublished ?? true),
        indexable: Boolean(indexable ?? true),
        sortOrder: Number(sortOrder || 0),
        metaTitle,
        metaDesc,
      },
    });

    return NextResponse.json(region, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/regions error:", error);
    return NextResponse.json({ error: error.message || "Bölge eklenemedi" }, { status: 500 });
  }
}
