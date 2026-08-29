import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kariyer | Soykan Power Mühendislik",
  description:
    "Soykan Power bünyesinde açık mühendislik, otomasyon ve saha pozisyonları. Başvuru yapın ve ekibimize katılın.",
};

export default async function CareersPage() {
  const careers = await prisma.career.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Kariyer & İnsan Kaynakları</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Açık Pozisyonlar
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Mühendislik uzmanlığını inovasyonla buluşturan ekibimize katılın.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Kariyer" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {careers.length === 0 ? (
          <EmptyState
            title="Şu anda açık pozisyon bulunmamaktadır."
            description="Yeni pozisyonlar açıldığında burada listelenecektir. Genel başvurularınız için bizimle iletişime geçebilirsiniz."
            icon={<Briefcase className="w-6 h-6" />}
            className="bg-slate-900 border-slate-800 text-slate-400"
            action={
              <Link
                href="/iletisim"
                className="inline-flex items-center px-5 py-2.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-xl hover:bg-amber-400 transition-colors"
              >
                Genel İletişim Formuna Git
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((career) => (
              <div
                key={career.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                      {career.department}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {career.workType}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    <Link href={`/kariyer/${career.id}`}>{career.title}</Link>
                  </h2>

                  <div className="flex items-center text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    <span>{career.location}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-2">
                    {career.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/kariyer/${career.id}`}
                    className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors"
                  >
                    <span>İlanı İncele & Başvur</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
