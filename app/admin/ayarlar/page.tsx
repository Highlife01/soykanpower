"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    email: "",
    address: "",
    workingHours: "",
    linkedinUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    facebookUrl: "",
    footerText: "",
    aboutSummary: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            companyName: data.companyName || "Soykan Power Mühendislik",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
            workingHours: data.workingHours || "",
            linkedinUrl: data.linkedinUrl || "",
            instagramUrl: data.instagramUrl || "",
            twitterUrl: data.twitterUrl || "",
            facebookUrl: data.facebookUrl || "",
            footerText: data.footerText || "",
            aboutSummary: data.aboutSummary || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Ayarlar kaydedilemedi");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400 text-xs">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center">
            <Settings className="w-6 h-6 text-amber-400 mr-2.5" />
            <span>Site & İletişim Ayarları</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Header, Footer ve İletişim sayfalarındaki kurumsal bilgilerin yönetimi.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          isLoading={isSaving}
          onClick={handleSubmit}
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          <span>Ayarları Kaydet</span>
        </Button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Ayarlar başarıyla kaydedildi ve tüm web sitesine yansıtıldı.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Info */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            Genel Kurumsal Bilgiler
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Firma Tam Ünvanı
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Telefon Numarası
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Kurumsal E-posta
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Fiziki Adres
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Çalışma Saatleri
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            Sosyal Medya Hesapları
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
            Footer ve Tanıtım Metinleri
          </h2>

          <div className="space-y-3 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold uppercase tracking-wider block">
                Footer Açıklama Metni
              </label>
              <textarea
                rows={3}
                value={formData.footerText}
                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
