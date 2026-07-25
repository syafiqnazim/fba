import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { landingMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

const stars: { top: string; left: string; size: number; delay: number }[] = [
  { top: "14%", left: "12%", size: 3, delay: 0 },
  { top: "8%", left: "38%", size: 2, delay: 0.8 },
  { top: "22%", left: "58%", size: 3, delay: 1.6 },
  { top: "10%", left: "78%", size: 2, delay: 0.4 },
  { top: "30%", left: "88%", size: 2, delay: 2.1 },
  { top: "34%", left: "28%", size: 2, delay: 1.2 },
];

export function DayNightSection({ content }: LandingSectionProps) {
  return (
    <>
    <WaveDivider />
    <section className="lp-section lp-section-alt">
      <Container>
        <Reveal as="header" className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
              Sessions
            </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.dayNight.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.dayNight.intro}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal
            as="article"
            className="group overflow-hidden rounded-3xl bg-white shadow-[0_16px_48px_var(--lp-shadow)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={landingMedia.oceanDawn}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-2xl text-[var(--lp-ink)]">
                {content.dayNight.day.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lp-muted)]">
                {content.dayNight.day.body}
              </p>
            </div>
          </Reveal>
          <Reveal
            as="article"
            delay={120}
            className="night-gradient group overflow-hidden rounded-3xl shadow-[0_16px_48px_var(--lp-shadow)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={landingMedia.nightSea}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0">
                {stars.map((star, i) => (
                  <span
                    key={i}
                    className="star"
                    style={{
                      top: star.top,
                      left: star.left,
                      width: star.size,
                      height: star.size,
                      animationDelay: `${star.delay}s`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-2xl text-white">
                {content.dayNight.night.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {content.dayNight.night.body}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
    <WaveDivider flip />
    </>
  );
}
