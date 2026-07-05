"use client";

/**
 * src/features/students/components/student-create-container.tsx
 *
 * Container component for creating a new student profile.
 * Coordinates page presentation, mutations, toast reports, and redirection.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { StudentForm } from "./student-form";
import { useCreateStudent } from "../hooks/use-create-student";
import type { StudentFormValues } from "../schemas/student.schema";

export function StudentCreateContainer() {
  const router = useRouter();
  const createMutation = useCreateStudent();

  const handleSubmit = (values: StudentFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push("/students");
      },
    });
  };

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
        title="Thêm Học Viên Mới"
        description="Nhập thông tin cá nhân học viên và thiết lập cài đặt tài khoản."
      />

      <div className="max-w-3xl">
        <StudentForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Tạo học viên"
        />
      </div>
    </div>
  );
}
