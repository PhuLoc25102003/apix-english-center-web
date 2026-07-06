"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  CalendarDays,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useEmployeeDashboard } from "../hooks/use-dashboard";

export function EmployeeDashboard() {
  const { data, isLoading } = useEmployeeDashboard();

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
      </div>
    );
  }

  const { salarySummary, leaveStatus, workHoursThisMonth } = data;

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Giờ làm việc trong tháng</span>
            <span className="font-display text-2xl font-black text-slate-900">{workHoursThisMonth} giờ</span>
            <span className="text-xs text-slate-400">Dựa trên lịch biểu dạy học & chấm công</span>
          </div>
          <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ngày phép còn lại</span>
            <span className="font-display text-2xl font-black text-slate-900">{leaveStatus.remainingDays} ngày</span>
            <span className="text-xs text-emerald-600">Đã duyệt {leaveStatus.approved} ngày nghỉ</span>
          </div>
          <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
            <CalendarDays className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl border-l-4 border-l-[#C90012] flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dự tính lương thực nhận</span>
            <span className="font-display text-2xl font-black text-[#C90012]">
              {(salarySummary.netSalary / 1000000).toFixed(1)}M ₫
            </span>
            <span className="text-xs text-slate-400">Bao gồm phụ cấp & khấu trừ phép nghỉ</span>
          </div>
          <div className="rounded-xl bg-red-50 p-2 text-[#C90012]">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Salary Breakdowns and Leave Request links */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
          <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Wallet className="h-4 w-4 text-[#FF161A]" />
            Chi tiết lương tháng này
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-200/30">
              <span className="text-slate-500">Lương cơ bản / Lương giờ</span>
              <span className="font-semibold text-slate-800">{salarySummary.baseSalary.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/30">
              <span className="text-slate-500">Phụ cấp giảng dạy & công việc</span>
              <span className="font-semibold text-emerald-600">+{salarySummary.allowances.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/30">
              <span className="text-slate-500">Khấu trừ ngày nghỉ phép không lương</span>
              <span className="font-semibold text-rose-600">-{salarySummary.leaveDeductions.toLocaleString("vi-VN")} ₫</span>
            </div>
            <div className="flex justify-between pt-3 font-bold text-slate-900 text-base">
              <span>Thực lĩnh (Tạm tính)</span>
              <span>{salarySummary.netSalary.toLocaleString("vi-VN")} ₫</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#FF161A]" />
              Trạng thái yêu cầu nghỉ phép
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-200/50">
                <span className="text-sm font-semibold text-slate-700">Đang chờ quản lý phê duyệt</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                  {leaveStatus.pending} đơn
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-slate-200/50">
                <span className="text-sm font-semibold text-slate-700">Đã được phê duyệt phép</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  {leaveStatus.approved} đơn
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Link
              href="/leave-requests"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#FF161A] px-4 text-sm font-bold text-white hover:bg-[#C90012] transition-colors shadow-md shadow-[#FF161A]/10"
            >
              Gửi yêu cầu nghỉ phép mới
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
