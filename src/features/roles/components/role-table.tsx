"use client";

/**
 * src/features/roles/components/role-table.tsx
 *
 * Renders the table of roles with action dropdowns and system role protections.
 */

import * as React from "react";
import { MoreVertical, Edit, ShieldAlert, Trash2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
import { StatusBadge } from "@/components/common/status-badge";
import { useDeleteRole } from "../hooks/use-delete-role";
import type { Role } from "../types/role.type";

interface RoleTableProps {
  roles: Role[];
  onEdit: (id: string) => void;
}

export function RoleTable({ roles, onEdit }: RoleTableProps) {
  const router = useRouter();
  const deleteMutation = useDeleteRole();
  const confirm = useConfirm();

  const handleEditPermissions = (roleId: string) => {
    router.push(`/roles/${roleId}`);
  };

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Mã vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Tên vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Mô tả chức năng</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Loại vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow
                key={role.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {role.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {role.name}
                </TableCell>
                <TableCell className="text-slate-600 font-medium text-xs max-w-sm truncate" title={role.description || ""}>
                  {role.description || "-"}
                </TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE8EA] text-[#C90012] border border-[#FF161A]/25 gap-1 select-none">
                      <ShieldCheck className="h-3 w-3 text-[#FF161A]" />
                      Hệ thống
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 gap-1 select-none">
                      Tùy chỉnh
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={role.isActive ? "ACTIVE" : "INACTIVE"} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                      aria-label="Tùy chọn vai trò"
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] glass-card p-1">
                      <DropdownMenuItem
                        onClick={() => onEdit(role.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        <span>Chỉnh sửa thông tin</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditPermissions(role.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4 text-slate-400" />
                        <span>Phân quyền chi tiết</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={role.isSystem}
                        onClick={async () => {
                          if (role.isSystem) {
                            toast.error("Không được phép xóa vai trò hệ thống!");
                            return;
                          }
                          const ok = await confirm({
                            title: "Xác nhận xóa vai trò",
                            description: `Bạn có chắc chắn muốn xóa vai trò ${role.name}? Hành động này không thể hoàn tác.`,
                            confirmLabel: "Xóa",
                            cancelLabel: "Hủy",
                            variant: "destructive",
                          });
                          if (ok) {
                            deleteMutation.mutate(role.id);
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-rose-400" />
                        <span>Xóa vai trò</span>
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
