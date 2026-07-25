import Link from "next/link";
import type { Locale, PageKey } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  currentPage: PageKey;
};

export function LanguageSwitcher({
  locale,
  currentPage,
}: LanguageSwitcherProps) {
  const otherLocale = locale === "ms" ? "en" : "ms";

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <Link
        href={localePath(otherLocale, currentPage)}
        className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-brand px-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand/30 transition hover:bg-brand/90"
        hrefLang={otherLocale}
        lang={otherLocale}
        aria-label={`Switch to ${otherLocale === "ms" ? "Bahasa Malaysia" : "English"}`}
      >
        {otherLocale}
      </Link>
    </div>
  );
}
