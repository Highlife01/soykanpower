import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const settings = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });
  return NextResponse.json(settings || {});
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await request.json();
    const settings = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        companyName: body.companyName,
        phone: body.phone,
        email: body.email,
        address: body.address,
        workingHours: body.workingHours,
        linkedinUrl: body.linkedinUrl,
        instagramUrl: body.instagramUrl,
        twitterUrl: body.twitterUrl,
        facebookUrl: body.facebookUrl,
        footerText: body.footerText,
        aboutSummary: body.aboutSummary,
      },
      create: {
        id: "default",
        companyName: body.companyName || "Soykan Power",
        phone: body.phone,
        email: body.email,
        address: body.address,
        workingHours: body.workingHours,
        linkedinUrl: body.linkedinUrl,
        instagramUrl: body.instagramUrl,
        twitterUrl: body.twitterUrl,
        facebookUrl: body.facebookUrl,
        footerText: body.footerText,
        aboutSummary: body.aboutSummary,
      },
    });

    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Ayarlar kaydedilemedi" }, { status: 500 });
  }
}
