"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  FileSpreadsheet,
  ArrowUp,
  X,
  Zap,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingQuickActionsProps {
  phone?: string | null;
  whatsappNumber?: string | null;
}

export function FloatingQuickActions({
  phone = "0532 000 00 00",
  whatsappNumber = "905320000000",
}: FloatingQuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanPhone = phone?.replace(/[^0-9+]/g, "") || "";
  const cleanWhatsapp = whatsappNumber?.replace(/[^0-9]/g, "") || "905320000000";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Yukarı Çık"
          className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 flex items-center justify-center shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Expanded Action Menu */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-2.5 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Action 1: Hızlı Teklif Al */}
          <Link
            href="/teklif-al"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-amber-500/30 text-white shadow-2xl backdrop-blur-xl hover:border-amber-400 hover:scale-[1.02] transition-all group"
          >
            <div className="text-right">
              <div className="text-xs font-bold text-amber-400">Teknik Teklif Al</div>
              <div className="text-[10px] text-slate-400">Keşif & Proje Talebi</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </Link>

          {/* Action 2: WhatsApp Hızlı Destek */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
              "Merhaba Soykan Power Mühendislik, endüstriyel elektrik / otomasyon projemiz için bilgi ve keşif talep etmek istiyoruz."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-emerald-500/30 text-white shadow-2xl backdrop-blur-xl hover:border-emerald-400 hover:scale-[1.02] transition-all group"
          >
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400">WhatsApp Hattı</div>
              <div className="text-[10px] text-slate-400">Canlı Mühendis Desteği</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
          </a>

          {/* Action 3: Doğrudan Telefon */}
          {cleanPhone && (
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-blue-500/30 text-white shadow-2xl backdrop-blur-xl hover:border-blue-400 hover:scale-[1.02] transition-all group"
            >
              <div className="text-right">
                <div className="text-xs font-bold text-blue-400">Mühendislik Hattı</div>
                <div className="text-[10px] text-slate-400">{phone}</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
            </a>
          )}
        </div>
      )}

      {/* Main Trigger Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Hızlı İşlemler Menüsü"
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 group cursor-pointer focus:outline-none",
          isOpen
            ? "bg-slate-900 text-amber-400 border border-amber-500/50 rotate-90"
            : "bg-gradient-to-tr from-amber-500 via-amber-500 to-amber-400 text-slate-950 shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 -rotate-90" />
        ) : (
          <>
            <Zap className="w-6 h-6 fill-current animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
