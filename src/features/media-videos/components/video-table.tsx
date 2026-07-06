"use client";

import * as React from "react";
import { MoreVertical, Eye, Share2, MessageSquare, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VideoStatusBadge } from "./video-status-badge";
import { formatBytes, formatDuration } from "../utils/video-upload.utils";
import type { MediaVideo } from "../types/media-video.type";
import { useApproveVideo } from "../hooks/use-approve-video";
import { toast } from "sonner";

interface VideoTableProps {
  videos: MediaVideo[];
  onReview: (video: MediaVideo) => void;
  onShare: (video: MediaVideo) => void;
  onZalo: (video: MediaVideo) => void;
}

export function VideoTable({ videos, onReview, onShare, onZalo }: VideoTableProps) {
  const approveMutation = useApproveVideo();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "CLASS_ACTIVITY":
        return "Hoạt động lớp học";
      case "MONTHLY_REVIEW":
        return "Đánh giá tháng";
      case "FINAL_PROJECT":
        return "Video cuối khóa";
      default:
        return "Khác";
    }
  };

  const handleApproveFast = async (id: string) => {
    try {
      await approveMutation.mutateAsync(id);
      toast.success("Đã duyệt nhanh video thành công!");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể duyệt video."
      );
    }
  };

  return (
    <div className="glass-card overflow-hidden border border-white/60 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Video / Tiêu đề</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Học viên / Lớp</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Loại / Tháng</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Dung lượng / TL</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Người tải lên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày duyệt</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => {
              const canApprove =
                video.status === "UPLOADED" ||
                video.status === "PROCESSING" ||
                video.status === "READY";

              return (
                <TableRow
                  key={video.id}
                  className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                >
                  {/* Video Title */}
                  <TableCell className="max-w-[220px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-900 line-clamp-2">{video.title}</span>
                      {video.originalFileName && (
                        <span className="text-[10px] text-slate-400 font-mono line-clamp-1">
                          {video.originalFileName}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Student / Class */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{video.studentName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Lớp: {video.className}</span>
                    </div>
                  </TableCell>

                  {/* Type / Month */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-700 font-medium">{getTypeName(video.videoType)}</span>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        Tháng {video.targetMonth.split("-").reverse().join("/")}
                      </span>
                    </div>
                  </TableCell>

                  {/* Size / Duration */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-600">{formatBytes(video.fileSizeBytes)}</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {video.durationSeconds ? formatDuration(video.durationSeconds) : "--:--"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <VideoStatusBadge status={video.status} />
                  </TableCell>

                  {/* Uploaded By */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-700 font-semibold">{video.uploadedByName || "-"}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(video.createdAt)}</span>
                    </div>
                  </TableCell>

                  {/* Approved At / By */}
                  <TableCell>
                    {video.status === "APPROVED" || video.status === "DELIVERED" ? (
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-700 font-semibold">{video.approvedByName || "Hệ thống"}</span>
                        <span className="text-[10px] text-slate-400">{formatDate(video.approvedAt)}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn video"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] glass-card p-1">
                        {/* Play / Review */}
                        <DropdownMenuItem
                          onClick={() => onReview(video)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span>Xem & Duyệt</span>
                        </DropdownMenuItem>

                        {/* Fast Approve */}
                        {canApprove && (
                          <DropdownMenuItem
                            onClick={() => handleApproveFast(video.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Duyệt nhanh</span>
                          </DropdownMenuItem>
                        )}

                        {/* Share link (active if approved/ready/delivered) */}
                        <DropdownMenuItem
                          onClick={() => onShare(video)}
                          disabled={video.status === "REJECTED"}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Share2 className="h-4 w-4 text-slate-400" />
                          <span>Liên kết chia sẻ</span>
                        </DropdownMenuItem>

                        {/* Send Zalo message (requires approved / delivered status) */}
                        <DropdownMenuItem
                          onClick={() => onZalo(video)}
                          disabled={video.status !== "APPROVED" && video.status !== "DELIVERED"}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-[#0068FF] hover:bg-[#0068FF]/5 rounded-lg cursor-pointer transition-colors"
                        >
                          <MessageSquare className="h-4 w-4 text-[#0068FF]/70" />
                          <span>Gửi Zalo PH</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
