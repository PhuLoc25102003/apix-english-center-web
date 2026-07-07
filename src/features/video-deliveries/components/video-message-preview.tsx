import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PreparedVideoMessage } from "../types/video-delivery.type";

export function VideoMessagePreview({ message, onCopy, onOpenZalo, busy, canCopy = true, canOpenZalo = true }: { message: PreparedVideoMessage; onCopy: () => void; onOpenZalo: () => void; busy?: boolean; canCopy?: boolean; canOpenZalo?: boolean }) {
  return <div className="space-y-4 rounded-2xl border border-[#FF161A]/10 bg-white/70 p-4">
    <div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Parent</p><p className="font-semibold text-slate-900">{message.parentName} · {message.parentPhone}</p></div>
    <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{message.messageContent}</div>
    <p className="text-xs text-slate-500">The video is forwarded separately in Zalo. This message contains no video link.</p>
    <div className="flex flex-wrap gap-2">{canCopy && <Button variant="outline" onClick={onCopy} disabled={busy}><Copy className="h-4 w-4" />Copy message</Button>}{canOpenZalo && <Button onClick={onOpenZalo} disabled={busy} className="bg-[#FF161A] text-white hover:bg-[#C90012]"><ExternalLink className="h-4 w-4" />Open Zalo</Button>}</div>
  </div>;
}
