"use client";

/**
 * src/features/permissions/components/permission-table.tsx
 *
 * Renders the table list of system permissions (read-only).
 */

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import type { Permission } from "../types/permission.type";

interface PermissionTableProps {
  permissions: Permission[];
}

export function PermissionTable({ permissions }: PermissionTableProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Mã quyền (Code)</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Phân hệ (Module)</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Thao tác (Action)</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Mô tả quyền</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((perm) => (
              <TableRow
                key={perm.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-bold text-[#C90012]">
                  {perm.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-700 text-xs">
                  {perm.module}
                </TableCell>
                <TableCell className="font-mono text-xs text-slate-600">
                  {perm.action}
                </TableCell>
                <TableCell className="text-slate-600 font-medium text-xs max-w-sm truncate" title={perm.description || ""}>
                  {perm.description || "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={perm.isActive ? "ACTIVE" : "INACTIVE"} />
                </TableCell>
                <TableCell className="text-slate-500 font-medium text-xs">
                  {formatDate(perm.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
