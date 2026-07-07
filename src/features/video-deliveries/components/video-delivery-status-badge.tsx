import { StatusBadge } from "@/components/common/status-badge";
import type { VideoDeliveryStatus } from "../types/video-delivery.type";

const labels: Record<VideoDeliveryStatus, string> = {
  PENDING: "Pending",
  PREPARED: "Prepared",
  OPENED_ZALO: "Opened Zalo",
  SENT_MANUALLY: "Sent manually",
  FAILED: "Failed",
  SKIPPED: "Skipped",
  CANCELLED: "Cancelled",
};

export function VideoDeliveryStatusBadge({ status }: { status: VideoDeliveryStatus }) {
  const colors: Partial<Record<VideoDeliveryStatus, string>> = {
    PREPARED: "border-sky-200 bg-sky-50 text-sky-700",
    OPENED_ZALO: "border-violet-200 bg-violet-50 text-violet-700",
    SENT_MANUALLY: "border-emerald-200 bg-emerald-50 text-emerald-700",
    FAILED: "border-rose-200 bg-rose-50 text-rose-700",
    SKIPPED: "border-slate-200 bg-slate-50 text-slate-600",
  };
  return <StatusBadge status={status} customLabel={labels[status]} className={colors[status]} />;
}

