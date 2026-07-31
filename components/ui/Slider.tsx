"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SliderProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  dotsClassName?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlayMs?: number;
  label?: string;
  pauseLabel?: string;
  resumeLabel?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Slider({
  children,
  className = "",
  trackClassName = "",
  dotsClassName = "",
  showDots = true,
  showArrows = false,
  autoPlayMs,
  label = "Carousel",
  pauseLabel = "Pause autoplay",
  resumeLabel = "Resume autoplay",
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [userPaused, setUserPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = Children.toArray(children);
  const count = slides.length;

  const scrollToIndex = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[next] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    setIndex(next);
  }, []);

  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const left = track.scrollLeft;
    let closest = 0;
    let best = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft - left);
      if (dist < best) {
        best = dist;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", syncIndex, { passive: true });
    return () => track.removeEventListener("scroll", syncIndex);
  }, [syncIndex]);

  useEffect(() => {
    if (!autoPlayMs || count < 2 || prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      if (pausedRef.current || userPaused) return;
      scrollToIndex((index + 1) % count);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, count, index, scrollToIndex, userPaused]);

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    pausedRef.current = false;
  }

  return (
    <div
      className={`relative min-w-0 ${className}`}
      onPointerDown={pause}
      onTouchStart={pause}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resume();
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div ref={trackRef} className={`slider-track ${trackClassName}`}>
        {slides}
      </div>

      {showArrows && count > 1 ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 sm:flex">
          <button
            type="button"
            aria-label="Previous slide"
            className="pointer-events-auto rounded-full glass px-3 py-2 text-sm font-semibold text-brand-deep"
            onClick={() => scrollToIndex(Math.max(0, index - 1))}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="pointer-events-auto rounded-full glass px-3 py-2 text-sm font-semibold text-brand-deep"
            onClick={() => scrollToIndex(Math.min(count - 1, index + 1))}
          >
            ›
          </button>
        </div>
      ) : null}

      {(showDots || autoPlayMs) && count > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          {showDots ? (
            <div
              className={`flex justify-center gap-2 ${dotsClassName}`}
              role="tablist"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-selected={i === index}
                  className={
                    i === index
                      ? "h-2 w-6 rounded-full bg-brand transition-all"
                      : "h-2 w-2 rounded-full bg-brand-deep/25 transition-all hover:bg-brand-deep/40"
                  }
                  onClick={() => {
                    pause();
                    scrollToIndex(i);
                  }}
                />
              ))}
            </div>
          ) : null}
          {autoPlayMs ? (
            <button
              type="button"
              aria-label={userPaused ? resumeLabel : pauseLabel}
              aria-pressed={userPaused}
              onClick={() => setUserPaused((current) => !current)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line/80 bg-white text-xs font-bold text-brand-deep transition hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span aria-hidden>{userPaused ? "▶" : "Ⅱ"}</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
