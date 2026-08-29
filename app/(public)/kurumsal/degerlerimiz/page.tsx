import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { ShieldCheck, Award, HeartHandshake, Zap, Users, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Değerlerimiz",
  description: "Soykan Power kurumsal değerleri ve mühendislik etik ilkeleri.",
};

export default function ValuesPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Mühendislik Etiği ve Dürüstlük",
      desc: "Tüm süreçlerimizde şeffaflık, teknik doğruluk ve dürüstlük temel ilkemizdir. Gerçekçi mühendislik hesaplarıyla çalışırız.",
    },
    {
      icon: Award,
      title: "Koşulsuz Kalite Standartları",
      desc: "IEC, TSE ve uluslararası standartlardan ödün vermeden, onaylı ve tip testli donanımlarla güvenilir sistemler kurarız.",
    },
    {
      icon: HeartHandshake,
      title: "İş Ortaklığı ve Güven",
      desc: "Müşterilerimizi yalnızca bir iş ilişkisi olarak değil, uzun vadeli mühendislik çözüm ortağı olarak görürüz.",
    },
    {
      icon: Zap,
      title: "Sürekli İnovasyon ve Gelişim",
      desc: "Endüstri 4.0, IoT, yapay zeka destekli kestirimci bakım ve yeni nesil enerji teknolojilerini yakından takip eder, uygularız.",
    },
    {
      icon: Users,
      title: "İnsan ve Çevre Odaklılık",
      desc: "Saha çalışanlarımızın güvenliğini her şeyin üstünde tutar, karbon ayak izini azaltan yeşil enerji projelerini destekleriz.",
    },
    {
      icon: Compass,
      title: "Sorumluluk ve Zaman Disiplini",
      desc: "Taahhüt ettiğimiz teslim sürelerine ve bütçeye tam sadakat gösterir, anahtar teslim sorumluluğu eksiksiz üstleniriz.",
    },
  ];

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Değerlerimiz
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Kararlarımıza ve mühendislik faaliyetlerimize yön veren temel kurumsal ilkelerimiz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Değerlerimiz" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
