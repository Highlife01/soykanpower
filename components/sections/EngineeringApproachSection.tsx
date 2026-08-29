import React from "react";
import { CheckCircle2, ShieldCheck, Binary, Sliders } from "lucide-react";

export function EngineeringApproachSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              <span>Mühendislik Metodolojisi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Hassas Hesaplama, Simülasyon ve Sıfır Hata Prensibi
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mühendislik; varsayımlara değil, matematiksel ve fiziksel hesaplamalara dayanır.
              Soykan Power olarak sahada uygulanacak her kablo kesiti, şalter açma eğrisi,
              harmonik rezonans noktası ve PLC komutu önceden simüle edilir.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Binary className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">EPLAN & 3D Pano Tasarımı</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Elektrik panoları 3D termal analiz ve optimum bara yerleşimi ile projelendirilir.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Röle Koordinasyonu & Selektivite</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Arıza durumunda sadece arızalı bölgenin devreden çıkması için koruma koordinasyonu sağlanır.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">FAT & SAT Kalite Doğrulaması</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Saha montajı öncesi atölye kabul testleri (FAT) ve sahada saha kabul testleri (SAT) titizlikle uygulanır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-amber-400 border-b border-slate-800 pb-4">
              Mühendislik Standartlarımız
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-mono text-amber-400 font-bold">IEC 61439-1/2</div>
                <div className="text-slate-300 mt-1 font-semibold">Alçak Gerilim Pano Standardı</div>
                <div className="text-[11px] text-slate-500 mt-1">Tip testli ve form bölümlendirmeli imalat</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-mono text-amber-400 font-bold">IEC 61131-3</div>
                <div className="text-slate-300 mt-1 font-semibold">PLC Programlama Standardı</div>
                <div className="text-[11px] text-slate-500 mt-1">Modüler ve okunabilir kod yapısı</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-mono text-amber-400 font-bold">IEC 62305</div>
                <div className="text-slate-300 mt-1 font-semibold">Yıldırımdan Korunma</div>
                <div className="text-[11px] text-slate-500 mt-1">Risk analizi ve parafudr koruması</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-mono text-amber-400 font-bold">IEC 62446</div>
                <div className="text-slate-300 mt-1 font-semibold">Güneş Enerjisi (GES) Testleri</div>
                <div className="text-[11px] text-slate-500 mt-1">I-V eğrisi ve termal kamera denetimleri</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
