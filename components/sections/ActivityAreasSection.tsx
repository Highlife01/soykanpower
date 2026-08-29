import React from "react";
import Link from "next/link";
import { Zap, Cpu, Server, Sun, ArrowUpRight } from "lucide-react";

export function ActivityAreasSection() {
  const areas = [
    {
      title: "Elektrik Taahhüt & Mühendislik",
      slug: "elektrik-taahhut-ve-muhendislik",
      desc: "AG, OG, YG altyapıları, trafo merkezleri, nakil hatları ve anahtar teslim endüstriyel elektrifikasyon çözümleri.",
      icon: Zap,
      accent: "from-amber-500 to-amber-600",
      features: ["AG/OG/YG Tesisleri", "Trafo Merkezleri", "Kablo Taşıma & Dağıtım", "Topraklama & Paratoner"],
    },
    {
      title: "Endüstriyel Otomasyon & SCADA",
      slug: "endustriyel-otomasyon",
      desc: "PLC programlama, SCADA mimarisi, DCS, HMI ekran tasarımları, Endüstri 4.0 ve IoT veri toplama sistemleri.",
      icon: Cpu,
      accent: "from-blue-500 to-blue-600",
      features: ["PLC & DCS Yazılımı", "WinCC & SCADA Sistemleri", "Endüstri 4.0 & IoT", "Kestirimci Bakım"],
    },
    {
      title: "Enerji Sistemleri & Pano Çözümleri",
      slug: "enerji-sistemleri",
      desc: "Tip testli Form 4b MCC, ADP, harmonik filtreli kompanzasyon panoları ve enerji kalitesi yönetimi.",
      icon: Server,
      accent: "from-emerald-500 to-emerald-600",
      features: ["Tip Testli MCC Panoları", "6300A'e Kadar ADP Panoları", "Harmonik Kompanzasyon", "Güç Kalitesi Analizi"],
    },
    {
      title: "Güneş Enerjisi (GES)",
      slug: "gunes-enerjisi",
      desc: "Endüstriyel çatı ve arazi tipi güneş enerji santrallerinde fizibilite, çağrı mektubu ve anahtar teslim EPC.",
      icon: Sun,
      accent: "from-orange-500 to-amber-500",
      features: ["Endüstriyel Çatı GES", "Arazi GES Santralleri", "Çağrı Mektubu & TEDAŞ Onayı", "O&M Bakım & İşletme"],
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <span>Temel Faaliyet Alanlarımız</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Endüstriyel Çözüm Mimarimiz
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Farklı mühendislik disiplinlerini entegre ederek, tesislerinizin tüm enerji ve kontrol gereksinimlerini tek merkezden karşılıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.accent} flex items-center justify-center text-slate-950 font-bold mb-6 shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-3">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {area.desc}
                  </p>

                  <ul className="space-y-2 border-t border-slate-800 pt-4 mb-6">
                    {area.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/hizmetler`}
                  className="inline-flex items-center justify-between w-full pt-3 text-xs font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 border-t border-slate-800/80"
                >
                  <span>Hizmetleri Gör</span>
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
