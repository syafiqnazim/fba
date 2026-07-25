import type { ReactNode } from "react";

type SlideWidth = "full" | "peek" | "card";

const widthClass: Record<SlideWidth, string> = {
  full: "w-full min-w-full",
  peek: "w-[85%] min-w-[85%] sm:w-[70%] sm:min-w-[70%] md:w-[48%] md:min-w-[48%]",
  card: "w-[78%] min-w-[78%] sm:w-[55%] sm:min-w-[55%] md:w-[38%] md:min-w-[38%]",
};

type SlideProps = {
  children: ReactNode;
  width?: SlideWidth;
  className?: string;
};

export function Slide({
  children,
  width = "peek",
  className = "",
}: SlideProps) {
  return (
    <div className={`${widthClass[width]} ${className}`}>{children}</div>
  );
}
