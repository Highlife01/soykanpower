export function generateOrganizationSchema(siteSetting?: {
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
} | null) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com";

  return {
    "@context": "https://schema.org",
    "@type": "EngineeringCompany",
    "@id": `${baseUrl}/#organization`,
    name: siteSetting?.companyName || "Soykan Power",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Elektrik Taahhüt, Endüstriyel Otomasyon, Enerji Sistemleri ve Güneş Enerjisi alanlarında anahtar teslim mühendislik çözümleri.",
    ...(siteSetting?.phone ? { telephone: siteSetting.phone } : {}),
    ...(siteSetting?.email ? { email: siteSetting.email } : {}),
    ...(siteSetting?.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteSetting.address,
            addressCountry: "TR",
          },
        }
      : {}),
    sameAs: [
      "https://www.linkedin.com/company/soykanpower",
      "https://www.instagram.com/soykanpower",
    ],
  };
}

export function generateServiceSchema(service: {
  title: string;
  shortDesc: string;
  slug: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "Soykan Power",
      url: baseUrl,
    },
    description: service.shortDesc,
    url: `${baseUrl}/hizmetler/${service.slug}`,
  };
}

export function generateArticleSchema(news: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: Date | string;
  coverImage?: string | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com";

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.summary,
    image: news.coverImage ? `${baseUrl}${news.coverImage}` : `${baseUrl}/og-default.jpg`,
    datePublished: new Date(news.publishedAt).toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Soykan Power",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    url: `${baseUrl}/haberler/${news.slug}`,
  };
}
