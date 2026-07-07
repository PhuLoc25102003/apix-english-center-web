"use client";
import * as React from "react";
import { Plus, Video } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { PermissionGate } from "@/components/common/permission-gate";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { useVideoDeliveries } from "../hooks/use-video-deliveries";
import { useVideoDeliveryStats } from "../hooks/use-video-delivery-stats";
import { VideoDeliveryFilters } from "./video-delivery-filters";
import { VideoDeliveryStatsCards } from "./video-delivery-stats-cards";
import { VideoDeliveryTable } from "./video-delivery-table";
import { CreateVideoDeliveryBatchModal } from "./create-video-delivery-batch-modal";
import type { VideoDeliveryFilters as Filters } from "../types/video-delivery.type";

export function VideoDeliveryListContainer({ fixedFilters = {}, title = "Video Deliveries", description = "Track manual Zalo video delivery without uploading or storing video files." }: { fixedFilters?: Filters; title?: string; description?: string }) {
  const [filters, setFilters] = React.useState<Filters>({ page: 1, limit: 20, ...fixedFilters }); const [createOpen, setCreateOpen] = React.useState(false);
  const activeFilters = { ...filters, ...fixedFilters }; const list = useVideoDeliveries(activeFilters); const stats = useVideoDeliveryStats(activeFilters);
  const deliveryRows = list.data?.data ?? [];
  return <div className="space-y-6"><PageHeader title={title} description={description} action={<PermissionGate permission="video-delivery:create-batch"><Button onClick={() => setCreateOpen(true)} className="bg-[#FF161A] text-white hover:bg-[#C90012]"><Plus className="h-4 w-4" />Create batch</Button></PermissionGate>} />
    <VideoDeliveryStatsCards stats={stats.data?.data} isLoading={stats.isLoading} />
    <VideoDeliveryFilters filters={activeFilters} onChange={(next) => setFilters({ ...next, ...fixedFilters })} />
    {list.isLoading ? <div className="space-y-3">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-16 w-full rounded-xl" />)}</div> : list.isError ? <ErrorState title="Video deliveries unavailable" message="The real backend video delivery endpoint could not be reached. No mock data is shown." onRetry={() => void list.refetch()} isRetrying={list.isFetching} /> : deliveryRows.length === 0 ? <EmptyState icon={<Video className="h-8 w-8" />} title="No video deliveries" description="No real delivery records match these filters. Create a batch or adjust the filters." /> : <VideoDeliveryTable deliveries={deliveryRows} />}
    {list.data && list.data.meta.totalPages > 1 && <div className="flex items-center justify-end gap-2"><Button variant="outline" disabled={!list.data.meta.hasPreviousPage} onClick={() => setFilters((current) => ({ ...current, page: Math.max(1, Number(current.page ?? 1) - 1) }))}>Previous</Button><span className="text-sm text-slate-500">Page {list.data.meta.page} of {list.data.meta.totalPages}</span><Button variant="outline" disabled={!list.data.meta.hasNextPage} onClick={() => setFilters((current) => ({ ...current, page: Number(current.page ?? 1) + 1 }))}>Next</Button></div>}
    <CreateVideoDeliveryBatchModal open={createOpen} onOpenChange={setCreateOpen} classId={fixedFilters.classId} />
  </div>;
}
