import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  contained?: boolean;
};

export function Section({
  children,
  className = "",
  id,
  contained = true,
}: SectionProps) {
  const body = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={`animate-section-fade-up py-16 sm:py-20 md:py-24 ${className}`}
    >
      {body}
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  intro?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  title,
  intro,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <header
      className={`mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-2xl space-y-3">
        <h2 className="font-display text-3xl tracking-tight text-brand-deep sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
      {action}
    </header>
  );
}
