import { PrismaClient } from "@prisma/client";
import { blogPostsData } from "../data/blogPosts";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding 10 multilingual blog posts into database...");

  for (const post of blogPostsData) {
    const upserted = await prisma.news.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        summary: post.summary,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        published: true,
        publishedAt: post.publishedAt,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,

        // Multilingual
        titleEn: post.titleEn,
        titleAr: post.titleAr,
        titleRu: post.titleRu,
        summaryEn: post.summaryEn,
        summaryAr: post.summaryAr,
        summaryRu: post.summaryRu,
        contentEn: post.contentEn,
        contentAr: post.contentAr,
        contentRu: post.contentRu,
        metaTitleEn: post.metaTitleEn,
        metaTitleAr: post.metaTitleAr,
        metaTitleRu: post.metaTitleRu,
        metaDescEn: post.metaDescEn,
        metaDescAr: post.metaDescAr,
        metaDescRu: post.metaDescRu,
      },
      create: {
        slug: post.slug,
        title: post.title,
        summary: post.summary,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        published: true,
        publishedAt: post.publishedAt,
        metaTitle: post.metaTitle,
        metaDesc: post.metaDesc,

        // Multilingual
        titleEn: post.titleEn,
        titleAr: post.titleAr,
        titleRu: post.titleRu,
        summaryEn: post.summaryEn,
        summaryAr: post.summaryAr,
        summaryRu: post.summaryRu,
        contentEn: post.contentEn,
        contentAr: post.contentAr,
        contentRu: post.contentRu,
        metaTitleEn: post.metaTitleEn,
        metaTitleAr: post.metaTitleAr,
        metaTitleRu: post.metaTitleRu,
        metaDescEn: post.metaDescEn,
        metaDescAr: post.metaDescAr,
        metaDescRu: post.metaDescRu,
      },
    });
    console.log(`✓ Blog post upserted: ${upserted.title.slice(0, 45)}...`);
  }

  console.log("All 10 multilingual blog posts successfully seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
