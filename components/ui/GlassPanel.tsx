import type { ReactNode } from "react";

type GlassVariant = "light" | "strong" | "dark" | "darkStrong";

const variantClass: Record<GlassVariant, string> = {
  light: "glass",
  strong: "glass-strong",
  dark: "glass-dark",
  darkStrong: "glass-dark-strong",
};

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: GlassVariant;
};

export function GlassPanel({
  children,
  className = "",
  variant = "light",
}: GlassPanelProps) {
  return (
    <div className={`rounded-2xl ${variantClass[variant]} ${className}`}>
      {children}
    </div>
  );
}
