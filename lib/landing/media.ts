import type { StaticImageData } from "next/image";
import casting from "@/app/assets/stock/casting.jpg";
import fishingBoat from "@/app/assets/stock/fishing-boat.jpg";
import gear from "@/app/assets/stock/gear.jpg";
import nightSea from "@/app/assets/stock/night-sea.jpg";
import oceanDawn from "@/app/assets/stock/ocean-dawn.jpg";
import coachAriff from "@/app/assets/coach-ariff.png";
import coachMahfudz from "@/app/assets/coach-mahfudz.png";
import coachSyafie from "@/app/assets/coach-syafie.png";
import icm from "@/app/assets/ICM.png";
import fbaPro from "@/app/assets/programs/fba-pro.jpg";
import fbaCircle from "@/app/assets/programs/fba-circle.jpg";
import reelMaster from "@/app/assets/programs/reel-master.png";
import fbaPremierCircle from "@/app/assets/programs/fba-premier-circle.png";
import testimoni1 from "@/app/assets/testimonials/testimoni-1.png";
import testimoni2 from "@/app/assets/testimonials/testimoni-2.png";
import testimoni3 from "@/app/assets/testimonials/testimoni-3.png";
import testimoni4 from "@/app/assets/testimonials/testimoni-4.png";
import testimoni5 from "@/app/assets/testimonials/testimoni-5.png";
import testimoni6 from "@/app/assets/testimonials/testimoni-6.png";

/** Stock Unsplash photos (temporary) + real FBA assets for the landing. */
export const landingMedia = {
  heroFeature: coachSyafie,
  oceanDawn,
  fishingBoat,
  casting,
  nightSea,
  gear,
  coachAriff,
  coachMahfudz,
  coachSyafie,
  icm,
} as const satisfies Record<string, StaticImageData>;

/** Store product images keyed by program title. */
export const programMediaByTitle: Record<string, StaticImageData> = {
  "FBA Pro": fbaPro,
  "FBA Circle": fbaCircle,
  "Reel Master 6.0": reelMaster,
  "FBA Premier Circle": fbaPremierCircle,
};

/** Fallback when a program does not yet have a store image. */
export const programMediaFallback: StaticImageData = gear;

export const testimonialMedia: StaticImageData[] = [
  testimoni1,
  testimoni2,
  testimoni3,
  testimoni4,
  testimoni5,
  testimoni6,
];

export const galleryMedia: { src: StaticImageData; alt: string; real?: boolean }[] = [
  { src: icm, alt: "FBA Inner Circle Meeting", real: true },
  { src: coachSyafie, alt: "Syafi'e Abdul Shukor, Fishing Buddies Academy", real: true },
  { src: coachMahfudz, alt: "Coach Mahfudz", real: true },
  { src: coachAriff, alt: "Coach Ariff", real: true },
  { src: oceanDawn, alt: "Open water at dawn" },
  { src: fishingBoat, alt: "Fishing boat on the water" },
];
