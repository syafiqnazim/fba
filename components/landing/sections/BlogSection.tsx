"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { Slider } from "@/components/ui/Slider";
import { localePath } from "@/lib/i18n";
import type { LandingSectionProps } from "./types";

export function BlogSection({ locale, content, posts = [] }: LandingSectionProps) {
  const preview = posts.slice(0, 6);

  return (
    <section className="lp-section lp-section-alt">
      <Container>
        <Reveal
          as="header"
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
              Blog
            </p>
            <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
              {content.blog.title}
            </h2>
            <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
              {content.blog.intro}
            </p>
          </div>
          <Link
            href={localePath(locale, "blog")}
            className="text-sm font-semibold text-[var(--lp-brand)] hover:opacity-80"
          >
            {content.blog.viewAll}
          </Link>
        </Reveal>

        {preview.length === 0 ? (
          <p className="rounded-3xl bg-white p-5 text-sm text-[var(--lp-muted)]">
            {content.blog.empty}
          </p>
        ) : (
          <Reveal delay={100}>
          <Slider showDots showArrows label={content.blog.title}>
            {preview.map((post) => (
              <Slide key={post.slug} width="peek">
                <Link
                  href={localePath(locale, "blog", post.slug)}
                  className="block h-full transition hover:-translate-y-1"
                >
                  <article className="flex h-full min-h-[11rem] flex-col justify-between rounded-3xl bg-white p-5 shadow-[0_12px_40px_var(--lp-shadow)] sm:p-6">
                    <div className="space-y-2">
                      <p className="text-xs text-[var(--lp-muted)]">{post.publishedAt}</p>
                      <h3 className="font-display text-xl text-[var(--lp-ink)] sm:text-2xl">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 text-sm text-[var(--lp-muted)]">
                        {post.description}
                      </p>
                    </div>
                    <span className="mt-4 text-sm font-semibold text-[var(--lp-brand)]">
                      {content.blog.readMore}
                    </span>
                  </article>
                </Link>
              </Slide>
            ))}
          </Slider>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
