import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "",
    template: "%s | Next.js Firebase Starter",
  },
  description: "Next.js starter with Firebase, Tailwind CSS, and React Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies();
  return (
    <html
      lang="en"
      data-theme-mode={cookie.get("theme-mode")?.value ?? "dark"}
      data-theme-color={cookie.get("theme-color")?.value ?? "default"}
    >
      <body className={`antialiased bg-background text-foreground dark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
