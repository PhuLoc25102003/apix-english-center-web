"use client";

import * as React from "react";
import { BookOpen, Calendar, Award, Play } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Không gian học tập (Student Workspace)"
        description="Chào mừng học viên đến với hệ thống học trực tuyến của APIX."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Timetable */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lịch học tiếp theo</span>
            <Calendar className="h-5 w-5 text-[#C90012]" />
          </div>
          <span className="font-bold text-slate-800 text-sm mt-1">Hôm nay, 18:00 - 19:30</span>
          <p className="text-[10px] text-slate-500">STA1-26 · Phòng 101 · Thầy John Doe</p>
        </div>

        {/* Scores */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Điểm kiểm tra gần nhất</span>
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <span className="font-display text-2xl font-black text-slate-900 mt-1">9.0 / 10</span>
          <p className="text-[10px] text-slate-500">Đầu điểm: Speaking test Unit 3</p>
        </div>

        {/* Media */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Video hoạt động lớp học</span>
            <Play className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-bold text-slate-800 text-sm mt-1">Camers warm up game</span>
          <p className="text-[10px] text-slate-500">Xem lại trò chơi khởi động buổi trước.</p>
        </div>
      </div>
    </div>
  );
}
