import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateReferenceNo } from "@/lib/utils";
import { z } from "zod";

const quoteSchema = z.object({
  companyName: z.string().min(2, "Firma adı en az 2 karakter olmalıdır"),
  contactPerson: z.string().min(2, "Yetkili kişi adı gereklidir"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  city: z.string().min(2, "Şehir belirtiniz"),
  projectLocation: z.string().optional(),
  serviceType: z.string().min(2, "Lütfen bir hizmet seçiniz"),
  description: z.string().min(10, "Proje açıklaması en az 10 karakter olmalıdır"),
  plannedDate: z.string().optional(),
  files: z
    .array(
      z.object({
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.number(),
        mimeType: z.string(),
      })
    )
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = quoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const referenceNo = generateReferenceNo();

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        referenceNo,
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        phone: data.phone,
        email: data.email.toLowerCase().trim(),
        city: data.city,
        projectLocation: data.projectLocation || data.city,
        serviceType: data.serviceType,
        description: data.description,
        plannedDate: data.plannedDate || null,
        status: "NEW",
        files: data.files && data.files.length > 0
          ? {
              create: data.files.map((f) => ({
                fileName: f.fileName,
                fileUrl: f.fileUrl,
                fileSize: f.fileSize,
                mimeType: f.mimeType,
              })),
            }
          : undefined,
      },
      include: {
        files: true,
      },
    });

    return NextResponse.json({
      success: true,
      referenceNo: quoteRequest.referenceNo,
      message: "Teklif talebiniz başarıyla alınmıştır.",
    });
  } catch (error) {
    console.error("Quote Request Submission Error:", error);
    return NextResponse.json(
      { error: "Teklif talebi iletilirken bir hata oluştu. Lütfen tekrar deneyiniz." },
      { status: 500 }
    );
  }
}
