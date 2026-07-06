"use client";

import * as React from "react";
import { FileText, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CurriculumsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Giáo trình (Curriculums)"
        description="Định cấu hình giáo trình học tập và giáo án giảng dạy chi tiết của các khóa học trung tâm."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo giáo trình mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên giáo trình</TableHead>
              <TableHead>Khóa học liên kết</TableHead>
              <TableHead>Tổng số bài học</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Cambridge English Starters (Revised V3)</TableCell>
              <TableCell>Starters A1</TableCell>
              <TableCell>24 bài học</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Đang giảng dạy
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
