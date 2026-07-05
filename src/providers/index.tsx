"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";

/**
 * AppProviders — root provider tree.
 *
 * Wrap all global providers here so layout.tsx stays clean.
 * Add TanStack Query, Redux, and auth context here as features are built.
 *
 * Order matters:
 *   ThemeProvider (outermost — affects DOM class)
 *   └── QueryProvider (TanStack Query — add in Phase 1 completion)
 *       └── StoreProvider (Redux — add when needed)
 *           └── AuthProvider (auth context)
 *               └── {children}
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
