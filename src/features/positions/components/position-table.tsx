"use client";

import * as React from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

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
import { hasPermission } from "@/lib/permissions/has-permission";
import { useDeletePosition } from "../hooks/use-delete-position";
import type { Position } from "../types/position.type";

interface PositionTableProps {
  positions: Position[];
  onEdit: (id: string) => void;
}

export function PositionTable({ positions, onEdit }: PositionTableProps) {
  const deleteMutation = useDeletePosition();
  const confirm = useConfirm();

  const canUpdate = hasPermission("position:update");
  const canDelete = hasPermission("position:delete");

  const formatDateTime = (val: string | null) => {
    if (!val) return "-";
    return new Date(val).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Mã vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Tên vai trò / Chức vụ</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Mô tả nhiệm vụ</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Loại giảng dạy</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày tạo</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Cập nhật lúc</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {item.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {item.name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium max-w-[250px] truncate">
                  {item.description || "-"}
                </TableCell>
                <TableCell>
                  {item.isTeachingPosition ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      Vị trí giảng dạy
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                      Hành chính / Khác
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                      Tạm ngưng
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-slate-500 text-xs font-medium">
                  {formatDateTime(item.createdAt)}
                </TableCell>
                <TableCell className="text-slate-500 text-xs font-medium">
                  {formatDateTime(item.updatedAt)}
                </TableCell>
                <TableCell>
                  {(canUpdate || canDelete) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn chức vụ"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        {canUpdate && (
                          <DropdownMenuItem
                            onClick={() => onEdit(item.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Edit className="h-4 w-4 text-slate-400" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                        )}
                        {canDelete && (
                          <DropdownMenuItem
                            onClick={async () => {
                              const ok = await confirm({
                                title: "Xác nhận xóa chức vụ",
                                description: `Bạn có chắc chắn muốn xóa chức vụ ${item.name}? Hành động này không thể hoàn tác.`,
                                confirmLabel: "Xóa",
                                cancelLabel: "Hủy",
                                variant: "destructive",
                              });
                              if (ok) {
                                deleteMutation.mutate(item.id);
                              }
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-rose-400" />
                            <span>Xóa</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
