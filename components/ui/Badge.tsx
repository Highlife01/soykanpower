import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "amber" | "blue" | "green" | "red" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20 font-medium",
    blue: "bg-blue-500/10 text-blue-600 border-blue-500/20 font-medium",
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-medium",
    red: "bg-red-500/10 text-red-600 border-red-500/20 font-medium",
    outline: "border-slate-300 text-slate-700 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
