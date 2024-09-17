import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import Header from "@/components/header";
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
          <div className="mx-auto max-w-screen-lg px-4 py-4">
            <Header />
            <main>{children}</main>
            <Toaster richColors theme="light" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
