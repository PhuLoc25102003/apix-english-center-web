"use client";

/**
 * src/features/parents/components/parent-edit-container.tsx
 *
 * Container component for modifying an existing parent's details.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { ParentForm } from "./parent-form";
import { useParent } from "../hooks/use-parent";
import { useUpdateParent } from "../hooks/use-update-parent";
import { useConfirm } from "@/hooks/use-confirm";
import type { ParentFormValues } from "../schemas/parent.schema";

interface ParentEditContainerProps {
  id: string;
}

export function ParentEditContainer({ id }: ParentEditContainerProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useParent(id);
  const updateMutation = useUpdateParent();
  const confirm = useConfirm();

  const handleSubmit = async (values: ParentFormValues) => {
    const ok = await confirm({
      title: "Xác nhận cập nhật",
      description: `Bạn có chắc chắn muốn lưu các thay đổi cho phụ huynh ${data?.data?.fullName || ""}?`,
      confirmLabel: "Cập nhật",
      cancelLabel: "Hủy",
      variant: "default",
    });

    if (ok) {
      updateMutation.mutate(
        { id, data: values },
        {
          onSuccess: () => {
            router.push("/parents");
          },
        }
      );
    }
  };

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Đã xảy ra lỗi khi tải hồ sơ phụ huynh."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

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
        title="Chỉnh Sửa Hồ Sơ Phụ Huynh"
        description={`Cập nhật thông tin chi tiết cho phụ huynh: ${data.data.fullName}`}
      />

      <div className="max-w-3xl">
        <ParentForm
          initialValues={data.data}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Cập nhật thông tin"
        />
      </div>
    </div>
  );
}
