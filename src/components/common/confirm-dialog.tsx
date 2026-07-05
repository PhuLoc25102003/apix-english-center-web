"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isConfirming?: boolean;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isConfirming = false,
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card sm:max-w-md p-6 border border-[#FF161A]/10 gap-6">
        <DialogHeader className="gap-2 text-left">
          <DialogTitle className="font-display text-lg font-bold text-[#111827]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-[#6B7280]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="gap-2 sm:justify-end border-t border-[#FF161A]/10 pt-4 -mx-6 -mb-6 px-6">
          <DialogClose
            render={
              <Button
                variant="outline"
                disabled={isConfirming}
                className="w-full sm:w-auto"
              />
            }
          >
            {cancelLabel}
          </DialogClose>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={onConfirm}
            disabled={isConfirming}
            className="w-full sm:w-auto font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] disabled:bg-[#9CA3AF]"
          >
            {isConfirming ? "Đang xử lý..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
