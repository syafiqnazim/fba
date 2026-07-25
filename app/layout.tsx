import type { Metadata } from "next";
import { Outfit, Ubuntu } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Fishing Buddies Academy",
    template: "%s · Fishing Buddies Academy",
  },
  description: "Fishing Buddies Academy — learn to fish in Malaysia.",
  metadataBase: new URL("https://fba.my"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ms" className={`${outfit.variable} ${ubuntu.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
