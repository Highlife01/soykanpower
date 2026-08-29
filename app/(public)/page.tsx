import React from "react";
import { prisma } from "@/lib/db";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ActivityAreasSection } from "@/components/sections/ActivityAreasSection";
import { ServicesGridSection } from "@/components/sections/ServicesGridSection";
import { WhySoykanSection } from "@/components/sections/WhySoykanSection";
import { SectorsSection } from "@/components/sections/SectorsSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { EngineeringApproachSection } from "@/components/sections/EngineeringApproachSection";
import { ProcessTimelineSection } from "@/components/sections/ProcessTimelineSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { QuoteCtaSection } from "@/components/sections/QuoteCtaSection";
import { LatestNewsSection } from "@/components/sections/LatestNewsSection";
import { generateOrganizationSchema } from "@/lib/seo";

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const [services, sectors, projects, references, certificates, news, siteSetting] =
    await Promise.all([
      prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        include: {
          category: {
            select: { title: true },
          },
        },
      }),
      prisma.sector.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
      prisma.project.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.reference.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
      prisma.certificate.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
      prisma.news.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
      prisma.siteSetting.findUnique({
        where: { id: "default" },
      }),
    ]);

  const organizationSchema = generateOrganizationSchema(siteSetting);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="flex flex-col">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Short Intro */}
        <IntroSection />

        {/* 3. Main Activity Areas */}
        <ActivityAreasSection />

        {/* 4. Services Grid */}
        <ServicesGridSection services={services} />

        {/* 5. Why Soykan Power? */}
        <WhySoykanSection />

        {/* 6. Sectoral Solutions */}
        <SectorsSection sectors={sectors} />

        {/* 7. Featured Projects */}
        <FeaturedProjectsSection projects={projects} />

        {/* 8. Engineering Approach */}
        <EngineeringApproachSection />

        {/* 9. Process Timeline (01 Keşif -> 07 Bakım) */}
        <ProcessTimelineSection />

        {/* 10. Technologies / Ecosystem */}
        <TechStackSection />

        {/* 11 & 12. References */}
        <ReferencesSection references={references} />

        {/* 13. Certificates */}
        <CertificatesSection certificates={certificates} />

        {/* 14. Quote CTA Banner */}
        <QuoteCtaSection />

        {/* 15. Latest News */}
        <LatestNewsSection news={news} />
      </div>
    </>
  );
}
