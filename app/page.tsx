import Link from "next/link";

/** Static-export friendly redirect to the default locale. */
export default function RootPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 px-6">
      <h1 className="font-display text-3xl text-brand-deep">
        Fishing Buddies Academy
      </h1>
      <p className="text-muted">
        <Link className="text-accent underline" href="/ms/">
          Teruskan ke laman Bahasa Malaysia
        </Link>
        {" · "}
        <Link className="text-accent underline" href="/en/">
          Continue in English
        </Link>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace("/ms/");`,
        }}
      />
    </main>
  );
}
