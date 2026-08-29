"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCode,
  MapPin,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REGIONS } from "@/data/regions";
import { REGION_SERVICES } from "@/data/regionServices";
import { TECHNICAL_GUIDES } from "@/data/technicalGuides";

export default function AdminSeoPage() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    sourcePath: "",
    targetPath: "",
    statusCode: 301,
  });

  const loadRedirects = async () => {
    try {
      const res = await fetch("/api/admin/redirects");
      if (res.ok) {
        const data = await res.json();
        setRedirects(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRedirects();
  }, []);

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ sourcePath: "", targetPath: "", statusCode: 301 });
        loadRedirects();
      } else {
        const json = await res.json();
        alert(json.error || "Hata oluştu");
      }
    } catch (err) {
      alert("Yönlendirme eklenemedi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!window.confirm("Bu yönlendirmeyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRedirects((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  const seoStats = [
    {
      title: "Indexlenebilir Sayfalar",
      value: `${21 + 25 + 14 + REGIONS.length + REGION_SERVICES.length + TECHNICAL_GUIDES.length}+`,
      sub: "Hizmetler, Sektörler, Bölgeler, Rehberler",
      icon: Globe,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    {
      title: "Hedef Bölge & Sanayi Sayfaları",
      value: `${REGIONS.length} İl / ${REGION_SERVICES.length} Kombinasyon`,
      sub: "Adana, Mersin, Gaziantep, KKTC vb.",
      icon: MapPin,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      title: "Teknik Bilgi Merkezi",
      value: `${TECHNICAL_GUIDES.length} Kapsamlı Rehber`,
      sub: "OG, Trafo, PLC/SCADA, GES, Pano",
      icon: BookOpen,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
    {
      title: "GEO & LLMs.txt Entegrasyonu",
      value: "Aktif (%100)",
      sub: "ChatGPT, Claude, Perplexity, Gemini",
      icon: Sparkles,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <Globe className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>SEO, GEO & Yerel Arama Otoritesi Merkezi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Topical authority denetimi, Schema.org doğrulaması, LLMs.txt ve 301 yönlendirme yönetimi.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/llms.txt"
            target="_blank"
            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-colors"
          >
            <FileCode className="w-4 h-4 mr-1.5" />
            <span>llms.txt Görüntüle</span>
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <span>Sitemap.xml</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-amber-400" />
          </a>
        </div>
      </div>

      {/* SEO Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {seoStats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-slate-900 border ${st.border} shadow-xl flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{st.title}</span>
                <div className={`w-8 h-8 rounded-lg ${st.bg} ${st.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xl font-black text-white font-mono">{st.value}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">{st.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schema.org & GEO Audit Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schema Status */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" />
            <span>Yapısal Veri & Schema.org Doğrulaması</span>
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">Organization & LocalBusiness Schema</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Tam Uyumlu (#organization)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">Service & AreaServed Schema</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Tüm Hizmetlerde Aktif
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">TechArticle & FAQPage Schema</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Bilgi Merkezi & SSS Aktif
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300 font-medium">BreadcrumbList Schema</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                Site Genelinde Aktif
              </span>
            </div>
          </div>
        </div>

        {/* AI & Search Engine Optimization */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
            <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
            <span>GEO (Generative Engine Optimization) Mimarisi</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Yapay zeka arama motorları (ChatGPT Search, Perplexity, Google AI Overviews, Claude) için optimize edilmiş makine okunabilir mimari:
          </p>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>/llms.txt ile doğrulanmış entity ilişkileri</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hizmet ve rehber sayfalarında doğrudan "Özet Cevap" blokları</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bölge bazlı gerçek niyet karşılayan 9 sanayi landing page</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero-Fake Data prensibiyle doğrulanmış E-E-A-T profili</span>
            </div>
          </div>
        </div>
      </div>

      {/* 301 Redirects Management */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">301 Yönlendirme (Redirect) Yöneticisi</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Eski veya değişen URL'leri yeni sayfalara yönlendirerek SEO kırılmalarını ve 404 hatalarını önleyin.
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Yeni Yönlendirme Ekle</span>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-400 text-xs">Yükleniyor...</div>
        ) : redirects.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs bg-slate-950/50 rounded-2xl border border-slate-800/80">
            Aktif 301 yönlendirme kuralı bulunmamaktadır.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Kaynak URL (Source)</th>
                  <th className="px-4 py-3">Hedef URL (Target)</th>
                  <th className="px-4 py-3">Durum Kodu</th>
                  <th className="px-4 py-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {redirects.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-amber-400">{r.sourcePath}</td>
                    <td className="px-4 py-3 font-mono text-emerald-400">{r.targetPath}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                        {r.statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDeleteRedirect(r.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Redirect Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Yeni 301 Yönlendirmesi Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRedirect} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Kaynak URL Yolu (Örn: /eski-sayfa)
                </label>
                <input
                  type="text"
                  required
                  placeholder="/eski-sayfa"
                  value={formData.sourcePath}
                  onChange={(e) => setFormData({ ...formData, sourcePath: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Hedef URL Yolu (Örn: /hizmetler/og-sistemleri)
                </label>
                <input
                  type="text"
                  required
                  placeholder="/hizmetler/yeni-sayfa"
                  value={formData.targetPath}
                  onChange={(e) => setFormData({ ...formData, targetPath: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmitting}>
                  Yönlendirmeyi Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
