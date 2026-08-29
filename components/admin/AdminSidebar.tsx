"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Briefcase,
  Layers,
  Factory,
  FolderGit2,
  Building2,
  Award,
  Newspaper,
  UserCheck,
  Mail,
  Settings,
  Users,
  Zap,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Teklif Talepleri (CRM)", href: "/admin/teklifler", icon: FileSpreadsheet },
    { label: "Hizmetler", href: "/admin/hizmetler", icon: Layers },
    { label: "Sektörler", href: "/admin/sektorler", icon: Factory },
    { label: "Projeler", href: "/admin/projeler", icon: FolderGit2 },
    { label: "Referanslar", href: "/admin/referanslar", icon: Building2 },
    { label: "Sertifikalar", href: "/admin/sertifikalar", icon: Award },
    { label: "Haberler & Blog", href: "/admin/haberler", icon: Newspaper },
    { label: "Kariyer İlanları", href: "/admin/kariyer", icon: Briefcase },
    { label: "İş Başvuruları", href: "/admin/basvurular", icon: UserCheck },
    { label: "İletişim Mesajları", href: "/admin/mesajlar", icon: Mail },
    { label: "Site & İletişim Ayarları", href: "/admin/ayarlar", icon: Settings },
    { label: "Yöneticiler", href: "/admin/kullanicilar", icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-wider text-white">
                SOYKAN<span className="text-amber-400 ml-0.5">ADMIN</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                Yönetim Paneli
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={cn("w-4 h-4", isActive ? "text-slate-950" : "text-amber-400")} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Link to Web Site */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <span>Web Sitesini Görüntüle</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>
    </aside>
  );
}
