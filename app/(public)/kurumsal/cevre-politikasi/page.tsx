import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { Leaf, CheckCircle2, Sun, Recycle } from "lucide-react";

export const metadata: Metadata = {
  title: "Çevre Politikamız",
  description: "Soykan Power sürdürülebilirlik, yeşil enerji ve çevre yönetim standartları.",
};

export default function EnvironmentPolicyPage() {
  const envPrinciples = [
    "Enerji verimliliği yüksek transformatör, motor ve sürücü çözümleri ile endüstride elektrik kayıplarını azaltmak,",
    "Endüstriyel çatı ve arazi güneş enerji santralleri (GES) kurarak temiz ve yenilenebilir enerji üretimini yaygınlaştırmak,",
    "Şantiye ve atölye süreçlerinde oluşan kablo, metal ve ambalaj atıklarını ayrıştırarak lisanslı geri dönüşüm tesislerine kazandırmak,",
    "Doğal kaynakların tüketimini minimize eden çevre dostu teknolojileri tercih etmek,",
    "ISO 14001 Çevre Yönetim Sistemi standartlarına ve ulusal çevre mevzuatına tam uyum sağlamak,",
    "Tüm çalışanlarımızda ve çözüm ortaklarımızda çevre bilincini artıracak farkındalık çalışmaları yürütmek.",
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Çevre Politikamız
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Sürdürülebilir Gelecek, Yeşil Enerji ve Çevreye Saygılı Mühendislik.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Çevre Politikamız" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <Leaf className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Sürdürülebilir Mühendislik Yaklaşımımız
              </h2>
              <p>
                Soykan Power olarak; enerji dönüşümünün merkezinde yer alan bir mühendislik
                kuruluşu olarak, gelecek nesillere temiz bir dünya bırakma sorumluluğunu
                taşıyoruz. Tasarladığımız tüm sistemlerde enerji verimliliği ve karbon
                ayak izinin azaltılması temel mühendislik kriterimizdir.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Çevre Taahhütlerimiz</h3>
              <ul className="space-y-3.5">
                {envPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
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
