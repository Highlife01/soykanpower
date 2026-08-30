import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Factory,
  ChevronRight,
  Zap,
  MapPin,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SectorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: SectorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = await prisma.sector.findUnique({
    where: { slug },
  });

  if (!sector) return { title: "Sektör Bulunamadı" };

  return {
    title: sector.metaTitle || `${sector.title} Elektrik & Otomasyon | Soykan Power`,
    description: sector.metaDesc || sector.shortDesc,
    alternates: {
      canonical: `/sektorler/${sector.slug}`,
    },
    openGraph: {
      title: `${sector.title} | Soykan Power Mühendislik`,
      description: sector.shortDesc,
      type: "website",
    },
  };
}

export default async function SectorDetailPage({
  params,
}: SectorDetailPageProps) {
  const { slug } = await params;

  const [sector, allSectors, relatedServices, allRegions] = await Promise.all([
    prisma.sector.findUnique({
      where: { slug },
    }),
    prisma.sector.findMany({
      where: { published: true },
      select: { id: true, title: true, slug: true },
      orderBy: { order: "asc" },
    }),
    prisma.service.findMany({
      where: { published: true },
      take: 6,
      orderBy: { order: "asc" },
    }),
    prisma.region.findMany({
      where: { isPublished: true },
      take: 6,
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!sector || !sector.published) {
    notFound();
  }

  let parsedSolutions: string[] = [];
  if (sector.solutions) {
    try {
      parsedSolutions = JSON.parse(sector.solutions);
    } catch {
      parsedSolutions = [];
    }
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <Factory className="w-3.5 h-3.5" />
            <span>Sektörel Mühendislik Çözümü</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {sector.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl leading-relaxed">
            {sector.shortDesc}
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Sektörler", href: "/sektorler" },
          { label: sector.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Body */}
          <div className="flex-1 space-y-12 min-w-0">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center">
                <ShieldCheck className="w-5 h-5 text-amber-400 mr-2" />
                <span>Sektöre Özel Mühendislik Yaklaşımımız</span>
              </h2>
              <div className="whitespace-pre-line space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {sector.content}
              </div>
            </div>

            {parsedSolutions.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                <h3 className="text-lg font-bold text-white">
                  Sektörel Uygulama Çözümlerimiz
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parsedSolutions.map((sol, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                        {sol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-linking: Recommended Services for this sector */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center">
                  <Zap className="w-5 h-5 text-amber-400 mr-2" />
                  <span>{sector.title} İçin Sunduğumuz Ana Hizmetler</span>
                </h3>
                <Link href="/hizmetler" className="text-xs font-bold text-amber-400 hover:underline">
                  Tüm Hizmetler →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedServices.map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/hizmetler/${srv.slug}`}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{srv.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Cross-linking: Target Regions */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 text-amber-400 mr-2" />
                  <span>Bölgesel Sanayi Ağımız & Hizmet Noktalarımız</span>
                </h3>
                <Link href="/bolgeler" className="text-xs font-bold text-amber-400 hover:underline">
                  Tüm Bölgeler →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allRegions.map((reg) => (
                  <Link
                    key={reg.id}
                    href={`/bolgeler/${reg.slug}`}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all text-xs font-semibold text-slate-300 hover:text-amber-400 flex items-center justify-between group"
                  >
                    <span>{reg.name} Sanayi Bölgesi</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            {/* Other Sectors Menu */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Diğer Sektörler</span>
                <Factory className="w-4 h-4" />
              </h3>
              <nav className="space-y-1">
                {allSectors.map((item) => {
                  const isActive = item.slug === sector.slug;
                  return (
                    <Link
                      key={item.id}
                      href={`/sektorler/${item.slug}`}
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

            {/* Quote CTA */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Factory className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                {sector.title} İçin Teklif Alın
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tesisiniz için en uygun elektrifikasyon ve otomasyon çözümlerini projelendirelim.
              </p>
              <Link
                href={`/teklif-al?sector=${encodeURIComponent(sector.title)}&sourcePage=/sektorler/${sector.slug}`}
                className="block"
              >
                <Button variant="primary" size="md" className="w-full">
                  <span>Teklif Formunu Doldurun</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
