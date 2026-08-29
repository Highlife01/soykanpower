import React from "react";
import { FolderGit2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Henüz içerik eklenmemiştir.",
  description = "Bu alana ait kayıtlar kurumsal veritabanında güncellendiğinde burada listelenecektir.",
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 my-6",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
        {icon || <FolderGit2 className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-md mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
