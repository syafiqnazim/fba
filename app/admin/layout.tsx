import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Admin · Fishing Buddies Academy",
  robots: "noindex",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
