"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import coachAriff from "@/app/assets/coach-ariff.png";
import coachMahfudz from "@/app/assets/coach-mahfudz.png";
import coachSyafie from "@/app/assets/coach-syafie.png";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { Slide } from "@/components/ui/Slide";
import { Slider } from "@/components/ui/Slider";
import type { LandingSectionProps } from "./types";

const coachImages: Record<string, StaticImageData> = {
  "Syafi'e Abdul Shukor": coachSyafie,
  "Coach Mahfudz": coachMahfudz,
  "Coach Ariff": coachAriff,
};

function coachImage(name: string) {
  return coachImages[name] ?? coachSyafie;
}

export function CoachesSection({ content, theme }: LandingSectionProps) {
  const circular = theme.coachesStyle === "circle";

  return (
    <section className="lp-section lp-section-alt">
      <Container>
        <Reveal as="header" className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
            Coaches
          </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.coaches.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.coaches.intro}
          </p>
        </Reveal>

        {circular ? (
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {content.coaches.items.map((coach, index) => (
              <Reveal
                as="li"
                key={coach.name}
                delay={index * 100}
                className="flex flex-col items-center text-center"
              >
                <div className="gradient-ring rounded-full p-1 shadow-[0_16px_40px_var(--lp-shadow)]">
                  <div className="relative h-44 w-44 overflow-hidden rounded-full sm:h-52 sm:w-52">
                    <Image
                      src={coachImage(coach.name)}
                      alt={`${coach.name}, ${coach.role}`}
                      fill
                      sizes="208px"
                      placeholder="blur"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--lp-brand)]">
                  {coach.role}
                </p>
                <h3 className="font-display mt-1 text-2xl text-[var(--lp-ink)]">
                  {coach.name}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-[var(--lp-muted)]">
                  {coach.bio}
                </p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Slider showDots showArrows label={content.coaches.title}>
            {content.coaches.items.map((coach) => (
              <Slide key={coach.name} width="card">
                <MediaFrame
                  src={coachImage(coach.name)}
                  alt={coach.name}
                  aspect="portrait"
                />
              </Slide>
            ))}
          </Slider>
        )}
      </Container>
    </section>
  );
}
