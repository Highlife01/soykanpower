import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Zap, Award, Layers } from "lucide-react";

export function IntroSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative border-b border-slate-800/80 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kurumsal Mühendislik Yetkinliği</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Sadece Bir Taahhüt Firması Değil;{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Entegre Mühendislik Ortağınız.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Soykan Power; endüstriyel tesislerin enerji altyapılarından üretim
              hatlarının otomasyonuna, Form 4b tip testli pano imalatından
              sürdürülebilir çatı ve arazi güneş enerjisi santrallerine kadar
              geniş bir mühendislik disiplinini tek çatı altında buluşturur.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-200">
                  Uluslararası IEC ve TSE standartlarına tam uyumlu 3D projelendirme ve uygulama
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-200">
                  Keşif, tasarım, simülasyon, pano imalatı ve saha devreye almada tek elden yönetim
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-200">
                  Yüksek iş sağlığı ve güvenliği (İSG) kültürü ile sahada sıfır kaza hedefi
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/kurumsal/hakkimizda"
                className="inline-flex items-center space-x-2 text-sm font-extrabold text-amber-400 hover:text-amber-300 transition-colors group"
              >
                <span>Kurumsal Yapımız ve Mühendislik Kadromuz</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-7 rounded-3xl bg-slate-950/80 text-white shadow-2xl space-y-3.5 border border-slate-800/90 hover:border-amber-500/40 transition-all hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-white">Yüksek Teknik Hesaplama</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yüksek gerilimden mikroişlemcili röle koordinasyonuna ve PLC yazılımlarına kadar eksiksiz teknik hesaplama.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-950/80 text-white shadow-2xl space-y-3.5 border border-slate-800/90 hover:border-amber-500/40 transition-all hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-white">Anahtar Teslim EPC</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tasarım, malzeme temini, Form 4b pano imalatı, saha montajı ve resmi kabul aşamalarını tek sözleşmeyle teslim.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-950/80 text-white shadow-2xl space-y-3.5 border border-slate-800/90 hover:border-amber-500/40 transition-all hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-white">İleri Otomasyon & SCADA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Endüstri 4.0 uyumlu SCADA, IoT veri toplama ve kestirimci bakım çözümleriyle fabrikalarınızı geleceğe taşıyoruz.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-950/80 text-white shadow-2xl space-y-3.5 border border-slate-800/90 hover:border-amber-500/40 transition-all hover:-translate-y-1">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-white">7/24 Kesintisiz Saha Desteği</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Devreye alma sonrasında planlı periyodik termal bakımlar, uzaktan teknik destek ve hızlı acil arıza müdahalesi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
