import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function OwnerSpotlightSection({ content }: LandingSectionProps) {
  const { owner } = content;

  return (
    <section className="lp-section">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_24px_64px_var(--lp-shadow)] lg:mx-0 lg:max-w-none">
            <Image
              src={landingMedia.coachSyafie}
              alt={`${owner.name}, ${owner.role}`}
              fill
              sizes="(max-width: 1024px) 90vw, 42vw"
              placeholder="blur"
              className="object-cover object-[center_20%]"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--lp-ink)]/55 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.22em] text-white">
              {owner.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
              {owner.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-5xl">
              {owner.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--lp-muted)]">
              {owner.role}
            </p>
            <p className="mt-5 text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg">
              {owner.intro}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--lp-muted)] sm:text-base">
              {owner.body}
            </p>
            <blockquote className="font-display mt-8 text-2xl text-[var(--lp-ink)] sm:text-3xl">
              <span className="relative inline-block">
                {owner.pullQuote}
                <span
                  className="underline-draw absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[linear-gradient(90deg,rgba(0,173,239,0.5),rgba(0,173,239,0.08))]"
                  aria-hidden
                />
              </span>
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
