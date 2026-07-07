"use client";
import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VideoDeliveryStatusBadge } from "./video-delivery-status-badge";
import { VideoDeliveryActionPanel } from "./video-delivery-action-panel";
import type { VideoDelivery } from "../types/video-delivery.type";

const typeLabel = (value: string) => value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
export function VideoDeliveryTable({ deliveries }: { deliveries: VideoDelivery[] }) {
  const [selected, setSelected] = React.useState<VideoDelivery | null>(null);
  return <><div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80"><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Student / class</TableHead><TableHead>Parent contact</TableHead><TableHead>Video</TableHead><TableHead>Status</TableHead><TableHead>Sent by</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
    {deliveries.map((delivery) => <TableRow key={delivery.id}><TableCell><p className="font-semibold text-slate-900">{delivery.studentFullName}</p><p className="text-xs text-slate-500">{delivery.className}</p></TableCell><TableCell><p className="font-medium">{delivery.parentName ?? "—"}</p><p className="text-xs text-slate-500">{delivery.parentPhone ?? "No phone"}</p></TableCell><TableCell><p className="max-w-56 truncate font-medium">{delivery.title}</p><p className="text-xs text-slate-500">{typeLabel(delivery.videoType)}{delivery.targetMonth ? ` · ${delivery.targetMonth}` : ""}</p></TableCell><TableCell><VideoDeliveryStatusBadge status={delivery.status} /></TableCell><TableCell><p className="text-sm">{delivery.sentByEmployeeName ?? "—"}</p><p className="text-xs text-slate-500">{delivery.sentAt ? new Date(delivery.sentAt).toLocaleString() : "Not sent"}</p></TableCell><TableCell className="text-right"><Button variant="outline" size="sm" onClick={() => setSelected(delivery)}><MoreHorizontal className="h-4 w-4" />Manage</Button></TableCell></TableRow>)}
  </TableBody></Table></div></div>{selected && <VideoDeliveryActionPanel delivery={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />}</>;
}

