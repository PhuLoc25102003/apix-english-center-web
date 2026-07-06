"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  UserX,
  CreditCard,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfficeDashboard } from "../hooks/use-dashboard";
import { StatusBadge } from "@/components/common/status-badge";

const statusLabelVietnamese: Record<string, string> = {
  NOT_STARTED: "Chưa bắt đầu",
  IN_PROGRESS: "Đang học",
  SUBMITTED: "Chờ duyệt điểm danh",
  REVIEWED: "Đã duyệt điểm danh",
  OVERDUE: "Trễ điểm danh (30p+)",
};

const statusBadgeVariants: Record<string, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  SUBMITTED: "bg-amber-100 text-amber-800",
  REVIEWED: "bg-emerald-100 text-emerald-800",
  OVERDUE: "bg-red-100 text-red-800",
};

export function OfficeDashboard() {
  const { data, isLoading } = useOfficeDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
      </div>
    );
  }

  const { todayClasses, pendingWeeklyUpdatesCount, pendingReportsCount, tuitionOverdueCount, absentTodayCount } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <Link href="/weekly-updates/review" className="glass-card p-6 flex justify-between border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Báo cáo tuần chờ duyệt</span>
            <span className="font-display text-2xl font-black text-slate-900">{pendingWeeklyUpdatesCount}</span>
            <span className="text-xs font-semibold text-slate-400">Xem danh sách chờ duyệt</span>
          </div>
          <div className="rounded-xl bg-amber-50 p-2 text-amber-600 self-start">
            <FileText className="h-5 w-5" />
          </div>
        </Link>

        {/* Metric 2 */}
        <Link href="/learning-reports/review" className="glass-card p-6 flex justify-between border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Báo cáo định kỳ chờ duyệt</span>
            <span className="font-display text-2xl font-black text-slate-900">{pendingReportsCount}</span>
            <span className="text-xs font-semibold text-slate-400">Xem nhận xét của giáo viên</span>
          </div>
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600 self-start">
            <FileText className="h-5 w-5" />
          </div>
        </Link>

        {/* Metric 3 */}
        <Link href="/tuition/invoices" className="glass-card p-6 flex justify-between border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hóa đơn học phí quá hạn</span>
            <span className="font-display text-2xl font-black text-slate-900">{tuitionOverdueCount}</span>
            <span className="text-xs font-semibold text-rose-600">Cần gửi nhắc nhở</span>
          </div>
          <div className="rounded-xl bg-red-50 p-2 text-red-600 self-start">
            <CreditCard className="h-5 w-5" />
          </div>
        </Link>

        {/* Metric 4 */}
        <Link href="/attendance/monitor" className="glass-card p-6 flex justify-between border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Học viên vắng hôm nay</span>
            <span className="font-display text-2xl font-black text-slate-900">{absentTodayCount}</span>
            <span className="text-xs font-semibold text-rose-600">Gọi điện xác nhận phép</span>
          </div>
          <div className="rounded-xl bg-red-50 p-2 text-[#C90012] self-start">
            <UserX className="h-5 w-5" />
          </div>
        </Link>
      </div>

      {/* Task Board / Today classes */}
      <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#FF161A]" />
              Tiến độ điểm danh lớp học hôm nay
            </h3>
            <p className="text-xs text-slate-500">Giáo viên phải hoàn thành điểm danh trong vòng 30 phút sau khi lớp học bắt đầu.</p>
          </div>
          <Link
            href="/attendance/monitor"
            className="text-xs font-bold text-[#C90012] hover:text-[#FF161A] flex items-center gap-1 cursor-pointer"
          >
            Mở bảng theo dõi chuyên cần
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Lớp học / Mã</th>
                <th className="py-3 px-4">Giờ học</th>
                <th className="py-3 px-4">Giáo viên / Phòng</th>
                <th className="py-3 px-4">Trạng thái điểm danh</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {todayClasses.map((cls) => (
                <tr key={cls.id} className="border-b border-slate-200/30 text-xs text-slate-700 hover:bg-white/30">
                  <td className="py-3.5 px-4">
                    <span className="block font-bold text-slate-900">{cls.className}</span>
                    <span className="block text-[10px] font-mono text-slate-500 mt-0.5">{cls.classCode}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {cls.timeSlot}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="block font-semibold text-slate-800">{cls.teacherName}</span>
                    <span className="block text-[10px] text-slate-500 mt-0.5">{cls.roomCode}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      statusBadgeVariants[cls.status]
                    )}>
                      {statusLabelVietnamese[cls.status]}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/sessions/${cls.id}/attendance`}
                      className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
                    >
                      Kiểm tra điểm danh
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
