import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Soykan Power Mühendislik",
  description: "Soykan Power web sitesi gizlilik politikası ve veri güvenliği ilkeleri.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Yasal Bilgilendirme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Gizlilik Politikası
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Kullanıcı gizliliği, veri güvenliği ve teknik şartnamelerin korunmasına ilişkin prensiplerimiz.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Yasal", href: "/yasal/kvkk" },
          { label: "Gizlilik Politikası" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Gizlilik İlkelerimiz
          </h2>
          <p>
            Soykan Power, kullanıcılarının ve iş ortaklarının gizlilik haklarına azami özen göstermektedir. Web sitemiz üzerinden paylaştığınız iletişim verileri ve teklif formları ile yüklediğiniz proje dosyaları yalnızca tekliflendirme ve mühendislik değerlendirmesi amacıyla kullanılır.
          </p>
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Teknik Doküman ve Proje Dosyaları Güvenliği
          </h2>
          <p>
            Teklif sistemi üzerinden yüklenen DWG, PDF ve şartname dosyaları güvenli sunucularda saklanır ve üçüncü şahısların erişimine kapalı tutulur. Şirketimiz, talep edilmesi halinde müşterileriyle Gizlilik Sözleşmesi (NDA) imzalamayı taahhüt eder.
          </p>
        </div>
      </div>
    </div>
  );
}
