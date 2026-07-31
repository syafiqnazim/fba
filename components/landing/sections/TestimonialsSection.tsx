"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { Slider } from "@/components/ui/Slider";
import { testimonialMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function TestimonialsSection({ locale, content }: LandingSectionProps) {
  return (
    <section className="lp-section">
      <Container>
        <Reveal as="header" className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
            Testimonials
          </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.testimonials.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.testimonials.intro}
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto w-full max-w-lg">
          <Slider
            autoPlayMs={5500}
            showDots
            showArrows
            label={content.testimonials.title}
            pauseLabel={locale === "ms" ? "Jeda slaid automatik" : "Pause autoplay"}
            resumeLabel={locale === "ms" ? "Sambung slaid automatik" : "Resume autoplay"}
            trackClassName="items-stretch"
          >
            {content.testimonials.items.map((item, i) => (
              <Slide key={`${item.name}-${i}`} width="full">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_20px_60px_var(--lp-shadow)]">
                  <Image
                    src={testimonialMedia[i] ?? testimonialMedia[0]}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </Slide>
            ))}
          </Slider>
        </Reveal>
      </Container>
    </section>
  );
}
