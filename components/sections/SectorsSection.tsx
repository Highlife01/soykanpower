import React from "react";
import Link from "next/link";
import { ArrowRight, Factory, ChevronRight } from "lucide-react";

interface SectorItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  solutions?: string | null;
}

interface SectorsSectionProps {
  sectors: SectorItem[];
}

export function SectorsSection({ sectors }: SectorsSectionProps) {
  // Show first 6 sectors on home page
  const displaySectors = sectors.slice(0, 6);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>Sektörel Uzmanlık</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Farklı Endüstrilere Özel Mühendislik Çözümleri
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Her sektörün dinamikleri, güvenlik gereksinimleri ve enerji ihtiyaçları farklıdır. Sektörünüze özel geliştirilmiş çözümlerimizi keşfedin.
            </p>
          </div>

          <Link
            href="/sektorler"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-950 hover:text-amber-600 transition-colors shrink-0"
          >
            <span>Tüm Sektörleri İncele</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySectors.map((sec) => (
            <div
              key={sec.id}
              className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-slate-950 hover:text-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-600 group-hover:text-amber-400 flex items-center justify-center mb-4 transition-colors">
                  <Factory className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors mb-2">
                  {sec.title}
                </h3>

                <p className="text-xs text-slate-600 group-hover:text-slate-400 leading-relaxed mb-6">
                  {sec.shortDesc}
                </p>
              </div>

              <Link
                href={`/sektorler/${sec.slug}`}
                className="inline-flex items-center text-xs font-bold text-amber-600 group-hover:text-amber-400 transition-colors"
              >
                <span>Sektörel Çözümleri Gör</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
