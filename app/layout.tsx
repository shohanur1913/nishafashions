import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content/site";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Nisha Fashions Wear",
    template: "%s | Nisha Fashions Wear",
  },
  description: "Global apparel sourcing, production management, and quality assurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
