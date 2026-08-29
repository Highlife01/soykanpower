import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const applicationSchema = z.object({
  careerId: z.string().min(1, "İlan seçilmelidir"),
  fullName: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  cvUrl: z.string().min(1, "CV dosyası yüklenmelidir"),
  coverLetter: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const application = await prisma.jobApplication.create({
      data: {
        careerId: data.careerId,
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone,
        cvUrl: data.cvUrl,
        coverLetter: data.coverLetter || null,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "İş başvurunuz başarıyla alınmıştır.",
      id: application.id,
    });
  } catch (error) {
    console.error("Job Application Error:", error);
    return NextResponse.json(
      { error: "Başvuru iletilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
