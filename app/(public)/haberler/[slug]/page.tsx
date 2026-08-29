import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { generateArticleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Calendar, ArrowLeft, Share2, Tag } from "lucide-react";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.news.findUnique({
    where: { slug },
  });

  if (!item) return { title: "Haber Bulunamadı" };

  return {
    title: item.metaTitle || `${item.title} | Soykan Power`,
    description: item.metaDesc || item.summary,
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;

  const [item, recentNews] = await Promise.all([
    prisma.news.findUnique({
      where: { slug },
    }),
    prisma.news.findMany({
      where: { published: true, NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
  ]);

  if (!item || !item.published) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: item.title,
    summary: item.summary,
    slug: item.slug,
    publishedAt: item.publishedAt,
    coverImage: item.coverImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
        <div className="border-b border-slate-800 bg-slate-900/60 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/20">
                {item.category}
              </span>
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {formatDate(item.publishedAt)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {item.title}
            </h1>
          </div>
        </div>

        <Breadcrumb
          items={[
            { label: "Haberler", href: "/haberler" },
            { label: item.title },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article Content */}
            <article className="flex-1 space-y-8">
              {item.coverImage && (
                <div className="rounded-3xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Summary Lead */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border-l-4 border-amber-500 text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
                {item.summary}
              </div>

              {/* Body Content */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {item.content}
              </div>

              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/haberler"
                  className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Tüm Haberlere Dön</span>
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              {recentNews.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3">
                    Son Eklenen Haberler
                  </h3>
                  <div className="space-y-3">
                    {recentNews.map((rn) => (
                      <Link
                        key={rn.id}
                        href={`/haberler/${rn.slug}`}
                        className="block group"
                      >
                        <div className="text-xs text-slate-500">
                          {formatDate(rn.publishedAt)}
                        </div>
                        <div className="text-sm font-semibold text-slate-300 group-hover:text-amber-400 transition-colors line-clamp-2 mt-0.5">
                          {rn.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
