import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { localePath } from "@/lib/i18n";
import type { LandingSectionProps } from "./types";

export function CtaSection({ locale, content }: LandingSectionProps) {
  return (
    <section className="lp-section">
      <Container>
        <Reveal className="cta-gradient relative overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="cta-wave absolute inset-x-0 bottom-0 h-14 sm:h-20"
          >
            <div className="cta-wave-track">
              {[0, 1].map((copy) => (
                <svg
                  key={copy}
                  viewBox="0 0 1440 64"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 C240,16 480,64 720,40 C960,16 1200,64 1440,40 L1440,64 L0,64 Z"
                    fill="rgba(0, 173, 239, 0.28)"
                  />
                </svg>
              ))}
            </div>
          </div>
          <h2 className="font-display relative mx-auto max-w-2xl text-2xl text-white sm:text-3xl md:text-4xl">
            {content.cta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white/75 sm:text-lg">
            {content.cta.body}
          </p>
          <div className="relative mt-8">
            <Button href={localePath(locale, "contact")} variant="primary">
              {content.cta.button}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
