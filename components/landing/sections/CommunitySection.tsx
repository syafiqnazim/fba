import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function CommunitySection({ content }: LandingSectionProps) {
  return (
    <section className="lp-section">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
              Community
            </p>
            <h2 className="font-display text-3xl text-[var(--lp-ink)] sm:text-4xl">
              {content.community.title}
            </h2>
            <p className="text-base text-[var(--lp-muted)] sm:text-lg">
              {content.community.intro}
            </p>
            <p className="text-sm leading-relaxed text-[var(--lp-muted)] sm:text-base">
              {content.community.body}
            </p>
            <blockquote className="font-display text-2xl text-[var(--lp-ink)] sm:text-3xl">
              <span className="relative inline-block">
                {content.community.pullQuote}
                <span
                  className="underline-draw absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[linear-gradient(90deg,rgba(0,173,239,0.5),rgba(0,173,239,0.08))]"
                  aria-hidden
                />
              </span>
            </blockquote>
          </Reveal>
          <Reveal
            delay={120}
            className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-[0_20px_60px_var(--lp-shadow)]"
          >
            <Image
              src={landingMedia.icm}
              alt="FBA community Inner Circle Meeting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
