import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2 } from "lucide-react";

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
    <section id="referanslar" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <span>Kurumsal Güven</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Referanslarımız
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Enerji ve otomasyon mühendisliği çözümlerimizle değer kattığımız iş ortaklarımız.
          </p>
        </div>

        {references.length === 0 ? (
          <EmptyState
            title="Henüz referans kaydı eklenmemiştir."
            description="Onaylı kurumsal referanslarımız ve tamamlanan projelerimize ait müşteri bilgileri sistem üzerinden güncellendiğinde burada listelenecektir."
            icon={<Building2 className="w-6 h-6" />}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center hover:border-amber-500/40 transition-colors"
              >
                {ref.logoUrl ? (
                  <img
                    src={ref.logoUrl}
                    alt={ref.company}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-sm font-bold text-slate-800">
                    {ref.company}
                  </span>
                )}
                {ref.industry && (
                  <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
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
