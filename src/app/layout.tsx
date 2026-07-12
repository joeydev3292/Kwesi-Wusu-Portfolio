import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kwesi Wusu — Filmmaker",
  description:
    "Portfolio of filmmaker Kwesi Wusu, showcasing work across short films, music videos, commercials, and documentaries.",
  openGraph: {
    title: "Kwesi Wusu — Filmmaker",
    description:
      "Portfolio of filmmaker Kwesi Wusu, showcasing work across short films, music videos, commercials, and documentaries.",
    type: "website",
    siteName: "Kwesi Wusu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
