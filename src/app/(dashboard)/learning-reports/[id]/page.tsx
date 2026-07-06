"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Send, CheckCircle2, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { hasPermission } from "@/lib/permissions/has-permission";
import {
  useReportDetails,
  useUpdateReport,
  useSubmitReport,
  useApproveReport,
  useRejectReport,
  usePublishReport,
} from "@/features/learning-reports/hooks/use-learning-reports";

const reportSchema = z.object({
  learningSummary: z.string().min(1, "Vui lòng nhập tóm tắt học tập"),
  attitudeSummary: z.string().min(1, "Vui lòng nhập tóm tắt thái độ"),
  improvementNotes: z.string().min(1, "Vui lòng nhập định hướng cải thiện"),
  recommendation: z.string().min(1, "Vui lòng nhập khuyến nghị"),
  internalNote: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function LearningReportDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data, isLoading, isError, refetch } = useReportDetails(id);

  const updateMutation = useUpdateReport();
  const submitMutation = useSubmitReport();
  const approveMutation = useApproveReport();
  const rejectMutation = useRejectReport();
  const publishMutation = usePublishReport();

  const isOfficeStaff = hasPermission("learning-report:approve");
  const isTeacher = hasPermission("learning-report:create");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormValues>({
    defaultValues: {
      learningSummary: "",
      attitudeSummary: "",
      improvementNotes: "",
      recommendation: "",
      internalNote: "",
    },
  });

  React.useEffect(() => {
    if (data) {
      reset({
        learningSummary: data.learningSummary,
        attitudeSummary: data.attitudeSummary,
        improvementNotes: data.improvementNotes,
        recommendation: data.recommendation,
        internalNote: data.internalNote || "",
      });
    }
  }, [data, reset]);

  if (isLoading || !data) {
    return <LoadingState variant="spinner" className="min-h-96" />;
  }

  if (isError) {
    return <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />;
  }

  const handleSave = async (values: ReportFormValues) => {
    await updateMutation.mutateAsync({ id, data: values });
  };

  const handleSubmitReview = async () => {
    await submitMutation.mutateAsync(id, {
      onSuccess: () => refetch(),
    });
  };

  const handleApprove = async () => {
    await approveMutation.mutateAsync(id, {
      onSuccess: () => refetch(),
    });
  };

  const handleReject = async () => {
    const reason = prompt("Vui lòng nhập lý do từ chối bản nhận xét này:");
    if (reason) {
      await rejectMutation.mutateAsync({ id, reason }, {
        onSuccess: () => refetch(),
      });
    }
  };

  const handlePublish = async () => {
    await publishMutation.mutateAsync(id, {
      onSuccess: () => refetch(),
    });
  };

  const isEditable = data.status === "DRAFT" || data.status === "REJECTED";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/learning-reports")}
          className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>
      </div>

      <PageHeader
        title={`Nhận xét học viên: ${data.studentName}`}
        description={`Mã học viên: ${data.studentCode} · Người viết: ${data.preparedBy}`}
        action={<StatusBadge status={data.status} />}
      />

      {data.status === "REJECTED" && data.rejectionReason && (
        <div className="bg-red-50 text-[#C90012] border border-red-200 p-4 rounded-xl text-xs font-semibold">
          Bản nhận xét bị từ chối: {data.rejectionReason}
        </div>
      )}

      <form onSubmit={handleSubmit(handleSave)} className="grid gap-6 lg:grid-cols-3">
        {/* Core evaluation textareas */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Nội dung nhận xét năng lực học tập
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tóm tắt học tập (Listening/Speaking/Reading/Writing...)</label>
                <textarea
                  disabled={!isEditable}
                  {...register("learningSummary")}
                  placeholder="Đánh giá khả năng tiếp thu bài giảng, kỹ năng nghe, nói, đọc, viết..."
                  className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-24"
                />
                {errors.learningSummary && <span className="text-[10px] font-bold text-[#C90012]">{errors.learningSummary.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Thái độ học tập trên lớp</label>
                <textarea
                  disabled={!isEditable}
                  {...register("attitudeSummary")}
                  placeholder="Tinh thần xây dựng bài, sự hợp tác làm bài tập nhóm..."
                  className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-20"
                />
                {errors.attitudeSummary && <span className="text-[10px] font-bold text-[#C90012]">{errors.attitudeSummary.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Định hướng & Gợi ý cải thiện</label>
                <textarea
                  disabled={!isEditable}
                  {...register("improvementNotes")}
                  placeholder="Các kỹ năng cần rèn luyện thêm tại nhà..."
                  className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-20"
                />
                {errors.improvementNotes && <span className="text-[10px] font-bold text-[#C90012]">{errors.improvementNotes.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Khuyến nghị của Giáo viên</label>
                <textarea
                  disabled={!isEditable}
                  {...register("recommendation")}
                  placeholder="Tài liệu tham khảo, sách đọc thêm..."
                  className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-20"
                />
                {errors.recommendation && <span className="text-[10px] font-bold text-[#C90012]">{errors.recommendation.message}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Lưu trữ & Phê duyệt
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Ghi chú nội bộ trung tâm</label>
              <textarea
                disabled={!isEditable}
                {...register("internalNote")}
                placeholder="Thông tin bàn giao giáo viên khác, ghi chú nhạy cảm..."
                className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-24"
              />
            </div>

            <div className="flex flex-col gap-2.5 mt-4">
              {isEditable && isTeacher && (
                <>
                  <Button type="submit" disabled={updateMutation.isPending} className="w-full font-semibold bg-[#FF161A] hover:bg-[#C90012] text-white cursor-pointer rounded-xl">
                    <Save className="h-4 w-4 mr-2" /> Lưu bản nháp
                  </Button>
                  <Button type="button" onClick={handleSubmitReview} disabled={submitMutation.isPending} className="w-full font-semibold bg-slate-900 hover:bg-slate-850 text-white cursor-pointer rounded-xl">
                    <Send className="h-4 w-4 mr-2" /> Nộp duyệt nhận xét
                  </Button>
                </>
              )}

              {isOfficeStaff && data.status === "SUBMITTED" && (
                <>
                  <Button type="button" onClick={handleApprove} disabled={approveMutation.isPending} className="w-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer rounded-xl">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Phê duyệt nhận xét
                  </Button>
                  <Button type="button" onClick={handleReject} disabled={rejectMutation.isPending} className="w-full font-semibold bg-[#C90012] hover:bg-red-800 text-white cursor-pointer rounded-xl">
                    <XCircle className="h-4 w-4 mr-2" /> Từ chối nhận xét
                  </Button>
                </>
              )}

              {isOfficeStaff && data.status === "APPROVED" && (
                <Button type="button" onClick={handlePublish} disabled={publishMutation.isPending} className="w-full font-semibold bg-[#FF161A] hover:bg-[#C90012] text-white cursor-pointer rounded-xl">
                  Công bố nhận xét học viên
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
