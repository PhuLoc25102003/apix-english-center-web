"use client";

import * as React from "react";
import { Plus, Video, Play } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export default function VideosPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Thư viện Video lớp học (Media Library)"
        description="Lưu trữ và phát hành các video hoạt động của giáo viên nước ngoài, video đánh giá cá nhân tháng gửi cho phụ huynh học viên."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tải lên video mới
          </Button>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="glass-card overflow-hidden border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
          <div className="aspect-video bg-slate-900 flex items-center justify-center relative text-white">
            <Play className="h-10 w-10 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
            <span className="absolute bottom-2 right-2 bg-black/60 text-[10px] font-bold px-2 py-0.5 rounded-md">02:35</span>
          </div>
          <div className="p-4 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C90012]">Hoạt động giáo viên nước ngoài</span>
            <h4 className="font-bold text-slate-900 text-sm">Starters A1 - Warm up game</h4>
            <span className="text-[10px] text-slate-500 mt-1">Lớp: STA1-26 · Ngày đăng: 15/06/2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
