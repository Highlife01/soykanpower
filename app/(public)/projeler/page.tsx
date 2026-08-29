import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { MapPin, Calendar, ArrowRight, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projelerimiz | Soykan Power Mühendislik",
  description:
    "Elektrik taahhüt, trafo merkezleri, fabrika otomasyonu ve güneş enerjisi alanlarında tamamlanan ve devam eden mühendislik projelerimiz.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { kategori } = await searchParams;

  const categories = [
    { label: "Tümü", key: "" },
    { label: "Elektrik Taahhüt", key: "ELEKTRIK" },
    { label: "Otomasyon & SCADA", key: "OTOMASYON" },
    { label: "Enerji & Pano", key: "ENERJI" },
    { label: "Güneş Enerjisi (GES)", key: "GES" },
    { label: "Kamu & Altyapı", key: "KAMU" },
    { label: "Endüstriyel Tesis", key: "ENDUSTRIYEL" },
  ];

  const whereClause: any = { published: true };
  if (kategori) {
    whereClause.categoryType = kategori;
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Referans Portföyü</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Mühendislik Projelerimiz
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
            Anahtar teslim elektrik taahhüt, endüstriyel otomasyon ve enerji sistemleri projelerimiz.
          </p>
        </div>
      </div>

      <Breadcrumb items={[{ label: "Projelerimiz" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
          {categories.map((cat) => {
            const isSelected = (!kategori && cat.key === "") || kategori === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.key ? `/projeler?kategori=${cat.key}` : "/projeler"}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        {/* Projects Grid or EmptyState */}
        {projects.length === 0 ? (
          <EmptyState
            title="Henüz bu kategoride proje kaydı eklenmemiştir."
            description="Devam eden ve tamamlanan projelerimiz yönetim sistemi üzerinden güncellendiğinde burada detaylarıyla listelenecektir."
            icon={<FolderGit2 className="w-6 h-6" />}
            className="bg-slate-900 border-slate-800 text-slate-400"
            action={
              <Link
                href="/teklif-al"
                className="inline-flex items-center px-4 py-2 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Yeni Projeniz İçin Teklif Alın
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video bg-slate-800 overflow-hidden flex items-center justify-center">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-xs text-slate-500 font-mono">
                      Soykan Power Proje Kaydı
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700">
                    {project.categoryType}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      <Link href={`/projeler/${project.slug}`}>{project.title}</Link>
                    </h3>

                    {project.scope && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {project.scope}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      {project.location && (
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          {project.year}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/projeler/${project.slug}`}
                      className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 pt-2 transition-colors"
                    >
                      <span>Proje Detayını İncele</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
