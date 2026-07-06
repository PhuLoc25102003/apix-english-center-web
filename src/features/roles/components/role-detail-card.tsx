"use client";

/**
 * src/features/roles/components/role-detail-card.tsx
 *
 * Visual card to show details about a role.
 */

import * as React from "react";
import { Shield, Clock, ShieldCheck, FileText } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import type { Role } from "../types/role.type";

interface RoleDetailCardProps {
  role: Role;
}

export function RoleDetailCard({ role }: RoleDetailCardProps) {
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
    <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-apix-gradient text-white shadow-md shadow-[#FF161A]/10 shrink-0">
          <Shield className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-display text-base font-bold text-slate-800">{role.name}</h4>
          <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">{role.code}</p>
        </div>
      </div>

      <div className="border-t border-slate-100/80 my-1" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Loại vai trò</span>
            <span className="text-sm font-semibold text-slate-700">
              {role.isSystem ? "Vai trò hệ thống" : "Vai trò tùy chỉnh"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Trạng thái</span>
            <div className="mt-0.5">
              <StatusBadge status={role.isActive ? "ACTIVE" : "INACTIVE"} />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 flex items-start gap-2.5">
          <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Mô tả chức năng</span>
            <p className="text-sm text-slate-600 font-medium leading-relaxed mt-0.5">
              {role.description || "Không có mô tả chức năng cho vai trò này."}
            </p>
          </div>
        </div>

        <div className="sm:col-span-2 border-t border-slate-100/80 pt-4 flex gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">
              Tạo lúc: {formatDate(role.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">
              Cập nhật cuối: {formatDate(role.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
