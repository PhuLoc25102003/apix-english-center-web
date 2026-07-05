"use client";

/**
 * src/hooks/use-confirm.ts
 *
 * Hook to trigger confirmation dialogs dynamically from any client component.
 */

import * as React from "react";
import { ConfirmContext } from "@/providers/confirm-provider";

export function useConfirm() {
  const context = React.useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
}
