import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Standard status theme mappings (§12.3)
export const statusBadgeThemes = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  INACTIVE: "bg-slate-50 text-slate-600 border-slate-200/60 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/30",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
  OVERDUE: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  PARTIALLY_PAID: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
  UNPAID: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  DRAFT: "bg-slate-50 text-slate-600 border-slate-200/60 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/30",
  PLANNING: "bg-slate-50 text-slate-600 border-slate-200/60 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/30",
  OPEN: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
  CLOSED: "bg-slate-50 text-slate-600 border-slate-200/60 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800/30",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  REFUNDED: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  LOCKED: "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30",
} as const;

export type StatusType = keyof typeof statusBadgeThemes;

interface StatusBadgeProps extends React.ComponentProps<typeof Badge> {
  status: StatusType | string;
  customLabel?: string;
}

export function StatusBadge({
  status,
  customLabel,
  className,
  ...props
}: StatusBadgeProps) {
  // Safe normalization of status key
  const normalizedStatus = String(status).toUpperCase() as StatusType;
  const themeClass = statusBadgeThemes[normalizedStatus] || statusBadgeThemes.INACTIVE;
  const label = customLabel || status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide border transition-colors select-none",
        themeClass,
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        {/* Pulsing indicator dot */}
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            normalizedStatus === "ACTIVE" || normalizedStatus === "PAID" || normalizedStatus === "APPROVED"
              ? "bg-emerald-500"
              : normalizedStatus === "PENDING"
              ? "bg-amber-500"
              : normalizedStatus === "OVERDUE" || normalizedStatus === "UNPAID" || normalizedStatus === "REJECTED" || normalizedStatus === "LOCKED"
              ? "bg-rose-500"
              : "bg-slate-400"
          )}
        />
        {label}
      </span>
    </Badge>
  );
}
