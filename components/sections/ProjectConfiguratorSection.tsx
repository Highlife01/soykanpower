"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Factory,
  Zap,
  Cpu,
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Sparkles,
  Server,
  Layers,
  Activity,
} from "lucide-react";

export function ProjectConfiguratorSection() {
  const facilityTypes = [
    { id: "factory", name: "Ağır Sanayi & Fabrika", icon: Factory, defaultPower: "1600 kVA" },
    { id: "osb", name: "OSB İmalat & Üretim", icon: Layers, defaultPower: "1000 kVA" },
    { id: "ges", name: "Endüstriyel Çatı / Arazi GES", icon: Sun, defaultPower: "2500 kWp" },
    { id: "cold", name: "Soğuk Depo & Lojistik", icon: Server, defaultPower: "800 kVA" },
    { id: "treatment", name: "Su & Atıksu Arıtma", icon: Activity, defaultPower: "630 kVA" },
  ];

  const powerTiers = [
    { label: "250 - 630 kVA", tag: "Orta Ölçekli Tesis" },
    { label: "1000 - 2500 kVA", tag: "Endüstriyel Üretim" },
    { label: "3150 - 6300 kVA", tag: "Ağır Sanayi & Şalt" },
    { label: "10+ MVA / YG", tag: "Yüksek Gerilim Tesis" },
  ];

  const systemOptions = [
    { id: "trafo", label: "Trafo Merkezi & OG Hücre", standard: "IEC 62271-200" },
    { id: "adp", label: "6300A'e Kadar Tip Testli ADP", standard: "Form 4b IEC 61439" },
    { id: "plc", label: "PLC & SCADA Otomasyon", standard: "Siemens TIA / ABB" },
    { id: "mcc", label: "Akıllı MCC Motor Sürücü Panosu", standard: "VFD & Soft Starter" },
    { id: "kompanzasyon", label: "Harmonik Filtreli Kompanzasyon", standard: "Güç Kalitesi & Cosφ" },
    { id: "ges", label: "Çatı Güneş Enerjisi (GES)", standard: "TEDAŞ Onaylı EPC" },
  ];

  const [selectedFacility, setSelectedFacility] = useState(facilityTypes[0]);
  const [selectedPower, setSelectedPower] = useState(powerTiers[1]);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([
    "trafo",
    "adp",
    "plc",
    "mcc",
  ]);

  const toggleSystem = (id: string) => {
    if (selectedSystems.includes(id)) {
      if (selectedSystems.length > 1) {
        setSelectedSystems(selectedSystems.filter((s) => s !== id));
      }
    } else {
      setSelectedSystems([...selectedSystems, id]);
    }
  };

  const getRfqUrl = () => {
    const systemsList = systemOptions
      .filter((s) => selectedSystems.includes(s.id))
      .map((s) => s.label)
      .join(", ");
    const desc = `${selectedFacility.name} projesi için ${selectedPower.label} güç kapasitesinde [${systemsList}] sistemleri talep edilmektedir.`;
    return `/teklif-al?service=${encodeURIComponent("Elektrik Taahhüt")}&desc=${encodeURIComponent(
      desc
    )}`;
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800/80">
      {/* Background Grids and Ambient Lights */}
      <div className="absolute inset-0 bg-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>İnteraktif Mühendislik Aracı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Proje & Güç Yapılandırıcı
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tesis tipinizi, güç gereksiniminizi ve ihtiyaç duyduğunuz sistemleri seçin; mühendislik mimarinizi oluşturup anında teklif talebine dönüştürün.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Facility Type */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  1. Tesis / Sektör Tipini Seçin
                </span>
                <span className="text-xs text-slate-500 font-mono">01/03</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {facilityTypes.map((fac) => {
                  const Icon = fac.icon;
                  const isSelected = selectedFacility.id === fac.id;
                  return (
                    <button
                      key={fac.id}
                      onClick={() => setSelectedFacility(fac)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-2 ${
                          isSelected ? "text-amber-400" : "text-slate-400"
                        }`}
                      />
                      <span className="text-xs font-bold block leading-tight">
                        {fac.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Power Capacity */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  2. Kurulu Güç / Trafo Kapasitesi
                </span>
                <span className="text-xs text-slate-500 font-mono">02/03</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {powerTiers.map((pwr, idx) => {
                  const isSelected = selectedPower.label === pwr.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPower(pwr)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                          : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="text-xs font-black text-amber-400 font-mono">
                        {pwr.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {pwr.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: System Requirements */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  3. Kapsama Dahil Edilecek Sistemler
                </span>
                <span className="text-xs text-slate-500 font-mono">03/03</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {systemOptions.map((sys) => {
                  const isSelected = selectedSystems.includes(sys.id);
                  return (
                    <button
                      key={sys.id}
                      onClick={() => toggleSystem(sys.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-slate-950 border-amber-500/80 text-white"
                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {sys.label}
                        </div>
                        <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                          {sys.standard}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-amber-500 text-slate-950"
                            : "bg-slate-900 border border-slate-700 text-transparent"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Architecture Spec Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="glass-card-premium p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden">
              {/* Subtle top amber light indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-[11px] font-mono uppercase font-bold tracking-wider mb-2 border border-amber-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Önerilen Mühendislik Paketi</span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {selectedFacility.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    Kapasite: <span className="text-amber-400 font-bold font-mono">{selectedPower.label}</span>
                  </div>
                </div>

                {/* Selected Specifications Breakdown */}
                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Dahil Edilen Çözüm Bileşenleri:
                  </div>
                  <div className="space-y-2">
                    {systemOptions
                      .filter((s) => selectedSystems.includes(s.id))
                      .map((s) => (
                        <div
                          key={s.id}
                          className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-slate-200">{s.label}</span>
                          <span className="text-[10px] text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            {s.standard}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Engineering Highlights */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Soykan Power EPC Güvenceleri:</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-400 pl-6 list-disc">
                    <li>3D EPLAN Projelendirme & Kısa Devre Hesapları</li>
                    <li>IEC 61439 Tip Testli & Form Bölümlendirmeli İmalat</li>
                    <li>Saha Devreye Alma, FAT/SAT Testleri ve TEDAŞ Onayı</li>
                  </ul>
                </div>

                {/* Direct RFQ Action Button */}
                <Link
                  href={getRfqUrl()}
                  className="w-full flex items-center justify-center px-6 py-4 text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden animate-shimmer"
                >
                  <span>Bu Mimari İçin Teklif Alın</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
