"use client";

import { firebaseConfig } from "@/lib/firebase/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { THEMES } from "@/constants";

const queryClient = new QueryClient();
export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Register the service worker that sends auth state back to server
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig),
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;
      navigator.serviceWorker.register(serviceWorkerUrl);
    }
  }, []);

  return (
    <ThemeProvider themes={THEMES}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
