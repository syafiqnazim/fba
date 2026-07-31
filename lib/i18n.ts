export const locales = ["ms", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ms";

export type PageKey = "home" | "about" | "contact" | "blog";

/** Localized URL path segments (no leading/trailing slashes). */
export const pagePaths: Record<PageKey, Record<Locale, string>> = {
  home: { ms: "", en: "" },
  about: { ms: "tentang-kami", en: "about" },
  contact: { ms: "hubungi", en: "contact" },
  blog: { ms: "blog", en: "blog" },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPageKeyFromSlug(
  locale: Locale,
  slug: string,
): PageKey | null {
  const entry = (
    Object.entries(pagePaths) as [PageKey, Record<Locale, string>][]
  ).find(([, paths]) => paths[locale] === slug);
  return entry ? entry[0] : null;
}

export function localePath(
  locale: Locale,
  page: PageKey,
  ...rest: string[]
): string {
  const segment = pagePaths[page][locale];
  const parts = [locale, segment, ...rest].filter(Boolean);
  return `/${parts.join("/")}/`;
}

export function switchLocalePath(
  currentLocale: Locale,
  targetLocale: Locale,
  page: PageKey,
  ...rest: string[]
): string {
  return localePath(targetLocale, page, ...rest);
}
