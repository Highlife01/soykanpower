import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { MapPin, Calendar, Building2, Zap, CheckCircle2, ArrowRight, Download, ShieldCheck } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) return { title: "Proje Bulunamadı" };

  return {
    title: project.metaTitle || `${project.title} | Soykan Power Projeleri`,
    description: project.metaDesc || project.scope || "Soykan Power mühendislik projesi.",
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!project || !project.published) {
    notFound();
  }

  let parsedWorkDone: string[] = [];
  if (project.workDone) {
    try {
      parsedWorkDone = JSON.parse(project.workDone);
    } catch {
      parsedWorkDone = [];
    }
  }

  let parsedTechnologies: string[] = [];
  if (project.technologies) {
    try {
      parsedTechnologies = JSON.parse(project.technologies);
    } catch {
      parsedTechnologies = [];
    }
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-24 pb-20">
      <div className="border-b border-slate-800 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{project.categoryType} PROJESİ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {project.title}
          </h1>
          {project.scope && (
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-3xl">
              {project.scope}
            </p>
          )}
        </div>
      </div>

      <Breadcrumb
        items={[
          { label: "Projelerimiz", href: "/projeler" },
          { label: project.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Cover Image */}
            {project.coverImage && (
              <div className="rounded-3xl overflow-hidden border border-slate-800 aspect-video bg-slate-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Scope / Description */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">
                Proje Kapsamı ve Detayları
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {project.scope || "Bu projeye ait teknik detaylar ve kapsam mühendislik standartlarına tam uyumlu olarak gerçekleştirilmiştir."}
              </p>
            </div>

            {/* Work Done Checklist */}
            {parsedWorkDone.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Gerçekleştirilen İmalat & Montaj</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {parsedWorkDone.map((work, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200">{work}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {parsedTechnologies.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Kullanılan Donanım & Teknolojiler</h3>
                <div className="flex flex-wrap gap-2">
                  {parsedTechnologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {project.images.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Proje Fotoğraf Galerisi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img) => (
                    <div
                      key={img.id}
                      className="rounded-2xl overflow-hidden border border-slate-800 aspect-video bg-slate-950 group"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.caption || project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info Card */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3">
                Proje Bilgi Kartı
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {project.client && (
                  <div>
                    <span className="text-slate-500 block text-xs">İşveren / Müşteri</span>
                    <span className="font-semibold text-white mt-0.5 block">{project.client}</span>
                  </div>
                )}

                {project.location && (
                  <div>
                    <span className="text-slate-500 block text-xs">Lokasyon</span>
                    <span className="font-semibold text-white mt-0.5 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      {project.location}
                    </span>
                  </div>
                )}

                {project.year && (
                  <div>
                    <span className="text-slate-500 block text-xs">Yıl</span>
                    <span className="font-semibold text-white mt-0.5 flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      {project.year}
                    </span>
                  </div>
                )}

                {project.capacity && (
                  <div>
                    <span className="text-slate-500 block text-xs">Kapasite / Kurulu Güç</span>
                    <span className="font-semibold text-amber-400 mt-0.5 block">{project.capacity}</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-500 block text-xs">Durum</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1">
                    {project.status === "COMPLETED" ? "Tamamlandı" : "Devam Ediyor"}
                  </span>
                </div>
              </div>

              {project.documentUrl && (
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Teknik Doküman (PDF)</span>
                </a>
              )}

              <Link
                href="/teklif-al"
                className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Benzer Proje İçin Teklif Alın</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
