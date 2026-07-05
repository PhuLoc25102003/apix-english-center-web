"use client";

import * as React from "react";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * APIX TanStack Query configuration — standard §10
 *
 * Key decisions:
 * - staleTime 60s: data stays fresh for 1 min before refetching.
 *   Prevents unnecessary re-fetches on component mount / tab focus.
 * - gcTime 5min: unused cache data is garbage-collected after 5 minutes.
 * - refetchOnWindowFocus false: we do NOT refetch on every tab switch.
 *   APIX is a dashboard app — staff keep tabs open for long periods.
 * - retry 1: only retry once on failure (default 3 is too aggressive for
 *   a form-heavy app where network errors should surface quickly).
 * - retryDelay: exponential backoff capped at 10s.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data stays fresh for 60 seconds — no re-fetch within this window
        staleTime: 60 * 1_000,
        // Keep unused cache for 5 minutes
        gcTime: 5 * 60 * 1_000,
        // Do NOT refetch on tab focus — users keep dashboard tabs open
        refetchOnWindowFocus: false,
        // Do NOT refetch on network reconnect by default (let features opt in)
        refetchOnReconnect: false,
        // One retry only — surface errors quickly in a staff-facing app
        retry: 1,
        // Exponential backoff: 1s → 2s → max 10s
        retryDelay: (attemptIndex) =>
          Math.min(1_000 * 2 ** attemptIndex, 10_000),
      },
      mutations: {
        // Mutations do NOT retry automatically — a failed create/update
        // should surface immediately and let the user decide to retry.
        retry: 0,
      },
    },
  });
}

// ─── Singleton pattern for SSR safety ───────────────────────────────────────
// On the server: a new QueryClient per request (avoids data leaking between
// requests in the same process).
// On the client: a single QueryClient for the lifetime of the browser session.

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new client
    return makeQueryClient();
  }

  // Browser: create once and reuse
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

// ─── Provider component ───────────────────────────────────────────────────────

type QueryProviderProps = {
  children: React.ReactNode;
};

/**
 * QueryProvider
 *
 * Wraps the app with TanStack Query context.
 * Also renders ReactQueryDevtools in development only.
 *
 * Usage: placed inside AppProvider, after ThemeProvider.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // NOTE: avoid useState here so we don't need a suspense boundary.
  // getQueryClient() is stable across renders on the client.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}
