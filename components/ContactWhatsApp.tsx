import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { FBA_PHONE_DISPLAY, whatsappUrl } from "@/lib/contact";
import type { Messages } from "@/lib/messages";

type ContactWhatsAppProps = {
  messages: Messages["contact"];
};

export function ContactWhatsApp({ messages }: ContactWhatsAppProps) {
  return (
    <GlassPanel className="mx-auto max-w-xl space-y-5 p-5 sm:p-7">
      <p className="text-sm leading-relaxed text-muted">{messages.guidance}</p>
      <p className="text-sm font-medium text-brand-deep">{FBA_PHONE_DISPLAY}</p>
      <Button href={whatsappUrl(messages.prefill)} external>
        {messages.cta}
      </Button>
    </GlassPanel>
  );
}
