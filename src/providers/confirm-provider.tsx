"use client";

/**
 * src/providers/confirm-provider.tsx
 *
 * Provides a promise-based confirmation system so components can trigger confirmation
 * dialogs dynamically without maintaining separate open/close state.
 */

import * as React from "react";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

export const ConfirmContext = React.createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = React.useState<{
    open: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive";
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = React.useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({
        open: true,
        title: options.title,
        description: options.description,
        confirmLabel: options.confirmLabel,
        cancelLabel: options.cancelLabel,
        variant: options.variant,
        resolve,
      });
    });
  }, []);

  const handleClose = () => {
    if (dialogState) {
      dialogState.resolve(false);
      setDialogState(null);
    }
  };

  const handleConfirm = () => {
    if (dialogState) {
      dialogState.resolve(true);
      setDialogState(null);
    }
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {dialogState && (
        <ConfirmDialog
          open={dialogState.open}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          title={dialogState.title}
          description={dialogState.description}
          confirmLabel={dialogState.confirmLabel}
          cancelLabel={dialogState.cancelLabel}
          variant={dialogState.variant}
          onConfirm={handleConfirm}
        />
      )}
    </ConfirmContext.Provider>
  );
}
