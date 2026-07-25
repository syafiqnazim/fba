import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { Container } from "@/components/ui/Container";
import type { Messages } from "@/lib/messages";

type SiteFooterProps = {
  messages: Messages;
};

export function SiteFooter({ messages }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-brand-deep">
      <Container className="py-10">
        <div className="glass-dark flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3 text-white">
            <Image
              src={logo}
              alt=""
              width={88}
              height={35}
              className="h-7 w-auto"
              aria-hidden
            />
            <p className="font-display text-base sm:text-lg">
              {messages.site.name}
            </p>
          </div>
          <p className="text-sm text-white/70">
            © {year} {messages.site.shortName}. {messages.footer.rights}{" "}
            {messages.footer.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
