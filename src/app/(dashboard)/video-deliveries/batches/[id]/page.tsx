import { PermissionGate } from "@/components/common/permission-gate";
import { VideoDeliveryListContainer } from "@/features/video-deliveries";

export default async function VideoDeliveryBatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PermissionGate permission="video-delivery:read"><VideoDeliveryListContainer fixedFilters={{ batchId: id }} title="Video Delivery Batch" description="Delivery status, parent contacts, and accountability history for this batch." /></PermissionGate>;
}

