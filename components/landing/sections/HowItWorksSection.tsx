import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

const stepColors = [
  "var(--lp-brand)",
  "var(--lp-ink)",
  "var(--lp-brand)",
  "var(--lp-ink)",
];

export function HowItWorksSection({ content }: LandingSectionProps) {
  return (
    <section className="lp-section">
      <Container>
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
                Easy and Fast
              </p>
              <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
                {content.howItWorks.title}
              </h2>
              <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
                {content.howItWorks.intro}
              </p>
            </Reveal>
            <ol className="mt-8 space-y-5">
              {content.howItWorks.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 90} className="flex gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: stepColors[i % stepColors.length] }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--lp-ink)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--lp-muted)]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={150} className="relative mx-auto w-full min-w-0 max-w-md">
            <article className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_var(--lp-shadow)]">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={landingMedia.fishingBoat}
                  alt=""
                  fill
                  sizes="400px"
                  placeholder="blur"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-[var(--lp-ink)]">
                  Trip with FBA
                </h3>
                <p className="mt-1 text-sm text-[var(--lp-muted)]">
                  Guided sessions · day & night
                </p>
                <p className="mt-3 text-xs font-semibold text-[var(--lp-brand)]">
                  Grow your fishing network
                </p>
              </div>
            </article>
            <aside className="absolute -bottom-4 -right-2 w-48 rounded-2xl bg-white p-3 shadow-xl sm:-right-6 sm:w-52 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={landingMedia.coachSyafie}
                    alt=""
                    fill
                    sizes="40px"
                    placeholder="blur"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--lp-brand)]">
                    Ongoing
                  </p>
                  <p className="text-sm font-semibold text-[var(--lp-ink)]">Night session</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--lp-bg-alt)]">
                <div className="h-full w-2/5 rounded-full bg-[var(--lp-brand)]" />
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
