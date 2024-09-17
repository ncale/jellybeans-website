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
          <div className="px-4 py-4 max-w-screen-lg mx-auto">
            <Header />
            <main className="flex mt-16 gap-x-2">{children}</main>
            <Toaster richColors theme="light" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
