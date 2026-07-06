"use client";

/**
 * src/features/users/components/user-detail-card.tsx
 *
 * Detailed card view for a single User, with metadata and action triggers.
 */

import * as React from "react";
import { Mail, Phone, Clock, ShieldCheck, Lock, Unlock, Key, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useLockUser } from "../hooks/use-lock-user";
import { useUnlockUser } from "../hooks/use-unlock-user";
import { useResetPassword } from "../hooks/use-reset-password";
import { useDeactivateUser } from "../hooks/use-deactivate-user";
import type { User } from "../types/user.type";

interface UserDetailCardProps {
  user: User;
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  const lockMutation = useLockUser();
  const unlockMutation = useUnlockUser();
  const resetPassMutation = useResetPassword();
  const deactivateMutation = useDeactivateUser();
  const confirm = useConfirm();

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
    <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-6">
      {/* Profiler header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-apix-gradient text-white text-2xl font-bold shadow-md shadow-[#FF161A]/10 shrink-0 select-none">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-display text-base font-bold text-slate-800">{user.fullName}</h4>
          <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">{user.username || "@no_username"}</p>
        </div>
      </div>

      <div className="border-t border-slate-100/80 my-1" />

      {/* Info fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Địa chỉ Email</span>
            <span className="text-sm font-semibold text-slate-700 break-all">{user.email || "-"}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Số điện thoại</span>
            <span className="text-sm font-semibold text-slate-700">{user.phone || "-"}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Trạng thái</span>
            <div className="mt-0.5">
              <StatusBadge status={user.status} />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Đăng nhập cuối</span>
            <span className="text-sm font-semibold text-slate-700">{formatDate(user.lastLoginAt)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100/80 my-1" />

      {/* Actions group */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        {user.status === "LOCKED" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              const ok = await confirm({
                title: "Mở khóa tài khoản",
                description: `Bạn có muốn mở khóa tài khoản cho ${user.fullName}?`,
                confirmLabel: "Mở khóa",
                cancelLabel: "Hủy",
              });
              if (ok) unlockMutation.mutate(user.id);
            }}
            className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 hover:text-emerald-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Unlock className="h-4 w-4" />
            Mở khóa tài khoản
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={async () => {
              const ok = await confirm({
                title: "Khóa tài khoản",
                description: `Khóa tài khoản của ${user.fullName}? Tài khoản này sẽ không thể đăng nhập.`,
                confirmLabel: "Khóa",
                cancelLabel: "Hủy",
                variant: "destructive",
              });
              if (ok) lockMutation.mutate(user.id);
            }}
            className="text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200 hover:text-amber-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="h-4 w-4" />
            Khóa tài khoản
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            const ok = await confirm({
              title: "Đặt lại mật khẩu",
              description: `Bạn có muốn đặt lại mật khẩu cho ${user.fullName}?`,
              confirmLabel: "Đặt lại",
              cancelLabel: "Hủy",
            });
            if (ok) resetPassMutation.mutate(user.id);
          }}
          className="text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200 hover:text-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Key className="h-4 w-4" />
          Đặt lại mật khẩu
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            const ok = await confirm({
              title: "Vô hiệu hóa người dùng",
              description: `Bạn có muốn vô hiệu hóa người dùng ${user.fullName}?`,
              confirmLabel: "Vô hiệu hóa",
              cancelLabel: "Hủy",
              variant: "destructive",
            });
            if (ok) deactivateMutation.mutate(user.id);
          }}
          className="text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200 hover:text-rose-800 rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          Vô hiệu hóa tài khoản
        </Button>
      </div>
    </div>
  );
}
