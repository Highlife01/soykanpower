import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Award, ShieldCheck, FileCheck } from "lucide-react";

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
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            <span>Kalite & Yetkinlik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Belgeler & Sertifikalar
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Kalite yönetim sistemlerimiz, mesleki yetki belgelerimiz ve uluslararası standart uygunluk sertifikalarımız.
          </p>
        </div>

        {certificates.length === 0 ? (
          <EmptyState
            title="Henüz sertifika veya belge kaydı eklenmemiştir."
            description="Kurumsal kalite ve yetki belgelerimiz yönetim paneli üzerinden yüklendiğinde burada listelenecektir."
            icon={<FileCheck className="w-6 h-6" />}
            className="bg-slate-950/60 border-slate-800 text-slate-400"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>

                  {cert.code && (
                    <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                      {cert.code}
                    </span>
                  )}

                  <h3 className="text-sm font-bold text-white mt-1 mb-2">
                    {cert.title}
                  </h3>

                  {cert.issuer && (
                    <p className="text-xs text-slate-400">
                      Veren Kurum: {cert.issuer}
                    </p>
                  )}
                </div>

                {cert.fileUrl && (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300 pt-4 mt-2 border-t border-slate-800"
                  >
                    <span>Belgeyi İncele (PDF)</span>
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
