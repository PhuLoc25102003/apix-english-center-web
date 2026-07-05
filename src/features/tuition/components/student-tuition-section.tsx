"use client";

import { CreditCard } from "lucide-react";

import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { useStudentTuition } from "../hooks/use-student-tuition";
import { TuitionInvoiceTable } from "./tuition-invoice-table";

export function StudentTuitionSection({ studentId }: { studentId: string }) {
  const query = useStudentTuition(studentId);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-bold text-slate-900">
          Học phí theo tháng
        </h2>
        <p className="text-sm text-slate-500">
          Theo dõi hóa đơn, khoản đã trả và công nợ theo từng kỳ tháng.
        </p>
      </div>
      {query.isLoading ? (
        <LoadingState variant="table" />
      ) : query.isError ? (
        <ErrorState
          title="Không thể tải lịch sử học phí"
          message={query.error.message}
          onRetry={query.refetch}
          isRetrying={query.isRefetching}
        />
      ) : !query.data?.data.length ? (
        <EmptyState
          icon={<CreditCard className="h-8 w-8" />}
          title="Chưa có hóa đơn học phí tháng"
          description="Học viên chưa có kỳ học phí nào được lập hóa đơn."
        />
      ) : (
        <TuitionInvoiceTable invoices={query.data.data} showClass />
      )}
    </section>
  );
}
