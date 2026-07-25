import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingComposer } from "@/components/landing/LandingComposer";
import { ThemeFrame } from "@/components/landing/ThemeFrame";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPosts } from "@/lib/blog";
import { getLandingContent } from "@/lib/landing/content";
import { siteTheme } from "@/lib/landing/themes";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const messages = getMessages(localeParam);
  return {
    title: messages.site.name,
    description: messages.site.description,
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const messages = getMessages(locale);
  const content = getLandingContent(locale);
  const posts = getAllPosts(locale);

  return (
    <>
      <ThemeFrame
        theme={siteTheme}
        content={content}
        header={
          <SiteHeader
            locale={locale}
            messages={messages}
            currentPage="home"
            variant="solid"
          />
        }
      >
        <main>
          <LandingComposer
            locale={locale}
            content={content}
            theme={siteTheme}
            posts={posts}
          />
        </main>
      </ThemeFrame>
      <LanguageSwitcher locale={locale} currentPage="home" />
    </>
  );
}
