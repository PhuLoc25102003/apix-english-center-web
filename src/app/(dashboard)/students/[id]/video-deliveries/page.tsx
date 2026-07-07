import { PermissionGate } from "@/components/common/permission-gate";
import { VideoDeliveryListContainer } from "@/features/video-deliveries";

export default async function StudentVideoDeliveriesPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <PermissionGate permission="video-delivery:read"><VideoDeliveryListContainer fixedFilters={{ studentId: id }} title="Student Video Deliveries" /></PermissionGate>; }

