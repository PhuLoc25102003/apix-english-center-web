import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/40",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[#6B7280] leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex shrink-0 items-center gap-3 sm:justify-end">
          {action}
        </div>
      )}
    </div>
  );
}
