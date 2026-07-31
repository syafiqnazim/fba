import "../globals.css";
import { outfit, siteMetadata, ubuntu } from "../site";

export const metadata = siteMetadata;

export default function RootRedirectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ms"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${ubuntu.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
