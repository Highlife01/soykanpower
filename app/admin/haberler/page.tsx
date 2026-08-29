"use client";

import React, { useState, useEffect } from "react";
import { Newspaper, Plus, Trash2, X, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Teknik",
    summary: "",
    content: "",
    coverImage: "",
    published: true,
  });

  const loadNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, coverImage: json.url }));
      } else {
        alert(json.error || "Görsel yüklenemedi");
      }
    } catch (err) {
      alert("Görsel yükleme hatası");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          category: "Teknik",
          summary: "",
          content: "",
          coverImage: "",
          published: true,
        });
        loadNews();
      } else {
        const json = await res.json();
        alert(json.error || "Haber kaydedilemedi");
      }
    } catch (err) {
      alert("Hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu haberi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNewsList((prev) => prev.filter((n) => n.id !== id));
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
            <Newspaper className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Haberler & Blog Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Teknik bültenler, sektörel makaleler ve şirket duyuruları.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Yeni Haber Ekle</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : newsList.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Newspaper className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz haber eklenmemiştir.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Yukarıdaki "Yeni Haber Ekle" butonunu kullanarak makalelerinizi yayınlayabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                {item.coverImage && (
                  <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {formatDate(item.publishedAt)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/haberler/${item.slug}`}
                  target="_blank"
                  className="text-xs text-amber-400 hover:underline flex items-center"
                >
                  <span>Sitede Gör</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Yeni Haber & Makale Ekle</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Haber Başlığı <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Fabrikalarda Harmonik Filtreleme ve Enerji Tasarrufu"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Teknik">Teknik Analiz</option>
                    <option value="Proje">Proje Teslimatı</option>
                    <option value="Sektörel">Sektörel Gelişmeler</option>
                    <option value="Kurumsal">Kurumsal Duyuru</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Kapak Görseli
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="news-image-upload"
                    />
                    <label
                      htmlFor="news-image-upload"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer border border-slate-700 flex items-center space-x-1"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isUploading ? "Yükleniyor..." : "Seç"}</span>
                    </label>
                    {formData.coverImage && (
                      <span className="text-[10px] text-emerald-400 truncate">
                        Görsel yüklendi
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Özet <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Kısa özet metni..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Makale İçeriği <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Haber veya makale detayları..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Haberi Yayınla
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
