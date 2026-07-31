"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealTag = "div" | "li" | "header" | "article" | "section" | "figure";

type RevealProps = {
  children: ReactNode;
  /** Element tag to render so semantics stay valid (e.g. "li", "header"). */
  as?: RevealTag;
  className?: string;
  /** Animation delay in ms — use to stagger sibling reveals. */
  delay?: number;
};

/**
 * Reveals its content with a fade/rise animation the first time it enters
 * the viewport. Under prefers-reduced-motion the CSS keeps the element
 * visible and skips the animation entirely.
 */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    setEnhanced(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style =
    delay > 0
      ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
      : undefined;

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal${enhanced ? " is-enhanced" : ""}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
