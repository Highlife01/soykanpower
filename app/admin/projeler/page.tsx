"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  Calendar,
  MapPin,
  Building2,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    categoryType: "ELEKTRIK",
    client: "",
    location: "",
    year: new Date().getFullYear().toString(),
    capacity: "",
    scope: "",
    coverImage: "",
    status: "COMPLETED",
    featured: true,
    published: true,
  });

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
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
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          categoryType: "ELEKTRIK",
          client: "",
          location: "",
          year: new Date().getFullYear().toString(),
          capacity: "",
          scope: "",
          coverImage: "",
          status: "COMPLETED",
          featured: true,
          published: true,
        });
        loadProjects();
      } else {
        const json = await res.json();
        alert(json.error || "Proje kaydedilemedi");
      }
    } catch (err) {
      alert("Hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
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
            <FolderGit2 className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Proje Portföyü Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tamamlanan ve devam eden mühendislik projelerinin yönetimi.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Yeni Proje Ekle</span>
        </Button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <FolderGit2 className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz proje eklenmemiştir.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Yukarıdaki "Yeni Proje Ekle" butonunu kullanarak gerçek mühendislik projelerinizi sisteme ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                {project.coverImage ? (
                  <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-950 rounded-xl flex items-center justify-center text-xs text-slate-600 font-mono">
                    Görsel Yok
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {project.categoryType}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {project.year || "-"}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {project.title}
                </h3>

                {project.client && (
                  <div className="text-xs text-slate-400">İşveren: {project.client}</div>
                )}
                {project.location && (
                  <div className="text-xs text-slate-500">{project.location}</div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/projeler/${project.slug}`}
                  target="_blank"
                  className="text-xs text-amber-400 hover:underline flex items-center"
                >
                  <span>Sitede Gör</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <button
                  onClick={() => handleDelete(project.id)}
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

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Yeni Proje Ekle</h3>
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
                  Proje Adı <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 154kV Trafo Merkezi ve SCADA Otomasyonu"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Kategori <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={formData.categoryType}
                    onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="ELEKTRIK">ELEKTRİK TAAHHÜT</option>
                    <option value="OTOMASYON">OTOMASYON & SCADA</option>
                    <option value="ENERJI">ENERJİ SİSTEMLERİ & PANO</option>
                    <option value="GES">GÜNEŞ ENERJİSİ (GES)</option>
                    <option value="KAMU">KAMU & ALTYAPI</option>
                    <option value="ENDUSTRIYEL">ENDÜSTRİYEL TESİS</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    İşveren / Müşteri
                  </label>
                  <input
                    type="text"
                    placeholder="Müşteri / Kurum Adı"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Lokasyon / Şehir
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Kocaeli / Dilovası"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Tamamlanma Yılı
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Kapasite / Kurulu Güç
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 2x1600 kVA / 1.2 MWp"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Proje Durumu
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="COMPLETED">Tamamlandı</option>
                    <option value="ONGOING">Devam Ediyor</option>
                  </select>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Kapak Görseli
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="project-image-upload"
                  />
                  <label
                    htmlFor="project-image-upload"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl cursor-pointer border border-slate-700 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>{isUploading ? "Yükleniyor..." : "Görsel Yükle"}</span>
                  </label>
                  {formData.coverImage && (
                    <span className="text-[11px] text-emerald-400 font-medium truncate">
                      Görsel seçildi: {formData.coverImage}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Proje Kapsamı & Açıklama
                </label>
                <textarea
                  rows={4}
                  placeholder="Projenin teknik kapsamı, yapılan mühendislik çalışmaları ve teslim edilen sistemler..."
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">Ana Sayfada Öne Çıkar</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-0"
                  />
                  <span className="text-slate-300 font-medium">Yayında</span>
                </label>
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
                  Projeyi Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
