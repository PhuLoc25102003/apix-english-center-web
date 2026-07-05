import * as React from "react";
import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No data found",
  description = "There are no records matching your request at this time.",
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center p-8 text-center min-h-[320px] max-w-2xl mx-auto border border-[#FF161A]/10 shadow-xs">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFE8EA] text-[#FF161A] mb-4">
        {icon || <Inbox className="h-8 w-8" />}
      </div>
      
      <h3 className="font-display text-lg font-bold text-[#111827] mb-1">
        {title}
      </h3>
      
      <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-6 py-2 shadow-md shadow-[#FF161A]/15 transition-all"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
