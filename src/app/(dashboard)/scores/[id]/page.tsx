"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScoreDetails, useSaveScoreRecords, usePublishScoreItem } from "@/features/scores/hooks/use-scores";

type RecordFormValue = {
  studentId: string;
  studentCode: string;
  studentName: string;
  scoreValue: number;
  note: string | null;
  savedStatus?: "saved" | "dirty" | "not_marked";
};

type ScoreFormValues = {
  records: RecordFormValue[];
};

export default function ScoreGradingPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const { data, isLoading, isError, refetch } = useScoreDetails(id);

  const saveMutation = useSaveScoreRecords(id);
  const publishMutation = usePublishScoreItem();

  const { register, control, handleSubmit, reset, watch, setValue } = useForm<ScoreFormValues>({
    defaultValues: {
      records: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "records",
  });

  // Keep track of dirty fields manually to display status badges
  const [dirtyRows, setDirtyRows] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (data) {
      reset({
        records: data.records.map((r) => ({
          studentId: r.studentId,
          studentCode: r.studentCode,
          studentName: r.studentName,
          scoreValue: r.scoreValue,
          note: r.note,
          savedStatus: "saved",
        })),
      });
      setDirtyRows({});
    }
  }, [data, reset]);

  if (isLoading || !data) {
    return <LoadingState variant="spinner" className="min-h-96" />;
  }

  if (isError) {
    return <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />;
  }

  const { item } = data;

  const handleRowChange = (index: number) => {
    setDirtyRows((prev) => ({ ...prev, [index]: true }));
  };

  const handleSave = async (values: ScoreFormValues) => {
    const payload = {
      records: values.records.map((r) => ({
        studentId: r.studentId,
        scoreValue: Number(r.scoreValue),
        note: r.note ? r.note.trim() : null,
      })),
    };
    await saveMutation.mutateAsync(payload, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handlePublish = async () => {
    await publishMutation.mutateAsync(id, {
      onSuccess: () => refetch(),
    });
  };

  const isEditable = item.status === "DRAFT";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/scores")}
          className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>
      </div>

      <PageHeader
        title={`Nhập điểm: ${item.title}`}
        description={`Lớp: ${item.className} · Điểm tối đa: ${item.maxScore} · Ngày kiểm tra: ${item.scoreDate || "-"}`}
        action={<StatusBadge status={item.status} />}
      />

      <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-6">
        <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[120px]">Mã học viên</TableHead>
                <TableHead className="w-[200px]">Họ và tên</TableHead>
                <TableHead className="w-[180px]">Điểm số</TableHead>
                <TableHead>Nhận xét / Ghi chú</TableHead>
                <TableHead className="w-[150px] text-center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => {
                const isDirty = dirtyRows[index] || false;
                return (
                  <TableRow key={field.id}>
                    <TableCell className="font-mono text-xs font-semibold">{field.studentCode}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{field.studentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.1"
                          disabled={!isEditable}
                          {...register(`records.${index}.scoreValue` as const, {
                            onChange: () => handleRowChange(index),
                          })}
                          className="h-9 w-24 rounded-xl bg-white/60 focus:bg-white text-center font-bold text-slate-800"
                        />
                        <span className="text-xs text-slate-400">/ {item.maxScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Nhập ghi chú hoặc thái độ làm bài..."
                        disabled={!isEditable}
                        {...register(`records.${index}.note` as const, {
                          onChange: () => handleRowChange(index),
                        })}
                        className="h-9 rounded-xl bg-white/60 focus:bg-white text-xs"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {isDirty ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="h-3 w-3" /> Chưa lưu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Đã lưu
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Form action triggers */}
        <div className="flex justify-end items-center gap-3 rounded-2xl border border-white/40 bg-white/40 p-4 backdrop-blur-md">
          {isEditable && (
            <>
              <Button
                type="submit"
                disabled={saveMutation.isPending}
                className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-5 py-2.5 rounded-xl shadow-md shadow-[#FF161A]/15 cursor-pointer"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveMutation.isPending ? "Đang lưu..." : "Lưu bảng điểm"}
              </Button>

              <Button
                type="button"
                onClick={handlePublish}
                disabled={publishMutation.isPending}
                className="font-semibold bg-slate-900 hover:bg-slate-850 text-white px-5 py-2.5 rounded-xl cursor-pointer"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Công bố điểm số
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
