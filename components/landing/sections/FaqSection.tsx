import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingSectionProps } from "./types";

export function FaqSection({ content }: LandingSectionProps) {
  return (
    <section className="lp-section">
      <Container>
        <Reveal as="header" className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
            FAQ
          </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.faq.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.faq.intro}
          </p>
        </Reveal>
        <ul className="mx-auto max-w-3xl space-y-4">
          {content.faq.items.map((item, i) => (
            <Reveal as="li" key={item.q} delay={i * 70}>
              <details
                className="faq-item rounded-3xl bg-white shadow-[0_10px_36px_var(--lp-shadow)]"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 sm:p-6">
                  <h3 className="font-display text-lg text-[var(--lp-ink)] sm:text-xl">
                    {item.q}
                  </h3>
                  <span
                    className="faq-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--lp-accent-soft)] text-[var(--lp-brand)]"
                    aria-hidden
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6l5 5 5-5" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--lp-muted)] sm:px-6 sm:pb-6">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
