import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { Users, CheckCircle2, ArrowRight, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "İnsan Kaynakları",
  description: "Soykan Power insan kaynakları vizyonu, kariyer olanakları ve çalışma kültürü.",
};

export default function HumanResourcesPage() {
  const hrValues = [
    "Sürekli mesleki gelişim ve teknik mühendislik eğitimleri,",
    "Fırsat eşitliği, şeffaf kariyer basamakları ve performans değerlendirme sistemi,",
    "Yüksek iş güvenliği standartlarına sahip modern çalışma ortamı,",
    "Genç mühendislere mentorluk ve saha tecrübesi kazandıran staj/kariyer programları,",
    "Takım ruhu, karşılıklı saygı ve inovatif fikirleri teşvik eden kurum kültürü.",
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            İnsan Kaynakları
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Yetkin mühendislik kadromuzla güçlü projeler inşa ediyor, geleceğin mühendislerini yetiştiriyoruz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "İnsan Kaynakları" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                İnsan Kaynakları Vizyonumuz
              </h2>
              <p>
                Soykan Power ailesi olarak; en değerli sermayemizin bilgi,
                deneyim ve tutkuyla çalışan insan kaynağımız olduğuna inanıyoruz.
                Elektrik, otomasyon ve enerji mühendisliği alanında sektörün en
                nitelikli profesyonellerini bünyemize kazandırmayı ve onların
                mesleki yolculuklarını desteklemeyi hedefliyoruz.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">İK İlkelerimiz</h3>
              <ul className="space-y-3.5">
                {hrValues.map((val, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Açık Pozisyonlar</h3>
                <p className="text-xs text-slate-400">
                  Ekibimize katılmak ve açık pozisyonları incelemek için kariyer sayfamızı ziyaret edin.
                </p>
              </div>
              <Link
                href="/kariyer"
                className="inline-flex items-center px-6 py-3 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors shrink-0"
              >
                <span>Kariyer Sayfasına Git</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
