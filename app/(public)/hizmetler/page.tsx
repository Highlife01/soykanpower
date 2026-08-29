import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Zap, ArrowRight, Check, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Elektrik Taahhüt, Otomasyon & Enerji Çözümleri",
  description:
    "Soykan Power mühendislik hizmetleri: AG/OG/YG elektrik taahhüt, trafo merkezleri, PLC/SCADA endüstriyel otomasyon, MCC panoları ve güneş enerjisi.",
};

export default async function ServicesPage() {
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      services: {
        where: { published: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Uzmanlık Alanlarımız</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Mühendislik Hizmetlerimiz
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Projelendirmeden anahtar teslim devreye almaya kadar endüstriyel elektrik, otomasyon ve enerji sistemleri.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Hizmetlerimiz" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {categories.map((category) => (
          <div key={category.id} className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
                <span className="w-3 h-3 rounded-full bg-amber-500 mr-3 shrink-0" />
                <span>{category.title}</span>
              </h2>
              {category.description && (
                <p className="text-sm text-slate-400 mt-1 pl-6">
                  {category.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => {
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
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                        <Link href={`/hizmetler/${service.slug}`}>{service.title}</Link>
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>

                      {parsedFeatures.length > 0 && (
                        <ul className="space-y-1.5 border-t border-slate-800 pt-3 mb-4">
                          {parsedFeatures.slice(0, 3).map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start text-xs text-slate-300">
                              <Check className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <Link
                        href={`/hizmetler/${service.slug}`}
                        className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors"
                      >
                        <span>Detaylı İncele</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>

                      <Link
                        href={`/teklif-al?service=${encodeURIComponent(service.title)}`}
                        className="text-[11px] font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        Teklif İste
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
