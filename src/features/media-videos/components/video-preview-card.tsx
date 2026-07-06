"use client";

import * as React from "react";
import { Play, FileVideo, Film } from "lucide-react";
import type { MediaVideo } from "../types/media-video.type";

interface VideoPreviewCardProps {
  video: MediaVideo;
}

export function VideoPreviewCard({ video }: VideoPreviewCardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const hasPlayback = !!video.playbackUrl;

  if (!hasPlayback) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white border border-slate-800 p-4 text-center select-none shadow-inner">
        {video.status === "PROCESSING" ? (
          <>
            <div className="relative flex h-8 w-8 items-center justify-center mb-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF161A] opacity-35"></span>
              <Film className="h-6 w-6 text-[#FF161A]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Đang xử lý Video</span>
            <span className="text-[10px] text-slate-500 mt-1 max-w-[220px]">
              Tệp tin đang được chuyển mã tối ưu cho trình duyệt web. Vui lòng chờ vài phút.
            </span>
          </>
        ) : (
          <>
            <FileVideo className="h-8 w-8 text-slate-500 mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Không có bản xem trước</span>
            <span className="text-[10px] text-slate-500 mt-1 max-w-[220px]">
              Tệp tin chưa sẵn sàng hoặc không hỗ trợ phát trực tuyến.
            </span>
          </>
        )}
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="aspect-video w-full rounded-2xl bg-black border border-slate-800 overflow-hidden relative shadow-2xl">
        <video
          src={video.playbackUrl}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative group cursor-pointer shadow-lg shadow-black/15">
      {/* Thumbnail placeholder */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-lg scale-90 group-hover:scale-100 transition-transform">
            <Play className="h-7 w-7 text-white fill-white ml-0.5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Xem Video</span>
        </div>
      </div>

      {/* Meta overlays */}
      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center pointer-events-none">
        <span className="bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-wide">
          {video.videoType === "CLASS_ACTIVITY"
            ? "Hoạt động lớp học"
            : video.videoType === "MONTHLY_REVIEW"
            ? "Đánh giá tháng"
            : "Cuối khóa"}
        </span>

        {video.durationSeconds && (
          <span className="bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md border border-white/10">
            {Math.floor(video.durationSeconds / 60)}:{(video.durationSeconds % 60).toString().padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Click handler */}
      <button
        onClick={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Play video"
      />
    </div>
  );
}
