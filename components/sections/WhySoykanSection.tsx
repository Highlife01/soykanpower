import React from "react";
import { ShieldCheck, Cpu, Award, Zap, Clock, Users } from "lucide-react";

export function WhySoykanSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Mühendislik Standartlarına Tam Uyum",
      desc: "Tüm projelerimizde IEC, TSE, EN ve uluslararası elektrik şartnamelerine harfiyen uyum sağlayarak riskleri sıfırlıyoruz.",
    },
    {
      icon: Cpu,
      title: "İleri Teknoloji & Otomasyon Altyapısı",
      desc: "Siemens, Schneider, ABB gibi global lider markaların onaylı bileşenleriyle yüksek verimli, modern sistemler kuruyoruz.",
    },
    {
      icon: Award,
      title: "Anahtar Teslim EPC Güvencesi",
      desc: "Fizibilite ve mühendislik tasarımından malzeme temini, pano imalatı, montaj ve resmi kabullere kadar tek muhatap.",
    },
    {
      icon: Zap,
      title: "Tip Testli & Form Bölümlendirmeli Panolar",
      desc: "İmal ettiğimiz MCC ve ana dağıtım panolarında Form 2b'den 4b'ye kadar yüksek işletme ve can güvenliği sunuyoruz.",
    },
    {
      icon: Clock,
      title: "Zamanında Teslimat Disiplini",
      desc: "Gelişmiş şantiye planlaması ve profesyonel proje yönetimi metodolojileri ile taahhüt edilen takvime sadık kalıyoruz.",
    },
    {
      icon: Users,
      title: "Uzman Mühendis & Saha Kadrosu",
      desc: "Elektrik, otomasyon ve enerji alanında yetkin mühendis kadromuz ve sertifikalı saha teknisyenlerimizle çözüm üretiyoruz.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <span>Kurumsal Değer Önerimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Neden Soykan Power?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Endüstriyel tesislerinizin enerji ve otomasyon altyapısını güvenle emanet edebileceğiniz kurumsal mühendislik ilkelerimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
