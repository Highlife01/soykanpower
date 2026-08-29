import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  FileSpreadsheet,
  FolderGit2,
  Mail,
  Briefcase,
  UserCheck,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0; // Always fresh for admin

export default async function AdminDashboardPage() {
  const [
    newQuotesCount,
    totalQuotesCount,
    totalProjectsCount,
    unreadMessagesCount,
    activeJobsCount,
    newApplicationsCount,
    recentQuotes,
    recentMessages,
  ] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.count(),
    prisma.project.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.career.count({ where: { active: true } }),
    prisma.jobApplication.count({ where: { status: "NEW" } }),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    {
      title: "Yeni Teklif Talepleri",
      value: newQuotesCount,
      total: `Toplam: ${totalQuotesCount}`,
      icon: FileSpreadsheet,
      href: "/admin/teklifler",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    {
      title: "Okunmamış Mesajlar",
      value: unreadMessagesCount,
      total: "İletişim Formları",
      icon: Mail,
      href: "/admin/mesajlar",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      title: "Yayındaki Projeler",
      value: totalProjectsCount,
      total: "Mühendislik Portföyü",
      icon: FolderGit2,
      href: "/admin/projeler",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      title: "Yeni İş Başvuruları",
      value: newApplicationsCount,
      total: `Aktif İlan: ${activeJobsCount}`,
      icon: UserCheck,
      href: "/admin/basvurular",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Yönetim Özeti</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Soykan Power kurumsal web sitesi veritabanı ve CRM durumu.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/teklifler"
            className="inline-flex items-center px-4 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors shadow-md shadow-amber-500/20"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1.5" />
            <span>Teklifleri Yönet</span>
          </Link>
          <Link
            href="/admin/projeler"
            className="inline-flex items-center px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Yeni Proje</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Link
              key={idx}
              href={st.href}
              className={`p-6 rounded-2xl bg-slate-900 border ${st.border} hover:scale-[1.02] transition-transform duration-200 shadow-xl flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{st.title}</span>
                <div className={`w-9 h-9 rounded-xl ${st.bg} ${st.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-black text-white font-mono">{st.value}</span>
                <span className="text-[11px] text-slate-500 block mt-1">{st.total}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Quotes & Recent Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <FileSpreadsheet className="w-4 h-4 text-amber-400 mr-2" />
              <span>Son Teklif Talepleri</span>
            </h2>
            <Link
              href="/admin/teklifler"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recentQuotes.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Henüz teklif talebi bulunmamaktadır.
            </div>
          ) : (
            <div className="space-y-3">
              {recentQuotes.map((q) => (
                <Link
                  key={q.id}
                  href={`/admin/teklifler/${q.id}`}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition-colors flex items-center justify-between block group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {q.referenceNo}
                      </span>
                      <span className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                        {q.companyName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {q.serviceType} • {q.city}
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        q.status === "NEW"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : q.status === "SENT"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : q.status === "WON"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {q.status}
                    </span>
                    <span className="block text-[10px] text-slate-500 mt-1">
                      {formatDate(q.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <Mail className="w-4 h-4 text-blue-400 mr-2" />
              <span>Son Gelen Mesajlar</span>
            </h2>
            <Link
              href="/admin/mesajlar"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Henüz iletişim mesajı bulunmamaktadır.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <Link
                  key={m.id}
                  href="/admin/mesajlar"
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors flex items-center justify-between block group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        {m.fullName}
                      </span>
                      {!m.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {m.subject} - {m.message}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-500 shrink-0 ml-3">
                    {formatDate(m.createdAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
