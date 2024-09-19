import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="antialiased">
        <Providers>
          <div className="mx-auto max-w-screen-lg px-4">
            <Header />
            <main className="mt-4">{children}</main>
            <Footer />
            <Toaster theme="light" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
