"use client";

import { CreditCard } from "lucide-react";

import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { useClassTuition } from "../hooks/use-class-tuition";
import { TuitionInvoiceTable } from "./tuition-invoice-table";

export function ClassTuitionSection({ classId }: { classId: string }) {
  const query = useClassTuition(classId);

  if (query.isLoading) return <LoadingState variant="table" />;
  if (query.isError) {
    return (
      <ErrorState
        title="Không thể tải học phí lớp"
        message={query.error.message}
        onRetry={query.refetch}
        isRetrying={query.isRefetching}
      />
    );
  }
  if (!query.data?.data.length) {
    return (
      <EmptyState
        icon={<CreditCard className="h-8 w-8" />}
        title="Chưa có hóa đơn học phí tháng"
        description="Hóa đơn theo tháng của học viên trong lớp sẽ xuất hiện tại đây."
      />
    );
  }

  return <TuitionInvoiceTable invoices={query.data.data} showStudent />;
}
