"use client";

/**
 * src/features/campuses/components/campus-table.tsx
 *
 * Renders the table list of campuses with action menus and a delete confirmation modal.
 */

import * as React from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCampus } from "../hooks/use-delete-campus";
import type { Campus } from "../types/campus.type";

interface CampusTableProps {
  campuses: Campus[];
  onEdit: (id: string) => void;
}

export function CampusTable({ campuses, onEdit }: CampusTableProps) {
  const deleteMutation = useDeleteCampus();
  const router = useRouter();
  const confirm = useConfirm();

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Mã cơ sở</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Tên cơ sở</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Địa chỉ</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Số điện thoại</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campuses.map((campus) => (
              <TableRow
                key={campus.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {campus.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {campus.name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {campus.address || "-"}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {campus.phone || "-"}
                </TableCell>
                <TableCell>
                  {campus.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                      Ngừng hoạt động
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                      aria-label="Tùy chọn cơ sở"
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                      <DropdownMenuItem
                        onClick={() => onEdit(campus.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          const ok = await confirm({
                            title: "Xác nhận xóa cơ sở",
                            description: `Bạn có chắc chắn muốn xóa cơ sở ${campus.name}? Hành động này không thể hoàn tác.`,
                            confirmLabel: "Xóa",
                            cancelLabel: "Hủy",
                            variant: "destructive",
                          });
                          if (ok) {
                            deleteMutation.mutate(campus.id);
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-rose-400" />
                        <span>Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
