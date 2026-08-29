"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Plus, Trash2, X, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "Elektrik Mühendisliği",
    location: "İstanbul / Kocaeli",
    workType: "Tam Zamanlı",
    description: "",
    requirements: "",
    active: true,
  });

  const loadCareers = async () => {
    try {
      const res = await fetch("/api/admin/careers");
      if (res.ok) {
        const data = await res.json();
        setCareers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "",
          department: "Elektrik Mühendisliği",
          location: "İstanbul / Kocaeli",
          workType: "Tam Zamanlı",
          description: "",
          requirements: "",
          active: true,
        });
        loadCareers();
      } else {
        alert("İlan kaydedilemedi");
      }
    } catch (err) {
      alert("Hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCareers((prev) => prev.filter((c) => c.id !== id));
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
            <Briefcase className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Kariyer İlanları Yönetimi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Şirket içi açık mühendislik ve teknik personel ilanları.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Yeni İlan Ekle</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Yükleniyor...</div>
      ) : careers.length === 0 ? (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400 space-y-3">
          <Briefcase className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Henüz açık ilan bulunmamaktadır.</h3>
          <p className="text-xs max-w-sm mx-auto">
            Yeni bir personel arayışında yukarıdaki "Yeni İlan Ekle" butonunu kullanabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div
              key={career.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {career.department}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {career.workType}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">
                  {career.title}
                </h3>

                <div className="text-xs text-slate-400">{career.location}</div>

                <div className="flex items-center text-xs text-amber-400">
                  <Users className="w-3.5 h-3.5 mr-1" />
                  <span>{career._count?.applications || 0} Başvuru</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/kariyer/${career.id}`}
                  target="_blank"
                  className="text-xs text-amber-400 hover:underline flex items-center"
                >
                  <span>İlanı Gör</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>

                <button
                  onClick={() => handleDelete(career.id)}
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

      {/* Add Career Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Yeni Kariyer İlanı Ekle</h3>
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
                  Pozisyon Başlığı <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Elektrik & Otomasyon Saha Mühendisi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Departman
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Lokasyon
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Çalışma Şekli
                  </label>
                  <select
                    value={formData.workType}
                    onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Tam Zamanlı">Tam Zamanlı</option>
                    <option value="Proje Bazlı">Proje Bazlı</option>
                    <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                    <option value="Stajyer">Stajyer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  İş Tanımı & Sorumluluklar <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pozisyonun görev tanımı ve sorumlulukları..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Aranan Nitelikler <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Eğitim, deneyim, sertifika ve teknik yetkinlikler..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
                  İlanı Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
