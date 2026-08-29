import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { generateServiceSchema } from "@/lib/seo";
import { CheckCircle2, ArrowRight, ShieldCheck, PhoneCall, Zap, ChevronRight } from "lucide-react";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: service.metaTitle || service.title,
    description: service.metaDesc || service.shortDesc,
    openGraph: {
      title: `${service.title} | Soykan Power Mühendislik`,
      description: service.shortDesc,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      category: {
        include: {
          services: {
            where: { published: true },
            select: { id: true, title: true, slug: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!service || !service.published) {
    notFound();
  }

  const serviceSchema = generateServiceSchema({
    title: service.title,
    shortDesc: service.shortDesc,
    slug: service.slug,
  });

  let parsedFeatures: string[] = [];
  if (service.features) {
    try {
      parsedFeatures = JSON.parse(service.features);
    } catch {
      parsedFeatures = [];
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
        {/* Header Banner */}
        <div className="border-b border-slate-800 bg-slate-900/60 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>{service.category.title}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
              {service.shortDesc}
            </p>
          </div>
        </div>

        <Breadcrumb
          items={[
            { label: "Hizmetlerimiz", href: "/hizmetler" },
            { label: service.category.title },
            { label: service.title },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content Body */}
            <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
              {/* Detailed Description */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">
                  Mühendislik ve Uygulama Kapsamı
                </h2>
                <div className="whitespace-pre-line space-y-4 text-slate-300">
                  {service.content}
                </div>
              </div>

              {/* Technical Features & Specifications */}
              {parsedFeatures.length > 0 && (
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <ShieldCheck className="w-5 h-5 text-amber-400 mr-2" />
                    <span>Teknik Yetkinlikler ve Standartlar</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {parsedFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Banner */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Bu Hizmet İçin Proje & Teklif Talebi
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Teknik şartnamenizi yükleyerek projenize özel mühendislik çözümü ve keşif teklifi alın.
                  </p>
                </div>
                <Link
                  href={`/teklif-al?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center px-6 py-3.5 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors shrink-0 shadow-lg shadow-amber-500/20"
                >
                  <span>Teklif Alın</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              {/* Category Services */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 mb-3">
                  {service.category.title}
                </h3>
                <nav className="space-y-1">
                  {service.category.services.map((s) => {
                    const isCurrent = s.slug === service.slug;
                    return (
                      <Link
                        key={s.id}
                        href={`/hizmetler/${s.slug}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                          isCurrent
                            ? "bg-amber-500 text-slate-950 font-bold"
                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <span className="line-clamp-1">{s.title}</span>
                        <ChevronRight className="w-4 h-4 shrink-0 ml-1" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Contact Card */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Mühendislik Danışmanlığı</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Projeniz için teknik ekibimizle görüşmek veya sorularınızı iletmek için bizimle iletişime geçebilirsiniz.
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center w-full py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors"
                >
                  İletişim Bilgileri
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
