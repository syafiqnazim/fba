import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingSectionProps } from "./types";

export function LearnSection({ content }: LandingSectionProps) {
  const accents = [
    "var(--lp-tint-1)",
    "var(--lp-tint-4)",
    "var(--lp-tint-3)",
    "var(--lp-tint-2)",
  ];

  return (
    <section className="lp-section">
      <Container>
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
            Category
          </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.learn.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.learn.intro}
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.learn.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 80}
              className="group rounded-3xl bg-white p-6 text-center shadow-[0_12px_40px_var(--lp-shadow)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_var(--lp-shadow)]"
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-[var(--lp-brand)]"
                style={{ background: accents[i % accents.length] }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display mt-5 text-xl text-[var(--lp-ink)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lp-muted)]">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
