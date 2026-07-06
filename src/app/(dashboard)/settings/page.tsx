"use client";

import * as React from "react";
import { Settings, Save } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Cấu hình hệ thống (Settings)"
        description="Quản lý cài đặt chung, thời hạn chốt điểm danh, các mẫu thông báo Zalo và cấu hình chi trả lương định kỳ trung tâm."
      />

      <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-6 max-w-2xl">
        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider">
            Thời gian gia hạn điểm danh lớp học
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="number"
              defaultValue={30}
              className="h-10 w-24 rounded-xl bg-slate-50 border border-slate-200 text-center font-bold text-slate-800"
            />
            <span className="text-sm font-semibold text-slate-600">phút (Hệ thống sẽ cảnh báo giáo viên nếu quá hạn)</span>
          </div>
        </div>

        <div className="h-px bg-slate-200/50" />

        <div className="flex justify-end">
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-5 py-2.5 rounded-xl cursor-pointer shadow-md shadow-[#FF161A]/10">
            <Save className="h-4 w-4 mr-2" /> Lưu cấu hình
          </Button>
        </div>
      </div>
    </div>
  );
}
