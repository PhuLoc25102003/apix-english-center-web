"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useReportCycles, useCreateReportCycle } from "@/features/learning-reports/hooks/use-learning-reports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const cycleSchema = z.object({
  classId: z.string().min(1, "Vui lòng chọn lớp học"),
  reportType: z.enum(["TWO_MONTH", "FINAL", "CUSTOM"]),
  periodStart: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
  periodEnd: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
  teacherDeadlineAt: z.string().min(1, "Vui lòng chọn hạn nộp của giáo viên"),
});

type CycleFormValues = z.infer<typeof cycleSchema>;

export default function ReportCyclesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const classesQuery = useClasses({ limit: 100 });
  const classes = classesQuery.data?.data ?? [];

  const { data, isLoading, isError, refetch } = useReportCycles();
  const createMutation = useCreateReportCycle();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CycleFormValues>({
    defaultValues: {
      classId: "",
      reportType: "TWO_MONTH",
      periodStart: "",
      periodEnd: "",
      teacherDeadlineAt: "",
    },
  });

  const handleFormSubmit = async (values: CycleFormValues) => {
    // Format deadline date to ISO string
    const payload = {
      ...values,
      teacherDeadlineAt: new Date(values.teacherDeadlineAt).toISOString(),
    };
    await createMutation.mutateAsync(payload, {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
        refetch();
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/learning-reports"
          className="inline-flex h-9 items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900 text-xs font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách nhận xét
        </Link>
      </div>

      <PageHeader
        title="Chu kỳ đánh giá học tập"
        description="Quản lý và kích hoạt các chu kỳ nhận xét học tập định kỳ cho từng lớp học."
        action={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 cursor-pointer text-xs"
          >
            <Plus className="h-4 w-4 mr-2" />
            Mở chu kỳ mới
          </Button>
        }
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />
      ) : !data || data.data.length === 0 ? (
        <EmptyState title="Chưa có chu kỳ đánh giá nào" />
      ) : (
        <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Lớp học</TableHead>
                <TableHead>Loại nhận xét</TableHead>
                <TableHead>Khoảng thời gian</TableHead>
                <TableHead>Hạn nộp Giáo viên</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((cycle) => (
                <TableRow key={cycle.id}>
                  <TableCell className="font-semibold text-slate-900">
                    <span className="block">{cycle.className}</span>
                    <span className="block text-[10px] font-mono text-slate-500 mt-0.5">{cycle.classCode}</span>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {cycle.reportType === "TWO_MONTH" ? "Định kỳ 2 tháng" : cycle.reportType === "FINAL" ? "Cuối khóa" : "Tùy chỉnh"}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    {cycle.periodStart} đến {cycle.periodEnd}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    {new Date(cycle.teacherDeadlineAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={cycle.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">Kích hoạt chu kỳ đánh giá mới</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Lớp học áp dụng</label>
              <select
                {...register("classId")}
                className="h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold px-3 text-slate-800 outline-none"
              >
                <option value="">-- Chọn lớp học --</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.classCode} - {c.name}
                  </option>
                ))}
              </select>
              {errors.classId && <span className="text-[10px] font-bold text-[#C90012]">{errors.classId.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Loại nhận xét</label>
              <select
                {...register("reportType")}
                className="h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold px-3 text-slate-800 outline-none"
              >
                <option value="TWO_MONTH">Định kỳ 2 tháng</option>
                <option value="FINAL">Cuối khóa</option>
                <option value="CUSTOM">Tùy chỉnh</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Bắt đầu chu kỳ</label>
                <Input type="date" {...register("periodStart")} className="h-10 rounded-xl bg-slate-50" />
                {errors.periodStart && <span className="text-[10px] font-bold text-[#C90012]">{errors.periodStart.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Kết thúc chu kỳ</label>
                <Input type="date" {...register("periodEnd")} className="h-10 rounded-xl bg-slate-50" />
                {errors.periodEnd && <span className="text-[10px] font-bold text-[#C90012]">{errors.periodEnd.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Hạn nộp của giáo viên</label>
              <Input type="datetime-local" {...register("teacherDeadlineAt")} className="h-10 rounded-xl bg-slate-50" />
              {errors.teacherDeadlineAt && <span className="text-[10px] font-bold text-[#C90012]">{errors.teacherDeadlineAt.message}</span>}
            </div>

            <div className="flex justify-end gap-2.5 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" disabled={createMutation.isPending} className="bg-[#FF161A] text-white hover:bg-[#C90012] rounded-xl cursor-pointer">
                Kích hoạt chu kỳ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
