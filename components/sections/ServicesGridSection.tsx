import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2, Shield } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  features?: string | null;
  category: {
    title: string;
  };
}

interface ServicesGridSectionProps {
  services: ServiceItem[];
}

export function ServicesGridSection({ services }: ServicesGridSectionProps) {
  // Show up to 8 core services on the home page
  const displayServices = services.slice(0, 8);

  return (
    <section className="py-24 bg-slate-900 text-white relative">
      {/* Background Ambient Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
              <Shield className="w-3.5 h-3.5" />
              <span>Mühendislik Portföyü</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Öne Çıkan Mühendislik Hizmetlerimiz
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Yüksek teknik şartnamelere ve uluslararası standartlara tam uyumlu olarak hayata geçirdiğimiz uzmanlık alanlarımız.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white hover:border-amber-500/40 text-sm font-bold transition-all shrink-0 self-start md:self-end shadow-xl group"
          >
            <span>Tüm Hizmet Kataloğunu Gör</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service) => {
            let parsedFeatures: string[] = [];
            if (service.features) {
              try {
                parsedFeatures = JSON.parse(service.features);
              } catch {
                parsedFeatures = [];
              }
            }

            return (
              <div
                key={service.id}
                className="bg-slate-950/80 rounded-3xl p-6 border border-slate-800/90 hover:border-amber-500/50 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl"
              >
                <div>
                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                    {service.category.title}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                    <Link href={`/hizmetler/${service.slug}`}>{service.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {parsedFeatures.length > 0 && (
                    <ul className="space-y-2 border-t border-slate-800/80 pt-4 mb-4">
                      {parsedFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="inline-flex items-center text-xs font-extrabold text-amber-400 group-hover:text-amber-300 pt-4 border-t border-slate-800/80 transition-colors justify-between"
                >
                  <span>Teknik Detayları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
