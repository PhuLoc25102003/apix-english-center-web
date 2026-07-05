import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading this content. Please try again.",
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center p-8 text-center min-h-[320px] max-w-2xl mx-auto border border-rose-200/60 shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-[#DC2626] mb-4 dark:bg-rose-950/20">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h3 className="font-display text-lg font-bold text-[#111827] mb-1">
        {title}
      </h3>

      <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-6 py-2 shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 disabled:bg-[#9CA3AF]"
        >
          <RefreshCw className={isRetrying ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </Button>
      )}
    </div>
  );
}
