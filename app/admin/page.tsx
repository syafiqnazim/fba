import Script from "next/script";

/** Decap CMS admin UI. Config lives at /admin/config.yml (public/). */
export default function AdminPage() {
  return (
    <Script
      src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
      strategy="afterInteractive"
    />
  );
}
