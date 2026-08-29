import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Konu en az 3 karakter olmalıdır"),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        isRead: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletilmiştir. En kısa sürede geri dönüş yapılacaktır.",
      id: contactMessage.id,
    });
  } catch (error) {
    console.error("Contact Message API Error:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
