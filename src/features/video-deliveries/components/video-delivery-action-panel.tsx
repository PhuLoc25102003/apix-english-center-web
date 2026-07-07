"use client";
import * as React from "react";
import { Check, ClipboardPen, RotateCcw, SkipForward, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { hasPermission } from "@/lib/permissions/has-permission";
import { useConfirm } from "@/hooks/use-confirm";
import { usePrepareVideoMessage } from "../hooks/use-prepare-video-message";
import { useMarkVideoMessageCopied } from "../hooks/use-mark-video-message-copied";
import { useMarkVideoOpenedZalo } from "../hooks/use-mark-video-opened-zalo";
import { useMarkVideoSent } from "../hooks/use-mark-video-sent";
import { useMarkVideoFailed } from "../hooks/use-mark-video-failed";
import { useMarkVideoSkipped } from "../hooks/use-mark-video-skipped";
import { useReopenVideoDelivery } from "../hooks/use-reopen-video-delivery";
import { VideoMessagePreview } from "./video-message-preview";
import { VideoDeliveryHistory } from "./video-delivery-history";
import type { PreparedVideoMessage, VideoDelivery } from "../types/video-delivery.type";

export function VideoDeliveryActionPanel({ delivery, open, onOpenChange }: { delivery: VideoDelivery; open: boolean; onOpenChange: (open: boolean) => void }) {
  const confirm = useConfirm(); const prepare = usePrepareVideoMessage(); const copied = useMarkVideoMessageCopied(); const opened = useMarkVideoOpenedZalo(); const sent = useMarkVideoSent(); const failed = useMarkVideoFailed(); const skipped = useMarkVideoSkipped(); const reopen = useReopenVideoDelivery();
  const [message, setMessage] = React.useState<PreparedVideoMessage | null>(delivery.preparedMessage ?? null); const [reasonMode, setReasonMode] = React.useState<"failed" | "skipped" | null>(null); const [reason, setReason] = React.useState("");
  const isBusy = [prepare, copied, opened, sent, failed, skipped, reopen].some((mutation) => mutation.isPending);
  const prepareMessage = async () => { try { const response = await prepare.mutateAsync(delivery.id); setMessage(response.data); toast.success("Message prepared"); } catch { toast.error("The message endpoint is unavailable or the request failed."); } };
  const copyMessage = async () => { if (!message) return; try { await navigator.clipboard.writeText(message.messageContent); await copied.mutateAsync(delivery.id); toast.success("Message copied"); } catch { toast.error("Could not copy or record this action"); } };
  const openZalo = () => { const phone = (message?.parentPhone ?? delivery.parentPhone ?? "").replace(/\D/g, ""); const url = message?.zaloOpenUrl || (phone ? `https://zalo.me/${phone}` : ""); if (!url) { toast.error("No parent phone number is available"); return; } window.open(url, "_blank", "noopener,noreferrer"); opened.mutate(delivery.id, { onSuccess: () => toast.success("Zalo opened; forwarding remains manual"), onError: () => toast.error("Zalo opened, but the tracking endpoint could not be updated") }); };
  const markSent = async () => { if (!(await confirm({ title: "Mark as sent?", description: "Confirm only after the video was forwarded manually in Zalo.", confirmLabel: "Mark as Sent" }))) return; sent.mutate(delivery.id, { onSuccess: () => { toast.success("Marked as sent manually"); onOpenChange(false); }, onError: () => toast.error("Could not update delivery status") }); };
  const submitReason = () => { if (!reason.trim() || !reasonMode) return; const mutation = reasonMode === "failed" ? failed : skipped; mutation.mutate({ id: delivery.id, reason: reason.trim() }, { onSuccess: () => { toast.success(reasonMode === "failed" ? "Marked as failed" : "Marked as skipped"); setReasonMode(null); setReason(""); onOpenChange(false); }, onError: () => toast.error("Could not update delivery status") }); };
  const reopenDelivery = async () => { if (!(await confirm({ title: "Reopen delivery?", description: "The delivery returns to the active workflow.", confirmLabel: "Reopen" }))) return; reopen.mutate(delivery.id, { onSuccess: () => { toast.success("Delivery reopened"); onOpenChange(false); }, onError: () => toast.error("Could not reopen delivery") }); };
  return <>
    <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><DialogTitle>Manual Zalo delivery</DialogTitle><DialogDescription>Prepare the text here, forward the actual video in Zalo, then record the outcome.</DialogDescription></DialogHeader>
      <div className="space-y-5"><div className="rounded-xl bg-slate-50 p-4 text-sm"><strong>{delivery.studentFullName}</strong><span className="text-slate-500"> · {delivery.className} · {delivery.parentName ?? "No parent"} · {delivery.parentPhone ?? "No phone"}</span></div>
        {!message && hasPermission("video-delivery:prepare-message") && <Button onClick={() => void prepareMessage()} disabled={isBusy} className="bg-[#FF161A] text-white hover:bg-[#C90012]"><ClipboardPen className="h-4 w-4" />Prepare message</Button>}
        {message && <VideoMessagePreview message={message} busy={isBusy} canCopy={hasPermission("video-delivery:mark-copied")} canOpenZalo={hasPermission("video-delivery:open-zalo")} onCopy={() => void copyMessage()} onOpenZalo={openZalo} />}
        <div className="flex flex-wrap gap-2">
          {hasPermission("video-delivery:mark-sent") && !["SENT_MANUALLY", "CANCELLED"].includes(delivery.status) && <Button onClick={() => void markSent()} disabled={isBusy}><Check className="h-4 w-4" />Mark as Sent</Button>}
          {hasPermission("video-delivery:mark-failed") && !["SENT_MANUALLY", "CANCELLED"].includes(delivery.status) && <Button variant="outline" onClick={() => setReasonMode("failed")}><TriangleAlert className="h-4 w-4" />Mark as Failed</Button>}
          {hasPermission("video-delivery:mark-skipped") && !["SENT_MANUALLY", "CANCELLED"].includes(delivery.status) && <Button variant="outline" onClick={() => setReasonMode("skipped")}><SkipForward className="h-4 w-4" />Mark as Skipped</Button>}
          {hasPermission("video-delivery:reopen") && ["FAILED", "SKIPPED", "SENT_MANUALLY"].includes(delivery.status) && <Button variant="outline" onClick={() => void reopenDelivery()}><RotateCcw className="h-4 w-4" />Reopen</Button>}
        </div><VideoDeliveryHistory entries={delivery.history} />
      </div></DialogContent></Dialog>
    <Dialog open={reasonMode !== null} onOpenChange={(value) => !value && setReasonMode(null)}><DialogContent><DialogHeader><DialogTitle>{reasonMode === "failed" ? "Why did delivery fail?" : "Why is this delivery skipped?"}</DialogTitle><DialogDescription>A reason is required for the accountability log.</DialogDescription></DialogHeader><Textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Enter the reason" /><DialogFooter><Button variant="outline" onClick={() => setReasonMode(null)}>Cancel</Button><Button disabled={!reason.trim() || isBusy} onClick={submitReason}>Save status</Button></DialogFooter></DialogContent></Dialog>
  </>;
}
