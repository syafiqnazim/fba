import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n";
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
    title: messages.blog.title,
    description: messages.blog.intro,
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const messages = getMessages(locale);
  const posts = getAllPosts(locale);

  return (
    <PageShell locale={locale} messages={messages} currentPage="blog">
      <main>
        <Section>
          <SectionHeader
            title={messages.blog.title}
            intro={messages.blog.intro}
          />

          {posts.length === 0 ? (
            <GlassPanel className="p-6 text-muted">{messages.blog.empty}</GlassPanel>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={localePath(locale, "blog", post.slug)}
                    className="hover-lift block"
                  >
                    <GlassPanel className="p-5 sm:p-6">
                      <p className="text-sm text-muted">{post.publishedAt}</p>
                      <h2 className="font-display mt-1 text-2xl text-brand-deep">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-muted">{post.description}</p>
                      <span className="mt-3 inline-block text-sm font-semibold text-accent">
                        {messages.blog.readMore}
                      </span>
                    </GlassPanel>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>
    </PageShell>
  );
}
