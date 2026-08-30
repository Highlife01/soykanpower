import React from "react";
import { CheckCircle2, ShieldCheck, Binary, Sliders, Cpu, Activity, Sparkles, FileCheck2 } from "lucide-react";

export function EngineeringApproachSection() {
  const standards = [
    {
      code: "IEC 61439-1/2",
      title: "Alçak Gerilim Pano Standardı",
      desc: "Tip testli ve Form 4b tam bölümlendirmeli imalat ile can ve sistem emniyeti.",
      tag: "Form 4b Onaylı",
    },
    {
      code: "IEC 61131-3",
      title: "PLC & Otomasyon Yazılım Standardı",
      desc: "Modüler, şeffaf, okunabilir ve uluslararası standartlara uyumlu kod yapısı.",
      tag: "Siemens & ABB",
    },
    {
      code: "IEC 62305",
      title: "Yıldırımdan Korunma & Topraklama",
      desc: "Hassas risk analizi, Tip 1+2 parafudr koordinasyonu ve eşpotansiyel dengeleme.",
      tag: "Sıfır Risk",
    },
    {
      code: "IEC 62446",
      title: "Güneş Enerjisi (GES) Test Standardı",
      desc: "I-V eğrisi ölçümleri, termal kamera denetimleri ve performans oranı analizleri.",
      tag: "TEDAŞ Onaylı",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative border-y border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Methodology Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mühendislik Metodolojisi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
              Hassas Hesaplama, 3D Simülasyon ve Sıfır Hata Prensibi
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mühendislik; varsayımlara değil, matematiksel ve fiziksel hesaplamalara dayanır.
              Soykan Power olarak sahada uygulanacak her kablo kesiti, şalter açma eğrisi,
              harmonik rezonans noktası ve PLC komutu önceden simüle edilir.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">EPLAN Pro Panel & 3D Pano Tasarımı</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Elektrik panoları 3D termal analiz, dinamik kısa devre dayanımı ve optimum bara yerleşimi ile projelendirilir.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-500/20">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Röle Koordinasyonu & Selektivite</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Arıza durumunda fabrikanın tamamının değil, sadece arızalı bölgenin devreden çıkması için mikroişlemcili röle koordinasyonu sağlanır.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">FAT (Fabrika Kabul) & SAT (Saha Kabul) Doğrulaması</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Saha montajı öncesi atölye kabul testleri (FAT) ve sahada devreye alma testleri (SAT) resmi tutanaklarla doğrulanır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Standards Matrix */}
          <div className="lg:col-span-6 bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Uluslararası Standartlarımız</span>
              </h3>
              <span className="text-xs text-amber-400 font-mono font-bold">IEC / TSE / EN</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {standards.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-amber-400 font-black text-xs">
                        {st.code}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {st.tag}
                      </span>
                    </div>
                    <div className="text-slate-200 font-bold text-xs mt-1">
                      {st.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      {st.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Teknik dokümantasyon ve şartname analizi için:</span>
              <span className="font-bold text-amber-400">info@soykanpower.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
