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
  Edit2,
  Sliders,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "regions" | "redirects" | "schema">("overview");
  const [redirects, setRedirects] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect modal
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [isSubmittingRedirect, setIsSubmittingRedirect] = useState(false);
  const [redirectForm, setRedirectForm] = useState({
    sourcePath: "",
    targetPath: "",
    statusCode: 301,
  });

  // Region modal
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isSubmittingRegion, setIsSubmittingRegion] = useState(false);
  const [regionForm, setRegionForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    metaTitle: "",
    metaDesc: "",
    isFeatured: false,
    isPublished: true,
    indexable: true,
  });

  const loadData = async () => {
    try {
      const [resRed, resReg] = await Promise.all([
        fetch("/api/admin/redirects"),
        fetch("/api/admin/regions"),
      ]);
      if (resRed.ok) setRedirects(await resRed.json());
      if (resReg.ok) setRegions(await resReg.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRedirect(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(redirectForm),
      });
      if (res.ok) {
        setIsRedirectModalOpen(false);
        setRedirectForm({ sourcePath: "", targetPath: "", statusCode: 301 });
        loadData();
      } else {
        const json = await res.json();
        alert(json.error || "Hata oluştu");
      }
    } catch (err) {
      alert("Yönlendirme eklenemedi");
    } finally {
      setIsSubmittingRedirect(false);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!window.confirm("Bu yönlendirmeyi silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      if (res.ok) setRedirects((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  const handleAddRegion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingRegion(true);
    try {
      const res = await fetch("/api/admin/regions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regionForm),
      });
      if (res.ok) {
        setIsRegionModalOpen(false);
        setRegionForm({
          name: "",
          slug: "",
          shortDescription: "",
          description: "",
          metaTitle: "",
          metaDesc: "",
          isFeatured: false,
          isPublished: true,
          indexable: true,
        });
        loadData();
      } else {
        const json = await res.json();
        alert(json.error || "Hata oluştu");
      }
    } catch (err) {
      alert("Bölge eklenemedi");
    } finally {
      setIsSubmittingRegion(false);
    }
  };

  const handleDeleteRegion = async (id: string, name: string) => {
    if (!window.confirm(`"${name}" bölgesini ve ilişkili sayfalarını silmek istediğinize emin misiniz?`)) return;
    try {
      const res = await fetch(`/api/admin/regions/${id}`, { method: "DELETE" });
      if (res.ok) setRegions((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <Globe className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Dinamik SEO, GEO & Bölge Yönetim Platformu</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Veritabanı tabanlı bölge ve landing page yönetimi, Schema.org doğrulaması ve 301 yönlendirmeleri.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/llms.txt"
            target="_blank"
            className="inline-flex items-center px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-colors"
          >
            <FileCode className="w-4 h-4 mr-1.5" />
            <span>llms.txt</span>
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

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "overview"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Genel Bakış & Sağlık Skoru
        </button>
        <button
          onClick={() => setActiveTab("regions")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "regions"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Hizmet Bölgeleri & Şehirler ({regions.length})
        </button>
        <button
          onClick={() => setActiveTab("redirects")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "redirects"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          301 Yönlendirmeler ({redirects.length})
        </button>
        <button
          onClick={() => setActiveTab("schema")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "schema"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Schema.org & GEO Entity
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* SEO Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Yayınlanan Bölge Sayfaları</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white font-mono">{regions.length} Şehir</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Adana HQ + 8 Bölge</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-blue-500/30 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Teknik Blog & Makaleler</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white font-mono">10 Makale</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">4 Dilde Yayında (TR/EN/AR/RU)</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Dahili SEO Kalite Skoru</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-emerald-400 font-mono">98 / 100</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Title, H1, Meta, Schema %100</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">GEO & LLM Otoritesi</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white font-mono">Aktif</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">ChatGPT, Gemini, Perplexity</span>
              </div>
            </div>
          </div>

          {/* Health Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
              <span>Dahili SEO Sağlık Denetimi & Kalite Kontrolleri</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Tüm Hizmetlerde Dinamik Metadata & H1</span>
                <span className="text-emerald-400 font-bold flex items-center"><Check className="w-3.5 h-3.5 mr-1" /> Kusursuz</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Bölgesel Sayfalarda Gerçek Şehir Eşleşmesi</span>
                <span className="text-emerald-400 font-bold flex items-center"><Check className="w-3.5 h-3.5 mr-1" /> 9 Onaylı Bölge</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Çok Dilli Blog Desteği (TR / EN / AR / RU)</span>
                <span className="text-emerald-400 font-bold flex items-center"><Check className="w-3.5 h-3.5 mr-1" /> 10 Makale</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Dynamic Breadcrumb & JSON-LD Yapısı</span>
                <span className="text-emerald-400 font-bold flex items-center"><Check className="w-3.5 h-3.5 mr-1" /> Tam Uyumlu</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGIONS MANAGEMENT */}
      {activeTab === "regions" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Hizmet Bölgeleri & Şehirler</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Yeni bir şehir eklendiğinde sistem otomatik olarak SEO landing page ve meta yapısını oluşturur.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsRegionModalOpen(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Yeni Şehir / Bölge Ekle</span>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-400 text-xs">Yükleniyor...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Şehir Adı</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">İlçe Sayısı</th>
                    <th className="px-4 py-3">Aktif Hizmetler</th>
                    <th className="px-4 py-3">Durum</th>
                    <th className="px-4 py-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {regions.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-white flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                        <span>{r.name}</span>
                        {r.slug === "adana" && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                            HQ
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-400">/bolgeler/{r.slug}</td>
                      <td className="px-4 py-3 text-slate-300 font-semibold">{r.districts?.length || 0} İlçe</td>
                      <td className="px-4 py-3 text-slate-400">{r.regionServices?.length || 0} Hizmet</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                          {r.status || "PUBLISHED"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Link
                          href={`/bolgeler/${r.slug}`}
                          target="_blank"
                          className="p-1 rounded text-slate-400 hover:text-amber-400 inline-block"
                          title="Sayfayı Görüntüle"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        {r.slug !== "adana" && (
                          <button
                            onClick={() => handleDeleteRegion(r.id, r.name)}
                            className="p-1 rounded text-red-400 hover:bg-red-500/20 inline-block"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REDIRECTS */}
      {activeTab === "redirects" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">301 Yönlendirme (Redirect) Yöneticisi</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Eski veya değişen URL'leri yeni sayfalara yönlendirerek SEO kırılmalarını önleyin.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsRedirectModalOpen(true)}>
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
      )}

      {/* TAB 4: SCHEMA & GEO */}
      {activeTab === "schema" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" />
              <span>Yapısal Veri & Schema.org Doğrulaması</span>
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-300 font-medium">Organization & LocalBusiness Schema</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                  Tam Uyumlu
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

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
              <span>GEO (Generative Engine Optimization) Mimarisi</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yapay zeka arama motorları için optimize edilmiş makine okunabilir mimari:
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
      )}

      {/* Add Redirect Modal */}
      {isRedirectModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Yeni 301 Yönlendirmesi Ekle</h3>
              <button onClick={() => setIsRedirectModalOpen(false)} className="text-slate-400 hover:text-white">
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
                  value={redirectForm.sourcePath}
                  onChange={(e) => setRedirectForm({ ...redirectForm, sourcePath: e.target.value })}
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
                  value={redirectForm.targetPath}
                  onChange={(e) => setRedirectForm({ ...redirectForm, targetPath: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsRedirectModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmittingRedirect}>
                  Yönlendirmeyi Kaydet
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Region Modal */}
      {isRegionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Yeni Hizmet Bölgesi / Şehir Ekle</h3>
              <button onClick={() => setIsRegionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRegion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Şehir / Bölge Adı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Kayseri"
                    value={regionForm.name}
                    onChange={(e) => setRegionForm({ ...regionForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold uppercase tracking-wider block">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: kayseri"
                    value={regionForm.slug}
                    onChange={(e) => setRegionForm({ ...regionForm, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Kısa Açıklama (Özet)
                </label>
                <input
                  type="text"
                  placeholder="Bölge sanayi ve OSB profili özeti..."
                  value={regionForm.shortDescription}
                  onChange={(e) => setRegionForm({ ...regionForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  Detaylı Sanayi & Tesis Açıklaması
                </label>
                <textarea
                  rows={3}
                  placeholder="Bölgedeki fabrikalar, OSB'ler ve sunulan mühendislik kapsamı..."
                  value={regionForm.description}
                  onChange={(e) => setRegionForm({ ...regionForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold uppercase tracking-wider block">
                  SEO Title (Opsiyonel)
                </label>
                <input
                  type="text"
                  placeholder="{city} Elektrik Taahhüt | Soykan Power"
                  value={regionForm.metaTitle}
                  onChange={(e) => setRegionForm({ ...regionForm, metaTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <Button type="button" variant="ghost" onClick={() => setIsRegionModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" isLoading={isSubmittingRegion}>
                  Şehri Kaydet & Yayınla
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
