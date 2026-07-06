"use client";

import * as React from "react";
import { Bell, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Thông báo Phụ huynh (Parent Notifications)"
        description="Gửi thông báo học vụ, lịch nghỉ lễ và các thông báo khẩn cấp tới phụ huynh qua ứng dụng."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Gửi thông báo mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày gửi</TableHead>
              <TableHead>Tiêu đề thông báo</TableHead>
              <TableHead>Đối tượng nhận</TableHead>
              <TableHead>Kênh gửi</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-slate-500 text-xs">15/06/2026 09:00</TableCell>
              <TableCell className="font-semibold text-slate-900">Thông báo nghỉ lễ giỗ tổ Hùng Vương</TableCell>
              <TableCell>Toàn bộ phụ huynh trung tâm</TableCell>
              <TableCell>Ứng dụng di động (In-App)</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Đã gửi thành công
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
