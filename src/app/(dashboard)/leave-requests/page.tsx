"use client";

import * as React from "react";
import { Plus, Check, X, Calendar } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { hasPermission } from "@/lib/permissions/has-permission";

export default function LeaveRequestsPage() {
  const isManager = hasPermission("leave:approve");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Đăng ký nghỉ phép (Leave Requests)"
        description="Đăng ký xin nghỉ phép và theo dõi tiến độ phê duyệt từ quản lý trung tâm."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo yêu cầu nghỉ phép
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Lý do nghỉ</TableHead>
              <TableHead>Thời gian nghỉ</TableHead>
              <TableHead>Số ngày nghỉ</TableHead>
              <TableHead>Trạng thái</TableHead>
              {isManager && <TableHead className="text-right">Duyệt đơn</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Mr. John Doe</TableCell>
              <TableCell>Khám bệnh định kỳ</TableCell>
              <TableCell>15/06/2026</TableCell>
              <TableCell>1 ngày</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                  Chờ duyệt
                </span>
              </TableCell>
              {isManager && (
                <TableCell className="text-right flex items-center justify-end gap-1.5 h-14">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer">
                    <Check className="h-4 w-4" />
                  </button>
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors cursor-pointer">
                    <X className="h-4 w-4" />
                  </button>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
