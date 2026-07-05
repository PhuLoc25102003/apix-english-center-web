"use client";

/**
 * src/features/parents/components/parent-create-container.tsx
 *
 * Container component for adding a new parent record.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { ParentForm } from "./parent-form";
import { useCreateParent } from "../hooks/use-create-parent";
import type { ParentFormValues } from "../schemas/parent.schema";

export function ParentCreateContainer() {
  const router = useRouter();
  const createMutation = useCreateParent();

  const handleSubmit = (values: ParentFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        router.push("/parents");
      },
    });
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
        title="Thêm Hồ Sơ Phụ Huynh"
        description="Nhập thông tin cá nhân và phương thức liên lạc của phụ huynh."
      />

      <div className="max-w-3xl">
        <ParentForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Thêm phụ huynh"
        />
      </div>
    </div>
  );
}
