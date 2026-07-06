"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Send, ShieldAlert, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Input } from "@/components/ui/input";
import { hasPermission } from "@/lib/permissions/has-permission";
import {
  useWeeklyUpdateDetails,
  useUpdateWeeklyUpdate,
  useSubmitWeeklyUpdate,
  useApproveWeeklyUpdate,
  useRejectWeeklyUpdate,
  usePublishWeeklyUpdate,
} from "@/features/weekly-updates/hooks/use-weekly-updates";

type SessionItemFormValue = {
  id?: string;
  sessionDate: string;
  lessonNo: number | null;
  learningContent: string;
  homeworkContent: string | null;
  note: string | null;
};

type WeeklyUpdateFormValues = {
  title: string;
  overallSummary: string | null;
  sessionItems: SessionItemFormValue[];
};

export default function WeeklyUpdateDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data, isLoading, isError, refetch } = useWeeklyUpdateDetails(id);

  const updateMutation = useUpdateWeeklyUpdate();
  const submitMutation = useSubmitWeeklyUpdate();
  const approveMutation = useApproveWeeklyUpdate();
  const rejectMutation = useRejectWeeklyUpdate();
  const publishMutation = usePublishWeeklyUpdate();

  const isOfficeStaff = hasPermission("weekly-update:approve");
  const isTeacher = hasPermission("weekly-update:create");

  const { register, control, handleSubmit, reset } = useForm<WeeklyUpdateFormValues>({
    defaultValues: {
      title: "",
      overallSummary: "",
      sessionItems: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "sessionItems",
  });

  React.useEffect(() => {
    if (data) {
      reset({
        title: data.update.title,
        overallSummary: data.update.overallSummary,
        sessionItems: data.sessionItems,
      });
    }
  }, [data, reset]);

  if (isLoading || !data) {
    return <LoadingState variant="spinner" className="min-h-96" />;
  }

  if (isError) {
    return <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />;
  }

  const { update } = data;

  const handleSave = async (values: WeeklyUpdateFormValues) => {
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
    const reason = prompt("Vui lòng nhập lý do từ chối bản báo cáo này:");
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

  const isEditable = update.status === "DRAFT" || update.status === "REJECTED";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/weekly-updates")}
          className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>
      </div>

      <PageHeader
        title={update.title}
        description={`Mã lớp: ${update.classCode} · Thời gian: ${update.weekStartDate} đến ${update.weekEndDate}`}
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={update.status} />
          </div>
        }
      />

      {/* Review warning */}
      {update.status === "REJECTED" && update.rejectionReason && (
        <div className="flex items-start gap-3 bg-red-50/70 border border-red-200/80 p-4 rounded-2xl text-[#C90012] backdrop-blur-md">
          <ShieldAlert className="h-5 w-5 text-[#C90012] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Bản báo cáo bị từ chối phê duyệt</h4>
            <p className="text-xs mt-1 text-red-600 font-semibold">Lý do: {update.rejectionReason}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(handleSave)} className="grid gap-6 lg:grid-cols-3">
        {/* Core fields info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Nội dung chi tiết từng buổi học
            </h3>

            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-slate-200/60 p-4 rounded-xl bg-white/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Buổi số {field.lessonNo || index + 1}</span>
                    <span className="text-xs font-semibold text-slate-500">{field.sessionDate}</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Nội dung bài học</label>
                    <textarea
                      disabled={!isEditable}
                      {...register(`sessionItems.${index}.learningContent` as const)}
                      placeholder="Nhập những từ vựng, cấu trúc câu đã học..."
                      className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-20"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Bài tập về nhà</label>
                    <textarea
                      disabled={!isEditable}
                      {...register(`sessionItems.${index}.homeworkContent` as const)}
                      placeholder="Bài tập viết từ, làm bài trang nào..."
                      className="w-full text-xs font-semibold bg-white/60 border border-border/60 rounded-xl p-3 focus:bg-white outline-none min-h-20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action sidebar panel */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex flex-col gap-4">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
              Tổng quan & Phê duyệt
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Tóm tắt chung tuần này</label>
              <textarea
                disabled={!isEditable}
                {...register("overallSummary")}
                placeholder="Nhận xét chung về tiến độ học của cả lớp..."
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
                    <Send className="h-4 w-4 mr-2" /> Gửi duyệt báo cáo
                  </Button>
                </>
              )}

              {isOfficeStaff && update.status === "SUBMITTED" && (
                <>
                  <Button type="button" onClick={handleApprove} disabled={approveMutation.isPending} className="w-full font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer rounded-xl">
                    <CheckCircle2 className="h-4 w-4 mr-2" /> Phê duyệt báo cáo
                  </Button>
                  <Button type="button" onClick={handleReject} disabled={rejectMutation.isPending} className="w-full font-semibold bg-[#C90012] hover:bg-red-800 text-white cursor-pointer rounded-xl">
                    <XCircle className="h-4 w-4 mr-2" /> Từ chối duyệt
                  </Button>
                </>
              )}

              {isOfficeStaff && update.status === "APPROVED" && (
                <Button type="button" onClick={handlePublish} disabled={publishMutation.isPending} className="w-full font-semibold bg-[#FF161A] hover:bg-[#C90012] text-white cursor-pointer rounded-xl">
                  <Sparkles className="h-4 w-4 mr-2" /> Phát hành gửi phụ huynh
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
