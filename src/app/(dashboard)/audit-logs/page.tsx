"use client";

import * as React from "react";
import { History, Eye, Search } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function AuditLogsPage() {
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nhật ký hệ thống (Audit Logs)"
        description="Ghi nhận lịch sử hoạt động tạo mới, cập nhật, xóa, phê duyệt hoặc chi trả tài chính của hệ thống."
      />

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-3 max-w-xs">
          <Input
            placeholder="Tìm kiếm hành động, actor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-xl bg-white/60 focus:bg-white"
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Tài khoản thực hiện (Actor)</TableHead>
              <TableHead>Phân hệ (Module)</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Mô tả chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-slate-600 text-xs font-mono">15/06/2026 14:32:05</TableCell>
              <TableCell className="font-semibold text-slate-900">John Doe (TEACHER)</TableCell>
              <TableCell className="font-bold text-slate-700">Điểm danh (ATTENDANCE)</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                  MARK_ATTENDANCE
                </span>
              </TableCell>
              <TableCell className="text-slate-600 text-xs">Điểm danh lớp STA1-26, có mặt 12/12</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
