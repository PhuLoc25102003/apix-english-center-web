"use client";

import * as React from "react";
import { PermissionGate } from "@/components/common/permission-gate";
import { VideoListContainer } from "@/features/media-videos";

export default function VideosPage() {
  return (
    <PermissionGate
      permission="media-video:read"
      fallback={
        <div className="glass-card border border-[#FF161A]/10 bg-white/40 p-8 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-slate-800">Không có quyền truy cập</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tài khoản của bạn không được phân quyền xem thư viện video (media-video:read). Vui lòng liên hệ quản trị viên.
          </p>
        </div>
      }
    >
      <VideoListContainer />
    </PermissionGate>
  );
}
