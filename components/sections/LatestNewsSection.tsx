import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar, Sparkles } from "lucide-react";
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
    <section className="py-24 bg-slate-900 text-white relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mühendislik Bülteni</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Haberler ve Teknik Makaleler
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Enerji sektörü, endüstriyel otomasyon teknolojileri ve şirketimizden güncel gelişmeler.
            </p>
          </div>

          <Link
            href="/haberler"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white hover:border-amber-500/40 text-sm font-bold transition-all shrink-0 self-start md:self-end shadow-xl group"
          >
            <span>Tüm Haberleri İncele</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {news.length === 0 ? (
          <EmptyState
            title="Henüz haber veya makale eklenmemiştir."
            description="Teknik bültenlerimiz, sektör analizlerimiz ve şirket duyurularımız yayınlandığında burada görüntülenecektir."
            icon={<Newspaper className="w-6 h-6" />}
            className="bg-slate-950/80 border-slate-800 text-slate-400 rounded-3xl"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/80 rounded-3xl border border-slate-800/90 hover:border-amber-500/50 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group backdrop-blur-xl"
              >
                {item.coverImage && (
                  <div className="aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold uppercase tracking-wider border border-amber-500/20">
                        {item.category}
                      </span>
                      <span className="flex items-center text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      <Link href={`/haberler/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    href={`/haberler/${item.slug}`}
                    className="inline-flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 pt-3 border-t border-slate-900 transition-colors justify-between w-full"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
