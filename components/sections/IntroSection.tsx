import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

export function IntroSection() {
  return (
    <section className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>Kurumsal Mühendislik Yetkinliği</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Sadece Bir Taahhüt Firması Değil;{" "}
              <span className="text-amber-600">Entegre Mühendislik Ortağınız.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Soykan Power; endüstriyel tesislerin enerji altyapılarından üretim
              hatlarının otomasyonuna, yüksek güvenlik standartlarına sahip pano
              imalatından sürdürülebilir güneş enerjisi santrallerine kadar
              geniş bir mühendislik disiplinini tek çatı altında buluşturur.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Uluslararası IEC ve TSE standartlarına tam uyumlu projelendirme ve uygulama
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Keşif, tasarım, simülasyon, pano montajı ve saha devreye almada tek elden yönetim
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-700">
                  Yüksek iş sağlığı ve güvenliği (İSG) kültürü ile sıfır kaza hedefi
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center space-x-2 text-sm font-bold text-slate-950 hover:text-amber-600 transition-colors group"
              >
                <span>Hakkımızda Daha Fazla Bilgi</span>
                <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-3 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-lg font-bold">Teknik Uzmanlık</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yüksek gerilimden PLC yazılımlarına kadar uzman mühendis kadromuzla projelerinizde eksiksiz teknik hesaplama.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Anahtar Teslim EPC</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tasarım, malzeme temini, saha montajı, test ve resmi kabul aşamalarını tek sözleşmeyle eksiksiz teslim.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">İleri Otomasyon</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Endüstri 4.0 uyumlu SCADA, IoT veri toplama ve kestirimci bakım çözümleriyle fabrikalarınızı geleceğe taşıyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-3 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-lg font-bold">Kesintisiz Destek</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Devreye alma sonrasında planlı periyodik bakımlar, uzaktan teknik destek ve hızlı arıza müdahalesi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
