import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { generateArticleSchema } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { NewsLanguageView } from "@/components/news/NewsLanguageView";

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
    alternates: {
      canonical: `/haberler/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.summary,
      images: item.coverImage ? [item.coverImage] : [],
      type: "article",
    },
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
      take: 5,
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
        <Breadcrumb
          items={[
            { label: "Haberler & Blog", href: "/haberler" },
            { label: item.title },
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Interactive Article View with TR/EN/AR/RU Support */}
            <article className="flex-1 min-w-0">
              <NewsLanguageView item={item} />

              <div className="pt-8 mt-10 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/haberler"
                  className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  <span>Tüm Haberlere & Makalelere Dön</span>
                </Link>

                <Link
                  href="/teklif-al"
                  className="inline-flex items-center text-xs font-bold px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all font-semibold"
                >
                  Projeniz İçin Teklif Alın
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              {recentNews.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 sticky top-28">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span>Diğer Makaleler</span>
                    <span className="text-[10px] text-slate-500 font-normal">Teknik Bülten</span>
                  </h3>
                  <div className="space-y-4">
                    {recentNews.map((rn) => (
                      <Link
                        key={rn.id}
                        href={`/haberler/${rn.slug}`}
                        className="block group space-y-1"
                      >
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                          <span className="text-amber-500/80 font-semibold">{rn.category}</span>
                          <span>•</span>
                          <span>{formatDate(rn.publishedAt)}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-300 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
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
