"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Bell } from "lucide-react";

interface AdminHeaderProps {
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Soykan Power Mühendislik Yönetim Paneli
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Info */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-bold text-white leading-tight">
              {user?.name || "Yönetici"}
            </span>
            <span className="text-[10px] text-slate-400">
              {user?.email || "admin@soykanpower.com"}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
          title="Güvenli Çıkış Yap"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
