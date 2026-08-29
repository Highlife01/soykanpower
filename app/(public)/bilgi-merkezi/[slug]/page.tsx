import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TECHNICAL_GUIDES } from "@/data/technicalGuides";
import {
  Clock,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Zap,
  CheckCircle2,
  Share2,
  Bookmark,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  generateTechnicalGuideArticleSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TECHNICAL_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = TECHNICAL_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDesc,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDesc,
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function TechnicalGuideDetailPage({
  params,
}: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = TECHNICAL_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Bilgi Merkezi", href: "/bilgi-merkezi" },
    { label: guide.title },
  ];

  const articleSchema = generateTechnicalGuideArticleSchema(guide);
  const faqSchema = generateFaqSchema(guide.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Bilgi Merkezi", url: "/bilgi-merkezi" },
    { name: guide.title, url: `/bilgi-merkezi/${guide.slug}` },
  ]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 py-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold uppercase border border-amber-500/20">
              {guide.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <span>{guide.readTime}</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
              <span>{guide.publishedAt}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {guide.summary}
          </p>

          <div className="pt-2 text-xs text-slate-500 flex items-center space-x-2">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Yazar: {guide.author}</span>
          </div>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* GEO Quick Answer Box */}
        {guide.quickAnswer && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Özet Cevap & Temel Tanım</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {guide.quickAnswer}
            </p>
          </div>
        )}

        {/* Key Takeaways */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Öne Çıkan Mühendislik Notları
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {guide.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {guide.tableOfContents && guide.tableOfContents.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              İçindekiler
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              {guide.tableOfContents.map((toc) => (
                <li key={toc.id}>
                  <a
                    href={`#${toc.id}`}
                    className="text-amber-400 hover:text-amber-300 transition-colors hover:underline"
                  >
                    {toc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Body */}
        <article className="prose prose-invert prose-amber max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <div
            dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
            className="space-y-6 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:pt-4 [&_h2]:border-b [&_h2]:border-slate-800 [&_h2]:pb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-100 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:text-slate-300 [&_strong]:text-amber-400"
          />
        </article>

        {/* FAQs */}
        {guide.faqs && guide.faqs.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold text-white flex items-center">
              <HelpCircle className="w-5 h-5 text-amber-400 mr-2" />
              <span>Sıkça Sorulan Sorular</span>
            </h2>

            <div className="space-y-4">
              {guide.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2"
                >
                  <h3 className="text-sm font-bold text-white flex items-start">
                    <span className="text-amber-400 font-mono font-bold mr-2">Q.</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pl-5 border-l border-slate-800">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Box */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">
              Tesisiniz İçin Mühendislik Desteği Alın
            </h3>
            <p className="text-xs text-slate-400">
              Trafo, OG hücreleri, kompanzasyon veya otomasyon projelerinizi uzmanlarımızla görüşün.
            </p>
          </div>

          <Link href="/teklif-al">
            <Button variant="primary" size="md" className="whitespace-nowrap">
              <span>Teklif Talep Edin</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
