import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Factory, ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sektörel Çözümler | Soykan Power Mühendislik",
  description:
    "Demir çelik, makine imalat, tekstil, kablo, gıda, otomotiv, su arıtma ve kamu tesisleri için endüstriye özel mühendislik çözümleri.",
};

export default async function SectorsPage() {
  const sectors = await prisma.sector.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Endüstriyel Çözümler</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Hizmet Verdiğimiz Sektörler
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Farklı endüstri kollarının spesifik enerji ve otomasyon ihtiyaçlarına özel mühendislik çözümleri sunuyoruz.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Sektörler" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec) => (
            <div
              key={sec.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Factory className="w-5 h-5" />
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  <Link href={`/sektorler/${sec.slug}`}>{sec.title}</Link>
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {sec.shortDesc}
                </p>
              </div>

              <Link
                href={`/sektorler/${sec.slug}`}
                className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 pt-3 border-t border-slate-800 transition-colors"
              >
                <span>Sektörel Çözümleri İncele</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
