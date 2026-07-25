import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageShell } from "@/components/PageShell";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const post = getPostBySlug(localeParam, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const messages = getMessages(locale);

  return (
    <PageShell locale={locale} messages={messages} currentPage="blog">
      <main className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <GlassPanel className="p-6 sm:p-8">
            <header className="mb-8 space-y-3 border-b border-line/60 pb-8">
              <p className="text-sm text-muted">{post.publishedAt}</p>
              <h1 className="font-display text-3xl text-brand-deep sm:text-4xl">
                {post.title}
              </h1>
              <p className="text-base text-muted sm:text-lg">{post.description}</p>
            </header>
            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-accent">
              <MDXRemote source={post.content} />
            </article>
          </GlassPanel>
        </Container>
      </main>
    </PageShell>
  );
}
