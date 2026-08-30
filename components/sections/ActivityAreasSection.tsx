import React from "react";
import Link from "next/link";
import { Zap, Cpu, Server, Sun, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function ActivityAreasSection() {
  const areas = [
    {
      title: "Elektrik Taahhüt & Şalt",
      slug: "elektrik-taahhut-ve-muhendislik",
      tag: "AG / OG / YG",
      desc: "Trafo merkezleri, OG şalt tesisleri, nakil hatları, busbar kanal sistemleri ve anahtar teslim elektrifikasyon.",
      icon: Zap,
      accent: "from-amber-400 to-amber-600",
      glowColor: "group-hover:border-amber-500/50",
      standard: "IEC 62271 / TSE",
      features: ["AG/OG/YG Tesisleri", "Trafo Merkezleri", "Kablo Taşıma & Busbar", "Topraklama & Paratoner"],
    },
    {
      title: "Endüstriyel Otomasyon",
      slug: "endustriyel-otomasyon",
      tag: "PLC & SCADA",
      desc: "Siemens TIA Portal, ABB & Schneider PLC programlama, SCADA mimarisi, HMI tasarım ve Endüstri 4.0 IoT entegrasyonu.",
      icon: Cpu,
      accent: "from-blue-400 to-blue-600",
      glowColor: "group-hover:border-blue-500/50",
      standard: "IEC 61131-3 Standart",
      features: ["PLC & DCS Yazılımı", "WinCC & SCADA Sistemleri", "Endüstri 4.0 & IoT", "Kestirimci Bakım"],
    },
    {
      title: "Pano İmalatı & Enerji",
      slug: "enerji-sistemleri",
      tag: "Form 4b Tip Testli",
      desc: "6300A'e kadar tip testli ADP panoları, akıllı MCC motor kontrol panoları, harmonik filtreli kompanzasyon ve enerji kalitesi.",
      icon: Server,
      accent: "from-emerald-400 to-emerald-600",
      glowColor: "group-hover:border-emerald-500/50",
      standard: "IEC 61439-1/2 Form 4b",
      features: ["Tip Testli MCC Panoları", "6300A ADP Panoları", "Harmonik Kompanzasyon", "Güç Kalitesi Analizi"],
    },
    {
      title: "Güneş Enerjisi (GES)",
      slug: "gunes-enerjisi",
      tag: "EPC Anahtar Teslim",
      desc: "Endüstriyel çatı ve arazi tipi güneş enerji santrallerinde statik fizibilite, çağrı mektubu, TEDAŞ kabulü ve anahtar teslim EPC.",
      icon: Sun,
      accent: "from-orange-400 to-amber-500",
      glowColor: "group-hover:border-orange-500/50",
      standard: "TEDAŞ & IEC 62446",
      features: ["Endüstriyel Çatı GES", "Arazi GES Santralleri", "Çağrı Mektubu & Onay", "O&M Bakım & İşletme"],
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grids & Subtle Circuit Pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Zap className="w-3.5 h-3.5" />
            <span>Temel Faaliyet Alanlarımız</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Entegre Endüstriyel Çözüm Mimarimiz
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Farklı mühendislik disiplinlerini tek merkezde entegre ederek, tesislerinizin tüm elektrifikasyon, otomasyon ve enerji gereksinimlerini karşılıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className={`group relative p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between shadow-2xl backdrop-blur-xl ${area.glowColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.accent} flex items-center justify-center text-slate-950 font-bold shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400">
                      {area.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-3">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {area.desc}
                  </p>

                  <div className="text-[11px] font-mono text-slate-500 mb-3 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>{area.standard}</span>
                  </div>

                  <ul className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                    {area.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/hizmetler"
                  className="inline-flex items-center justify-between w-full pt-4 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 border-t border-slate-800/80 transition-colors"
                >
                  <span>Mühendislik Kapsamını Gör</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
