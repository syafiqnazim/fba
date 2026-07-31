import type { StaticImageData } from "next/image";
import icm from "@/app/assets/ICM.webp";

export type HeroSlide = {
  src: StaticImageData;
  alt: string;
};

/**
 * Landscape hero slides. Add more by importing images and appending entries.
 */
export const heroSlides: HeroSlide[] = [
  {
    src: icm,
    alt: "Fishing Buddies Academy Inner Circle Meeting community",
  },
  // Add more horizontal images here, e.g.:
  // { src: anotherLandscape, alt: "…" },
];
