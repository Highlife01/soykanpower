import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { ShieldCheck, CheckCircle2, Award, Zap, Cpu, Sun } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Soykan Power; elektrik taahhüt, endüstriyel otomasyon, enerji sistemleri ve güneş enerjisi santrallerinde anahtar teslim mühendislik çözümleri sunar.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hakkımızda
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Mühendislik uzmanlığı, teknolojik yenilikçilik ve kurumsal güvenle endüstrinin geleceğini inşa ediyoruz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Hakkımızda" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <h2 className="text-2xl font-bold text-white">
                Mühendislik Odaklı Kurumsal Yaklaşım
              </h2>
              <p>
                <strong className="text-white">Soykan Power</strong>; elektrik taahhüt,
                endüstriyel otomasyon, pano imalatı, güç kalitesi ve yenilenebilir güneş
                enerjisi alanlarında faaliyet gösteren entegre bir mühendislik şirketidir.
              </p>
              <p>
                Modern endüstrinin karmaşıklaşan enerji ve otomasyon ihtiyaçlarını
                tek bir çatı altında karşılamak üzere yapılandırılan firmamız;
                keşiften fizibiliteye, detaylı mühendislik tasarımından malzeme tedariğine,
                saha montajından test ve devreye almaya kadar uçtan uca anahtar teslim
                (EPC) hizmet modeliyle çalışır.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Entegre Elektrik Taahhüt</h3>
                <p className="text-xs text-slate-400">
                  AG, OG ve YG şebeke altyapıları, monoblok trafo merkezleri, enerji nakil hatları ve fabrika elektrifikasyonu.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Endüstriyel Otomasyon & SCADA</h3>
                <p className="text-xs text-slate-400">
                  PLC programlama, DCS mimarileri, proses izleme SCADA yazılımları ve Endüstri 4.0 IoT entegrasyonları.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Temel İlkelerimiz</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Uluslararası Standartlar:</strong> Tüm projelerimizde IEC, TSE, EN ve ilgili mühendislik normlarına eksiksiz uyum sağlanır.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">İş Sağlığı ve Güvenliği (İSG):</strong> Sıfır iş kazası hedefi ile sahada en yüksek güvenlik protokolleri uygulanır.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Sürdürülebilirlik & Verimlilik:</strong> Enerji kayıplarını minimize eden, yüksek verimli donanım ve güneş enerjisi çözümleri üretilir.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
