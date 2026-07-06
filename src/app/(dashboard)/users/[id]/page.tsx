"use client";

/**
 * src/app/(dashboard)/users/[id]/page.tsx
 *
 * User Detail page featuring account details, status actions, and role assignment.
 */

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import {
  useUserDetail,
  UserDetailCard,
  UserRoleAssignment,
} from "@/features/users";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data, isLoading, isError, error, refetch, isRefetching } = useUserDetail(id);

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ tài khoản người dùng."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const user = data.data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/users")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách</span>
        </Button>
      </div>

      <PageHeader
        title={`Chi tiết người dùng: ${user.fullName}`}
        description={`Hồ sơ tài khoản và cấu hình nhóm quyền truy cập của ${user.fullName}.`}
      />

      <div className="grid gap-6 md:grid-cols-3 items-start">
        {/* User profile card & account actions */}
        <div className="md:col-span-2">
          <UserDetailCard user={user} />
        </div>

        {/* Roles assignment section */}
        <div className="md:col-span-1">
          <UserRoleAssignment userId={user.id} />
        </div>
      </div>
    </div>
  );
}
