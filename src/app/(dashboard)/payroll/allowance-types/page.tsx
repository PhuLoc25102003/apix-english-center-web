"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AllowanceTypesPage() {
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
        title="Danh mục phụ cấp (Allowance Types)"
        description="Định nghĩa các loại phụ cấp giảng dạy, thưởng chuyên cần hoặc trợ cấp ăn trưa."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Thêm phụ cấp mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên phụ cấp</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Hình thức tính</TableHead>
              <TableHead>Số tiền mặc định</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Phụ cấp đứng lớp chính</TableCell>
              <TableCell>Hỗ trợ giáo viên chính giảng dạy</TableCell>
              <TableCell>Cố định theo tháng</TableCell>
              <TableCell className="font-bold text-slate-800">1,000,000 ₫</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
