import { CheckCircle2, CircleDashed, ClipboardCheck, ExternalLink, ListVideo, SkipForward, TriangleAlert, Percent } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { VideoDeliveryStats } from "../types/video-delivery.type";

export function VideoDeliveryStatsCards({ stats, isLoading }: { stats?: VideoDeliveryStats; isLoading: boolean }) {
  const cards = [
    ["Total", stats?.total, ListVideo], ["Pending", stats?.pending, CircleDashed],
    ["Prepared", stats?.prepared, ClipboardCheck], ["Opened Zalo", stats?.openedZalo, ExternalLink],
    ["Sent", stats?.sent, CheckCircle2], ["Failed", stats?.failed, TriangleAlert],
    ["Skipped", stats?.skipped, SkipForward], ["Completion", stats ? `${stats.completionRate}%` : undefined, Percent],
  ] as const;
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">{cards.map(([label, value, Icon]) => (
    <div key={label} className="glass-card rounded-2xl border border-white/60 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{label}</span><Icon className="h-4 w-4 text-[#FF161A]" /></div>
      {isLoading ? <Skeleton className="h-7 w-12" /> : <p className="text-2xl font-bold text-slate-900">{value ?? "—"}</p>}
    </div>
  ))}</div>;
}

