import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate JSON-LD BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href
          ? {
              item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.soykanpower.com"}${item.href}`,
            }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-xs md:text-sm text-slate-500 flex-wrap">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-slate-400 hover:text-amber-500 transition-colors"
            >
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center">
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1.5 shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-amber-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-800 line-clamp-1">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
