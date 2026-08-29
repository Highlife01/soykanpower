"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileSpreadsheet,
  Download,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatDateTime, formatFileSize } from "@/lib/utils";

export default function AdminQuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("NEW");
  const [adminNotes, setAdminNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadQuote() {
      try {
        const res = await fetch(`/api/admin/quotes/${id}/detail`);
        if (res.ok) {
          const data = await res.json();
          setQuote(data);
          setStatus(data.status);
          setAdminNotes(data.adminNotes || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadQuote();
  }, [id]);

  const handleUpdate = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (!res.ok) throw new Error("Güncelleme başarısız");

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bu teklif talebini silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/admin/quotes/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/teklifler");
        router.refresh();
      }
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Yükleniyor...</div>;
  }

  if (!quote) {
    return <div className="p-8 text-center text-slate-400">Teklif bulunamadı.</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/teklifler"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                {quote.referenceNo}
              </span>
              <h1 className="text-xl font-bold text-white">{quote.companyName}</h1>
            </div>
            <span className="text-xs text-slate-400">
              Talep Tarihi: {formatDateTime(quote.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-red-400 hover:bg-red-500/20 transition-colors"
            title="Teklifi Sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isSaving}
            onClick={handleUpdate}
          >
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>Değişiklikleri Kaydet</span>
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Teklif durumu ve notlar başarıyla güncellendi.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Customer Details & Description */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Info Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Müşteri & İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Firma Adı</span>
                <span className="font-bold text-white text-sm block mt-0.5">{quote.companyName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Yetkili Kişi</span>
                <span className="font-bold text-white text-sm block mt-0.5">{quote.contactPerson}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Telefon</span>
                <a href={`tel:${quote.phone}`} className="font-semibold text-amber-400 hover:underline block mt-0.5">
                  {quote.phone}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">E-posta</span>
                <a href={`mailto:${quote.email}`} className="font-semibold text-amber-400 hover:underline block mt-0.5">
                  {quote.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Şehir</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{quote.city}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Proje Lokasyonu</span>
                <span className="font-semibold text-slate-200 block mt-0.5">{quote.projectLocation || "-"}</span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Talep Edilen Hizmet & Proje Kapsamı
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Hizmet Türü</span>
                <span className="inline-block px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 font-bold text-amber-400 mt-1">
                  {quote.serviceType}
                </span>
              </div>

              {quote.plannedDate && (
                <div>
                  <span className="text-slate-500 block">Planlanan Başlangıç Tarihi</span>
                  <span className="font-semibold text-white mt-0.5 block">{quote.plannedDate}</span>
                </div>
              )}

              <div>
                <span className="text-slate-500 block mb-1">Proje Açıklaması & Teknik İhtiyaçlar</span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                  {quote.description}
                </div>
              </div>
            </div>
          </div>

          {/* Attached Files */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Yüklenen Teknik Şartname & Çizim Dosyaları ({quote.files?.length || 0})
            </h2>

            {!quote.files || quote.files.length === 0 ? (
              <div className="text-xs text-slate-500 py-3">Bu talebe eklenmiş dosya bulunmamaktadır.</div>
            ) : (
              <div className="space-y-2">
                {quote.files.map((file: any) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-semibold text-white truncate">{file.fileName}</span>
                      <span className="text-slate-500 text-[11px]">
                        ({formatFileSize(file.fileSize)})
                      </span>
                    </div>

                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold transition-colors shrink-0 ml-3"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>İndir</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 4 cols: CRM Status & Admin Notes */}
        <div className="lg:col-span-4 space-y-6">
          {/* CRM Status Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              CRM Aşama Yönetimi
            </h2>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium block">
                Teklif Aşaması
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="NEW">YENİ</option>
                <option value="IN_REVIEW">İNCELENİYOR</option>
                <option value="PREPARING">TEKLİF HAZIRLANIYOR</option>
                <option value="SENT">TEKLİF GÖNDERİLDİ</option>
                <option value="WON">KAZANILDI</option>
                <option value="LOST">KAYBEDİLDİ</option>
              </select>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              Şirket İçi Mühendislik Notları
            </h2>

            <div className="space-y-2">
              <textarea
                rows={6}
                placeholder="Fiyatlandırma, keşif notları, yapılan görüşmeler veya teknik revizyonlar..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              isLoading={isSaving}
              onClick={handleUpdate}
              className="w-full"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>Notu Kaydet</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
