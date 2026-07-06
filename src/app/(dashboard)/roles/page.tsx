"use client";

import * as React from "react";
import { Shield, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý vai trò (Roles)"
        description="Định cấu hình nhóm vai trò truy cập chính thức của toàn bộ hệ thống APIX."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Thêm vai trò mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã vai trò</TableHead>
              <TableHead>Tên vai trò</TableHead>
              <TableHead>Mô tả chức năng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs font-semibold">TEACHER</TableCell>
              <TableCell className="font-semibold text-slate-900">Giáo viên</TableCell>
              <TableCell>Xem danh sách lớp được gán, nhập điểm số, điểm danh và viết báo cáo tuần</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
