"use client";

import * as React from "react";
import { PhoneCall, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ContactLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nhật ký liên hệ (Contact Logs)"
        description="Ghi nhận nhật ký liên lạc giữa Office Staff và phụ huynh học viên (vắng không phép, nhắc học phí, trao đổi học vụ)."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Ghi nhận liên hệ mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày liên hệ</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead>Nội dung cuộc gọi</TableHead>
              <TableHead>Nhân viên thực hiện</TableHead>
              <TableHead>Kết quả</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-slate-500 text-xs">15/06/2026 10:15</TableCell>
              <TableCell className="font-semibold text-slate-900">Nguyễn Văn A</TableCell>
              <TableCell>Gọi nhắc đóng học phí học kỳ mới</TableCell>
              <TableCell>Office Staff A</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Phụ huynh hứa đóng trước thứ 6
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
