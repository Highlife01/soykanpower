"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  ShieldCheck,
  Send,
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatFileSize } from "@/lib/utils";

interface UploadedFile {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const prefilledCity = searchParams.get("city") || "";

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: prefilledCity || "",
    projectLocation: "",
    serviceType: prefilledService || "Elektrik Taahhüt",
    description: "",
    plannedDate: "",
    landingPage: "",
    referrer: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  useEffect(() => {
    const utmSource = searchParams.get("utm_source") || "";
    const utmMedium = searchParams.get("utm_medium") || "";
    const utmCampaign = searchParams.get("utm_campaign") || "";
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const ref = typeof document !== "undefined" ? document.referrer : "";

    setFormData((prev) => ({
      ...prev,
      city: prefilledCity || prev.city,
      serviceType: prefilledService || prev.serviceType,
      landingPage: currentUrl,
      referrer: ref,
      utmSource,
      utmMedium,
      utmCampaign,
    }));
  }, [prefilledService, prefilledCity, searchParams]);

  const serviceOptions = [
    "Elektrik Taahhüt",
    "Alçak Gerilim (AG) Sistemleri",
    "Orta Gerilim (OG) Sistemleri",
    "Yüksek Gerilim (YG) Sistemleri",
    "Trafo Merkezleri",
    "Endüstriyel Otomasyon & SCADA",
    "PLC Sistemleri & Programlama",
    "MCC & Dağıtım Panoları",
    "Kompanzasyon & Enerji Kalitesi",
    "Güneş Enerjisi (Çatı GES)",
    "Güneş Enerjisi (Arazi GES)",
    "Enerji Verimliliği & Güç Analizi",
    "Zayıf Akım & Güvenlik Sistemleri",
    "Diğer / Özel Mühendislik",
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    setErrorMessage("");

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || "Dosya yüklenemedi");
        }

        setFiles((prev) => [
          ...prev,
          {
            fileName: json.fileName,
            fileUrl: json.url,
            fileSize: json.fileSize,
            mimeType: json.mimeType,
          },
        ]);
      } catch (err: any) {
        setErrorMessage(err.message || "Dosya yükleme hatası oluştu.");
      }
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          files,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Teklif talebi gönderilemedi.");
      }

      setSubmittedReference(json.referenceNo);
    } catch (err: any) {
      setErrorMessage(err.message || "Bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {submittedReference ? (
        <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Teklif Talebiniz Başarıyla Alındı!
            </h2>
            <p className="text-sm text-slate-400">
              Mühendislik departmanımız başvurunuzu ve yüklediğiniz teknik dokümanları inceleyerek tarafınıza dönüş sağlayacaktır.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block">
            <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">
              Takip Referans Numaranız
            </span>
            <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
              {submittedReference}
            </span>
          </div>

          <div className="pt-4 flex justify-center">
            <Button
              variant="primary"
              onClick={() => {
                setSubmittedReference(null);
                setFiles([]);
                setFormData({
                  companyName: "",
                  contactPerson: "",
                  phone: "",
                  email: "",
                  city: "",
                  projectLocation: "",
                  serviceType: "Elektrik Taahhüt",
                  description: "",
                  plannedDate: "",
                  landingPage: "",
                  referrer: "",
                  utmSource: "",
                  utmMedium: "",
                  utmCampaign: "",
                });
              }}
            >
              Yeni Bir Teklif Talebi Oluştur
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl"
            >
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Firma Adı */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Firma Adı <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: ABC Sanayi ve Ticaret A.Ş."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Yetkili Kişi */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Yetkili Kişi <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ad Soyad / Unvan"
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Telefon Numarası <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* E-posta */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    E-posta Adresi <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ornek@firma.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Şehir */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Şehir <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Adana, Mersin, Gaziantep..."
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Proje Lokasyonu */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Proje Sahası / Lokasyon
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Adana Hacı Sabancı OSB"
                    value={formData.projectLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectLocation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Hizmet Seçimi */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Talep Edilen Hizmet / Kapsam <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-sm"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Planlanan Başlangıç Tarihi */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Planlanan Başlangıç / Teslim Tarihi
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 2026 Q2 / Hemen / 1 Ay İçinde"
                    value={formData.plannedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, plannedDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                {/* Proje Açıklaması */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Proje Açıklaması ve Teknik İhtiyaçlar <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Projenizin kapsamını, varsa kurulu güç bilgisini, istenen otomasyon detaylarını veya mevcut durumunuzu açıklayınız..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              {/* Dosya Yükleme Alanı */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Teknik Şartname / Proje Dosyası Yükleme (Opsiyonel)
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center transition-colors bg-slate-950/50">
                  <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-300 font-medium">
                    Dosyaları buraya sürükleyin veya seçmek için tıklayın
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Desteklenen formatlar: PDF, DWG, DXF, Office belgeleri, ZIP (Maks. 25MB)
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="quote-file-input"
                  />
                  <label
                    htmlFor="quote-file-input"
                    className="inline-flex items-center px-4 py-2 mt-3 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer border border-slate-700 transition-colors"
                  >
                    {isUploading ? "Yükleniyor..." : "Dosya Seç"}
                  </label>
                </div>

                {/* Yüklenen Dosyaların Listesi */}
                {files.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {files.map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-white truncate font-medium">
                            {f.fileName}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            ({formatFileSize(f.fileSize)})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-slate-900 transition-colors"
                          aria-label="Dosyayı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <span>Teklif Talebini Gönder</span>
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Teklif Süreci Nasıl İşler?</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Form ve şartnameniz mühendislerimiz tarafından incelenir.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Gerekli durumlarda saha keşfi için randevu planlanır.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Detaylı malzeme listesi, proje takvimi ve fiyat teklifi iletilir.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Gizlilik & Güvenlik</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                İlettiğiniz tüm teknik çizimler, projeler ve ticari veriler gizlilik sözleşmesi (NDA) prensiplerine uygun olarak korunur ve üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function QuotePage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Teknik Teklif & Keşif</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Teklif Alın
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Projenizin kapsamını, teknik şartnamesini ve gereksinimlerinizi iletin; mühendislik ekibimiz en kısa sürede teknik ve ticari teklifinizi hazırlasın.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Teklif Al" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">Form yükleniyor...</div>}>
          <QuoteFormContent />
        </Suspense>
      </div>
    </div>
  );
}
