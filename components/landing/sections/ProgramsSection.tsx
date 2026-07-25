import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { programMediaByTitle, programMediaFallback } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function ProgramsSection({ content }: LandingSectionProps) {
  return (
    <>
      <WaveDivider />
      <section className="lp-section lp-section-alt">
        <Container>
          <Reveal as="header" className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
              Programs
            </p>
            <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
              {content.programs.title}
            </h2>
            <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
              {content.programs.intro}
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-7 sm:grid-cols-2">
            {content.programs.items.map((item, i) => {
              const image =
                programMediaByTitle[item.title] ?? programMediaFallback;
              const isWideBanner = item.title === "FBA Premier Circle";
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 90}
                  className="group overflow-hidden rounded-3xl bg-white shadow-[0_16px_48px_var(--lp-shadow)] transition hover:-translate-y-1"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden ${isWideBanner ? "bg-[#0a3a42]" : ""}`}
                    >
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        placeholder="blur"
                        className={`transition-transform duration-500 ease-out group-hover:scale-105 ${
                          isWideBanner ? "object-contain" : "object-cover"
                        }`}
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-xl text-[var(--lp-ink)]">
                          {item.title}
                        </h3>
                        <span className="shrink-0 text-sm font-semibold text-[var(--lp-brand)]">
                          FBA
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--lp-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>
      <WaveDivider flip />
    </>
  );
}
