"use client";

import React, { useState, useEffect } from "react";
import { Layers, Plus, Trash2, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
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
            <Layers className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Mühendislik Hizmetleri Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Web sitesinde listelenen elektrik, otomasyon, enerji ve GES hizmetleri.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-4">Hizmet Başlığı</th>
                  <th className="px-5 py-4">Kategori</th>
                  <th className="px-5 py-4">Kısa Açıklama</th>
                  <th className="px-5 py-4">Durum</th>
                  <th className="px-5 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-white">
                      {s.title}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[11px] font-semibold border border-slate-700">
                        {s.category?.title || "-"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 max-w-xs truncate">
                      {s.shortDesc}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {s.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <a
                        href={`/hizmetler/${s.slug}`}
                        target="_blank"
                        className="inline-flex items-center p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                        title="Sayfayı Gör"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20"
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
