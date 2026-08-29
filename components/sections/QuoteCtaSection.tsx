import React from "react";
import Link from "next/link";
import { ArrowRight, FileSpreadsheet, PhoneCall, ShieldCheck } from "lucide-react";

export function QuoteCtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Teknik Teklif & Keşif Talebi</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Yeni Projeniz İçin Mühendislik Desteği Alın.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Elektrik taahhüt, fabrika otomasyonu, trafo merkezi veya güneş enerjisi
                projeleriniz için teknik şartnamenizi ve gereksinimlerinizi iletin;
                uzman mühendis kadromuz en uygun çözümü hazırlasın.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                href="/teklif-al"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Teklif Formunu Doldur</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              >
                <span>İletişime Geç</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
