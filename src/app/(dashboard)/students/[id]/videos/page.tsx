"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/components/common/permission-gate";
import { VideoListContainer } from "@/features/media-videos";

export default function StudentVideosPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  return (
    <PermissionGate
      permission="media-video:read"
      fallback={
        <div className="glass-card border border-[#FF161A]/10 bg-white/40 p-8 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-slate-800">Không có quyền truy cập</h3>
          <p className="text-xs text-slate-500 mt-1">
            Tài khoản không được phân quyền xem video học viên (media-video:read).
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/students/${studentId}`)}
            className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại hồ sơ học viên
          </Button>
        </div>

        <VideoListContainer
          initialStudentId={studentId}
          title="Thư viện Video học viên (Student Media)"
          description="Lưu trữ, duyệt và quản lý các video hoạt động, video đánh giá cá nhân tháng của riêng học viên này."
        />
      </div>
    </PermissionGate>
  );
}
