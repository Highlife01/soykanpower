import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  publishedAt: Date | string;
  coverImage?: string | null;
}

interface LatestNewsSectionProps {
  news: NewsItem[];
}

export function LatestNewsSection({ news }: LatestNewsSectionProps) {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span>Mühendislik Bülteni</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Haberler ve Teknik Makaleler
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Enerji sektörü, endüstriyel otomasyon teknolojileri ve şirketimizden güncel gelişmeler.
            </p>
          </div>

          <Link
            href="/haberler"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-950 hover:text-amber-600 transition-colors shrink-0"
          >
            <span>Tüm Haberleri İncele</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        {news.length === 0 ? (
          <EmptyState
            title="Henüz haber veya makale eklenmemiştir."
            description="Teknik bültenlerimiz, sektör analizlerimiz ve şirket duyurularımız yayınlandığında burada görüntülenecektir."
            icon={<Newspaper className="w-6 h-6" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-500/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {item.coverImage && (
                  <div className="aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                      <Link href={`/haberler/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    href={`/haberler/${item.slug}`}
                    className="inline-flex items-center text-xs font-bold text-slate-900 group-hover:text-amber-600 pt-3 border-t border-slate-100 transition-colors"
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
    </section>
  );
}
