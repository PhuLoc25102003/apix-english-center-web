"use client";

import * as React from "react";
import { User, CreditCard, ClipboardCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";

export default function ParentDashboardPage() {
  const [selectedChild, setSelectedChild] = React.useState("child-1");

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Cổng thông tin Phụ huynh (Parent Portal)"
        description="Theo dõi lịch học, kết quả học tập và chuyên cần của con em."
      />

      {/* Child Switcher */}
      <div className="flex items-center gap-3 bg-white/40 border border-white/60 p-4 rounded-2xl shadow-xs backdrop-blur-md">
        <span className="text-xs font-bold text-slate-700 uppercase">Chọn học viên:</span>
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          className="h-10 rounded-xl bg-white border border-slate-200 text-xs font-semibold px-4 text-slate-800 outline-none"
        >
          <option value="child-1">Nguyễn Văn A (STA1-26)</option>
          <option value="child-2">Nguyễn Văn B (MOA2-08)</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Attendance Card */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Chuyên cần tháng này</span>
            <ClipboardCheck className="h-5 w-5 text-[#C90012]" />
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-1">95.8%</span>
          <p className="text-[10px] text-slate-500">Con đi học đầy đủ và đúng giờ.</p>
        </div>

        {/* Scores Card */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Điểm số trung bình</span>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-1">8.8 / 10</span>
          <p className="text-[10px] text-slate-500">Bài kiểm tra gần nhất: 9.0 (Speaking check).</p>
        </div>

        {/* Tuition Card */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl border-l-4 border-l-emerald-600 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Học phí định kỳ</span>
            <CreditCard className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="font-display text-2xl font-black text-emerald-600 mt-1">Đã hoàn thành</span>
          <p className="text-[10px] text-slate-500">Hóa đơn tháng 06/2026 đã được thanh toán.</p>
        </div>
      </div>
    </div>
  );
}
