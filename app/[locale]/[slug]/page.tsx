import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section, SectionHeader } from "@/components/ui/Section";
import {
  getPageKeyFromSlug,
  isLocale,
  locales,
  pagePaths,
  type Locale,
  type PageKey,
} from "@/lib/i18n";
import { heroSlides } from "@/lib/hero-slides";
import { getMessages } from "@/lib/messages";

const staticPages: PageKey[] = ["about", "contact"];

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const page of staticPages) {
      params.push({ locale, slug: pagePaths[page][locale] });
    }
  }
  return params;
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const pageKey = getPageKeyFromSlug(localeParam, slug);
  if (!pageKey || !staticPages.includes(pageKey)) return {};
  const messages = getMessages(localeParam);

  if (pageKey === "about") return { title: messages.about.title };
  return { title: messages.contact.title };
}

export default async function LocalizedStaticPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const pageKey = getPageKeyFromSlug(locale, slug);
  if (!pageKey || !staticPages.includes(pageKey)) notFound();

  const messages = getMessages(locale);
  const community = heroSlides[0];

  return (
    <PageShell locale={locale} messages={messages} currentPage={pageKey}>
      <main>
        {pageKey === "about" ? (
          <>
            <section className="relative mt-2 overflow-hidden px-4 sm:px-6">
              <Container className="!px-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[21/9]">
                  <Image
                    src={community.src}
                    alt={community.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/20 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <GlassPanel variant="dark" className="max-w-lg p-4 text-white sm:p-5">
                      <h1 className="font-display text-2xl sm:text-3xl">
                        {messages.about.title}
                      </h1>
                    </GlassPanel>
                  </div>
                </div>
              </Container>
            </section>
            <Section>
              <GlassPanel className="max-w-2xl p-6 sm:p-8">
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {messages.about.body}
                </p>
              </GlassPanel>
            </Section>
          </>
        ) : null}

        {pageKey === "contact" ? (
          <Section>
            <SectionHeader
              title={messages.contact.title}
              intro={messages.contact.intro}
            />
            <ContactForm messages={messages.contact} />
          </Section>
        ) : null}
      </main>
    </PageShell>
  );
}
