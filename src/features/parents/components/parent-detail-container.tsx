"use client";

/**
 * src/features/parents/components/parent-detail-container.tsx
 *
 * Container component for displaying detailed information about a single parent.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, User, Phone, Mail, MapPin, Briefcase, FileText, Clock } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { useParent } from "../hooks/use-parent";

interface ParentDetailContainerProps {
  id: string;
}

export function ParentDetailContainer({ id }: ParentDetailContainerProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useParent(id);

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ phụ huynh."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const parent = data.data;

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
          onClick={() => router.push("/parents")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <PageHeader
        title={`Phụ huynh: ${parent.fullName}`}
        description={`Hồ sơ chi tiết của phụ huynh ${parent.fullName} (Mã: ${parent.parentCode}).`}
        action={
          <Button
            onClick={() => router.push(`/parents/${parent.id}/edit`)}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Avatar Card */}
        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col items-center text-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-apix-gradient text-3xl font-bold text-white shadow-lg shadow-[#FF161A]/20">
            {parent.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-slate-800">{parent.fullName}</h4>
            <p className="text-xs font-mono font-semibold text-slate-500 mt-1">{parent.parentCode}</p>
          </div>
        </div>

        {/* Info Grid Card */}
        <div className="md:col-span-2 glass-card p-6 border border-white/40 shadow-xs rounded-2xl grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Số điện thoại</span>
              <span className="text-sm font-semibold text-slate-800">{parent.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Địa chỉ Email</span>
              <span className="text-sm font-semibold text-slate-800">{parent.email || "-"}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Nghề nghiệp</span>
              <span className="text-sm font-semibold text-slate-800">{parent.jobTitle || "-"}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-100 pt-4">
            <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Địa chỉ thường trú</span>
              <span className="text-sm font-semibold text-slate-800">{parent.address || "-"}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-100 pt-4">
            <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ghi chú</span>
              <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-line mt-1">
                {parent.note || "Không có ghi chú nào."}
              </p>
            </div>
          </div>

          {parent.createdAt && (
            <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-100 pt-4 mt-1">
              <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày tạo</span>
                  <span className="text-xs font-medium text-slate-600">{formatDate(parent.createdAt)}</span>
                </div>
                {parent.updatedAt && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cập nhật lúc</span>
                    <span className="text-xs font-medium text-slate-600">{formatDate(parent.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
