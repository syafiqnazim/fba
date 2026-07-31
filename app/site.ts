import type { Metadata } from "next";
import { Outfit, Ubuntu } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const siteMetadata: Metadata = {
  title: {
    default: "Fishing Buddies Academy",
    template: "%s · Fishing Buddies Academy",
  },
  description: "Fishing Buddies Academy — learn to fish in Malaysia.",
  metadataBase: new URL("https://fba.my"),
};
