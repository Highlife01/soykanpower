import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Çerez Politikası | Soykan Power Mühendislik",
  description: "Soykan Power web sitesi çerez kullanım politikası ve tercihleri.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Yasal Bilgilendirme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Çerez Politikası
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Web sitemizde kullanılan teknik ve zorunlu çerezler hakkında bilgilendirme.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Yasal", href: "/yasal/kvkk" },
          { label: "Çerez Politikası" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 text-slate-300 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Çerezler (Cookies) Nedir?
          </h2>
          <p>
            Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
            Kullanılan Çerez Türleri
          </h2>
          <p>
            Sitemizde yalnızca sistem güvenliği, form gönderimleri ve oturum yönetimi için gerekli olan zorunlu teknik çerezler kullanılmaktadır. İzinsiz üçüncü taraf reklam takip çerezleri kullanılmamaktadır.
          </p>
        </div>
      </div>
    </div>
  );
}
