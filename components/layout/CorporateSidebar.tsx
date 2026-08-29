"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Shield, Award, Users, Target, HeartHandshake, Leaf, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function CorporateSidebar() {
  const pathname = usePathname();

  const links = [
    { title: "Hakkımızda", href: "/kurumsal/hakkimizda", icon: Shield },
    { title: "Misyon & Vizyon", href: "/kurumsal/misyon-vizyon", icon: Target },
    { title: "Değerlerimiz", href: "/kurumsal/degerlerimiz", icon: HeartHandshake },
    { title: "Kalite Politikamız", href: "/kurumsal/kalite-politikasi", icon: Award },
    { title: "İSG Politikamız", href: "/kurumsal/isg-politikasi", icon: Shield },
    { title: "Çevre Politikamız", href: "/kurumsal/cevre-politikasi", icon: Leaf },
    { title: "Belgeler & Sertifikalar", href: "/kurumsal/belgeler-ve-sertifikalar", icon: FileCheck },
    { title: "İnsan Kaynakları", href: "/kurumsal/insan-kaynaklari", icon: Users },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 px-3 py-2 border-b border-slate-800 mb-2">
          Kurumsal Menü
        </h3>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-amber-400")} />
                  <span>{link.title}</span>
                </div>
                <ChevronRight className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-slate-600")} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-slate-200">
        <h4 className="text-sm font-bold text-white mb-2">Mühendislik Desteği</h4>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Tesisinizin elektrik, otomasyon veya GES projeleri için teknik ekibimizle iletişime geçin.
        </p>
        <Link
          href="/teklif-al"
          className="inline-flex items-center justify-center w-full py-2.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors"
        >
          Teklif Alın
        </Link>
      </div>
    </aside>
  );
}
