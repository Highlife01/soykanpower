import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { Target, Eye, Compass, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Misyon & Vizyon",
  description: "Soykan Power mühendislik vizyonu ve kurumsal misyon ilkeleri.",
};

export default function MissionVisionPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Misyon & Vizyon
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Geleceğin enerji ve otomasyon standartlarını belirleyen kurumsal hedeflerimiz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Misyon & Vizyon" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            {/* Misyon */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Misyonumuz</h2>
              <p>
                Sanayi kuruluşlarının ve altyapı tesislerinin ihtiyaç duyduğu
                elektrik taahhüt, otomasyon ve yenilenebilir enerji sistemlerini;
                en yüksek mühendislik disiplini, uluslararası kalite standartları,
                ileri teknoloji ve sıfır iş kazası prensibiyle anahtar teslim hayata geçirmek.
              </p>
              <p>
                İş ortaklarımızın üretim verimliliğini artırırken, enerji kayıplarını
                en aza indiren sürdürülebilir, güvenli ve ekonomik çözümler sunmak.
              </p>
            </div>

            {/* Vizyon */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Vizyonumuz</h2>
              <p>
                Elektrik mühendisliği, endüstriyel otomasyon ve güneş enerjisi
                alanlarında teknik yetkinliği, dijital dönüşüm kabiliyeti ve
                güvenilirliği ile sektörün referans mühendislik merkezi olmak.
              </p>
              <p>
                Endüstri 4.0 ve yeşil enerji dönüşümünde Türkiye ve bölge
                sanayisine rehberlik eden, yenilikçi projeler üreten öncü bir
                kuruluş konumunu sürdürmek.
              </p>
            </div>
          </div>

          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
