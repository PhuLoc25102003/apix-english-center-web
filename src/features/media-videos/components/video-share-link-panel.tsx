"use client";

import * as React from "react";
import { Share2, Copy, Check, Lock, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateVideoShareLink, useRevokeVideoShareLink } from "../hooks/use-create-video-share-link";
import type { MediaVideo } from "../types/media-video.type";

interface VideoShareLinkPanelProps {
  video: MediaVideo;
}

export function VideoShareLinkPanel({ video }: VideoShareLinkPanelProps) {
  const [copied, setCopied] = React.useState(false);
  const [localShareUrl, setLocalShareUrl] = React.useState<string | null>(null);

  const createShareLinkMutation = useCreateVideoShareLink();
  const revokeShareLinkMutation = useRevokeVideoShareLink();

  const activeShareUrl = localShareUrl || video.playbackUrl; // Fallback or direct check

  const handleGenerate = async () => {
    try {
      const response = await createShareLinkMutation.mutateAsync(video.id);
      setLocalShareUrl(response.shareUrl);
      toast.success("Đã tạo liên kết chia sẻ thành công!");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể tạo liên kết. Vui lòng thử lại."
      );
    }
  };

  const handleRevoke = async () => {
    try {
      await revokeShareLinkMutation.mutateAsync(video.id);
      setLocalShareUrl(null);
      toast.success("Đã thu hồi liên kết chia sẻ.");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể thu hồi liên kết."
      );
    }
  };

  const handleCopy = async () => {
    if (!activeShareUrl) return;
    try {
      await navigator.clipboard.writeText(activeShareUrl);
      setCopied(true);
      toast.success("Đã sao chép liên kết chia sẻ!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép liên kết.");
    }
  };

  return (
    <div className="glass-card border border-white/60 bg-white/40 p-5 rounded-2xl shadow-xs backdrop-blur-md flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
        <Share2 className="h-5 w-5 text-[#FF161A]" />
        <h3 className="font-bold text-slate-800 text-sm">Liên kết Chia sẻ (Parent Share Link)</h3>
      </div>

      {activeShareUrl ? (
        <div className="space-y-3.5">
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Phụ huynh có thể xem video trực tiếp thông qua liên kết công khai này mà không cần đăng nhập tài khoản.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={activeShareUrl}
              className="flex-1 bg-white/50 border border-slate-200 text-xs px-3 rounded-xl focus:outline-hidden text-slate-700 h-9 font-medium overflow-ellipsis"
            />

            <Button
              variant="outline"
              onClick={handleCopy}
              className="rounded-xl h-9 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 shrink-0 cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Đã copy" : "Copy"}
            </Button>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              variant="ghost"
              onClick={handleRevoke}
              disabled={revokeShareLinkMutation.isPending}
              className="text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl text-xs h-8 cursor-pointer flex items-center gap-1"
            >
              {revokeShareLinkMutation.isPending ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Thu hồi liên kết
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-4 text-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-700 text-xs">Chưa kích hoạt chia sẻ</h4>
            <p className="text-[10px] text-slate-400 max-w-[280px]">
              Tạo liên kết chia sẻ bảo mật để cho phép phụ huynh học viên xem video của con.
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={createShareLinkMutation.isPending}
            className="mt-1 bg-[#FF161A] text-white hover:bg-[#C90012] px-4 rounded-xl font-bold text-xs h-9 cursor-pointer flex items-center gap-1.5 shadow-md shadow-[#FF161A]/10 transition-all"
          >
            {createShareLinkMutation.isPending ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            Tạo liên kết chia sẻ
          </Button>
        </div>
      )}
    </div>
  );
}
