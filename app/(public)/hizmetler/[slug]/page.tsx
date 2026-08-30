import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { generateServiceSchema } from "@/lib/seo";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Zap,
  ChevronRight,
  Building2,
  MapPin,
  BookOpen,
  FolderGit2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: service.metaTitle || `${service.title} | Soykan Power`,
    description: service.metaDesc || service.shortDesc,
    alternates: {
      canonical: `/hizmetler/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Soykan Power Mühendislik`,
      description: service.shortDesc,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const [service, allSectors, allRegions, relatedNews, relatedProjects] = await Promise.all([
    prisma.service.findUnique({
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
    }),
    prisma.sector.findMany({
      where: { published: true },
      take: 6,
      orderBy: { order: "asc" },
    }),
    prisma.region.findMany({
      where: { isPublished: true },
      take: 6,
      orderBy: { sortOrder: "asc" },
    }),
    prisma.news.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      take: 3,
      orderBy: { year: "desc" },
    }),
  ]);

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
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>{service.category.title}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
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
            <div className="flex-1 space-y-12 min-w-0">
              {/* Detailed Content */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400 mr-2" />
                  <span>Mühendislik Kapsamı & Standartlarımız</span>
                </h2>
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                  {service.content}
                </div>
              </div>

              {/* Key Features */}
              {parsedFeatures.length > 0 && (
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                  <h3 className="text-lg font-bold text-white">
                    Teknik Yetkinlikler ve Uygulama Maddeleri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedFeatures.map((feat, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-snug font-medium">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-page Internal Linking: Related Sectors */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center">
                    <Building2 className="w-5 h-5 text-amber-400 mr-2" />
                    <span>Bu Hizmetin Uygulandığı Başlıca Sektörler</span>
                  </h3>
                  <Link href="/sektorler" className="text-xs font-bold text-amber-400 hover:underline">
                    Tüm Sektörler →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {allSectors.map((sec) => (
                    <Link
                      key={sec.id}
                      href={`/sektorler/${sec.slug}`}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{sec.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Multi-page Internal Linking: Regional Landing Pages */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center">
                    <MapPin className="w-5 h-5 text-amber-400 mr-2" />
                    <span>{service.title} Hizmeti Sunduğumuz Bölgeler</span>
                  </h3>
                  <Link href="/bolgeler" className="text-xs font-bold text-amber-400 hover:underline">
                    Tüm Bölgeler →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {allRegions.map((reg) => (
                    <Link
                      key={reg.id}
                      href={`/bolgeler/${reg.slug}/${service.slug}`}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center justify-between group"
                    >
                      <span>{reg.name} {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Multi-page Internal Linking: Technical Articles & Blog */}
              {relatedNews.length > 0 && (
                <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center">
                      <BookOpen className="w-5 h-5 text-amber-400 mr-2" />
                      <span>İlgili Teknik Makaleler & Mühendislik Rehberleri</span>
                    </h3>
                    <Link href="/haberler" className="text-xs font-bold text-amber-400 hover:underline">
                      Tüm Makaleler →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedNews.map((n) => (
                      <Link
                        key={n.id}
                        href={`/haberler/${n.slug}`}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all group space-y-2"
                      >
                        <span className="text-[10px] font-bold uppercase text-amber-400">{n.category}</span>
                        <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-2">
                          {n.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="w-full lg:w-80 shrink-0 space-y-6">
              {/* Category Services Menu */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span>{service.category.title}</span>
                  <Layers className="w-4 h-4" />
                </h3>
                <nav className="space-y-1">
                  {service.category.services.map((item) => {
                    const isActive = item.slug === service.slug;
                    return (
                      <Link
                        key={item.id}
                        href={`/hizmetler/${item.slug}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <span className="line-clamp-1">{item.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Quote CTA Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Projeniz İçin Teklif Alın
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.title} ve diğer elektrifikasyon ihtiyaçlarınız için mühendislik departmanımızdan teknik keşif ve fiyat teklifi talep edin.
                </p>
                <Link
                  href={`/teklif-al?service=${encodeURIComponent(service.title)}&sourcePage=/hizmetler/${service.slug}`}
                  className="block"
                >
                  <Button variant="primary" size="md" className="w-full">
                    <span>Teklif Formunu Doldurun</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>

              {/* Direct Support Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Doğrudan Mühendis Desteği
                </span>
                <a
                  href="tel:+903220000000"
                  className="inline-flex items-center text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors font-mono"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  <span>+90 (322) 000 00 00</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
