import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Teklif bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Quote Detail API Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
