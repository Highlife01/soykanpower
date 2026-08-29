import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { career: { select: { title: true, department: true } } },
  });
  return NextResponse.json(applications);
}
