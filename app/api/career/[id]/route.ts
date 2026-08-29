import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const career = await prisma.career.findUnique({
      where: { id },
    });

    if (!career || !career.active) {
      return NextResponse.json({ error: "İlan bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error("Career API Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
