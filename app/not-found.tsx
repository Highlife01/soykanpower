import React from "react";
import Link from "next/link";
import { Zap, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative z-10 max-w-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
          <Zap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black text-amber-400 font-mono">404</span>
          <h1 className="text-2xl font-bold text-white">Sayfa Bulunamadı</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Aradığınız sayfa silinmiş, adı değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4 mr-1.5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex items-center px-6 py-3 text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl transition-colors w-full sm:w-auto justify-center"
          >
            <span>Hizmetlerimizi İncele</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
