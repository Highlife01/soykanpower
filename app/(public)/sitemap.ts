import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

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
    { url: `${baseUrl}/hizmetler`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/sektorler`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/projeler`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/teklif-al`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/haberler`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/kariyer`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/yasal/kvkk`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/yasal/gizlilik-politikasi`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/yasal/cerez-politikasi`, lastModified: new Date(), priority: 0.5 },
  ];

  // Dynamic services
  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/hizmetler/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic sectors
  const sectors = await prisma.sector.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const sectorRoutes: MetadataRoute.Sitemap = sectors.map((sec) => ({
    url: `${baseUrl}/sektorler/${sec.slug}`,
    lastModified: sec.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic projects
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

  // Dynamic news
  const news = await prisma.news.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${baseUrl}/haberler/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...sectorRoutes, ...projectRoutes, ...newsRoutes];
}
