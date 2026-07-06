"use client";

import * as React from "react";
import { Users, Plus } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Danh sách Nhân sự (Employees)"
        description="Quản lý hồ sơ giáo viên, trợ giảng, văn phòng và cấu hình phân công cơ sở."
        action={
          <Button className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl text-xs shadow-md shadow-[#FF161A]/10 cursor-pointer">
            <Plus className="h-4 w-4 mr-2" /> Thêm nhân viên mới
          </Button>
        }
      />

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Email liên hệ</TableHead>
              <TableHead>Vị trí công việc</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Mr. John Doe</TableCell>
              <TableCell>john.doe@apix.edu.vn</TableCell>
              <TableCell>Giáo viên nước ngoài</TableCell>
              <TableCell>0901234567</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  Đang giảng dạy
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
