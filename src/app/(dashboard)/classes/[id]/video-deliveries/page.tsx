import { PermissionGate } from "@/components/common/permission-gate";
import { VideoDeliveryListContainer } from "@/features/video-deliveries";

export default async function ClassVideoDeliveriesPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <PermissionGate permission="video-delivery:read"><VideoDeliveryListContainer fixedFilters={{ classId: id }} title="Class Video Deliveries" /></PermissionGate>; }

