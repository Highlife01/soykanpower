import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Zap, Activity, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950 text-white">
      {/* Background Engineering Grids & Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-amber-400">SOYKAN POWER</span>
            <span className="text-slate-600">•</span>
            <span>Uçtan Uca Endüstriyel Mühendislik & Otomasyon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            Endüstrinin Gücünü{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Mühendislikle
            </span>{" "}
            İnşa Ediyoruz.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Elektrik taahhüt, endüstriyel otomasyon ve enerji sistemlerinde
            projelendirmeden devreye almaya kadar uluslararası standartlarda
            yüksek mühendislik çözümleri sunuyoruz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/teklif-al"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all group"
            >
              <span>Teklif Al</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/projeler"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-xl hover:border-slate-500 transition-all group"
            >
              <span>Projelerimizi İncele</span>
              <ChevronRight className="w-5 h-5 ml-1 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Quick Technical Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-12 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-wider">AG / OG / YG</div>
              <div className="text-xs text-slate-400 mt-0.5">Elektrik Taahhüt & Şalt</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <Cpu className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-wider">PLC & SCADA</div>
              <div className="text-xs text-slate-400 mt-0.5">Proses Otomasyonu</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <Activity className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-wider">MCC & Dağıtım</div>
              <div className="text-xs text-slate-400 mt-0.5">Tip Testli Pano Sistemleri</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-wider">Güneş Enerjisi</div>
              <div className="text-xs text-slate-400 mt-0.5">Endüstriyel Çatı & Arazi GES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
