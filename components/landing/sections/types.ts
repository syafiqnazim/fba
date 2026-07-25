import type { BlogPostMeta } from "@/lib/blog";
import type { LandingContent } from "@/lib/landing/content";
import type { ThemeDefinition } from "@/lib/landing/themes";
import type { Locale } from "@/lib/i18n";

export type LandingSectionProps = {
  locale: Locale;
  content: LandingContent;
  theme: ThemeDefinition;
  posts?: BlogPostMeta[];
};
