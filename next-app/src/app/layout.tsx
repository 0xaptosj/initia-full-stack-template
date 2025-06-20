import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";
import { RootHeader } from "@/components/RootHeader";
import { RootFooter } from "@/components/RootFooter";
import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aptos Full Stack Demo",
  description: "An demo of a full stack app on Aptos",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={fontSans.variable}>
      <body
        className={cn(
          "flex justify-center min-h-screen bg-background font-sans antialiased"
        )}
      >
        <main className="flex flex-col w-full max-w-[1000px] p-6 pb-12 md:px-8 gap-6">
          <Providers>
            <RootHeader />
            {children}
            <Toaster />
            <RootFooter />
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
