"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PayrollPeriodsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/payroll"
          className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900 text-xs font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại tính lương
        </Link>
      </div>

      <PageHeader
        title="Chu kỳ tính lương (Payroll Periods)"
        description="Định nghĩa kỳ tính lương hàng tháng, khoảng thời gian chốt ngày công dạy học."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo chu kỳ mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên chu kỳ</TableHead>
              <TableHead>Ngày bắt đầu</TableHead>
              <TableHead>Ngày kết thúc</TableHead>
              <TableHead>Tổng công</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Kỳ lương tháng 06/2026</TableCell>
              <TableCell>01/06/2026</TableCell>
              <TableCell>30/06/2026</TableCell>
              <TableCell>26 ngày công</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Đã chốt & chi trả
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
