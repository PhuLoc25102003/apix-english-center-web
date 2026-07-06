"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";

export default function TuitionInvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/tuition"
          className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900 text-xs font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại quản lý học phí
        </Link>
      </div>

      <PageHeader
        title="Danh sách Hóa đơn học phí"
        description="Theo dõi toàn bộ các hóa đơn học phí, chi tiết học phí đóng theo gói/tháng của học viên."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo hóa đơn học phí
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead>Lớp học</TableHead>
              <TableHead>Tháng thanh toán</TableHead>
              <TableHead>Tổng tiền hóa đơn</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">INV-0082</TableCell>
              <TableCell className="font-semibold text-slate-900">Nguyễn Văn A</TableCell>
              <TableCell>Starters A1</TableCell>
              <TableCell>Tháng 06/2026</TableCell>
              <TableCell className="font-bold text-slate-800">3,200,000 ₫</TableCell>
              <TableCell>
                <StatusBadge status="PAID" customLabel="Đã đóng" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
