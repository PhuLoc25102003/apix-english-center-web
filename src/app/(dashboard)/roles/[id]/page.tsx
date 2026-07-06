"use client";

/**
 * src/app/(dashboard)/roles/[id]/page.tsx
 *
 * Role Detail page for managing permission mapping.
 */

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import {
  useRoleDetail,
  RoleDetailCard,
  RolePermissionAssignment,
} from "@/features/roles";

export default function RoleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data, isLoading, isError, error, refetch, isRefetching } = useRoleDetail(id);

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ vai trò."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const role = data.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/roles")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách</span>
        </Button>
      </div>

      <PageHeader
        title={`Chi tiết vai trò: ${role.name}`}
        description={`Cấu hình thông tin vai trò và bảng ánh xạ quyền hạn của ${role.name}.`}
      />

      <div className="flex flex-col gap-6">
        {/* Role summary card */}
        <RoleDetailCard role={role} />

        {/* Permissions assignment module grids */}
        <div className="mt-2">
          <h3 className="font-display text-base font-bold text-slate-800 mb-4 px-1">
            Bảng phân bổ quyền hệ thống
          </h3>
          <RolePermissionAssignment roleId={role.id} />
        </div>
      </div>
    </div>
  );
}
