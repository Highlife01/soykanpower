import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { ShieldCheck, CheckCircle2, AlertTriangle, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "İş Sağlığı ve Güvenliği (İSG) Politikamız",
  description: "Soykan Power iş sağlığı, saha güvenliği ve sıfır kaza politikaları.",
};

export default function OhsPolicyPage() {
  const isgPrinciples = [
    "Saha çalışmalarında ve atölye imalatlarında 'Önce İnsan, Önce Güvenlik' ilkesini koşulsuz uygulamak,",
    "Elektriksel testler, yüksek gerilim çalışmaları ve yüksekte çalışma faaliyetlerinde tam koruyucu ekipman (KKD) kullanımını zorunlu kılmak,",
    "Tüm saha personeline periyodik İSG, ilk yardım, yüksekte çalışma ve elektrik güvenliği eğitimleri vermek,",
    "Çalışma alanlarında risk analizlerini proaktif olarak gerçekleştirmek ve olası tehlikeleri önceden bertaraf etmek,",
    "Yürürlükteki 6331 sayılı İş Sağlığı ve Güvenliği Kanunu ile ISO 45001 standartlarına tam uyum sağlamak,",
    "Hedeflenen 'Sıfır İş Kazası ve Sıfır Meslek Hastalığı' vizyonunu tüm paydaşlarımızla paylaşmak.",
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            İSG Politikamız
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            İş Sağlığı ve Güvenliğinde Sıfır Kaza Prensibi ve Yüksek Saha Disiplini.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "İSG Politikamız" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Saha Güvenliği ve Çalışan Sağlığı
              </h2>
              <p>
                Elektrik taahhüt ve enerji sektöründe faaliyet gösteren bir mühendislik
                şirketi olarak; can güvenliğinin hiçbir teknik veya ticari önceliğin
                arkasında kalamayacağının bilincindeyiz. Şantiye ve pano montaj
                alanlarımızda en katı İSG tedbirlerini uyguluyoruz.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">İSG Taahhütlerimiz</h3>
              <ul className="space-y-3.5">
                {isgPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
