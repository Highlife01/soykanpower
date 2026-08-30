import React from "react";
import { ShieldCheck, Cpu, Award, Zap, Clock, Users, CheckCircle2, XCircle } from "lucide-react";

export function WhySoykanSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Mühendislik Standartlarına Tam Uyum",
      standard: "IEC, TSE & EN Uyumlu",
      desc: "Tüm projelerimizde IEC, TSE ve uluslararası elektrik şartnamelerine harfiyen uyum sağlayarak operasyonel ve elektriksel riskleri sıfırlıyoruz.",
    },
    {
      icon: Cpu,
      title: "İleri Teknoloji & Otomasyon Altyapısı",
      standard: "Siemens, ABB & Schneider",
      desc: "Endüstri 4.0 ve IoT uyumlu PLC/SCADA mimarileri ile üretim süreçlerinizde maksimum verimlilik ve minimum duruş süresi sağlıyoruz.",
    },
    {
      icon: Award,
      title: "Anahtar Teslim EPC Güvencesi",
      standard: "Tek Sözleşme, Tek Muhatap",
      desc: "Fizibilite ve mühendislik tasarımından malzeme temini, pano imalatı, montaj, test ve resmi kabullere kadar tek elden yönetim.",
    },
    {
      icon: Zap,
      title: "Tip Testli & Form Bölümlendirmeli Panolar",
      standard: "Form 2b / 3b / 4b",
      desc: "İmal ettiğimiz MCC ve ana dağıtım panolarında Form 4b'ye kadar tam bölümlendirme ile en üst düzey can ve işletme güvenliği sunuyoruz.",
    },
    {
      icon: Clock,
      title: "Zamanında Teslimat & CPM Planlama",
      standard: "Sıfır Gecikme Prensibi",
      desc: "Gelişmiş şantiye planlaması ve profesyonel proje yönetimi metodolojileri ile taahhüt edilen takvime ve bütçeye sadık kalıyoruz.",
    },
    {
      icon: Users,
      title: "Uzman Mühendis & Sertifikalı Saha Kadrosu",
      standard: "7/24 Kesintisiz Destek",
      desc: "Elektrik, otomasyon ve enerji alanında yetkin mühendis kadromuz ve sertifikalı saha teknisyenlerimizle her an yanınızdayız.",
    },
  ];

  const comparisons = [
    {
      criterion: "Proje Tasarımı",
      traditional: "Basit 2D şemalar, yetersiz hesaplamalar",
      soykan: "EPLAN Pro Panel 3D & Termal / Kısa Devre Simülasyonu",
    },
    {
      criterion: "Pano İmalatı",
      traditional: "Standartsız atölye montajı, formsüz",
      soykan: "IEC 61439-1/2 Tip Testli & Form 4b Bölümlendirmeli",
    },
    {
      criterion: "Otomasyon & Yazılım",
      traditional: "Kapalı ve dokümante edilmemiş kodlar",
      soykan: "IEC 61131-3 Uyumlu Modüler, Şeffaf ve Dokümante PLC",
    },
    {
      criterion: "Test & Devreye Alma",
      traditional: "Sadece enerjilendirme, yüzeysel kontrol",
      soykan: "Resmi FAT (Fabrika Kabul) ve SAT (Saha Kabul) Protokolleri",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Award className="w-3.5 h-3.5" />
            <span>Kurumsal Değer Önerimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Neden Soykan Power?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Endüstriyel tesislerinizin enerji ve otomasyon altyapısını güvenle emanet edebileceğiniz kurumsal mühendislik ilkelerimiz ve fark yaratan standartlarımız.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 group shadow-xl backdrop-blur-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
                    {pt.standard}
                  </span>
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

        {/* Engineering Comparison Matrix Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Geleneksel Taahhüt Yaklaşımı vs. Soykan Power EPC Standardı
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Mühendislik kalitemizin sahaya yansıyan somut teknik farkları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  {item.criterion}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start space-x-2 text-slate-500">
                    <XCircle className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5" />
                    <span className="line-through decoration-slate-600">{item.traditional}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-slate-200 font-semibold pt-1 border-t border-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-white">{item.soykan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
