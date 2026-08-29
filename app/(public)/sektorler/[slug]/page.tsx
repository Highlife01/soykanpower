import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CheckCircle2, ArrowRight, ShieldCheck, Factory, ChevronRight } from "lucide-react";

interface SectorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SectorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = await prisma.sector.findUnique({
    where: { slug },
  });

  if (!sector) return { title: "Sektör Bulunamadı" };

  return {
    title: sector.metaTitle || `${sector.title} | Soykan Power Mühendislik`,
    description: sector.metaDesc || sector.shortDesc,
  };
}

export default async function SectorDetailPage({
  params,
}: SectorDetailPageProps) {
  const { slug } = await params;

  const [sector, allSectors] = await Promise.all([
    prisma.sector.findUnique({
      where: { slug },
    }),
    prisma.sector.findMany({
      where: { published: true },
      select: { id: true, title: true, slug: true },
      orderBy: { order: "asc" },
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Sektörel Çözüm</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {sector.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
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
          {/* Main Content */}
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">
                Sektöre Özel Mühendislik Yaklaşımımız
              </h2>
              <div className="whitespace-pre-line space-y-4 text-slate-300">
                {sector.content}
              </div>
            </div>

            {parsedSolutions.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400 mr-2" />
                  <span>Sektörel Uygulama Çözümlerimiz</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {parsedSolutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200">
                        {sol}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  Tesisiniz İçin Sektörel Teklif Alın
                </h3>
                <p className="text-xs text-slate-400 max-w-md">
                  {sector.title} alanındaki projeleriniz için teknik şartnamenizi ileterek keşif ve projelendirme teklifi alabilirsiniz.
                </p>
              </div>
              <Link
                href={`/teklif-al?service=${encodeURIComponent(sector.title)}`}
                className="inline-flex items-center px-6 py-3.5 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors shrink-0 shadow-lg shadow-amber-500/20"
              >
                <span>Teklif Alın</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Sidebar: Other Sectors */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 mb-3">
                Tüm Sektörler
              </h3>
              <nav className="space-y-1">
                {allSectors.map((s) => {
                  const isCurrent = s.slug === sector.slug;
                  return (
                    <Link
                      key={s.id}
                      href={`/sektorler/${s.slug}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
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
          </aside>
        </div>
      </div>
    </div>
  );
}
