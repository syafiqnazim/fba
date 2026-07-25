import Link from "next/link";
import { defaultLocale, localePath } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

export default function NotFound() {
  const messages = getMessages(defaultLocale);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col justify-center gap-4 px-6">
      <h1 className="font-display text-3xl text-brand-deep">
        {messages.notFound.title}
      </h1>
      <p className="text-muted">{messages.notFound.body}</p>
      <Link
        href={localePath(defaultLocale, "home")}
        className="text-accent underline"
      >
        {messages.notFound.back}
      </Link>
    </main>
  );
}
