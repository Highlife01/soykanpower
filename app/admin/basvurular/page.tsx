"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Download, Trash2, Mail, Phone, Clock, FileText } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const res = await fetch("/api/admin/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      alert("Durum güncellenemedi");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu başvuruyu silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <UserCheck className="w-6 h-6 text-purple-400 mr-2.5" />
            <span>İş Başvuruları Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Adaylardan gelen özgeçmişler ve başvuru değerlendirmeleri.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <UserCheck className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz başvuru bulunmamaktadır.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Adaylar kariyer portalından başvuru yaptıkça burada listelenecektir.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-4">Aday Adı</th>
                  <th className="px-5 py-4">Başvurulan Pozisyon</th>
                  <th className="px-5 py-4">İletişim</th>
                  <th className="px-5 py-4">Özgeçmiş (CV)</th>
                  <th className="px-5 py-4">Aşama Durumu</th>
                  <th className="px-5 py-4">Tarih</th>
                  <th className="px-5 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-sm">{app.fullName}</div>
                      {app.coverLetter && (
                        <div className="text-[11px] text-slate-400 italic mt-0.5 line-clamp-1 max-w-xs">
                          "{app.coverLetter}"
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-200">
                        {app.career?.title || "Genel Başvuru"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      <div>{app.phone}</div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>CV İndir</span>
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="NEW">YENİ</option>
                        <option value="REVIEWED">İNCELENDİ</option>
                        <option value="CONTACTED">İLETİŞİME GEÇİLDİ</option>
                        <option value="REJECTED">OLUMSUZ</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {formatDateTime(app.createdAt)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
