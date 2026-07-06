"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TuitionPaymentsPage() {
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
        title="Lịch sử giao dịch đóng phí"
        description="Nhật ký toàn bộ dòng tiền nạp vào hệ thống để nộp tiền học phí của học viên."
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã giao dịch</TableHead>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead>Phương thức đóng</TableHead>
              <TableHead>Ngày đóng phí</TableHead>
              <TableHead>Số tiền đóng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">PAY-9812</TableCell>
              <TableCell className="font-mono text-xs text-slate-500">INV-0082</TableCell>
              <TableCell className="font-semibold text-slate-900">Nguyễn Văn A</TableCell>
              <TableCell>Chuyển khoản ngân hàng</TableCell>
              <TableCell>10/06/2026</TableCell>
              <TableCell className="font-bold text-emerald-600">3,200,000 ₫</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
