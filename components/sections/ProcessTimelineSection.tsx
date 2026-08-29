import React from "react";
import { Search, Compass, CalendarCheck, Wrench, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";

export function ProcessTimelineSection() {
  const steps = [
    {
      step: "01",
      title: "KEŞİF",
      desc: "Saha analizi, mevcut altyapı incelemesi ve ihtiyaç tespiti.",
      icon: Search,
    },
    {
      step: "02",
      title: "MÜHENDİSLİK",
      desc: "Teknik hesaplama, AutoCAD / EPLAN proje ve sistem tasarımı.",
      icon: Compass,
    },
    {
      step: "03",
      title: "PLANLAMA",
      desc: "Malzeme tedarik zinciri, uzman ekip ve zaman yönetimi.",
      icon: CalendarCheck,
    },
    {
      step: "04",
      title: "UYGULAMA",
      desc: "Standartlara uygun saha montajı, kablaj ve pano entegrasyonu.",
      icon: Wrench,
    },
    {
      step: "05",
      title: "TEST",
      desc: "Primer/sekonder izolasyon, topraklama ve sinyal testleri.",
      icon: ShieldAlert,
    },
    {
      step: "06",
      title: "DEVREYE ALMA",
      desc: "Sistemlerin enerjilendirilmesi, kabul testleri ve resmi onay.",
      icon: CheckCircle2,
    },
    {
      step: "07",
      title: "BAKIM",
      desc: "7/24 teknik destek, kestirimci ve periyodik periyodik bakım.",
      icon: RefreshCw,
    },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <span>Uçtan Uca Mühendislik Yönetimi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Çalışma ve Proje Sürecimiz
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            İlk saha keşfinden periyodik işletme desteğine kadar 7 adımlı disiplinli mühendislik sürecimiz.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:bg-slate-950 hover:text-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="text-2xl font-black text-amber-600 group-hover:text-amber-400 mb-3 font-mono">
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 group-hover:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 group-hover:border-slate-800 flex justify-end">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
