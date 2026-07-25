import { Container } from "@/components/ui/Container";
import type { LandingSectionProps } from "./types";

export function SocialProofSection({ content, theme }: LandingSectionProps) {
  const items = [...content.socialProof.items, ...content.socialProof.items];

  if (theme.proofStyle === "marquee") {
    return (
      <section className="overflow-hidden border-y lp-divider bg-[var(--lp-bg-alt)] py-5">
        <div className="overflow-hidden">
          <div className="lp-marquee-track gap-10 px-4">
            {items.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.18em] text-[var(--lp-ink)]"
              >
                {item}
                <span className="ml-10 text-[var(--lp-brand)]">✦</span>
              </span>
            ))}
          </div>
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
