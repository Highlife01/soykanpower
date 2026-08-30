import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Award, ShieldCheck, FileCheck, FileText, ArrowUpRight, Sparkles } from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  code?: string | null;
  issuer?: string | null;
  issueYear?: number | null;
  fileUrl?: string | null;
}

interface CertificatesSectionProps {
  certificates: CertificateItem[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kalite & Standart Uygunluk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Yetki Belgeleri & Kalite Sertifikalarımız
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            ISO entegre yönetim sistemlerimiz, mesleki yetki belgelerimiz ve uluslararası tip test uygunluk sertifikalarımız.
          </p>
        </div>

        {certificates.length === 0 ? (
          <EmptyState
            title="Henüz sertifika veya belge kaydı eklenmemiştir."
            description="Kurumsal kalite ve yetki belgelerimiz yönetim paneli üzerinden yüklendiğinde burada listelenecektir."
            icon={<FileCheck className="w-6 h-6" />}
            className="bg-slate-900/80 border-slate-800 text-slate-400 rounded-3xl"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    {cert.code && (
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
                        {cert.code}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mt-1 mb-2">
                    {cert.title}
                  </h3>

                  {cert.issuer && (
                    <p className="text-xs text-slate-400">
                      Veren Kurum: <span className="text-slate-300 font-semibold">{cert.issuer}</span>
                    </p>
                  )}
                </div>

                {cert.fileUrl && (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between text-xs font-bold text-amber-400 hover:text-amber-300 pt-4 mt-3 border-t border-slate-800/80 transition-colors"
                  >
                    <span>Sertifikayı Görüntüle (PDF)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
