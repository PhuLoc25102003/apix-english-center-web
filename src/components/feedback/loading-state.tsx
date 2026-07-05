import * as React from "react";
import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  variant?: "spinner" | "card" | "table";
  rows?: number;
  className?: string;
}

export function LoadingState({
  variant = "spinner",
  rows = 5,
  className,
}: LoadingStateProps) {
  if (variant === "table") {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {/* Header row skeleton */}
        <div className="flex items-center gap-4 py-2 border-b border-border">
          <Skeleton className="h-4 w-1/4 bg-[#FFE8EA]/40" />
          <Skeleton className="h-4 w-1/4 bg-[#FFE8EA]/40" />
          <Skeleton className="h-4 w-1/4 bg-[#FFE8EA]/40" />
          <Skeleton className="h-4 w-1/4 bg-[#FFE8EA]/40" />
        </div>
        {/* Table rows skeleton */}
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-3 border-b border-border/40"
          >
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/12" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="glass-card p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/3 bg-[#FFE8EA]/40" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[240px] w-full flex-col items-center justify-center gap-3 text-center",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-[#FF161A]" />
      <span className="text-sm font-semibold tracking-wide text-[#6B7280]">
        Loading data...
      </span>
    </div>
  );
}
