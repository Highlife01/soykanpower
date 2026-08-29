"use client";

import React, { useState, useEffect } from "react";
import { Building2, Plus, Trash2, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminReferencesPage() {
  const [references, setReferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    industry: "",
    logoUrl: "",
    published: true,
  });

  const loadReferences = async () => {
    try {
      const res = await fetch("/api/admin/references");
      if (res.ok) {
        const data = await res.json();
        setReferences(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferences();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, logoUrl: json.url }));
      }
    } catch (err) {
      alert("Logo yükleme hatası");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ company: "", industry: "", logoUrl: "", published: true });
        loadReferences();
      }
    } catch (err) {
      alert("Hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu referansı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/references/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReferences((prev) => prev.filter((r) => r.id !== id));
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
            <Building2 className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Referanslar Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kurumsal müşteri ve iş ortakları referansları.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Yeni Referans Ekle</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : references.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Building2 className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz referans eklenmemiştir.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Yukarıdaki "Yeni Referans Ekle" butonunu kullanarak onaylı kurumsal referanslarınızı ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {references.map((ref) => (
            <div
              key={ref.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-between text-center space-y-3 relative group"
            >
              <button
                onClick={() => handleDelete(ref.id)}
                className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="h-12 flex items-center justify-center">
                {ref.logoUrl ? (
                  <img
                    src={ref.logoUrl}
                    alt={ref.company}
                    className="max-h-10 max-w-full object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-amber-400/60" />
                )}
              </div>

              <div>
                <div className="text-xs font-bold text-white line-clamp-1">{ref.company}</div>
                {ref.industry && (
                  <div className="text-[10px] text-slate-500 uppercase">{ref.industry}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Reference Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Yeni Referans Ekle</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Firma / Kurum Adı <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Anadolu Cam Sanayii"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Sektör / Alan
                </label>
                <input
                  type="text"
                  placeholder="Örn: Cam & Kimya Sanayii"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Logo Görseli
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="ref-logo-upload"
                  />
                  <label
                    htmlFor="ref-logo-upload"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer border border-slate-700 flex items-center space-x-1"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? "Yükleniyor..." : "Logo Seç"}</span>
                  </label>
                  {formData.logoUrl && (
                    <span className="text-[10px] text-emerald-400 truncate">Logo yüklendi</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Referansı Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
