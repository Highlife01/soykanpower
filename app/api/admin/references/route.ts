import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const references = await prisma.reference.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(references);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const reference = await prisma.reference.create({
      data: {
        company: body.company,
        logoUrl: body.logoUrl || null,
        industry: body.industry || null,
        published: Boolean(body.published ?? true),
      },
    });
    return NextResponse.json({ success: true, data: reference });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Kaydedilemedi" }, { status: 500 });
  }
}
