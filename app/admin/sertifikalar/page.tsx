"use client";

import React, { useState, useEffect } from "react";
import { Award, Plus, Trash2, X, Upload, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    code: "ISO 9001:2015",
    issuer: "TÜRKAK Onaylı Akreditasyon",
    issueYear: new Date().getFullYear().toString(),
    fileUrl: "",
    published: true,
  });

  const loadCerts = async () => {
    try {
      const res = await fetch("/api/admin/certificates");
      if (res.ok) {
        const data = await res.json();
        setCerts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCerts();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, fileUrl: json.url }));
      } else {
        alert(json.error || "Belge yüklenemedi");
      }
    } catch (err) {
      alert("Yükleme hatası");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          code: "ISO 9001:2015",
          issuer: "TÜRKAK Onaylı Akreditasyon",
          issueYear: new Date().getFullYear().toString(),
          fileUrl: "",
          published: true,
        });
        loadCerts();
      } else {
        alert("Belge kaydedilemedi");
      }
    } catch (err) {
      alert("Hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu belgeyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCerts((prev) => prev.filter((c) => c.id !== id));
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
            <Award className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Belgeler & Sertifikalar Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kalite yönetim belgeleri, İSG standartları ve mesleki yeterlilik belgeleri.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Yeni Belge Ekle</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : certs.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Award className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz belge/sertifika eklenmemiştir.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Yukarıdaki "Yeni Belge Ekle" butonunu kullanarak ISO ve yetki belgelerinizi yükleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                {cert.code && (
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    {cert.code}
                  </span>
                )}
                <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                {cert.issuer && (
                  <p className="text-xs text-slate-400">Veren: {cert.issuer}</p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                {cert.fileUrl ? (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    className="text-xs text-amber-400 hover:underline flex items-center"
                  >
                    <span>Belgeyi Gör</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">Dosya yok</span>
                )}

                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Yeni Belge / Sertifika Ekle</h3>
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
                  Belge Adı <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Kalite Yönetim Sistemi Sertifikası"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Belge Kodu
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: ISO 9001:2015"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Veriliş Yılı
                  </label>
                  <input
                    type="number"
                    value={formData.issueYear}
                    onChange={(e) => setFormData({ ...formData, issueYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Veren Kurum
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Belge Dosyası (PDF / Görsel)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="cert-file-upload"
                  />
                  <label
                    htmlFor="cert-file-upload"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer border border-slate-700 flex items-center space-x-1"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isUploading ? "Yükleniyor..." : "Dosya Seç"}</span>
                  </label>
                  {formData.fileUrl && (
                    <span className="text-[10px] text-emerald-400 truncate">Dosya yüklendi</span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Belgeyi Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
