import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import localFont from "next/font/local";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const moreSugarRegular = localFont({
  src: "./_fonts/MoreSugar-Regular.otf",
  variable: "--font-more-sugar",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Jellybeans",
  description: "An onchain prediction game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(moreSugarRegular.variable, "antialiased")}>
        <Providers>
          <div className="mx-auto max-w-screen-lg px-4">
            <Header />
            <main className="md:mt-4">{children}</main>
            <Footer />
            <Toaster theme="light" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
