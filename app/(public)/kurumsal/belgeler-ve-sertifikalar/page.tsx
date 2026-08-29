import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CorporateSidebar } from "@/components/layout/CorporateSidebar";
import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import { Award, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Belgeler & Sertifikalar",
  description: "Soykan Power kurumsal kalite belgeleri, mesleki yetki sertifikaları ve standart uygunlukları.",
};

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kurumsal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Belgeler & Sertifikalar
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Kalite yönetim sistemlerimiz, yetki belgelerimiz ve uluslararası standart uygunluk sertifikalarımız.
          </p>
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Kurumsal", href: "/kurumsal/hakkimizda" },
          { label: "Belgeler & Sertifikalar" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8 text-slate-300 leading-relaxed text-sm sm:text-base">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Kalite ve Uygunluk Standartlarımız
              </h2>
              <p>
                Soykan Power olarak; tüm mühendislik, pano montaj ve saha taahhüt
                süreçlerimizi uluslararası akreditasyona sahip kalite yönetim
                standartları ve sektörel yetki belgeleri çerçevesinde yürütüyoruz.
              </p>
            </div>

            {certificates.length === 0 ? (
              <EmptyState
                title="Henüz sertifika kaydı eklenmemiştir."
                description="Kurumsal kalite yönetim belgelerimiz ve mesleki sertifikalarımız sisteme yüklendiğinde burada detaylarıyla yer alacaktır."
                icon={<FileCheck className="w-6 h-6" />}
                className="bg-slate-900 border-slate-800 text-slate-400"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                        <Award className="w-5 h-5" />
                      </div>
                      {cert.code && (
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                          {cert.code}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-white mt-1">
                        {cert.title}
                      </h3>
                      {cert.issuer && (
                        <p className="text-xs text-slate-400 mt-1">
                          Veren Kurum: {cert.issuer}
                        </p>
                      )}
                    </div>
                    {cert.fileUrl && (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 pt-4 mt-2 border-t border-slate-800"
                      >
                        Sertifikayı İncele (PDF)
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <CorporateSidebar />
        </div>
      </div>
    </div>
  );
}
