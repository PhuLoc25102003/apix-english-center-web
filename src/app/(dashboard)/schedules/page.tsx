"use client";

import * as React from "react";
import { Calendar, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SchedulesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý lịch học (Class Schedules)"
        description="Định cấu hình lịch học cố định theo các khung MWF, TTS và Weekend của lớp."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo lịch biểu mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lớp học</TableHead>
              <TableHead>Khung lịch cố định</TableHead>
              <TableHead>Giờ học</TableHead>
              <TableHead>Phòng học</TableHead>
              <TableHead>Cơ sở</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Starters A1 (STA1-26)</TableCell>
              <TableCell className="font-bold text-slate-700">Thứ 2 / Thứ 4 / Thứ 6 (MWF)</TableCell>
              <TableCell>18:00 - 19:30 (Slot 1)</TableCell>
              <TableCell>Room 101</TableCell>
              <TableCell>Cơ sở Hà Đông</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
