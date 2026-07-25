import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type MediaAspect = "landscape" | "landscapeWide" | "portrait" | "square";

const aspectClass: Record<MediaAspect, string> = {
  landscape: "aspect-video",
  landscapeWide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

type MediaFrameProps = {
  src: StaticImageData | string;
  alt: string;
  aspect?: MediaAspect;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: ReactNode;
  fill?: boolean;
};

export function MediaFrame({
  src,
  alt,
  aspect = "landscape",
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, 50vw",
  overlay,
  fill = true,
}: MediaFrameProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-brand-deep/10 ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        preload={priority}
        sizes={sizes}
        placeholder={typeof src === "string" ? "empty" : "blur"}
        className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${imageClassName}`}
      />
      {overlay}
    </div>
  );
}
