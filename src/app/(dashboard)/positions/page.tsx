"use client";

import * as React from "react";
import { Briefcase, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PositionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Danh mục chức vụ (Positions)"
        description="Định nghĩa các vị trí chức danh công việc trong trung tâm để phục vụ phân quyền & tính bảng lương."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Thêm chức vụ mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã chức vụ</TableHead>
              <TableHead>Tên chức vụ</TableHead>
              <TableHead>Hạn mức ngày phép tháng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">TEACHER</TableCell>
              <TableCell className="font-semibold text-slate-900">Giáo viên chính thức</TableCell>
              <TableCell>1.5 ngày</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
