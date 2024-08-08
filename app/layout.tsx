import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'

});

export const metadata: Metadata = {
  title: "Gestalt",
  description: "Gestalt is your go-to AI-powered tool for creating and editing stunning images. Effortlessly generate high-quality visuals and refine them with intuitive editing features like background removal, color correction, and artistic effects. Gestalt turns your creative ideas into reality with precision and ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>{children}</body>
    </html>
  );
}
