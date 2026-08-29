import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const careers = await prisma.career.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
  return NextResponse.json(careers);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const career = await prisma.career.create({
      data: {
        title: body.title,
        department: body.department,
        location: body.location,
        workType: body.workType || "Tam Zamanlı",
        description: body.description,
        requirements: body.requirements,
        active: Boolean(body.active ?? true),
      },
    });

    return NextResponse.json({ success: true, data: career });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "İlan kaydedilemedi" }, { status: 500 });
  }
}
