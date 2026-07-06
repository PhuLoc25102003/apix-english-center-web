import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { VideoStatus } from "../types/media-video.type";

interface VideoStatusBadgeProps {
  status: VideoStatus;
  className?: string;
}

export function VideoStatusBadge({ status, className }: VideoStatusBadgeProps) {
  let label = status as string;
  let themeClass = "bg-slate-50 text-slate-600 border-slate-200/60";
  let dotClass = "bg-slate-400";

  switch (status) {
    case "UPLOADED":
      label = "Đã tải lên";
      themeClass = "bg-blue-50 text-blue-700 border-blue-200/60";
      dotClass = "bg-blue-500";
      break;
    case "PROCESSING":
      label = "Đang xử lý";
      themeClass = "bg-amber-50 text-amber-700 border-amber-200/60";
      dotClass = "bg-amber-500 animate-pulse";
      break;
    case "READY":
      label = "Sẵn sàng";
      themeClass = "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      dotClass = "bg-indigo-500";
      break;
    case "APPROVED":
      label = "Đã duyệt";
      themeClass = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      dotClass = "bg-emerald-500";
      break;
    case "REJECTED":
      label = "Từ chối";
      themeClass = "bg-rose-50 text-rose-700 border-rose-200/60";
      dotClass = "bg-rose-500";
      break;
    case "DELIVERED":
      label = "Đã gửi Zalo";
      themeClass = "bg-purple-50 text-purple-700 border-purple-200/60";
      dotClass = "bg-purple-500";
      break;
    case "ARCHIVED":
      label = "Lưu trữ";
      themeClass = "bg-slate-100 text-slate-700 border-slate-300";
      dotClass = "bg-slate-500";
      break;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border transition-colors select-none",
        themeClass,
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotClass)} />
        {label}
      </span>
    </Badge>
  );
}
