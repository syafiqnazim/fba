import type { Locale } from "./i18n";
import en from "@/messages/en.json";
import ms from "@/messages/ms.json";

const catalogs = { en, ms } as const;

export type Messages = typeof ms;

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}
