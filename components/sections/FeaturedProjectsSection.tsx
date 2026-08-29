import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  client?: string | null;
  location?: string | null;
  year?: number | null;
  categoryType: string;
  scope?: string | null;
  coverImage?: string | null;
}

interface FeaturedProjectsSectionProps {
  projects: ProjectItem[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <section className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              <span>Proje Portföyü</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Öne Çıkan Mühendislik Projelerimiz
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Gerçekleştirdiğimiz elektrik taahhüt, otomasyon ve enerji projelerimiz.
            </p>
          </div>

          <Link
            href="/projeler"
            className="inline-flex items-center space-x-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
          >
            <span>Tüm Projeleri Görüntüle</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="Henüz proje kaydı eklenmemiştir."
            description="Tamamlanan ve devam eden endüstriyel mühendislik projelerimiz sistem üzerinden güncellendiğinde burada yayınlanacaktır."
            className="bg-slate-900/60 border-slate-800 text-slate-400"
            action={
              <Link
                href="/teklif-al"
                className="inline-flex items-center px-4 py-2 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Yeni Proje İçin Teklif Alın
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
                      <span>Proje Detayı</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
