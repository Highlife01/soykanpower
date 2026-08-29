import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Check } from "lucide-react";

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
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>Mühendislik Portföyü</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Öne Çıkan Mühendislik Hizmetlerimiz
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Yüksek teknik standartlara uygun olarak hayata geçirdiğimiz başlıca uzmanlık alanlarımız.
            </p>
          </div>

          <Link
            href="/hizmetler"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-colors shrink-0 self-start md:self-end"
          >
            <span>Tüm Hizmetleri Gör</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
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
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-2">
                    {service.category.title}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2.5">
                    <Link href={`/hizmetler/${service.slug}`}>{service.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {parsedFeatures.length > 0 && (
                    <ul className="space-y-1.5 border-t border-slate-100 pt-3 mb-4">
                      {parsedFeatures.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-amber-600 pt-3 border-t border-slate-100 transition-colors"
                >
                  <span>Detaylı İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
