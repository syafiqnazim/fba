import type { ReactNode } from "react";
import type { BlogPostMeta } from "@/lib/blog";
import type { LandingContent } from "@/lib/landing/content";
import type { SectionId, ThemeDefinition } from "@/lib/landing/themes";
import type { Locale } from "@/lib/i18n";
import { BlogSection } from "./sections/BlogSection";
import { CoachesSection } from "./sections/CoachesSection";
import { CommunitySection } from "./sections/CommunitySection";
import { CtaSection } from "./sections/CtaSection";
import { DayNightSection } from "./sections/DayNightSection";
import { FaqSection } from "./sections/FaqSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { LearnSection } from "./sections/LearnSection";
import { OwnerSpotlightSection } from "./sections/OwnerSpotlightSection";
import { ProgramsSection } from "./sections/ProgramsSection";
import { SocialProofSection } from "./sections/SocialProofSection";
import { StatsSection } from "./sections/StatsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import type { LandingSectionProps } from "./sections/types";

const sectionMap: Record<
  SectionId,
  (props: LandingSectionProps) => ReactNode
> = {
  hero: HeroSection,
  socialProof: SocialProofSection,
  stats: StatsSection,
  learn: LearnSection,
  programs: ProgramsSection,
  ownerSpotlight: OwnerSpotlightSection,
  coaches: CoachesSection,
  dayNight: DayNightSection,
  community: CommunitySection,
  howItWorks: HowItWorksSection,
  gallery: GallerySection,
  testimonials: TestimonialsSection,
  blog: BlogSection,
  faq: FaqSection,
  cta: CtaSection,
};

type LandingComposerProps = {
  locale: Locale;
  content: LandingContent;
  theme: ThemeDefinition;
  posts: BlogPostMeta[];
};

export function LandingComposer({
  locale,
  content,
  theme,
  posts,
}: LandingComposerProps) {
  const props: LandingSectionProps = { locale, content, theme, posts };

  return (
    <>
      {theme.sections.map((id) => {
        const Section = sectionMap[id];
        return <Section key={id} {...props} />;
      })}
    </>
  );
}
