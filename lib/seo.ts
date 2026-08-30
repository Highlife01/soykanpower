import { RegionData } from "@/data/regions";
import { RegionServiceData } from "@/data/regionServices";
import { TechnicalGuideData } from "@/data/technicalGuides";

export const BASE_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com";
export const ORGANIZATION_ID = `${BASE_SITE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_SITE_URL}/#website`;

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_SITE_URL,
    name: "Soykan Power",
    description: "Elektrik Taahhüt, Endüstriyel Otomasyon, Enerji Sistemleri ve Güneş Enerjisi Mühendislik Çözümleri",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    inLanguage: "tr-TR",
  };
}

export function generateOrganizationSchema(siteSetting?: {
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
} | null) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "EngineeringCompany"],
    "@id": ORGANIZATION_ID,
    name: siteSetting?.companyName || "Soykan Power Mühendislik",
    legalName: siteSetting?.companyName || "Soykan Power Mühendislik Elektrik Otomasyon San. ve Tic. Ltd. Şti.",
    url: BASE_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_SITE_URL}/logo.png`,
      caption: "Soykan Power Logo",
    },
    description:
      "Elektrik Taahhüt, AG/OG/YG Şalt Tesisleri, Trafo Merkezleri, Endüstriyel Otomasyon (PLC/SCADA), MCC/ADP Panoları ve Çatı GES alanlarında anahtar teslim mühendislik ve taahhüt şirketi.",
    telephone: siteSetting?.phone || "+90 322 000 00 00",
    email: siteSetting?.email || "info@soykanpower.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSetting?.address || "Hacı Sabancı OSB / Adana",
      addressLocality: "Adana",
      addressRegion: "Adana",
      addressCountry: "TR",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Adana" },
      { "@type": "AdministrativeArea", name: "Mersin" },
      { "@type": "AdministrativeArea", name: "Gaziantep" },
      { "@type": "AdministrativeArea", name: "Hatay" },
      { "@type": "AdministrativeArea", name: "Osmaniye" },
      { "@type": "AdministrativeArea", name: "Antalya" },
      { "@type": "AdministrativeArea", name: "Isparta" },
      { "@type": "AdministrativeArea", name: "Niğde" },
      { "@type": "Country", name: "Kuzey Kıbrıs Türk Cumhuriyeti" },
    ],
    knowsAbout: [
      "Elektrik Taahhüt",
      "Endüstriyel Otomasyon",
      "PLC Programlama",
      "SCADA Sistemleri",
      "Orta Gerilim Şalt Tesisleri",
      "Trafo Merkezleri",
      "MCC Pano İmalatı",
      "Kompanzasyon Sistemleri",
      "Çatı Güneş Enerjisi (GES)",
      "Enerji Verimliliği ve Harmonik Filtreleme",
    ],
    sameAs: [
      "https://www.linkedin.com/company/soykanpower",
      "https://www.instagram.com/soykanpower",
    ],
  };
}

export function generateLocalBusinessSchema(siteSetting?: {
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  workingHours?: string | null;
} | null) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_SITE_URL}/#localbusiness`,
    name: siteSetting?.companyName || "Soykan Power - Adana Merkez",
    image: `${BASE_SITE_URL}/og-default.jpg`,
    url: BASE_SITE_URL,
    telephone: siteSetting?.phone || "+90 322 000 00 00",
    email: siteSetting?.email || "info@soykanpower.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSetting?.address || "Hacı Sabancı OSB",
      addressLocality: "Adana",
      addressRegion: "Adana",
      addressCountry: "TR",
    },
    openingHours: siteSetting?.workingHours || "Mo-Sa 08:30-18:00",
    priceRange: "$$",
    parentOrganization: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  shortDesc: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_SITE_URL}/hizmetler/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    description: service.shortDesc,
    url: `${BASE_SITE_URL}/hizmetler/${service.slug}`,
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
  };
}

export function generateRegionPageSchema(region: {
  name: string;
  slug: string;
  metaTitle?: string;
  title?: string;
  metaDesc?: string;
  [key: string]: any;
}) {
  const pageTitle = region.metaTitle || region.title || `${region.name} Elektrik Taahhüt | Soykan Power`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_SITE_URL}/bolgeler/${region.slug}#webpage`,
    url: `${BASE_SITE_URL}/bolgeler/${region.slug}`,
    name: pageTitle,
    description: region.metaDesc || "",
    about: {
      "@type": "Service",
      name: `${region.name} Elektrik Taahhüt ve Mühendislik Hizmetleri`,
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: region.name,
      },
    },
    breadcrumb: {
      "@id": `${BASE_SITE_URL}/bolgeler/${region.slug}#breadcrumb`,
    },
  };
}

export function generateRegionServiceSchema(regionService: {
  regionSlug: string;
  serviceSlug: string;
  h1: string;
  metaDesc?: string;
  regionName?: string;
  [key: string]: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_SITE_URL}/bolgeler/${regionService.regionSlug}/${regionService.serviceSlug}#service`,
    name: regionService.h1,
    description: regionService.metaDesc || "",
    url: `${BASE_SITE_URL}/bolgeler/${regionService.regionSlug}/${regionService.serviceSlug}`,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: regionService.regionName || regionService.regionSlug.toUpperCase(),
    },
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_SITE_URL}${item.url}`,
    })),
  };
}

export function generateTechnicalGuideArticleSchema(guide: TechnicalGuideData) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${BASE_SITE_URL}/bilgi-merkezi/${guide.slug}#article`,
    headline: guide.title,
    description: guide.summary,
    inLanguage: "tr-TR",
    datePublished: new Date(guide.publishedAt).toISOString(),
    dateModified: new Date(guide.publishedAt).toISOString(),
    author: {
      "@type": "Organization",
      name: guide.author || "Soykan Power Mühendislik Departmanı",
      url: BASE_SITE_URL,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    url: `${BASE_SITE_URL}/bilgi-merkezi/${guide.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_SITE_URL}/bilgi-merkezi/${guide.slug}`,
    },
    about: [
      { "@type": "Thing", name: guide.category },
      { "@type": "Organization", name: "Soykan Power" },
    ],
  };
}

export function generateArticleSchema(news: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: Date | string;
  coverImage?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.summary,
    image: news.coverImage ? `${BASE_SITE_URL}${news.coverImage}` : `${BASE_SITE_URL}/og-default.jpg`,
    datePublished: new Date(news.publishedAt).toISOString(),
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    url: `${BASE_SITE_URL}/haberler/${news.slug}`,
  };
}
