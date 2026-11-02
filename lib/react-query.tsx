"use client";

import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CatalogRequestError } from "@/services/catalog-error";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount, error: unknown) => {
              if (error instanceof CatalogRequestError) {
                if (error.challenged || (error.status && error.status < 500)) {
                  return false;
                }
                return failureCount < 2;
              }
              // Don't retry on 4xx errors
              const status =
                typeof error === "object" &&
                error !== null &&
                "response" in error
                  ? (error.response as { status?: number } | undefined)?.status
                  : undefined;
              if (typeof status === "number" && status >= 400 && status < 500) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
    </QueryClientProvider>
  );
}
