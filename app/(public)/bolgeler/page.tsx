import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { REGIONS } from "@/data/regions";
import {
  MapPin,
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Cpu,
  SunMedium,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hizmet Verdiğimiz Bölgeler & Sanayi Merkezleri | Soykan Power",
  description:
    "Soykan Power; Adana merkezli olarak Mersin, Gaziantep, Hatay, Osmaniye, Antalya, Isparta, Niğde ve KKTC sanayi tesisleri ve otellerine elektrik taahhüt, trafo, otomasyon ve GES hizmeti sunar.",
  openGraph: {
    title: "Hizmet Verdiğimiz Bölgeler | Soykan Power Mühendislik",
    description:
      "Adana, Mersin, Gaziantep, Hatay, Osmaniye, Antalya, Isparta, Niğde ve KKTC sanayi merkezlerinde yüksek güçlü elektrik mühendisliği ve otomasyon taahhüdü.",
  },
};

export default function RegionsIndexPage() {
  const breadcrumbs = [{ label: "Hizmet Bölgeleri" }];
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmet Bölgeleri", url: "/bolgeler" },
  ]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bölgesel Mühendislik Ağı</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
            Hizmet Verdiğimiz <span className="text-amber-400">Bölgeler</span> & Sanayi Havzaları
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-4 max-w-3xl leading-relaxed">
            Soykan Power; Adana ana merkezi olmak üzere Çukurova, Akdeniz, Güneydoğu Anadolu ve KKTC genelindeki organize sanayi bölgeleri, limanlar, ağır sanayi tesisleri ve oteller için uçtan uca elektrik mühendisliği, trafo merkezleri, PLC/SCADA otomasyonu ve GES taahhüt hizmetleri sunmaktadır.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REGIONS.map((region) => (
            <div
              key={region.slug}
              className={`p-7 rounded-3xl bg-slate-900 border transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl group relative overflow-hidden ${
                region.isHeadquarters
                  ? "border-amber-500/50 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20"
                  : "border-slate-800 hover:border-amber-500/40"
              }`}
            >
              {region.isHeadquarters && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                  Ana Merkez & Otorite
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40 transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {region.name}
                    </h2>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {region.isHeadquarters ? "Merkez Ofis & Tesisler" : "Bölgesel Hizmet Sahası"}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {region.shortDesc}
                </p>

                {/* Focus Sectors */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Öne Çıkan Sanayi Alanları:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.keyIndustries.slice(0, 3).map((ind, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Target Districts / OSBs */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Hizmet Verilen İlçeler & OSB'ler:
                  </span>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {region.targetDistricts.join(" • ")}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href={`/bolgeler/${region.slug}`}
                  className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors group-hover:translate-x-1"
                >
                  <span>{region.name} Bölge Çözümleri</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>

                <Link
                  href="/teklif-al"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold transition-colors"
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Regional Capability Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Bölgesel Dağıtım Kurumu Uyumluluğu</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Toroslar EDAŞ, Akdeniz EDAŞ, MEDAŞ ve KIB-TEK Standartlarında %100 Uyum
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                Tüm bölgesel projelerimizde yerel elektrik dağıtım şirketlerinin şartnamelerine, TEİAŞ kabul kriterlerine ve yangın/İSG yönetmeliklerine eksiksiz uyum sağlıyoruz.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/teklif-al">
                <Button variant="primary" size="lg">
                  <span>Projeniz İçin Teklif Alın</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
