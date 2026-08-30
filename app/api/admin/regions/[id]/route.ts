import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.region.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug?.toLowerCase().trim(),
        description: body.description,
        shortDescription: body.shortDescription,
        heroTitle: body.heroTitle,
        heroDescription: body.heroDescription,
        isFeatured: Boolean(body.isFeatured),
        isPublished: Boolean(body.isPublished),
        indexable: Boolean(body.indexable),
        sortOrder: Number(body.sortOrder || 0),
        status: body.status || "PUBLISHED",
        metaTitle: body.metaTitle,
        metaDesc: body.metaDesc,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/admin/regions/[id] error:", error);
    return NextResponse.json({ error: error.message || "Güncelleme başarısız" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.region.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/regions/[id] error:", error);
    return NextResponse.json({ error: error.message || "Silme işlemi başarısız" }, { status: 500 });
  }
}
