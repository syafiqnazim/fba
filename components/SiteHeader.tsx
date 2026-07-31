"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import logo from "@/app/assets/logo.png";
import { Container } from "@/components/ui/Container";
import type { Locale, PageKey } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";

const navItems: { key: PageKey; labelKey: keyof Messages["nav"] }[] = [
  { key: "home", labelKey: "home" },
  { key: "about", labelKey: "about" },
  { key: "blog", labelKey: "blog" },
  { key: "contact", labelKey: "contact" },
];

type SiteHeaderProps = {
  locale: Locale;
  messages: Messages;
  currentPage: PageKey;
  /** solid = sticky light bar. transparent = absolute dark glass over media. */
  variant?: "transparent" | "solid";
};

export function SiteHeader({
  locale,
  messages,
  currentPage,
  variant = "solid",
}: SiteHeaderProps) {
  const isDark = variant === "transparent";
  const isSticky = !isDark;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isSticky) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSticky]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const barBase =
    "absolute left-1/2 block h-0.5 w-5 -translate-x-1/2 rounded-full transition-all duration-300 " +
    (isDark ? "bg-white" : "bg-brand-deep");

  const shellClass = isDark
    ? "glass-dark rounded-2xl"
    : `rounded-2xl border border-line/80 backdrop-blur-md transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 shadow-lg shadow-brand-deep/10"
          : "bg-white/90 shadow-sm"
      }`;

  return (
    <header
      className={
        isDark
          ? "absolute inset-x-0 top-0 z-30"
          : `sticky top-0 z-30 transition-[background-color,backdrop-filter] duration-300 ${
              scrolled || menuOpen
                ? "bg-[var(--background)]/95 backdrop-blur-md"
                : "bg-transparent"
            }`
      }
    >
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-0 bg-[rgba(5,40,52,0.28)] backdrop-blur-[2px] sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <Container
        className={`relative z-10 transition-[padding] duration-300 ${
          isSticky && scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className={shellClass}>
          <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4">
            <Link
              href={localePath(locale, "home")}
              className="flex min-w-0 items-center gap-2.5"
              onClick={() => setMenuOpen(false)}
            >
              {/* PNG has heavy white padding — crop it on larger bars; use type on mobile */}
              <span className="font-display text-xl tracking-tight text-brand md:hidden">
                {messages.site.shortName}
              </span>
              <span className="relative hidden h-8 w-16 overflow-hidden rounded-lg bg-white md:block">
                <Image
                  src={logo}
                  alt=""
                  width={96}
                  height={38}
                  className="absolute left-1/2 top-1/2 h-[175%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                  priority
                  aria-hidden
                />
              </span>
              <span
                className={
                  isDark
                    ? "hidden truncate font-display text-sm text-white md:inline"
                    : "hidden truncate font-display text-sm text-brand-deep md:inline"
                }
              >
                {messages.site.name}
              </span>
              <span className="sr-only">{messages.site.name}</span>
            </Link>

            <nav className="hidden items-center justify-end gap-1 text-sm md:flex md:gap-1.5">
              {navItems.map(({ key, labelKey }) => {
                const active = currentPage === key;
                return (
                  <Link
                    key={key}
                    href={localePath(locale, key)}
                    className={
                      isDark
                        ? active
                          ? "rounded-full bg-brand px-2.5 py-1.5 font-semibold text-white"
                          : "rounded-full px-2.5 py-1.5 text-white/85 transition-colors duration-200 hover:bg-brand/80 hover:text-white"
                        : active
                          ? "rounded-full bg-brand px-2.5 py-1.5 font-semibold text-white"
                          : "rounded-full px-2.5 py-1.5 text-brand-deep transition-colors duration-200 hover:bg-brand hover:text-white"
                    }
                  >
                    {messages.nav[labelKey]}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors md:hidden ${
                menuOpen
                  ? isDark
                    ? "bg-white/15"
                    : "bg-brand/10"
                  : isDark
                    ? "hover:bg-white/10"
                    : "hover:bg-brand/10"
              }`}
            >
              <span
                className={`${barBase} ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[13px]"
                }`}
              />
              <span
                className={`${barBase} top-1/2 -translate-y-1/2 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`${barBase} ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-[13px]"
                }`}
              />
            </button>
          </div>

          <div
            id={menuId}
            className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
              menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <nav
                className={`border-t px-2 pb-3 pt-2 ${
                  isDark ? "border-white/15" : "border-line/70"
                }`}
                aria-label="Mobile"
              >
                <ul className="flex flex-col gap-0.5">
                  {navItems.map(({ key, labelKey }) => {
                    const active = currentPage === key;
                    const isContact = key === "contact";

                    if (isContact) {
                      return (
                        <li key={key} className="mt-2 px-1 pt-1">
                          <Link
                            href={localePath(locale, key)}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:bg-brand/90"
                          >
                            {messages.nav[labelKey]}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={key}>
                        <Link
                          href={localePath(locale, key)}
                          onClick={() => setMenuOpen(false)}
                          className={
                            active
                              ? "flex items-center gap-3 rounded-xl bg-brand/10 px-3 py-3 text-[0.95rem] font-semibold text-brand-deep"
                              : isDark
                                ? "flex items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] font-medium text-white/90 transition-colors hover:bg-white/10"
                                : "flex items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem] font-medium text-brand-deep transition-colors hover:bg-brand/5"
                          }
                        >
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              active
                                ? "bg-brand"
                                : isDark
                                  ? "bg-white/35"
                                  : "bg-brand-deep/25"
                            }`}
                          />
                          {messages.nav[labelKey]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
