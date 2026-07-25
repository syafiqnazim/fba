import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale, PageKey } from "@/lib/i18n";
import type { Messages } from "@/lib/messages";

type PageShellProps = {
  locale: Locale;
  messages: Messages;
  currentPage: PageKey;
  headerVariant?: "transparent" | "solid";
  children: React.ReactNode;
};

export function PageShell({
  locale,
  messages,
  currentPage,
  headerVariant = "solid",
  children,
}: PageShellProps) {
  return (
    <>
      <SiteHeader
        locale={locale}
        messages={messages}
        currentPage={currentPage}
        variant={headerVariant}
      />
      <div className="flex-1">{children}</div>
      <SiteFooter messages={messages} />
      <LanguageSwitcher locale={locale} currentPage={currentPage} />
    </>
  );
}
