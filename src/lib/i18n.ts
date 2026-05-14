import { join } from "node:path";

export const languages = ["zh", "en"] as const;
export type LanguageKey = (typeof languages)[number];

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

/**
 * 解析带语言前缀的 URL
 * 例如: parseLocaleUrl('/zh/user/settings') => { lang: 'zh', path: '/user/settings' }
 */
export function mustParseLocaleUrl(url: string): {
  lang: LanguageKey;
  path: string;
} {
  // 1. 移除开头的斜杠并分割路径
  const segments = url.split("/").filter(Boolean); // filter(Boolean) 过滤空字符串

  const langCandidate = segments[0];

  // 2. 校验第一个段落是否是支持的语言
  if (isLanguage(langCandidate)) {
    const path = "/" + segments.slice(1).join("/");
    return {
      lang: langCandidate,
      path: path === "//" ? "/" : path, // 处理边界情况
    };
  }

  // 3. 如果 URL 不符合 /zh/... 格式，根据业务逻辑抛错或返回默认值
  throw new Error(`[I18n] Could not parse locale from URL: ${url}`);
}

export function changeUrlLocale(url: string, lang: LanguageKey) {
  const parsed = mustParseLocaleUrl(url);
  return buildLocaleUrl(lang, parsed.path);
}

export function fallbackLanguage(supportedLangs: LanguageKey[]) {
  // 按照 languages 的定义顺序 fallback，前面的优先级高
}
