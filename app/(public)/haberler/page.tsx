import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Haberler & Teknik Makaleler | Soykan Power Mühendislik",
  description:
    "Enerji sektöründeki son gelişmeler, endüstriyel otomasyon teknolojileri ve Soykan Power mühendislik bülteni.",
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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Mühendislik Bülteni</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Haberler & Teknik Makaleler
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Sektörel gelişmeler, teknik analizler ve şirketimizden haberler.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Haberler" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {newsList.length === 0 ? (
          <EmptyState
            title="Henüz haber veya makale eklenmemiştir."
            description="Teknik bültenlerimiz ve sektörel makalelerimiz yayınlandığında burada listelenecektir."
            icon={<Newspaper className="w-6 h-6" />}
            className="bg-slate-900 border-slate-800 text-slate-400"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                {item.coverImage && (
                  <div className="aspect-video bg-slate-800 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      <Link href={`/haberler/${item.slug}`}>{item.title}</Link>
                    </h2>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    href={`/haberler/${item.slug}`}
                    className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 pt-3 border-t border-slate-800 transition-colors"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
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
