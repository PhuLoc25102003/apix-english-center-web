"use client";

import * as React from "react";
import { CheckCircle, AlertOctagon, RefreshCw, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApproveVideo } from "../hooks/use-approve-video";
import { useRejectVideo } from "../hooks/use-reject-video";
import { VideoPreviewCard } from "./video-preview-card";
import { VideoStatusBadge } from "./video-status-badge";
import { formatBytes } from "../utils/video-upload.utils";
import type { MediaVideo } from "../types/media-video.type";

interface VideoReviewPanelProps {
  video: MediaVideo;
  onSuccess?: () => void;
}

export function VideoReviewPanel({ video, onSuccess }: VideoReviewPanelProps) {
  const [rejectReason, setRejectReason] = React.useState("");
  const [showRejectForm, setShowRejectForm] = React.useState(false);

  const approveMutation = useApproveVideo();
  const rejectMutation = useRejectVideo();

  const handleApprove = async () => {
    try {
      await approveMutation.mutateAsync(video.id);
      toast.success("Đã phê duyệt video thành công!");
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể phê duyệt video."
      );
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối.");
      return;
    }

    try {
      await rejectMutation.mutateAsync({
        id: video.id,
        reason: rejectReason,
      });
      toast.success("Đã từ chối video.");
      setRejectReason("");
      setShowRejectForm(false);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể từ chối video."
      );
    }
  };

  const isPendingReview =
    video.status === "UPLOADED" ||
    video.status === "PROCESSING" ||
    video.status === "READY";

  return (
    <div className="glass-card border border-white/60 bg-white/40 p-5 rounded-2xl shadow-xs backdrop-blur-md flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Xem duyệt Video</span>
          <h3 className="font-bold text-slate-800 text-sm mt-0.5 leading-snug line-clamp-1">{video.title}</h3>
        </div>
        <VideoStatusBadge status={video.status} className="shrink-0" />
      </div>

      {/* Video Player */}
      <VideoPreviewCard video={video} />

      {/* Metadata details */}
      <div className="bg-slate-50/70 p-4 border border-slate-100/60 rounded-2xl space-y-2 text-xs text-slate-600">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Học viên:</span>
            <span className="font-bold text-slate-800">{video.studentName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Lớp học:</span>
            <span className="font-bold text-slate-800">{video.className}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Áp dụng:</span>
            <span className="font-semibold text-slate-700">Tháng {video.targetMonth.split("-").reverse().join("/")}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-400 font-medium">Dung lượng:</span>
            <span className="font-semibold text-slate-700">{formatBytes(video.fileSizeBytes)}</span>
          </div>
        </div>

        {video.uploadedByName && (
          <div className="pt-2 border-t border-slate-200/50 flex justify-between">
            <span className="text-slate-400 font-medium">Người tải lên:</span>
            <span className="font-semibold text-slate-700">{video.uploadedByName}</span>
          </div>
        )}
      </div>

      {/* Status Alert Panels */}
      {video.status === "APPROVED" && (
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-800 space-y-0.5">
            <p className="font-bold">Đã được phê duyệt</p>
            {video.approvedByName && (
              <p className="text-[10px] text-emerald-700">Duyệt bởi: {video.approvedByName}</p>
            )}
          </div>
        </div>
      )}

      {video.status === "REJECTED" && (
        <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3 flex items-start gap-2.5">
          <AlertOctagon className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-800 space-y-0.5">
            <p className="font-bold">Video bị từ chối</p>
            {video.description && (
              <p className="text-[11px] font-medium leading-relaxed italic">Lý do: &ldquo;{video.description}&rdquo;</p>
            )}
          </div>
        </div>
      )}

      {/* Review Actions */}
      {isPendingReview && !showRejectForm && (
        <div className="flex gap-2.5 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowRejectForm(true)}
            className="flex-1 rounded-xl h-10 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 text-xs font-semibold cursor-pointer"
          >
            Từ chối duyệt
          </Button>

          <Button
            type="button"
            onClick={handleApprove}
            disabled={approveMutation.isPending}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 transition-all"
          >
            {approveMutation.isPending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="h-4.5 w-4.5" />
            )}
            Duyệt phát hành
          </Button>
        </div>
      )}

      {showRejectForm && (
        <form onSubmit={handleReject} className="space-y-3 pt-1 border-t border-slate-200/40">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-rose-800">Lý do từ chối phê duyệt</label>
            <Input
              type="text"
              placeholder="Nhập lý do từ chối (ví dụ: Hình ảnh mờ, Thiếu âm thanh...)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-white/50 border-slate-200 rounded-xl text-xs"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowRejectForm(false);
                setRejectReason("");
              }}
              className="text-slate-500 text-xs hover:bg-slate-100 rounded-lg h-8 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={rejectMutation.isPending}
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs h-8 px-4 cursor-pointer font-bold flex items-center gap-1"
            >
              {rejectMutation.isPending ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <XCircle className="h-3.5 w-3.5" />
              )}
              Xác nhận từ chối
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
