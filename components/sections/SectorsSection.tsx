import React from "react";
import Link from "next/link";
import { ArrowRight, Factory, ChevronRight, Sparkles } from "lucide-react";

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
    <section className="py-24 bg-slate-900 text-white relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sektörel Uzmanlık</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Endüstrinize Özel Mühendislik Çözümleri
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Her sektörün çalışma dinamikleri, elektriksel güvenlik gereksinimleri ve enerji ihtiyaçları farklıdır. Sektörünüze özel geliştirilmiş mimarileri keşfedin.
            </p>
          </div>

          <Link
            href="/sektorler"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white hover:border-amber-500/40 text-sm font-bold transition-all shrink-0 self-start md:self-end shadow-xl group"
          >
            <span>Tüm Sektörleri İncele</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySectors.map((sec) => (
            <div
              key={sec.id}
              className="group p-7 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:-translate-y-1.5"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Factory className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                  {sec.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {sec.shortDesc}
                </p>
              </div>

              <Link
                href={`/sektorler/${sec.slug}`}
                className="inline-flex items-center text-xs font-extrabold text-amber-400 group-hover:text-amber-300 pt-4 border-t border-slate-900 transition-colors justify-between"
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
