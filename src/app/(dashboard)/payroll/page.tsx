"use client";

import * as React from "react";
import Link from "next/link";
import { Wallet, Plus, CalendarRange } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PayrollPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý tính lương (Payroll)"
        description="Tính toán lương cố định & lương giờ, ghi nhận phụ cấp, khấu trừ ngày nghỉ phép cho nhân sự."
        action={
          <div className="flex gap-2">
            <Link
              href="/payroll/periods"
              className="inline-flex h-10 items-center justify-center font-semibold bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs"
            >
              <CalendarRange className="h-4 w-4 mr-2" /> Chu kỳ tính lương
            </Link>
            <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
              Tính lương tháng hiện tại
            </Button>
          </div>
        }
      />

      <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
        <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
          Bảng kê lương nhân viên tháng gần nhất
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nhân viên</TableHead>
              <TableHead>Hình thức lương</TableHead>
              <TableHead>Lương cơ bản</TableHead>
              <TableHead>Phụ cấp</TableHead>
              <TableHead>Khấu trừ</TableHead>
              <TableHead>Thực nhận</TableHead>
              <TableHead className="text-right">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Mr. John Doe</TableCell>
              <TableCell>Hằng tháng (MONTHLY)</TableCell>
              <TableCell>12,000,000 ₫</TableCell>
              <TableCell className="text-emerald-600">+1,500,000 ₫</TableCell>
              <TableCell className="text-rose-600">-500,000 ₫</TableCell>
              <TableCell className="font-bold text-slate-900">13,000,000 ₫</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Đã chi trả
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
