"use client";

/**
 * src/app/(dashboard)/permissions/[id]/page.tsx
 *
 * Read-only detail view for a permission.
 */

import * as React from "react";
import { ArrowLeft, Key, ShieldCheck, FileText, Clock } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { usePermissionDetail } from "@/features/permissions";

export default function PermissionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data, isLoading, isError, error, refetch, isRefetching } = usePermissionDetail(id);

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[300px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ quyền hạn."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const permission = data.data;

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/permissions")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách</span>
        </Button>
      </div>

      <PageHeader
        title={`Chi tiết quyền: ${permission.code}`}
        description={`Thông tin mô tả cấu trúc quyền hệ thống của ${permission.code}.`}
      />

      <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-apix-gradient text-white shadow-md shadow-[#FF161A]/10 shrink-0">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-slate-800">{permission.code}</h4>
            <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">{permission.module}</p>
          </div>
        </div>

        <div className="border-t border-slate-100/80 my-1" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Thao tác (Action)</span>
              <span className="text-sm font-semibold text-slate-700">{permission.action}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <ShieldCheck className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Trạng thái</span>
              <div className="mt-0.5">
                <StatusBadge status={permission.isActive ? "ACTIVE" : "INACTIVE"} />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 flex items-start gap-2.5">
            <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Mô tả chức năng</span>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mt-0.5">
                {permission.description || "Không có mô tả chi tiết cho quyền này."}
              </p>
            </div>
          </div>

          <div className="sm:col-span-2 border-t border-slate-100/80 pt-4 flex gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                Tạo lúc: {formatDate(permission.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">
                Cập nhật lúc: {formatDate(permission.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
