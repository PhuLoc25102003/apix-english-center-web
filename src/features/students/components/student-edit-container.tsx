"use client";

/**
 * src/features/students/components/student-edit-container.tsx
 *
 * Container component for modifying an existing student's details.
 * Integrates query loaders, mutations, and status states (Loading/Error).
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StudentForm } from "./student-form";
import { useStudent } from "../hooks/use-student";
import { useUpdateStudent } from "../hooks/use-update-student";
import type { StudentFormValues } from "../schemas/student.schema";

interface StudentEditContainerProps {
  id: string;
}

export function StudentEditContainer({ id }: StudentEditContainerProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useStudent(id);
  const updateMutation = useUpdateStudent();

  const handleSubmit = (values: StudentFormValues) => {
    updateMutation.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          router.push("/students");
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Đã xảy ra lỗi khi tải hồ sơ học viên."}
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
          onClick={() => router.push("/students")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <PageHeader
        title="Chỉnh Sửa Hồ Sơ Học Viên"
        description={`Cập nhật thông tin chi tiết cho học viên: ${data.data.fullName}`}
      />

      <div className="max-w-3xl">
        <StudentForm
          initialValues={data.data}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Cập nhật thông tin"
        />
      </div>
    </div>
  );
}
