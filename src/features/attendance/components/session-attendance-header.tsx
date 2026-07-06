"use client";

/**
 * src/features/attendance/components/session-attendance-header.tsx
 *
 * Header component displaying class session metadata information
 * and back navigation buttons.
 */

import * as React from "react";
import { ArrowLeft, Calendar, Clock, DoorOpen, Layers, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import type { ClassSession, ClassSessionStatus } from "../types/attendance.type";
import type { ClassRecord } from "@/features/classes/types/class.type";
import type { Room } from "@/features/rooms/types/room.type";

interface SessionAttendanceHeaderProps {
  session: ClassSession;
  classes: ClassRecord[];
  rooms: Room[];
}

const statusLabels: Record<ClassSessionStatus, string> = {
  PLANNED: "Lên kế hoạch",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  RESCHEDULED: "Đổi lịch",
};

const statusBadgeKeys: Record<ClassSessionStatus, string> = {
  PLANNED: "PLANNING",
  COMPLETED: "ACTIVE",
  CANCELLED: "CANCELLED",
  RESCHEDULED: "OPEN",
};

export function SessionAttendanceHeader({
  session,
  classes,
  rooms,
}: SessionAttendanceHeaderProps) {
  const router = useRouter();

  const classObj = classes.find((c) => c.id === session.classId);
  const roomObj = rooms.find((r) => r.id === session.roomId);

  const classLabel = classObj
    ? `${classObj.classCode} - ${classObj.name}`
    : "Đang tải...";
  const roomLabel = roomObj
    ? `${roomObj.code} (${roomObj.name})`
    : "Đang tải...";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/40 p-5 shadow-xs backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => {
            if (session.classId) {
              router.push(`/classes/${session.classId}/sessions`);
            } else {
              router.push("/attendance");
            }
          }}
          className="h-9 w-9 p-0 rounded-xl bg-white/60 hover:bg-white text-slate-700 cursor-pointer border-border/60 transition-colors"
          title="Quay lại"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Điểm Danh Lớp Học: {classObj?.classCode || ""}
            </h1>
            <StatusBadge
              status={statusBadgeKeys[session.status]}
              customLabel={statusLabels[session.status]}
            />
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Thông tin chi tiết và danh sách điểm danh học viên buổi học.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-white/40 mt-1">
        {/* Class Info */}
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-[#FF161A]/10 rounded-xl text-[#FF161A] shrink-0">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lớp học</span>
            <span className="text-sm font-semibold text-slate-800 line-clamp-1">{classLabel}</span>
          </div>
        </div>

        {/* Date Info */}
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-[#FF161A]/10 rounded-xl text-[#FF161A] shrink-0">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày học</span>
            <span className="text-sm font-semibold text-slate-800 tabular-nums">{session.sessionDate}</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-[#FF161A]/10 rounded-xl text-[#FF161A] shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Khung giờ</span>
            <span className="text-sm font-semibold text-slate-800 tabular-nums">
              {session.startTime} - {session.endTime}
            </span>
          </div>
        </div>

        {/* Room Info */}
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-[#FF161A]/10 rounded-xl text-[#FF161A] shrink-0">
            <DoorOpen className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phòng học / Buổi</span>
            <span className="text-sm font-semibold text-slate-800 line-clamp-1">
              {roomLabel} {session.lessonNo !== null ? `(Buổi ${session.lessonNo})` : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
