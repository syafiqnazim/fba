"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import type { LandingSectionProps } from "./types";

const COUNT_DURATION_MS = 1600;

function CountUp({ target, start }: { target: number; start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = reduced
        ? 1
        : Math.min(1, (now - t0) / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return <>{value.toLocaleString()}</>;
}

export function StatsSection({ content }: LandingSectionProps) {
  const ref = useRef<HTMLDListElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="lp-section !py-10 sm:!py-14">
      <Container>
        <dl
          ref={ref}
          className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4"
        >
          {content.stats.items.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-4xl text-[var(--lp-brand)] sm:text-5xl">
                <CountUp target={stat.value} start={started} />
                {stat.suffix ?? ""}
              </dd>
              <dt className="mx-auto mt-2 max-w-[14rem] text-sm text-[var(--lp-muted)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
