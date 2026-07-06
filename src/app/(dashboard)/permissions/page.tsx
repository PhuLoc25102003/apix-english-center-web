"use client";

import * as React from "react";
import { Key } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PermissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Danh mục Quyền hạn (Permissions)"
        description="Tra cứu mã quyền hạn của hệ thống làm cơ sở gán cho các vai trò truy cập."
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã quyền hạn</TableHead>
              <TableHead>Phân hệ</TableHead>
              <TableHead>Mô tả chi tiết quyền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">attendance:mark</TableCell>
              <TableCell className="font-bold text-slate-800">Điểm danh (ATTENDANCE)</TableCell>
              <TableCell>Cho phép thực hiện thao tác tích chọn điểm danh buổi học</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
