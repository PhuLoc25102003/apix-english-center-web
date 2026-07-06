"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";

export default function TuitionRefundsPage() {
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
        title="Yêu cầu hoàn trả học phí & Bảo lưu"
        description="Quản lý và giải quyết các trường hợp nghỉ học rút học phí hoặc bảo lưu chuyển đổi credit."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Tạo yêu cầu hoàn phí
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã yêu cầu</TableHead>
              <TableHead>Học viên</TableHead>
              <TableHead>Loại yêu cầu</TableHead>
              <TableHead>Số dư đề xuất</TableHead>
              <TableHead>Ngày gửi</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">REF-001</TableCell>
              <TableCell className="font-semibold text-slate-900">Trần Thị B</TableCell>
              <TableCell>Bảo lưu (Credit chuyển tiếp)</TableCell>
              <TableCell className="font-bold text-slate-800">1,500,000 ₫</TableCell>
              <TableCell>14/06/2026</TableCell>
              <TableCell>
                <StatusBadge status="PENDING" customLabel="Chờ phê duyệt" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
