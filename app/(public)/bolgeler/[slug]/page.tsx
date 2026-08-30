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
  Building2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Phone,
  HelpCircle,
  FolderGit2,
  Factory,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  generateRegionPageSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const dbRegions = await prisma.region.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  if (dbRegions.length > 0) {
    return dbRegions.map((r) => ({ slug: r.slug }));
  }
  return REGIONS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try DB first
  const dbRegion = await prisma.region.findUnique({
    where: { slug },
  });

  if (dbRegion) {
    const title = dbRegion.metaTitle || `${dbRegion.name} Elektrik Taahhüt & Otomasyon | Soykan Power`;
    const description = dbRegion.metaDesc || dbRegion.shortDescription || dbRegion.description || "";
    return {
      title,
      description,
      alternates: {
        canonical: `/bolgeler/${dbRegion.slug}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
      },
    };
  }

  const region = REGIONS.find((r) => r.slug === slug);
  if (!region) return {};

  return {
    title: region.metaTitle,
    description: region.metaDesc,
    alternates: {
      canonical: `/bolgeler/${region.slug}`,
    },
    openGraph: {
      title: region.metaTitle,
      description: region.metaDesc,
      type: "website",
    },
  };
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params;

  // DB Region with relations
  const dbRegion = await prisma.region.findUnique({
    where: { slug },
    include: {
      districts: { where: { isPublished: true }, orderBy: { sortOrder: "asc" } },
      regionServices: { where: { published: true }, include: { service: true } },
      regionFaqs: { where: { published: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  const staticRegion = REGIONS.find((r) => r.slug === slug);

  if (!dbRegion && !staticRegion) {
    notFound();
  }

  const regionName = dbRegion?.name || staticRegion!.name;
  const isHQ = slug === "adana";
  const heroHeadline = dbRegion?.heroTitle || staticRegion?.heroHeadline || `${regionName} Elektrik Taahhüt & Mühendislik`;
  const heroSubheadline = dbRegion?.heroDescription || staticRegion?.heroSubheadline || `${regionName} sanayi tesisleri ve projeleri için kesintisiz mühendislik çözümleri.`;
  const shortDesc = dbRegion?.shortDescription || staticRegion?.shortDesc || "";
  const longDesc = dbRegion?.description || staticRegion?.industrialProfile || "";

  // Get matching city projects from DB
  const regionalProjects = await prisma.project.findMany({
    where: {
      published: true,
      OR: [
        { location: { contains: regionName } },
        { location: { contains: slug } },
      ],
    },
    take: 3,
    orderBy: { year: "desc" },
  });

  // Get matching region services
  const dbRegionServices = dbRegion?.regionServices || [];
  const fallbackRegionServices = REGION_SERVICES.filter((rs) => rs.regionSlug === slug);

  // FAQs
  const faqs = (dbRegion?.regionFaqs && dbRegion.regionFaqs.length > 0)
    ? dbRegion.regionFaqs.map((f) => ({ question: f.question, answer: f.answer }))
    : staticRegion?.faqs || [];

  // Districts
  const districtList = (dbRegion?.districts && dbRegion.districts.length > 0)
    ? dbRegion.districts.map((d) => d.name)
    : staticRegion?.targetDistricts || [];

  const breadcrumbs = [
    { label: "Hizmet Bölgeleri", href: "/bolgeler" },
    { label: regionName },
  ];

  const regionSchema = generateRegionPageSchema({
    name: regionName,
    slug: slug,
    isHeadquarters: isHQ,
    heroHeadline: heroHeadline,
    heroSubheadline: heroSubheadline,
    shortDesc: shortDesc,
    industrialProfile: longDesc,
    targetDistricts: districtList,
    keyIndustries: staticRegion?.keyIndustries || ["Endüstriyel Tesisler", "OSB Fabrikaları", "Enerji Dağıtım"],
    engineeringProcess: staticRegion?.engineeringProcess || [
      { step: "01", title: "Saha Keşfi ve Yük Analizi", description: "Tesis yerinde incelenir, elektriksel güç ve kısa devre gereksinimleri hesaplanır." },
      { step: "02", title: "Elektriksel Projelendirme", description: "BEDAŞ/EDAŞ/TEİAŞ şartnamelerine uygun uygulama projeleri hazırlanır." },
      { step: "03", title: "Tip Testli Montaj ve İmalat", description: "Panolar, kablolama ve trafo köşkleri uzman ekiplerce kurulur." },
      { step: "04", title: "Resmi Kabul ve Devreye Alma", description: "Tüm testler tamamlanarak dağıtım kurumu resmi kabulüyle sistem enerjilendirilir." },
    ],
    faqs: faqs,
    metaTitle: dbRegion?.metaTitle || `${regionName} Elektrik Taahhüt | Soykan Power`,
    metaDesc: dbRegion?.metaDesc || shortDesc,
  });

  const faqSchema = generateFaqSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "Hizmet Bölgeleri", url: "/bolgeler" },
    { name: regionName, url: `/bolgeler/${slug}` },
  ]);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(regionSchema) }}
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
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>{regionName} Bölgesi</span>
            </span>
            {isHQ ? (
              <span className="px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
                Ana Merkez & Otorite
              </span>
            ) : (
              <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700">
                Bölgesel Hizmet Sahası
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight">
            {heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-3xl leading-relaxed">
            {heroSubheadline}
          </p>

          <div className="pt-8 flex flex-wrap items-center gap-4">
            <Link href={`/teklif-al?city=${encodeURIComponent(regionName)}&sourcePage=/bolgeler/${slug}`}>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Section 1: Industrial Profile & Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Bölgesel Sanayi & Tesis Profili
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {regionName} Sanayisi İçin Mühendislik Yaklaşımımız
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {longDesc}
            </p>

            {shortDesc && (
              <p className="text-sm text-slate-400 leading-relaxed">
                {shortDesc}
              </p>
            )}

            {/* Target Districts */}
            {districtList.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center">
                  <Building2 className="w-4 h-4 text-amber-400 mr-2" />
                  <span>Hizmet Verdiğimiz Sanayi Bölgeleri & İlçeler</span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {districtList.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 cols: Key Industries Summary */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3 flex items-center">
              <Factory className="w-4 h-4 text-amber-400 mr-2" />
              <span>Odak Sektörler</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {(staticRegion?.keyIndustries || ["Sanayi Tesisleri", "Tekstil ve İmalat", "Enerji ve GES"]).map((ind, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-slate-200">{ind}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 block uppercase">
                  {isHQ ? "Merkez Koordinasyon" : "Hızlı Saha Ekibi"}
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isHQ
                    ? "Adana merkez ofisimizden projelendirme, pano üretimi ve 7/24 teknik servis desteği sunulmaktadır."
                    : `${regionName} bölgesindeki projeleriniz için Adana merkezimizden tam donanımlı mühendis ve teknik ekipler sevk edilir.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: High-Intent Regional Service Combinations */}
        {(dbRegionServices.length > 0 || fallbackRegionServices.length > 0) && (
          <div className="space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Özel Mühendislik Hizmetleri
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {regionName} İçin Branşlaşmış Hizmet Sayfaları
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Bölgenizdeki sanayi gereksinimlerine göre özelleştirilmiş teknik çözümlerimiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbRegionServices.length > 0
                ? dbRegionServices.map((rs) => (
                    <Link
                      key={rs.id}
                      href={`/bolgeler/${slug}/${rs.service.slug}`}
                      className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between group shadow-xl"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {rs.customTitle || `${regionName} ${rs.service.title}`}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {rs.customDescription || rs.service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
                        <span>Teknik Detayları İncele</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))
                : fallbackRegionServices.map((rs) => (
                    <Link
                      key={rs.serviceSlug}
                      href={`/bolgeler/${rs.regionSlug}/${rs.serviceSlug}`}
                      className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col justify-between group shadow-xl"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {rs.h1}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {rs.introduction}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
                        <span>Teknik Detayları İncele</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        )}

        {/* Section 3: Engineering Process */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Süreç Standartlarımız
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {regionName} Projelerinde Mühendislik Sürecimiz
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              İlk saha keşfinden resmi EDAŞ kabulüne kadar 4 aşamalı titiz yönetim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(staticRegion?.engineeringProcess || [
              { step: "01", title: "Saha Keşfi ve Yük Analizi", description: "Tesis yerinde incelenir, elektriksel güç ve kısa devre gereksinimleri hesaplanır." },
              { step: "02", title: "Elektriksel Projelendirme", description: "BEDAŞ/EDAŞ/TEİAŞ şartnamelerine uygun uygulama projeleri hazırlanır." },
              { step: "03", title: "Tip Testli Montaj ve İmalat", description: "Panolar, kablolama ve trafo köşkleri uzman ekiplerce kurulur." },
              { step: "04", title: "Resmi Kabul ve Devreye Alma", description: "Tüm testler tamamlanarak dağıtım kurumu resmi kabulüyle sistem enerjilendirilir." },
            ]).map((proc) => (
              <div
                key={proc.step}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors"
              >
                <span className="text-3xl font-black text-amber-500/20 font-mono group-hover:text-amber-400 transition-colors">
                  {proc.step}
                </span>
                <h3 className="text-sm font-bold text-white">{proc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {proc.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Regional Projects */}
        {regionalProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-2xl font-extrabold text-white flex items-center">
                <FolderGit2 className="w-6 h-6 text-amber-400 mr-2.5" />
                <span>{regionName} Bölgesindeki Projelerimiz</span>
              </h2>
              <Link
                href="/projeler"
                className="text-xs font-bold text-amber-400 hover:underline flex items-center"
              >
                <span>Tüm Portföy</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regionalProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projeler/${p.slug}`}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {p.coverImage && (
                      <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                      {p.categoryType}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-slate-800 mt-3 text-xs text-slate-400 flex items-center justify-between">
                    <span>{p.location || regionName}</span>
                    <span className="text-amber-400 font-semibold font-mono">{p.year}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Region FAQs */}
        {faqs.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Merak Edilenler
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center">
                <HelpCircle className="w-6 h-6 text-amber-400 mr-2.5" />
                <span>{regionName} İçin Sıkça Sorulan Sorular</span>
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

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">
              {regionName} Bölgesindeki Projenizi Birlikte Planlayalım
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Teknik şartnamenizi iletin veya yerinde keşif talep edin; mühendislik departmanımız en kısa sürede teknik ve ticari teklifinizi hazırlasın.
            </p>
          </div>

          <Link href={`/teklif-al?city=${encodeURIComponent(regionName)}&sourcePage=/bolgeler/${slug}`}>
            <Button variant="primary" size="lg" className="whitespace-nowrap">
              <span>Hemen Teklif Alın</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
