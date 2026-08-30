"use client";

import React, { useState } from "react";
import { Globe, BookOpen, Clock, Calendar, Check } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface MultilingualNewsItem {
  id: string;
  slug: string;
  category: string;
  coverImage: string | null;
  publishedAt: Date | string;

  // TR
  title: string;
  summary: string;
  content: string;

  // EN
  titleEn?: string | null;
  summaryEn?: string | null;
  contentEn?: string | null;

  // AR
  titleAr?: string | null;
  summaryAr?: string | null;
  contentAr?: string | null;

  // RU
  titleRu?: string | null;
  summaryRu?: string | null;
  contentRu?: string | null;
}

interface NewsLanguageViewProps {
  item: MultilingualNewsItem;
}

type LangCode = "tr" | "en" | "ar" | "ru";

const LANGUAGES: { code: LangCode; label: string; flag: string; nativeName: string; dir: "ltr" | "rtl" }[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷", nativeName: "Türkçe", dir: "ltr" },
  { code: "en", label: "English", flag: "🇬🇧", nativeName: "English", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇸🇦", nativeName: "العربية", dir: "rtl" },
  { code: "ru", label: "Русский", flag: "🇷🇺", nativeName: "Русский", dir: "ltr" },
];

export function NewsLanguageView({ item }: NewsLanguageViewProps) {
  const [lang, setLang] = useState<LangCode>("tr");

  const currentLangConfig = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const isRtl = currentLangConfig.dir === "rtl";

  const getTitle = () => {
    if (lang === "en" && item.titleEn) return item.titleEn;
    if (lang === "ar" && item.titleAr) return item.titleAr;
    if (lang === "ru" && item.titleRu) return item.titleRu;
    return item.title;
  };

  const getSummary = () => {
    if (lang === "en" && item.summaryEn) return item.summaryEn;
    if (lang === "ar" && item.summaryAr) return item.summaryAr;
    if (lang === "ru" && item.summaryRu) return item.summaryRu;
    return item.summary;
  };

  const getContent = () => {
    if (lang === "en" && item.contentEn) return item.contentEn;
    if (lang === "ar" && item.contentAr) return item.contentAr;
    if (lang === "ru" && item.contentRu) return item.contentRu;
    return item.content;
  };

  const title = getTitle();
  const summary = getSummary();
  const content = getContent();

  return (
    <div className="space-y-8" dir={isRtl ? "rtl" : "ltr"}>
      {/* Language Switcher Bar */}
      <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Dil Seçimi / Language / اللغة / Язык:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {LANGUAGES.map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.nativeName}</span>
                {isActive && <Check className="w-3.5 h-3.5 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/20">
            {item.category}
          </span>
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
            {formatDate(item.publishedAt)}
          </span>
          <span className="flex items-center text-slate-500">
            <Clock className="w-3.5 h-3.5 mr-1" />
            5 dk okuma / 5 min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>
      </div>

      {/* Cover Image */}
      {item.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-slate-800 aspect-video bg-slate-900 shadow-2xl">
          <img
            src={item.coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Summary Lead */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border-l-4 border-amber-500 text-slate-200 text-base sm:text-lg font-medium leading-relaxed shadow-lg">
        {summary}
      </div>

      {/* Body Content */}
      <div
        className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-amber-400 prose-strong:text-white prose-ul:list-disc prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
