"use client";

/**
 * src/features/parents/components/parent-table.tsx
 *
 * Renders the table list of parents with action menus and a delete confirmation modal.
 */

import * as React from "react";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
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
import { useDeleteParent } from "../hooks/use-delete-parent";
import type { Parent } from "../types/parent.type";

interface ParentTableProps {
  parents: Parent[];
  onEdit: (id: string) => void;
}

export function ParentTable({ parents, onEdit }: ParentTableProps) {
  const deleteMutation = useDeleteParent();
  const router = useRouter();
  const confirm = useConfirm();

  return (
    <>
      <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b border-slate-100">
                <TableHead className="font-semibold text-slate-600 h-12">Mã phụ huynh</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Họ và tên</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Số điện thoại</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Địa chỉ Email</TableHead>
                <TableHead className="w-[80px] h-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parents.map((parent) => (
                <TableRow
                  key={parent.id}
                  className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                >
                  <TableCell className="font-mono text-xs font-semibold text-slate-600">
                    {parent.parentCode}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {parent.fullName}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">
                    {parent.phone}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {parent.email || "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn phụ huynh"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        <DropdownMenuItem
                          onClick={() => router.push(`/parents/${parent.id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span>Chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(parent.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit className="h-4 w-4 text-slate-400" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Xác nhận xóa phụ huynh",
                              description: `Bạn có chắc chắn muốn xóa hồ sơ phụ huynh ${parent.fullName}? Hành động này không thể hoàn tác.`,
                              confirmLabel: "Xóa",
                              cancelLabel: "Hủy",
                              variant: "destructive",
                            });
                            if (ok) {
                              deleteMutation.mutate(parent.id);
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
    </>
  );
}
