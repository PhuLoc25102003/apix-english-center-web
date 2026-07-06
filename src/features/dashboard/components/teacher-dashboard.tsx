"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Edit,
  Clock,
  Sparkles,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeacherDashboard } from "../hooks/use-dashboard";

export function TeacherDashboard() {
  const { data, isLoading } = useTeacherDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
      </div>
    );
  }

  const { assignedClasses, pendingUpdatesCount, pendingReportsCount, overdueTasksCount } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Overview stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cần nộp Báo cáo tuần</span>
            <div className="rounded-lg bg-[#FFE7E8] p-1.5 text-[#C90012]">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-2 block">{pendingUpdatesCount} bản nháp</span>
          <p className="text-[10px] text-slate-500 mt-1">Cập nhật những gì lớp đã học & bài tập về nhà.</p>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Báo cáo định kỳ chờ viết</span>
            <div className="rounded-lg bg-[#FFE7E8] p-1.5 text-[#C90012]">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-2 block">{pendingReportsCount} học viên</span>
          <p className="text-[10px] text-slate-500 mt-1">Nhận xét chi tiết cho chu kỳ 2 tháng của lớp.</p>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl border-l-4 border-l-[#C90012]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nhiệm vụ trễ hạn</span>
            <div className="rounded-lg bg-red-50 p-1.5 text-[#C90012]">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-2 block text-[#C90012]">{overdueTasksCount} buổi học</span>
          <p className="text-[10px] text-rose-600 mt-1">Vui lòng hoàn thành điểm danh lớp học ngay.</p>
        </div>
      </div>

      {/* Class Schedule and Attendance Tasks */}
      <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
        <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-[#FF161A]" />
          Lịch dạy và Nhiệm vụ Điểm danh
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {assignedClasses.map((cls) => (
            <div
              key={cls.id}
              className="flex flex-col justify-between border border-slate-200/50 bg-white/50 p-4 rounded-xl shadow-xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{cls.className}</h4>
                  <span className="font-mono text-[10px] text-slate-500">{cls.classCode}</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">{cls.roomCode}</span>
              </div>

              <div className="my-4 h-px bg-slate-200/50" />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {cls.nextSessionTime}
                </span>

                {cls.attendanceStatus === "NOT_MARKED" || cls.attendanceStatus === "OVERDUE" ? (
                  <Link
                    href={`/sessions/${cls.id}/attendance`}
                    className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-[#FF161A] px-3.5 text-xs font-semibold text-white hover:bg-[#C90012] transition-colors shadow-md shadow-[#FF161A]/10"
                  >
                    Điểm danh ngay
                  </Link>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                    Đã hoàn thành
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
