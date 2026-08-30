import React from "react";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, PhoneCall, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export function QuoteCtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Accent Grids & Radial Amber Flare */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-gentle" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle Golden Beam at Top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
                <ShieldCheck className="w-4 h-4" />
                <span>Teknik Teklif & Keşif Talebi</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                Yeni Projeniz İçin Doğrudan Mühendislik Desteği Alın.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Elektrik taahhüt, fabrika otomasyonu, trafo merkezi veya çatı GES
                projeleriniz için teknik şartnamenizi ve gereksinimlerinizi iletin;
                uzman mühendis kadromuz en uygun teknik ve ticari çözümü hazırlasın.
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>24 Saat İçinde Teknik Ön Değerlendirme</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Ücretsiz Saha Keşfi & Yük Analizi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Gizlilik Sözleşmesi (NDA) Güvencesi</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <Link
                href="/teklif-al"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden animate-shimmer"
              >
                <span>Teklif Formunu Doldurun</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/iletisim"
                className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-2xl transition-all text-center"
              >
                <span>İletişime Geçin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
