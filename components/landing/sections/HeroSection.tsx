"use client";

import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Slide } from "@/components/ui/Slide";
import { Slider } from "@/components/ui/Slider";
import { heroSlides } from "@/lib/hero-slides";
import { landingMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function HeroSection({ locale, content, theme }: LandingSectionProps) {
  if (theme.heroStyle === "split") {
    const headlineLines = content.headline
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean);

    return (
      <section className="relative overflow-hidden pb-12 pt-8 sm:pb-16">
        <Container className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="order-2 max-w-xl lg:order-1">
            <span className="animate-hero-fade-up inline-flex overflow-hidden rounded-xl bg-white">
              <Image
                src={logo}
                alt={content.siteName}
                width={160}
                height={64}
                className="h-10 w-auto sm:h-12"
              />
            </span>
            <p
              className="animate-hero-fade-up mt-5 font-display text-2xl tracking-tight text-[var(--lp-ink)] sm:text-3xl"
              style={{ animationDelay: "0.08s" }}
            >
              {content.siteName}
            </p>
            <p
              className="animate-hero-fade-up mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--lp-brand)]"
              style={{ animationDelay: "0.16s" }}
            >
              {content.socialProof.title}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-[1.15] text-[var(--lp-ink)] sm:text-5xl lg:text-[3.25rem]">
              {headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <span
                    className="animate-hero-line block"
                    style={{ animationDelay: `${0.25 + i * 0.12}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p
              className="animate-hero-fade-up mt-4 max-w-md text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg"
              style={{ animationDelay: "0.45s" }}
            >
              {content.tagline}
            </p>
            <div
              className="animate-hero-fade-up mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.55s" }}
            >
              <Button href={content.ctaPrimaryHref} variant="primary">
                {content.ctaPrimary}
              </Button>
              <Button href={content.ctaSecondaryHref} variant="secondary">
                {content.ctaSecondary}
              </Button>
            </div>
          </div>

          <div className="animate-hero-fade-up relative order-1 mx-auto w-full max-w-md isolate lg:order-2 lg:max-w-none">
            <div
              aria-hidden
              className="animate-glow-drift absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--lp-glow),transparent_65%)] blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_24px_80px_var(--lp-shadow)] sm:aspect-[5/6]">
              <Image
                src={landingMedia.heroFeature}
                alt={content.coaches.items[0]?.name ?? "FBA coach"}
                fill
                preload
                sizes="(max-width: 1024px) 90vw, 45vw"
                placeholder="blur"
                className="animate-ken-burns object-cover object-top"
              />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Fallback for other hero styles (unused on current site theme)
  const multi = heroSlides.length > 1;
  return (
    <section className="relative min-h-[80svh] overflow-hidden">
      <Slider
        autoPlayMs={multi ? 6000 : undefined}
        showDots={multi}
        label="Hero"
        pauseLabel={locale === "ms" ? "Jeda slaid automatik" : "Pause autoplay"}
        resumeLabel={locale === "ms" ? "Sambung slaid automatik" : "Resume autoplay"}
        className="h-full"
        trackClassName="h-[80svh] gap-0"
      >
        {heroSlides.map((slide, i) => (
          <Slide key={slide.alt} width="full" className="relative h-[80svh]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </Slide>
        ))}
      </Slider>
    </section>
  );
}
