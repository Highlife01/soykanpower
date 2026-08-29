import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
  FileSpreadsheet,
  Search,
  Filter,
  ArrowRight,
  Download,
  Calendar,
  Building2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

interface QuotesAdminPageProps {
  searchParams: Promise<{ durum?: string; q?: string }>;
}

export default async function AdminQuotesPage({ searchParams }: QuotesAdminPageProps) {
  const { durum, q } = await searchParams;

  const whereClause: any = {};
  if (durum) {
    whereClause.status = durum;
  }
  if (q) {
    whereClause.OR = [
      { companyName: { contains: q } },
      { contactPerson: { contains: q } },
      { referenceNo: { contains: q } },
      { email: { contains: q } },
    ];
  }

  const quotes = await prisma.quoteRequest.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      files: true,
    },
  });

  const statusTabs = [
    { label: "Tümü", key: "" },
    { label: "Yeni", key: "NEW" },
    { label: "İnceleniyor", key: "IN_REVIEW" },
    { label: "Hazırlanıyor", key: "PREPARING" },
    { label: "Gönderildi", key: "SENT" },
    { label: "Kazanıldı", key: "WON" },
    { label: "Kaybedildi", key: "LOST" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">YENİ</span>;
      case "IN_REVIEW":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">İNCELENİYOR</span>;
      case "PREPARING":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">TEKLİF HAZIRLANIYOR</span>;
      case "SENT":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">GÖNDERİLDİ</span>;
      case "WON":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">KAZANILDI</span>;
      case "LOST":
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">KAYBEDİLDİ</span>;
      default:
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <FileSpreadsheet className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Teklif Talepleri CRM</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gelen müşteri teklif talepleri, teknik dokümanlar ve aşama yönetimi.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {statusTabs.map((tab) => {
          const isSelected = (!durum && tab.key === "") || durum === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.key ? `/admin/teklifler?durum=${tab.key}` : "/admin/teklifler"}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isSelected
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {quotes.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            Kayıtlı teklif talebi bulunamadı.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-4">Ref No</th>
                  <th className="px-5 py-4">Firma & Yetkili</th>
                  <th className="px-5 py-4">Hizmet Kapsamı</th>
                  <th className="px-5 py-4">Şehir / Lokasyon</th>
                  <th className="px-5 py-4">Ek Dosya</th>
                  <th className="px-5 py-4">Durum</th>
                  <th className="px-5 py-4">Tarih</th>
                  <th className="px-5 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-amber-400">
                      {q.referenceNo}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-sm">{q.companyName}</div>
                      <div className="text-[11px] text-slate-400">{q.contactPerson} • {q.phone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-200">{q.serviceType}</span>
                    </td>
                    <td className="px-5 py-4">
                      {q.city}
                      {q.projectLocation && q.projectLocation !== q.city && (
                        <div className="text-[10px] text-slate-500">{q.projectLocation}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {q.files.length > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[10px] border border-slate-700">
                          {q.files.length} Dosya
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusBadge(q.status)}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {formatDate(q.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/teklifler/${q.id}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        <span>İncele</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
