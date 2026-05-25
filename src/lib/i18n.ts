import { z } from "astro/zod";
import { join } from "node:path";

export const languages = ["zh", "en"] as const;
export const languageKeySchema = z.enum(languages);
export type LanguageKey = (typeof languages)[number];

export const langLabel: Record<LanguageKey, string> = {
  zh: "中文",
  en: "English",
};

export function isLanguage(lang: any): lang is LanguageKey {
  return languages.includes(lang);
}

export function mustParseLanguage(lang: string): LanguageKey {
  if (isLanguage(lang)) {
    return lang;
  }
  throw new Error(`[I18n] Unsupported language code: ${lang}`);
}

// path must starts with "/"
export function buildLocaleUrl(lang: LanguageKey, path: string): string {
  return join("/", lang, path);
}

export const formatDate = (lang: LanguageKey, d: Date) => {
  const dateLocale = {
    en: "en-US",
    zh: "zh-CN",
  }[lang];
  return new Intl.DateTimeFormat(dateLocale, { dateStyle: "long" }).format(d);
};
