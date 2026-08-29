import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { Award, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Kalite Politikamız",
  description: "Soykan Power kalite yönetim standartları ve mükemmeliyet politikası.",
};

export default function QualityPolicyPage() {
  const policies = [
    "Müşteri ihtiyaç ve teknik şartnamelerini eksiksiz analiz ederek en uygun ve ekonomik mühendislik çözümlerini sunmak,",
    "Elektrik taahhüt, pano imalatı ve otomasyon süreçlerinde IEC, TSE, EN ve uluslararası standartlara tam uyum sağlamak,",
    "Kullanılan tüm elektriksel ve mekanik malzemelerde kalite onaylı, tip testli ve izlenebilir ürünleri tercih etmek,",
    "Sürekli iyileştirme (Kaizen) prensibiyle iş süreçlerini ve mühendislik tasarım araçlarını düzenli olarak güncellemek,",
    "Proje teslimatlarında sıfır hata ve zamanında teslimat prensibine bağlı kalmak,",
    "Teknik ve idari personelin yetkinliklerini artırmak amacıyla periyodik mesleki eğitimler düzenlemek.",
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Kalite Politikamız
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            ISO 9001 Kalite Yönetim Sistemi prensiplerine dayalı mühendislik ilkelerimiz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Kalite Politikamız" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Mühendislikte Koşulsuz Kalite Güvencesi
              </h2>
              <p>
                Soykan Power olarak kaliteyi; projelerin yalnızca teslim edilmesi değil,
                yıllar boyunca güvenle ve kesintisiz çalışması olarak tanımlıyoruz.
                Tasarım aşamasından başlayarak pano imalatı, kablolama, montaj ve
                devreye alma safhalarının her birinde kalite kontrol (QC) süreçlerini
                titizlikle uyguluyoruz.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Kalite Taahhütlerimiz</h3>
              <ul className="space-y-3.5">
                {policies.map((pol, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pol}</span>
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
