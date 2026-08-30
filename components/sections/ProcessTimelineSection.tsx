"use client";

import React, { useState } from "react";
import {
  Search,
  Compass,
  CalendarCheck,
  Wrench,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
} from "lucide-react";

export function ProcessTimelineSection() {
  const steps = [
    {
      step: "01",
      title: "KEŞİF & ANALİZ",
      desc: "Saha yerinde incelenir, mevcut altyapı, kurulu güç ve proses ihtiyaçları tespit edilir.",
      icon: Search,
      deliverables: ["Saha Keşif Raporu", "Güç & Yük Analizi", "Fizibilite Değerlendirmesi"],
    },
    {
      step: "02",
      title: "MÜHENDİSLİK & EPLAN",
      desc: "AutoCAD & EPLAN ile tek hat şemaları, 3D pano çizimleri ve kısa devre hesapları yapılır.",
      icon: Compass,
      deliverables: ["EPLAN 3D Pano Tasarımı", "Kısa Devre & Gerilim Düşümü", "Röle Selektivite Raporu"],
    },
    {
      step: "03",
      title: "TEDARİK & PLANLAMA",
      desc: "Global onaylı malzeme tedarik zinciri, şantiye takvimi ve iş güvenliği planı hazırlanır.",
      icon: CalendarCheck,
      deliverables: ["Proje İş Programı (CPM)", "Tip Onaylı Malzeme Listesi", "İSG & Risk Değerlendirmesi"],
    },
    {
      step: "04",
      title: "İMALAT & UYGULAMA",
      desc: "Form 4b pano montajı, kablo tavası, busbar ve saha elektrifikasyonu tamamlanır.",
      icon: Wrench,
      deliverables: ["Form 4b Pano İmalatı", "Saha Kablaj & Entegrasyon", "Topraklama Şebekesi"],
    },
    {
      step: "05",
      title: "FAT & SAT TESTLERİ",
      desc: "Primer/sekonder enjeksiyon, izolasyon meğer testleri ve PLC I/O sinyal testleri uygulanır.",
      icon: ShieldAlert,
      deliverables: ["FAT Fabrika Kabul Tutanağı", "İzolasyon & Topraklama Ölçümü", "I/O Loop Kontrol Raporu"],
    },
    {
      step: "06",
      title: "DEVREYE ALMA & KABUL",
      desc: "Tesis enerjilendirilir, SCADA testleri yapılır ve ilgili idarelerin resmi kabulü alınır.",
      icon: CheckCircle2,
      deliverables: ["TEDAŞ / OSB Resmi Kabulü", "As-Built Proje Dokümantasyonu", "Kullanıcı & Operatör Eğitimi"],
    },
    {
      step: "07",
      title: "7/24 PERİYODİK BAKIM",
      desc: "Termal kamera denetimleri, kestirimci bakım ve 7/24 acil arıza müdahale desteği sunulur.",
      icon: RefreshCw,
      deliverables: ["Periyodik Termal Ölçüm", "Yıllık Trafo Yağ Testleri", "7/24 Acil Saha Servisi"],
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uçtan Uca Mühendislik Yönetimi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            7 Aşamalı Disiplinli Proje Sürecimiz
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            İlk saha keşfinden periyodik bakım desteğine kadar her adımı kayıt altına alınan, şeffaf ve uluslararası standartlarda yönetilen EPC iş akışımız.
          </p>
        </div>

        {/* Interactive Steps Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 border-amber-500 text-white shadow-xl shadow-amber-500/10 scale-105"
                    : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                <div>
                  <div
                    className={`text-xl font-black font-mono mb-2 ${
                      isActive ? "text-amber-400" : "text-slate-600"
                    }`}
                  >
                    {item.step}
                  </div>
                  <h3
                    className={`text-xs font-extrabold line-clamp-1 ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex justify-end">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-amber-400" : "text-slate-600"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Preview Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <span>ADIM {steps[activeStep].step}</span>
                <span>•</span>
                <span>MÜHENDİSLİK İŞ AKIŞI</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Bu Aşamada Teslim Edilen Dokümanlar:</span>
              </div>
              <div className="space-y-2 pt-1">
                {steps[activeStep].deliverables.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center space-x-2 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
