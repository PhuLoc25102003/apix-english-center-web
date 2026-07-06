"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PermissionGate } from "@/components/common/permission-gate";
import {
  VideoReviewPanel,
  VideoShareLinkPanel,
  ManualZaloVideoDeliveryPanel,
  useMediaVideoDetail,
} from "@/features/media-videos";

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: video, isLoading, isError, refetch } = useMediaVideoDetail(id);

  return (
    <PermissionGate
      permission="media-video:read"
      fallback={
        <div className="glass-card border border-rose-100 bg-white/40 p-8 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-slate-800">Không có quyền truy cập</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tài khoản không được phân quyền xem chi tiết video (media-video:read).
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/media/videos")}
            className="rounded-lg h-8 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
          </Button>
          <h2 className="text-lg font-bold text-slate-900">Chi tiết Video</h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-xl bg-white/40 animate-pulse" />
            <Skeleton className="h-40 w-full rounded-xl bg-white/40 animate-pulse" />
          </div>
        ) : isError || !video ? (
          <div className="glass-card border border-white/60 bg-white/40 p-8 rounded-2xl text-center">
            <h3 className="text-sm font-bold text-slate-800">Không tìm thấy video</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Video không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={() => void refetch()} className="bg-slate-900 text-white rounded-xl h-9 text-xs">
              Thử lại
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <VideoReviewPanel video={video} onSuccess={() => void refetch()} />
            </div>
            <div className="flex flex-col gap-6">
              <VideoShareLinkPanel video={video} />
              {(video.status === "APPROVED" || video.status === "DELIVERED") && (
                <ManualZaloVideoDeliveryPanel video={video} />
              )}
            </div>
          </div>
        )}
      </div>
    </PermissionGate>
  );
}
