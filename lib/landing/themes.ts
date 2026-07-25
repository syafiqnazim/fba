export type SectionId =
  | "hero"
  | "socialProof"
  | "stats"
  | "learn"
  | "programs"
  | "ownerSpotlight"
  | "coaches"
  | "dayNight"
  | "community"
  | "howItWorks"
  | "gallery"
  | "testimonials"
  | "blog"
  | "faq"
  | "cta";

export type ThemeTokens = {
  bg: string;
  bgAlt: string;
  ink: string;
  muted: string;
  accent: string;
  accentSoft: string;
  onAccent: string;
  brand: string;
  line: string;
  glass: string;
  glassBorder: string;
  heroOverlay: string;
  surface: string;
  radius: string;
  /** Soft decorative tints derived from brand cyan / deep navy */
  tint1: string;
  tint2: string;
  tint3: string;
  tint4: string;
  glow: string;
  shadow: string;
};

export type ThemeDefinition = {
  id: string;
  name: string;
  tagline: string;
  tokens: ThemeTokens;
  sections: SectionId[];
  heroStyle: "glass" | "bar" | "editorial" | "soft" | "split";
  coachesStyle: "peek" | "circle";
  proofStyle: "strip" | "marquee";
};

/** Official FBA palette — logo cyan + deep navy water tones. */
export const fbaColors = {
  cyan: "#00adef",
  deep: "#063044",
  ink: "#052834",
  muted: "#4a6b73",
  mist: "#e8f2f6",
  mistAlt: "#f0f7fa",
  white: "#ffffff",
  line: "#c9dde3",
} as const;

/**
 * Light landing layout with FBA brand colours.
 */
export const siteTheme: ThemeDefinition = {
  id: "fba",
  name: "FBA",
  tagline: "Consistent Fishing Buddies Academy brand colours.",
  heroStyle: "split",
  coachesStyle: "circle",
  proofStyle: "marquee",
  tokens: {
    bg: fbaColors.mist,
    bgAlt: fbaColors.mistAlt,
    ink: fbaColors.ink,
    muted: fbaColors.muted,
    accent: fbaColors.cyan,
    accentSoft: "rgba(0, 173, 239, 0.14)",
    onAccent: fbaColors.white,
    brand: fbaColors.cyan,
    line: "rgba(5, 40, 52, 0.1)",
    glass: "rgba(255, 255, 255, 0.92)",
    glassBorder: "rgba(5, 40, 52, 0.08)",
    heroOverlay: "transparent",
    surface: fbaColors.white,
    radius: "1.5rem",
    tint1: "rgba(0, 173, 239, 0.12)",
    tint2: "rgba(6, 48, 68, 0.06)",
    tint3: "rgba(0, 173, 239, 0.2)",
    tint4: fbaColors.mist,
    glow: "rgba(0, 173, 239, 0.18)",
    shadow: "rgba(5, 40, 52, 0.12)",
  },
  sections: [
    "hero",
    "socialProof",
    "stats",
    "learn",
    "programs",
    "ownerSpotlight",
    "coaches",
    "community",
    "testimonials",
    "blog",
    "faq",
  ],
};

export function themeCssVars(tokens: ThemeTokens): Record<string, string> {
  return {
    "--lp-bg": tokens.bg,
    "--lp-bg-alt": tokens.bgAlt,
    "--lp-ink": tokens.ink,
    "--lp-muted": tokens.muted,
    "--lp-accent": tokens.accent,
    "--lp-accent-soft": tokens.accentSoft,
    "--lp-on-accent": tokens.onAccent,
    "--lp-brand": tokens.brand,
    "--lp-line": tokens.line,
    "--lp-glass": tokens.glass,
    "--lp-glass-border": tokens.glassBorder,
    "--lp-hero-overlay": tokens.heroOverlay,
    "--lp-surface": tokens.surface,
    "--lp-radius": tokens.radius,
    "--lp-tint-1": tokens.tint1,
    "--lp-tint-2": tokens.tint2,
    "--lp-tint-3": tokens.tint3,
    "--lp-tint-4": tokens.tint4,
    "--lp-glow": tokens.glow,
    "--lp-shadow": tokens.shadow,
  };
}
