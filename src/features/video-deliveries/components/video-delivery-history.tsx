import { History } from "lucide-react";
import type { VideoDeliveryHistoryEntry } from "../types/video-delivery.type";

export function VideoDeliveryHistory({ entries = [] }: { entries?: VideoDeliveryHistoryEntry[] }) {
  return <section className="space-y-3"><h3 className="flex items-center gap-2 font-bold text-slate-900"><History className="h-4 w-4 text-[#FF161A]" />Delivery history</h3>
    {entries.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No delivery events have been recorded yet.</p> : <ol className="space-y-3">{entries.map((entry) => <li key={entry.id} className="border-l-2 border-[#FF161A]/20 pl-4 text-sm"><div className="flex justify-between gap-3"><span className="font-semibold text-slate-800">{entry.action.replaceAll("_", " ")}</span><time className="text-xs text-slate-400">{new Date(entry.createdAt).toLocaleString()}</time></div><p className="text-slate-500">{entry.actorName ?? "System"}{entry.note ? ` · ${entry.note}` : ""}</p></li>)}</ol>}
  </section>;
}

