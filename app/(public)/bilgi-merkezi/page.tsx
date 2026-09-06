import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TECHNICAL_GUIDES } from "@/data/technicalGuides";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  SunMedium,
  ShieldCheck,
} from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Teknik Bilgi Merkezi & Mühendislik Rehberleri | Novatek Enerji",
  description:
    "Orta gerilim, trafo merkezleri, PLC & SCADA otomasyonu, tip testli panolar, kompanzasyon ve endüstriyel çatı GES konularında kapsamlı teknik mühendislik rehberleri.",
  openGraph: {
    title: "Teknik Bilgi Merkezi | Novatek Enerji Mühendislik",
    description:
      "Elektrik taahhüt, trafo, otomasyon ve enerji sistemlerinde derinlemesine teknik analizler ve mühendislik makaleleri.",
  },
};

export default function KnowledgeHubIndexPage() {
  const categories = [
    { title: "Tümü", key: "ALL" },
    { title: "OG & Trafo", key: "OG & Trafo", icon: Cpu },
    { title: "Otomasyon & SCADA", key: "Otomasyon & SCADA", icon: Zap },
    { title: "Pano & Enerji", key: "Pano & Enerji", icon: Layers },
    { title: "Güneş Enerjisi (GES)", key: "Güneş Enerjisi (GES)", icon: SunMedium },
    { title: "Standartlar & Mevzuat", key: "Standartlar & Mevzuat", icon: ShieldCheck },
  ];

  const breadcrumbs = [{ label: "Bilgi Merkezi" }];
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Bilgi Merkezi", url: "/bilgi-merkezi" },
  ]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-slate-900/80 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/15 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mühendislik Bilgi Merkezi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
            Teknik <span className="text-amber-400">Rehberler</span> & Mühendislik Makaleleri
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-4 max-w-3xl leading-relaxed font-normal">
            Endüstriyel elektrik, OG hücreleri, trafo kurulumları, PLC/SCADA otomasyonu, kompanzasyon ve çatı GES alanlarında güncel standartlar, teknik analizler ve mühendislik dokümanları.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECHNICAL_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/bilgi-merkezi/${guide.slug}`}
              className="p-7 rounded-3xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-400/60 transition-all duration-200 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[11px] font-bold uppercase border border-amber-500/30">
                    {guide.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center font-medium">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>{guide.readTime}</span>
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                  {guide.title}
                </h2>

                <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-sm font-bold text-amber-400 group-hover:text-amber-300">
                <span>Rehberi Oku</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
