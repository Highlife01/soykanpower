import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { REGIONS } from "@/data/regions";
import { REGION_SERVICES } from "@/data/regionServices";
import { prisma } from "@/lib/db";
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

export const revalidate = 3600;

export async function generateStaticParams() {
  const dbRegionServices = await prisma.regionService.findMany({
    where: { published: true },
    include: {
      region: { select: { slug: true } },
      service: { select: { slug: true } },
    },
  });

  if (dbRegionServices.length > 0) {
    return dbRegionServices.map((rs) => ({
      slug: rs.region.slug,
      serviceSlug: rs.service.slug,
    }));
  }

  return REGION_SERVICES.map((rs) => ({
    slug: rs.regionSlug,
    serviceSlug: rs.serviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: RegionServicePageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;

  // DB first
  const dbRegion = await prisma.region.findUnique({
    where: { slug },
  });
  const dbService = await prisma.service.findUnique({
    where: { slug: serviceSlug },
  });

  if (dbRegion && dbService) {
    const dbRelation = await prisma.regionService.findUnique({
      where: {
        regionId_serviceId: {
          regionId: dbRegion.id,
          serviceId: dbService.id,
        },
      },
    });

    const title = dbRelation?.metaTitle || `${dbRegion.name} ${dbService.title} | Soykan Power Mühendislik`;
    const description = dbRelation?.metaDesc || `${dbRegion.name} bölgesinde ${dbService.title} anahtar teslim mühendislik ve kurulum hizmetleri.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/bolgeler/${slug}/${serviceSlug}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  }

  const staticItem = REGION_SERVICES.find(
    (rs) => rs.regionSlug === slug && rs.serviceSlug === serviceSlug
  );
  if (!staticItem) return {};

  return {
    title: staticItem.metaTitle,
    description: staticItem.metaDesc,
    alternates: {
      canonical: `/bolgeler/${slug}/${serviceSlug}`,
    },
    openGraph: {
      title: staticItem.metaTitle,
      description: staticItem.metaDesc,
      type: "website",
    },
  };
}

export default async function RegionServiceDetailPage({
  params,
}: RegionServicePageProps) {
  const { slug, serviceSlug } = await params;

  // DB lookup
  const [dbRegion, dbService] = await Promise.all([
    prisma.region.findUnique({
      where: { slug },
      include: {
        districts: { where: { isPublished: true } },
      },
    }),
    prisma.service.findUnique({
      where: { slug: serviceSlug },
    }),
  ]);

  let dbRelation = null;
  if (dbRegion && dbService) {
    dbRelation = await prisma.regionService.findUnique({
      where: {
        regionId_serviceId: {
          regionId: dbRegion.id,
          serviceId: dbService.id,
        },
      },
    });
  }

  const staticItem = REGION_SERVICES.find(
    (rs) => rs.regionSlug === slug && rs.serviceSlug === serviceSlug
  );
  const staticRegion = REGIONS.find((r) => r.slug === slug);

  if ((!dbRegion || !dbService || !dbRelation?.enabled) && !staticItem) {
    notFound();
  }

  const regionName = dbRegion?.name || staticRegion?.name || slug;
  const serviceTitle = dbService?.title || staticItem?.title || serviceSlug;
  const pageH1 = dbRelation?.customTitle || staticItem?.h1 || `${regionName} ${serviceTitle} Mühendislik Çözümleri`;
  const pageIntro = dbRelation?.customDescription || staticItem?.introduction || `${regionName} sanayi tesisleri ve projeleri için ${serviceTitle} alanında yüksek güvenlikli, standartlara uygun anahtar teslim mühendislik hizmetleri sunuyoruz.`;

  const technicalCaps = staticItem?.technicalCapabilities || [
    "IEC ve TSE standartlarına uygun tip testli projelendirme",
    "Primer ve sekonder elektromekanik montaj",
    "Kısa devre, yük akışı ve selektivite hesaplamaları",
    "Yerel elektrik dağıtım şirketi resmi kabul süreçleri",
  ];

  const localApps = staticItem?.localApplications || [
    `${regionName} Organize Sanayi Bölgesi Fabrikaları`,
    `${regionName} İmalat ve Ağır Sanayi Tesisleri`,
    `${regionName} Ticari Binalar ve Oteller`,
  ];

  const faqs = staticItem?.faqs || [
    {
      question: `${regionName} bölgesinde ${serviceTitle} için keşif ve teklif süresi ne kadardır?`,
      answer: `Talebiniz bize ulaştıktan sonra 24 saat içinde mühendislik ekibimiz yerinde keşif veya şartname analizi yaparak teknik/ticari teklifinizi hazırlar.`,
    },
  ];

  const breadcrumbs = [
    { label: "Hizmet Bölgeleri", href: "/bolgeler" },
    { label: regionName, href: `/bolgeler/${slug}` },
    { label: serviceTitle },
  ];

  const serviceSchema = generateRegionServiceSchema({
    regionSlug: slug,
    serviceSlug: serviceSlug,
    regionName: regionName,
    title: serviceTitle,
    h1: pageH1,
    subtitle: `${regionName} sanayi ve işletmelerine özel mühendislik.`,
    introduction: pageIntro,
    technicalCapabilities: technicalCaps,
    localApplications: localApps,
    industrialStandards: staticItem?.industrialStandards || ["IEC 61439-1/2", "TS EN 62271-200", "TEDAŞ MYD"],
    processSteps: staticItem?.processSteps || [
      { title: "Keşif & Etüt", desc: "Tesis yerinde incelenir ve yük profil analizi yapılır." },
      { title: "Mühendislik", desc: "Statik ve elektriksel hesaplar tamamlanır." },
      { title: "İmalat & Montaj", desc: "Tip testli malzeme ve panolarla kurulum gerçekleştirilir." },
      { title: "Devreye Alma", desc: "Resmi kabuller tamamlanarak güvenle enerjilendirilir." },
    ],
    faqs: faqs,
    metaTitle: `${regionName} ${serviceTitle} | Soykan Power`,
    metaDesc: pageIntro.slice(0, 160),
  });

  const faqSchema = generateFaqSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmet Bölgeleri", url: "/bolgeler" },
    { name: regionName, url: `/bolgeler/${slug}` },
    { name: serviceTitle, url: `/bolgeler/${slug}/${serviceSlug}` },
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
              href={`/bolgeler/${slug}`}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{regionName} Bölgesi</span>
            </Link>
            <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700">
              Endüstriyel Mühendislik Hizmeti
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {pageH1}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-3xl leading-relaxed">
            {pageIntro}
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <Link href={`/teklif-al?city=${encodeURIComponent(regionName)}&service=${encodeURIComponent(serviceTitle)}&sourcePage=/bolgeler/${slug}/${serviceSlug}`}>
              <Button variant="primary" size="lg">
                <span>{regionName} İçin Teklif Alın</span>
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
                Teknik Kapsam & Saha Yönetimi
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {regionName} Tesislerine Özel {serviceTitle} Çözümleri
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {pageIntro}
              </p>
            </div>

            {/* Technical Capabilities List */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
                <Zap className="w-4 h-4 text-amber-400 mr-2" />
                <span>Uygulama & Teknik Yetkinlikler</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {technicalCaps.map((cap, idx) => (
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
                <span>{regionName} Uygulama Alanları & Sektörler</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {localApps.map((app, idx) => (
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
                {(staticItem?.industrialStandards || ["IEC 61439-1/2", "TS EN 62271-200", "TEDAŞ MYD"]).map((std, idx) => (
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
                {regionName} {serviceTitle} İçin Keşif & Teklif
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Şartnamenizi veya proje gereksinimlerinizi iletin, mühendislik ekibimiz aynı gün içinde teknik değerlendirmeyi başlatsın.
              </p>
              <Link
                href={`/teklif-al?city=${encodeURIComponent(regionName)}&service=${encodeURIComponent(serviceTitle)}&sourcePage=/bolgeler/${slug}/${serviceSlug}`}
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
              {regionName} Projelerinde Uygulama Aşamalarımız
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(staticItem?.processSteps || [
              { title: "Keşif & Etüt", desc: "Tesis yerinde incelenir ve yük profil analizi yapılır." },
              { title: "Mühendislik", desc: "Statik ve elektriksel hesaplar tamamlanır." },
              { title: "İmalat & Montaj", desc: "Tip testli malzeme ve panolarla kurulum gerçekleştirilir." },
              { title: "Devreye Alma", desc: "Resmi kabuller tamamlanarak güvenle enerjilendirilir." },
            ]).map((step, idx) => (
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
        {faqs.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Sıkça Sorulan Sorular
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center">
                <HelpCircle className="w-6 h-6 text-amber-400 mr-2.5" />
                <span>{regionName} {serviceTitle} Hakkında Merak Edilenler</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
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
            href={`/bolgeler/${slug}`}
            className="hover:text-amber-400 transition-colors flex items-center"
          >
            <span>← {regionName} Bölge Sayfasına Geri Dön</span>
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
