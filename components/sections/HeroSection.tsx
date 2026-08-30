"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Award,
} from "lucide-react";

export function HeroSection() {
  const stats = [
    { value: "50+", label: "Endüstriyel Tesis", desc: "Tamamlanan Proje" },
    { value: "%99.98", label: "Sistem Sürekliliği", desc: "Sıfır Duruş Hedefi" },
    { value: "Form 4b", label: "Tip Testli Panolar", desc: "IEC 61439-1/2 Standart" },
    { value: "7/24", label: "Teknik Destek", desc: "Hızlı Saha Müdahalesi" },
  ];

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background Engineering Grids & Luminous Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      
      {/* Dynamic Ambient Light Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-blue-600/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-slate-200 text-xs font-semibold shadow-2xl backdrop-blur-xl animate-shimmer">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400" />
            <span className="text-amber-400 font-extrabold tracking-wider">SOYKAN POWER</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Uçtan Uca Endüstriyel Mühendislik, Otomasyon & Enerji</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
            Endüstrinin Gücünü{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
              Yüksek Mühendislikle
            </span>{" "}
            İnşa Ediyoruz.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Elektrik taahhüt, AG/OG/YG şalt sistemleri, Siemens & ABB PLC/SCADA proses
            otomasyonu, tip testli pano imalatı ve anahtar teslim endüstriyel güneş enerjisi
            santralleri ile tesislerinizi geleceğe taşıyoruz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all group overflow-hidden animate-shimmer"
            >
              <span>Projeniz İçin Teklif Alın</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/projeler"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl hover:border-amber-500/50 shadow-xl backdrop-blur-md transition-all group"
            >
              <span>Projelerimizi İnceleyin</span>
              <ChevronRight className="w-5 h-5 ml-1 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Live Engineering Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 text-left group"
              >
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover:text-amber-400 transition-colors font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Technical Architecture Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/40 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-wider">AG / OG / YG Şalt</div>
              <div className="text-[11px] text-slate-400 mt-1">Trafo Merkezleri & Dağıtım</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/40 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-wider">PLC & SCADA</div>
              <div className="text-[11px] text-slate-400 mt-1">Siemens & ABB Otomasyon</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-wider">MCC & Dağıtım</div>
              <div className="text-[11px] text-slate-400 mt-1">Tip Testli Form 4b Panolar</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-orange-500/40 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-black text-white uppercase tracking-wider">Güneş Enerjisi (GES)</div>
              <div className="text-[11px] text-slate-400 mt-1">Endüstriyel Çatı & Arazi EPC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
