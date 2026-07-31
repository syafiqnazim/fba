"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import type { LandingSectionProps } from "./types";

export function SocialProofSection({
  locale,
  content,
  theme,
}: LandingSectionProps) {
  const [paused, setPaused] = useState(false);

  if (theme.proofStyle === "marquee") {
    const pauseLabel =
      locale === "ms" ? "Jeda animasi" : "Pause animation";
    const resumeLabel =
      locale === "ms" ? "Sambung animasi" : "Resume animation";

    return (
      <section className="border-y lp-divider bg-[var(--lp-bg-alt)] py-5">
        <div className="flex items-center gap-3">
          <div className="lp-marquee min-w-0 flex-1 overflow-hidden">
            <div
              className={`lp-marquee-track ${paused ? "is-paused" : ""}`}
              aria-live="off"
            >
              {[false, true].map((duplicate) => (
                <div
                  key={duplicate ? "duplicate" : "primary"}
                  className="flex shrink-0 gap-10 pr-10"
                  aria-hidden={duplicate || undefined}
                >
                  {content.socialProof.items.map((item) => (
                    <span
                      key={item}
                      className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-[var(--lp-ink)]"
                    >
                      {item}
                      <span
                        className="ml-10 text-[var(--lp-brand)]"
                        aria-hidden
                      >
                        ✦
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label={paused ? resumeLabel : pauseLabel}
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
            className="mr-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border lp-divider bg-white text-xs font-bold text-[var(--lp-ink)] transition hover:bg-[var(--lp-accent-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lp-brand)]"
          >
            <span aria-hidden>{paused ? "▶" : "Ⅱ"}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="lp-section lp-section-alt">
      <Container>
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {content.socialProof.items.map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
