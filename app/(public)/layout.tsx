import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingQuickActions } from "@/components/layout/FloatingQuickActions";
import { prisma } from "@/lib/db";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { published: true },
        select: { id: true, title: true, slug: true },
        orderBy: { order: "asc" },
      },
    },
  });

  const siteSetting = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 relative">
      <Header categories={categories} siteSetting={siteSetting} />
      <main className="flex-1">{children}</main>
      <Footer siteSetting={siteSetting} />
      <FloatingQuickActions
        phone={siteSetting?.phone}
        whatsappNumber={siteSetting?.phone}
      />
    </div>
  );
}
