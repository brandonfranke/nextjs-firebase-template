import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | Next.js Firebase Starter",
  },
  description: "Next.js starter with Firebase, Tailwind CSS, and React Query",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background text-foreground dark ${inter.className}`}
      >
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
