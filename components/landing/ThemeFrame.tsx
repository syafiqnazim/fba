import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import logo from "@/app/assets/logo.png";
import { Container } from "@/components/ui/Container";
import type { LandingContent } from "@/lib/landing/content";
import { themeCssVars, type ThemeDefinition } from "@/lib/landing/themes";

type ThemeFrameProps = {
  theme: ThemeDefinition;
  content: LandingContent;
  children: ReactNode;
  header?: ReactNode;
};

export function ThemeFrame({
  theme,
  content,
  children,
  header,
}: ThemeFrameProps) {
  const style = themeCssVars(theme.tokens) as CSSProperties;
  const year = new Date().getFullYear();

  return (
    <div className="lp-theme relative" data-theme={theme.id} style={style}>
      {header}
      {children}
      <footer className="border-t lp-divider py-10">
        <Container>
          <div className="lp-glass flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex overflow-hidden rounded-lg bg-white">
                <Image
                  src={logo}
                  alt=""
                  width={80}
                  height={32}
                  className="h-7 w-auto"
                  aria-hidden
                />
              </span>
              <p className="font-display text-base">{content.siteName}</p>
            </div>
            <p className="text-sm lp-muted">
              © {year} {content.shortName}. fba.my
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
