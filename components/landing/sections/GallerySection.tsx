"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { galleryMedia } from "@/lib/landing/media";
import type { LandingSectionProps } from "./types";

export function GallerySection({ content }: LandingSectionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActive(index);
    dialogRef.current?.showModal();
  };

  const activeShot = active !== null ? galleryMedia[active] : null;

  return (
    <section className="lp-section lp-section-alt">
      <Container>
        <Reveal as="header" className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--lp-brand)]">
            Gallery
          </p>
          <h2 className="font-display mt-3 text-3xl text-[var(--lp-ink)] sm:text-4xl">
            {content.gallery.title}
          </h2>
          <p className="mt-3 text-base text-[var(--lp-muted)] sm:text-lg">
            {content.gallery.intro}
          </p>
        </Reveal>
      </Container>

      <Reveal delay={100}>
        <div className="gallery-marquee">
          <div className="gallery-marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex gap-4 pr-4"
                aria-hidden={copy === 1}
              >
                {galleryMedia.map((shot, i) => (
                  <button
                    key={`${copy}-${shot.alt}`}
                    type="button"
                    tabIndex={copy === 1 ? -1 : 0}
                    aria-label={shot.alt}
                    onClick={() => openLightbox(i)}
                    className="group relative w-64 shrink-0 cursor-zoom-in overflow-hidden rounded-3xl shadow-[0_12px_40px_var(--lp-shadow)] sm:w-80"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="320px"
                        placeholder="blur"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    {shot.real ? (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--lp-ink)]">
                        FBA
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto rounded-3xl bg-transparent p-0 backdrop:bg-[rgba(5,40,52,0.78)] backdrop:backdrop-blur-sm"
      >
        {activeShot ? (
          <figure className="relative m-0">
            <Image
              src={activeShot.src}
              alt={activeShot.alt}
              sizes="90vw"
              placeholder="blur"
              className="max-h-[80vh] w-auto max-w-[90vw] rounded-3xl object-contain"
            />
            <figcaption className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t from-[rgba(5,40,52,0.75)] to-transparent px-5 pb-4 pt-10 text-sm font-medium text-white">
              {activeShot.alt}
            </figcaption>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-[var(--lp-ink)] transition-colors hover:bg-white"
            >
              ×
            </button>
          </figure>
        ) : null}
      </dialog>
    </section>
  );
}
