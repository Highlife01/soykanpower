import React from "react";
import { Cpu, Layers, Server, Settings, Zap, Globe } from "lucide-react";

export function TechStackSection() {
  const technologies = [
    { name: "Siemens", category: "TIA Portal / S7-1500 / WinCC", desc: "PLC, Sürücü & SCADA Sistemleri" },
    { name: "Schneider Electric", category: "Modicon / EcoStruxure", desc: "OG Hücre, Şalter & Otomasyon" },
    { name: "ABB", category: "Robotics & AC500 / VFD", desc: "Frekans İnvertörleri & Güç Elektroniği" },
    { name: "Rockwell Automation", category: "Allen-Bradley / FactoryTalk", desc: "Endüstriyel Kontrol & Emniyet" },
    { name: "EPLAN Pro Panel", category: "3D CAD / CAE Pano Tasarımı", desc: "Elektrik Projelendirme Standartları" },
    { name: "Inductive Automation", category: "Ignition SCADA / MQTT", desc: "Endüstri 4.0 & IIoT Platformu" },
    { name: "Phoenix Contact", category: "Sinyal Şartlandırma & Klemens", desc: "Saha Bağlantı & Koruma Teknolojileri" },
    { name: "Rittal", category: "Tip Testli Form Panoları", desc: "Modüler Pano ve İklimlendirme" },
  ];

  return (
    <section className="py-16 bg-slate-900 text-white relative border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 mb-3">
            <span>Teknoloji Ekosistemi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Global Standartlarda Mühendislik ve Donanım Mimarisi
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Uluslararası kabul görmüş endüstriyel standartlar ve lider teknoloji üreticilerinin donanımları ile çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
            >
              <div className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                {tech.name}
              </div>
              <div className="text-[11px] font-mono text-amber-400/90 mt-1">
                {tech.category}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {tech.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
