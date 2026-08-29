import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { REGIONS } from "@/data/regions";
import { REGION_SERVICES } from "@/data/regionServices";
import { TECHNICAL_GUIDES } from "@/data/technicalGuides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/kurumsal/hakkimizda`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kurumsal/misyon-vizyon`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kurumsal/degerlerimiz`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/kurumsal/kalite-politikasi`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/kurumsal/isg-politikasi`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/kurumsal/cevre-politikasi`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/kurumsal/belgeler-ve-sertifikalar`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kurumsal/insan-kaynaklari`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/sektorler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/bolgeler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/bilgi-merkezi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projeler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/teklif-al`, lastModified: new Date(), priority: 0.95 },
    { url: `${baseUrl}/haberler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/kariyer`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), priority: 0.85 },
    { url: `${baseUrl}/yasal/kvkk`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/yasal/gizlilik-politikasi`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/yasal/cerez-politikasi`, lastModified: new Date(), priority: 0.5 },
  ];

  // Dynamic services from DB
  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/hizmetler/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic sectors from DB
  const sectors = await prisma.sector.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((sec) => ({
    url: `${baseUrl}/sektorler/${sec.slug}`,
    lastModified: sec.updatedAt,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Regional landing pages
  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((r) => ({
    url: `${baseUrl}/bolgeler/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.isHeadquarters ? 0.95 : 0.85,
  }));

  // Regional + Service combination pages
  const regionServiceRoutes: MetadataRoute.Sitemap = REGION_SERVICES.map((rs) => ({
    url: `${baseUrl}/bolgeler/${rs.regionSlug}/${rs.serviceSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Technical Knowledge Hub guides
  const guideRoutes: MetadataRoute.Sitemap = TECHNICAL_GUIDES.map((g) => ({
    url: `${baseUrl}/bilgi-merkezi/${g.slug}`,
    lastModified: new Date(g.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic projects from DB
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projeler/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic news from DB
  const news = await prisma.news.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/haberler/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...sectorRoutes,
    ...regionRoutes,
    ...regionServiceRoutes,
    ...guideRoutes,
    ...projectRoutes,
    ...newsRoutes,
  ];
}
