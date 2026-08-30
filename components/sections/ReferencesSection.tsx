import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";

interface ReferenceItem {
  id: string;
  company: string;
  logoUrl?: string | null;
  industry?: string | null;
}

interface ReferencesSectionProps {
  references: ReferenceItem[];
}

export function ReferencesSection({ references }: ReferencesSectionProps) {
  return (
    <section id="referanslar" className="py-24 bg-slate-900 text-white relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurumsal Güven & Referanslar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            İş Ortaklarımız ve Referanslarımız
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Enerji altyapılarını kurduğumuz, proses otomasyonunu gerçekleştirdiğimiz ve değer kattığımız sanayi kuruluşları.
          </p>
        </div>

        {references.length === 0 ? (
          <EmptyState
            title="Henüz referans kaydı eklenmemiştir."
            description="Onaylı kurumsal referanslarımız ve tamamlanan projelerimize ait müşteri bilgileri sistem üzerinden güncellendiğinde burada listelenecektir."
            icon={<Building2 className="w-6 h-6" />}
            className="bg-slate-950/80 border-slate-800 text-slate-400 rounded-3xl"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex flex-col items-center justify-center text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-xl group"
              >
                {ref.logoUrl ? (
                  <img
                    src={ref.logoUrl}
                    alt={ref.company}
                    className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                    {ref.company}
                  </span>
                )}
                {ref.industry && (
                  <span className="text-[9px] text-amber-400/90 font-mono mt-1.5 uppercase font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {ref.industry}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
