import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { REGIONS } from "@/data/regions";
import { REGION_SERVICES } from "@/data/regionServices";
import {
  MapPin,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  HelpCircle,
  FileCheck,
  Building2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  generateRegionServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

interface RegionServicePageProps {
  params: Promise<{ slug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
  return REGION_SERVICES.map((rs) => ({
    slug: rs.regionSlug,
    serviceSlug: rs.serviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: RegionServicePageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const item = REGION_SERVICES.find(
    (rs) => rs.regionSlug === slug && rs.serviceSlug === serviceSlug
  );
  if (!item) return {};

  return {
    title: item.metaTitle,
    description: item.metaDesc,
    openGraph: {
      title: item.metaTitle,
      description: item.metaDesc,
      type: "website",
    },
  };
}

export default async function RegionServiceDetailPage({
  params,
}: RegionServicePageProps) {
  const { slug, serviceSlug } = await params;
  const item = REGION_SERVICES.find(
    (rs) => rs.regionSlug === slug && rs.serviceSlug === serviceSlug
  );
  const region = REGIONS.find((r) => r.slug === slug);

  if (!item || !region) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Hizmet Bölgeleri", href: "/bolgeler" },
    { label: region.name, href: `/bolgeler/${region.slug}` },
    { label: item.title },
  ];

  const serviceSchema = generateRegionServiceSchema(item);
  const faqSchema = generateFaqSchema(item.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmet Bölgeleri", url: "/bolgeler" },
    { name: region.name, url: `/bolgeler/${region.slug}` },
    { name: item.title, url: `/bolgeler/${region.slug}/${item.serviceSlug}` },
  ]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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

      {/* Hero Header */}
      <div className="border-b border-slate-800 bg-slate-900/70 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/bolgeler/${region.slug}`}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{region.name} Bölgesi</span>
            </Link>
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700">
              Endüstriyel Mühendislik Hizmeti
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {item.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-3xl leading-relaxed">
            {item.subtitle}
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <Link href={`/teklif-al?city=${encodeURIComponent(region.name)}`}>
              <Button variant="primary" size="lg">
                <span>{region.name} İçin Teklif Alın</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="tel:+903220000000">
              <Button variant="secondary" size="lg">
                <Phone className="w-4 h-4 mr-2 text-amber-400" />
                <span>Mühendisimizle Görüşün</span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Section 1: Introduction & Technical Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Teknik Kapsam
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {region.name} Tesislerine Özel Mühendislik Çözümleri
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.introduction}
              </p>
            </div>

            {/* Technical Capabilities List */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
                <Zap className="w-4 h-4 text-amber-400 mr-2" />
                <span>Uygulama & Teknik Yetkinlikler</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {item.technicalCapabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Local Applications in Region */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
                <Building2 className="w-4 h-4 text-amber-400 mr-2" />
                <span>{region.name} Uygulama Alanları & Sektörler</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {item.localApplications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 cols: Standards & Lead Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Standards Box */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>Uyumlu Standartlar & Mevzuat</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {item.industrialStandards.map((std, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <FileCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fast Quote Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-amber-950/20 border border-amber-500/30 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white">
                {region.name} Projeniz İçin Hızlı Fiyat & Keşif
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Şartnamenizi veya proje detaylarınızı iletin, mühendislik ekibimiz aynı gün içinde teknik değerlendirmeyi başlatsın.
              </p>
              <Link
                href={`/teklif-al?city=${encodeURIComponent(region.name)}`}
                className="block"
              >
                <Button variant="primary" size="md" className="w-full">
                  <span>Teklif Formunu Aç</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Section 2: Process Steps */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Uygulama Metodolojisi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {region.name} Projelerinde Uygulama Aşamalarımız
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {item.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <span className="text-2xl font-black text-amber-400 font-mono">
                  0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: FAQs */}
        {item.faqs && item.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Sıkça Sorulan Sorular
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center">
                <HelpCircle className="w-6 h-6 text-amber-400 mr-2.5" />
                <span>{item.title} Hakkında Merak Edilenler</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5"
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

        {/* Back Link to Region */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
          <Link
            href={`/bolgeler/${region.slug}`}
            className="hover:text-amber-400 transition-colors flex items-center"
          >
            <span>← {region.name} Bölge Sayfasına Geri Dön</span>
          </Link>
          <Link
            href="/bolgeler"
            className="hover:text-amber-400 transition-colors"
          >
            Tüm Hizmet Bölgeleri
          </Link>
        </div>
      </div>
    </div>
  );
}
