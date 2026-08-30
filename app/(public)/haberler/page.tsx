import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { Newspaper, Calendar, ArrowRight, BookOpen, Globe2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Teknik Makaleler & Mühendislik Blogu | Soykan Power",
  description:
    "Elektrik taahhüt, OG hücre sistemleri, trafo merkezleri, PLC & SCADA otomasyonu, kompanzasyon ve güneş enerjisi hakkında uzman mühendislik makaleleri.",
  alternates: {
    canonical: "/haberler",
  },
};

export default async function NewsPage() {
  const newsList = await prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mühendislik Kütüphanesi & Bülten</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Teknik Makaleler & Mühendislik Blogu
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            OG/AG elektrik sistemleri, PLC/SCADA otomasyonu, enerji verimliliği ve güneş enerjisi santralleri hakkında teknik rehberler ve sektörel analizler.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            <span className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              <Globe2 className="w-3 h-3 text-amber-400" />
              <span>4 Dilde Yayınlanmaktadır:</span>
              <strong className="text-white">TR</strong> • <strong className="text-white">EN</strong> • <strong className="text-white">AR</strong> • <strong className="text-white">RU</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span>Toplam <strong>{newsList.length}</strong> teknik makale yayında</span>
          </div>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Haberler & Blog" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {newsList.length === 0 ? (
          <EmptyState
            title="Henüz haber veya makale eklenmemiştir."
            description="Teknik bültenlerimiz ve sektörel makalelerimiz yayınlandığında burada listelenecektir."
            icon={<Newspaper className="w-6 h-6" />}
            className="bg-slate-900 border-slate-800 text-slate-400"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                {item.coverImage && (
                  <div className="aspect-video bg-slate-800 overflow-hidden relative">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 border border-amber-500/30">
                      <span>TR</span> • <span>EN</span> • <span>AR</span> • <span>RU</span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider text-[11px] border border-amber-500/20">
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/haberler/${item.slug}`}>{item.title}</Link>
                    </h2>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      href={`/haberler/${item.slug}`}
                      className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors"
                    >
                      <span>Makaleyi İncele</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[11px] text-slate-500">5 dk okuma</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
