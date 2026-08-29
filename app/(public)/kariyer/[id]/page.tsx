"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CareerDetail {
  id: string;
  title: string;
  department: string;
  location: string;
  workType: string;
  description: string;
  requirements: string;
}

export default function CareerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [career, setCareer] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [cvFile, setCvFile] = useState<{ name: string; url: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadJob() {
      try {
        const res = await fetch(`/api/career/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCareer(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadJob();
  }, [id]);

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage("");

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "CV yüklenemedi");

      setCvFile({ name: json.fileName, url: json.url });
    } catch (err: any) {
      setErrorMessage(err.message || "CV dosyası yüklenirken bir hata oluştu.");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      setErrorMessage("Lütfen özgeçmiş (CV) dosyanızı yükleyiniz.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/career/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerId: id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cvUrl: cvFile.url,
          coverLetter: formData.coverLetter,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Başvuru gönderilemedi.");

      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Başvuru gönderilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 text-white min-h-screen pt-32 text-center">
        <div className="animate-pulse">İlan yükleniyor...</div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="bg-slate-950 text-white min-h-screen pt-32 text-center space-y-4">
        <h1 className="text-2xl font-bold">İlan Bulunamadı</h1>
        <p className="text-slate-400">Aradığınız açık pozisyon yayından kaldırılmış olabilir.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              {career.department}
            </span>
            <span className="text-xs text-slate-400 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {career.workType}
            </span>
            <span className="text-xs text-slate-400 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
              {career.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {career.title}
          </h1>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kariyer", href: "/kariyer" },
          { label: career.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Job Description & Requirements */}
          <div className="lg:col-span-7 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Pozisyon Tanımı ve Sorumluluklar
              </h2>
              <p className="whitespace-pre-line text-slate-300">
                {career.description}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                Aranan Nitelikler
              </h3>
              <p className="whitespace-pre-line text-slate-300">
                {career.requirements}
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl sticky top-28">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Pozisyona Başvur
              </h3>

              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Başvurunuz Alındı!</h4>
                  <p className="text-xs text-slate-400">
                    Özgeçmişiniz İnsan Kaynakları departmanımız tarafından incelenerek uygun bulunması halinde tarafınıza ulaşılacaktır.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider block">
                      Ad Soyad <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Adınız Soyadınız"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider block">
                      E-posta <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ornek@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider block">
                      Telefon <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider block">
                      Özgeçmiş (CV) <span className="text-amber-400">*</span>
                    </label>
                    <div className="border border-dashed border-slate-800 hover:border-amber-500/50 rounded-xl p-3 text-center bg-slate-950">
                      {cvFile ? (
                        <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                          <span className="truncate">{cvFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setCvFile(null)}
                            className="text-red-400 text-[11px] underline ml-2 shrink-0"
                          >
                            Kaldır
                          </button>
                        </div>
                      ) : (
                        <>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleCvUpload}
                            disabled={isUploading}
                            className="hidden"
                            id="cv-upload-input"
                          />
                          <label
                            htmlFor="cv-upload-input"
                            className="cursor-pointer text-slate-400 hover:text-white flex items-center justify-center space-x-2 py-1"
                          >
                            <Upload className="w-4 h-4 text-amber-400" />
                            <span>{isUploading ? "Yükleniyor..." : "CV Dosyası Seç (PDF / Word)"}</span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold uppercase tracking-wider block">
                      Ön Yazı / Not (Opsiyonel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Kendinizi veya kariyer hedeflerinizi kısaca belirtebilirsiniz..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    <span>Başvuruyu Gönder</span>
                    <Send className="w-4 h-4 ml-1.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
