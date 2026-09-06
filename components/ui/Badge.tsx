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
    default: "bg-slate-800/90 text-slate-200 border-slate-700 font-semibold",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold",
    blue: "bg-blue-500/15 text-blue-300 border-blue-500/30 font-semibold",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-semibold",
    red: "bg-red-500/15 text-red-300 border-red-500/30 font-semibold",
    outline: "border-slate-700 text-slate-200 bg-transparent font-medium",
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
