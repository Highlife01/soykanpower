"use client";

import React, { useState, useEffect } from "react";
import { Factory, Trash2, ExternalLink } from "lucide-react";

export default function AdminSectorsPage() {
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSectors = async () => {
    try {
      const res = await fetch("/api/admin/sectors");
      if (res.ok) {
        const data = await res.json();
        setSectors(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSectors();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu sektörü silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/sectors/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSectors((prev) => prev.filter((s) => s.id !== id));
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
            <Factory className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Sektörel Çözümler Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Demir çelik, tekstil, makine, otomotiv, gıda, arıtma vb. sektör sayfaları.
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
                  <th className="px-5 py-4">Sektör Başlığı</th>
                  <th className="px-5 py-4">Kısa Tanım</th>
                  <th className="px-5 py-4">Durum</th>
                  <th className="px-5 py-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {sectors.map((sec) => (
                  <tr key={sec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-white">
                      {sec.title}
                    </td>
                    <td className="px-5 py-4 text-slate-400 max-w-sm truncate">
                      {sec.shortDesc}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {sec.published ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <a
                        href={`/sektorler/${sec.slug}`}
                        target="_blank"
                        className="inline-flex items-center p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                        title="Sayfayı Gör"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(sec.id)}
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
