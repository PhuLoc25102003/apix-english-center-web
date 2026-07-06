"use client";

import * as React from "react";
import { Copy, Check, Clock, AlertTriangle, QrCode } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadSession } from "../hooks/use-upload-session";
import type { VideoUploadSession } from "../types/media-video.type";

interface VideoUploadQrDialogProps {
  session: VideoUploadSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadSuccess: () => void;
}

export function VideoUploadQrDialog({
  session,
  open,
  onOpenChange,
  onUploadSuccess,
}: VideoUploadQrDialogProps) {
  const [copied, setCopied] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState<number>(0);

  // Poll the upload session endpoint every 3 seconds to check for completion
  const { data: polledSession } = useUploadSession(session?.uploadToken || "", {
    refetchInterval: open && session?.status === "PENDING" ? 3000 : undefined,
    enabled: !!session && open,
  });

  // Check if session status has changed to COMPLETED
  React.useEffect(() => {
    if (polledSession?.status === "COMPLETED") {
      toast.success("Học viên đã tải lên video thành công!");
      onUploadSuccess();
      onOpenChange(false);
    }
  }, [polledSession?.status, onUploadSuccess, onOpenChange]);

  // Expiry countdown timer logic
  React.useEffect(() => {
    if (!session?.expiresAt || !open) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(session.expiresAt) - +new Date();
      if (difference <= 0) {
        setTimeLeft(0);
        return;
      }
      setTimeLeft(Math.floor(difference / 1000));
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [session?.expiresAt, open]);

  const handleCopyLink = async () => {
    if (!session?.uploadPageUrl) return;
    try {
      await navigator.clipboard.writeText(session.uploadPageUrl);
      setCopied(true);
      toast.success("Đã sao chép liên kết tải lên!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép liên kết.");
    }
  };

  if (!session) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    session.uploadPageUrl || session.qrPayload
  )}`;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const isExpired = timeLeft === 0 || session.status === "EXPIRED" || polledSession?.status === "EXPIRED";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 flex flex-col items-center">
        <DialogHeader className="w-full text-center">
          <DialogTitle className="text-base font-bold text-slate-900 flex items-center justify-center gap-2">
            <QrCode className="h-5 w-5 text-[#FF161A]" /> Quét mã để Tải Video
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 mt-1">
            Quét mã QR bằng điện thoại di động (Zalo, Camera, QR Scanner) để mở trang tải lên trực tiếp.
          </DialogDescription>
        </DialogHeader>

        {/* Expiry / Status Box */}
        {isExpired ? (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 mt-3 text-rose-700 text-xs font-semibold">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />
            <span>Mã QR này đã hết hạn. Vui lòng tạo phiên mới.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 mt-3 text-amber-800 text-xs font-semibold">
            <Clock className="h-4 w-4 shrink-0 text-amber-500 animate-pulse" />
            <span>
              Mã QR hết hạn sau: <span className="font-mono text-sm font-bold text-[#C90012]">{formattedTime}</span>
            </span>
          </div>
        )}

        {/* QR Code Frame */}
        <div className="relative my-5 p-4 bg-white border border-slate-100 shadow-md rounded-2xl flex items-center justify-center w-52 h-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrImageUrl}
            alt="Mã QR Tải Lên Video"
            className={`w-44 h-44 object-contain transition-opacity duration-300 ${
              isExpired ? "opacity-20 select-none pointer-events-none" : "opacity-100"
            }`}
          />
          {isExpired && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-600 font-bold text-sm bg-white/40 backdrop-blur-xs rounded-2xl">
              <span>ĐÃ HẾT HẠN</span>
            </div>
          )}
        </div>

        {/* Session Meta */}
        <div className="w-full bg-slate-50/80 rounded-2xl p-4 border border-slate-100/60 text-xs text-slate-600 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Lớp:</span>
            <span className="font-bold text-slate-800">{session.className || "Chưa xác định"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Học viên:</span>
            <span className="font-bold text-slate-800">{session.studentName || "Chưa xác định"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-slate-500">Loại:</span>
            <span className="font-bold text-slate-800">
              {session.videoType === "CLASS_ACTIVITY"
                ? "Hoạt động lớp học"
                : session.videoType === "MONTHLY_REVIEW"
                ? "Đánh giá tháng"
                : session.videoType === "FINAL_PROJECT"
                ? "Video cuối khóa"
                : "Khác"}
            </span>
          </div>
          {session.title && (
            <div className="pt-2 border-t border-slate-200/50 flex flex-col gap-0.5">
              <span className="font-semibold text-slate-500">Tên Video:</span>
              <span className="font-semibold text-slate-800 line-clamp-2">{session.title}</span>
            </div>
          )}
        </div>

        {/* Copy Upload Link */}
        <div className="w-full flex gap-2.5 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyLink}
            disabled={isExpired}
            className="flex-1 rounded-xl h-10 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" /> Đã sao chép
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Sao chép liên kết
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
