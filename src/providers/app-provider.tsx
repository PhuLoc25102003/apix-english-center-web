"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "./query-provider";
import { ConfirmProvider } from "./confirm-provider";

/**
 * AppProvider — root provider tree for APIX English Center.
 *
 * Composes all global providers in a single place so that
 * app/layout.tsx stays clean and providers can be added or
 * swapped without touching the layout file.
 *
 * Provider order (outermost → innermost):
 *
 *   ThemeProvider        ← DOM class, must be outermost
 *   └── QueryProvider    ← TanStack Query context
 *       └── {children}   ← app pages and layouts
 *
 * Future additions (placeholder order):
 *   └── QueryProvider
 *       └── StoreProvider    (Redux Toolkit — when needed)
 *           └── AuthProvider (current user context — Phase 2)
 *               └── {children}
 */
type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ConfirmProvider>{children}</ConfirmProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
