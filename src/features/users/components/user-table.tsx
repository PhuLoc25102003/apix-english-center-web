"use client";

/**
 * src/features/users/components/user-table.tsx
 *
 * Renders the table of users with action dropdowns (Edit, Lock/Unlock, Reset Password, Deactivate).
 */

import * as React from "react";
import { MoreVertical, Edit, UserCheck, Lock, Unlock, Key, Trash2 } from "lucide-react";
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
import { StatusBadge } from "@/components/common/status-badge";
import { useLockUser } from "../hooks/use-lock-user";
import { useUnlockUser } from "../hooks/use-unlock-user";
import { useResetPassword } from "../hooks/use-reset-password";
import { useDeactivateUser } from "../hooks/use-deactivate-user";
import type { User } from "../types/user.type";

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
}

export function UserTable({ users, onEdit }: UserTableProps) {
  const router = useRouter();
  const lockMutation = useLockUser();
  const unlockMutation = useUnlockUser();
  const resetPassMutation = useResetPassword();
  const deactivateMutation = useDeactivateUser();
  const confirm = useConfirm();

  const handleViewDetail = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
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
              <TableHead className="font-semibold text-slate-600 h-12">Họ và tên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Tên tài khoản</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Email</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Số điện thoại</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Đăng nhập cuối</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-semibold text-slate-900">{user.fullName}</TableCell>
                <TableCell className="text-slate-600 text-xs font-semibold">{user.username || "-"}</TableCell>
                <TableCell className="text-slate-600 text-xs font-medium">{user.email || "-"}</TableCell>
                <TableCell className="text-slate-600 text-xs font-medium">{user.phone || "-"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((r) => (
                        <span
                          key={r.id}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#FFE8EA] text-[#C90012] border border-[#FF161A]/10"
                        >
                          {r.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Chưa gán</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-slate-500 font-medium text-xs">
                  {formatDate(user.lastLoginAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                      aria-label="Tùy chọn người dùng"
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] glass-card p-1">
                      <DropdownMenuItem
                        onClick={() => onEdit(user.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        <span>Chỉnh sửa thông tin</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleViewDetail(user.id)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <UserCheck className="h-4 w-4 text-slate-400" />
                        <span>Xem chi tiết & Vai trò</span>
                      </DropdownMenuItem>

                      {user.status === "LOCKED" ? (
                        <DropdownMenuItem
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Mở khóa tài khoản",
                              description: `Bạn có chắc muốn mở khóa tài khoản cho ${user.fullName}?`,
                              confirmLabel: "Mở khóa",
                              cancelLabel: "Hủy",
                            });
                            if (ok) unlockMutation.mutate(user.id);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Unlock className="h-4 w-4 text-emerald-400" />
                          <span>Mở khóa tài khoản</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Khóa tài khoản",
                              description: `Bạn có chắc muốn khóa tài khoản của ${user.fullName}? Người dùng này sẽ không thể đăng nhập.`,
                              confirmLabel: "Khóa",
                              cancelLabel: "Hủy",
                              variant: "destructive",
                            });
                            if (ok) lockMutation.mutate(user.id);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Lock className="h-4 w-4 text-amber-400" />
                          <span>Khóa tài khoản</span>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        onClick={async () => {
                          const ok = await confirm({
                            title: "Đặt lại mật khẩu",
                            description: `Bạn có chắc chắn muốn đặt lại mật khẩu cho người dùng ${user.fullName}?`,
                            confirmLabel: "Đặt lại",
                            cancelLabel: "Hủy",
                          });
                          if (ok) resetPassMutation.mutate(user.id);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Key className="h-4 w-4 text-slate-400" />
                        <span>Đặt lại mật khẩu</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={async () => {
                          const ok = await confirm({
                            title: "Vô hiệu hóa người dùng",
                            description: `Bạn có chắc chắn muốn vô hiệu hóa ${user.fullName}?`,
                            confirmLabel: "Vô hiệu hóa",
                            cancelLabel: "Hủy",
                            variant: "destructive",
                          });
                          if (ok) deactivateMutation.mutate(user.id);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-rose-400" />
                        <span>Vô hiệu hóa</span>
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
