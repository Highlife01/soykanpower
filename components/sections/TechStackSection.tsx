"use client";

import React, { useState } from "react";
import { Cpu, Layers, Server, Settings, Zap, Globe, Sparkles } from "lucide-react";

export function TechStackSection() {
  const categories = [
    "Tümü",
    "PLC & Otomasyon",
    "Şalt & Güç Elektroniği",
    "CAD & Tasarım",
    "Pano & Donanım",
  ];

  const technologies = [
    {
      name: "Siemens",
      category: "PLC & Otomasyon",
      role: "TIA Portal / S7-1500 / WinCC Unified",
      desc: "Endüstriyel PLC kontrolörleri, HMI ekranlar ve SCADA mimarisi.",
      tier: "Premier Partner Standardı",
    },
    {
      name: "Schneider Electric",
      category: "Şalt & Güç Elektroniği",
      role: "EcoStruxure / Modicon / SM6 OG",
      desc: "OG modüler hücreler, Masterpact kompakt şalterler ve koruma röleleri.",
      tier: "Yetkili Sistem Entegratörü",
    },
    {
      name: "ABB",
      category: "Şalt & Güç Elektroniği",
      role: "AC500 / ACS880 VFD / Emax 2",
      desc: "Frekans invertörleri, güç elektroniği ve motor kontrol merkezleri.",
      tier: "Global Teknoloji Standardı",
    },
    {
      name: "Rockwell Automation",
      category: "PLC & Otomasyon",
      role: "Allen-Bradley / FactoryTalk View",
      desc: "Proses güvenliği (SIL3) ve yüksek hızlı üretim hattı otomasyonu.",
      tier: "Endüstriyel Emniyet",
    },
    {
      name: "EPLAN Pro Panel",
      category: "CAD & Tasarım",
      role: "3D CAD / CAE Pano Simülasyonu",
      desc: "3D dijital ikiz, bara büküm optimizasyonu ve termal analiz.",
      tier: "3D Mühendislik",
    },
    {
      name: "Rittal",
      category: "Pano & Donanım",
      role: "VX25 / Ri4Power Form 4b",
      desc: "Tip testli modüler pano karkasları ve endüstriyel iklimlendirme sistemleri.",
      tier: "Form 4b Tip Testli",
    },
    {
      name: "Inductive Automation",
      category: "PLC & Otomasyon",
      role: "Ignition SCADA / MQTT IIoT",
      desc: "Endüstri 4.0, bulut veri toplama ve web tabanlı mobil SCADA.",
      tier: "Endüstri 4.0 & IoT",
    },
    {
      name: "Phoenix Contact",
      category: "Pano & Donanım",
      role: "Sinyal Şartlandırma & Parafudr",
      desc: "Tip 1+2 yıldırım koruma, saha klemensleri ve endüstriyel haberleşme.",
      tier: "Saha Güvenliği",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredTech =
    activeCategory === "Tümü"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24 bg-slate-900 text-white relative border-y border-slate-800/80 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Globe className="w-3.5 h-3.5" />
            <span>Teknoloji & Marka Ekosistemi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Global Liderlerin Gücüyle Mühendislik
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Uluslararası kabul görmüş endüstriyel otomasyon devlerinin onaylı donanım ve yazılım mimarileri ile sıfır hata prensibinde çalışıyoruz.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-slate-950/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTech.map((tech, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 group shadow-xl backdrop-blur-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {tech.tier}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-300 font-semibold mb-2">
                  {tech.role}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{tech.category}</span>
                <span className="text-emerald-400 font-semibold">● Onaylı Entegrasyon</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
