"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { TeamsProvider } from "@/contexts/TeamContext";
import { CompetitionProvider } from "@/contexts/CompetitionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TeamsProvider>
        <CompetitionProvider>
          {children}
        </CompetitionProvider>
      </TeamsProvider>
    </QueryClientProvider>
  );
}
