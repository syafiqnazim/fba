/** Digits only, country code included (for wa.me). */
export const FBA_WHATSAPP_E164 = "60176591614";

/** Human-readable display form. */
export const FBA_PHONE_DISPLAY = "+6017 659 1614";

export function whatsappUrl(prefill?: string): string {
  const base = `https://wa.me/${FBA_WHATSAPP_E164}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}
