import { PermissionGate } from "@/components/common/permission-gate";
import { VideoDeliveryListContainer } from "@/features/video-deliveries";

export default function VideoDeliveriesPage() {
  return <PermissionGate permission="video-delivery:read" fallback={<div className="glass-card rounded-2xl p-8 text-center text-sm text-slate-600">You need <code>video-delivery:read</code> to view video deliveries.</div>}><VideoDeliveryListContainer /></PermissionGate>;
}

