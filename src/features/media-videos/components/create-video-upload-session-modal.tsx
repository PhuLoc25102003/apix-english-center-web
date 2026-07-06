"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useStudents } from "@/features/students/hooks/use-students";
import { useCreateVideoUploadSession } from "../hooks/use-create-video-upload-session";
import { createSessionSchema, type CreateSessionFormValues } from "../schemas/media-video.schema";
import type { VideoUploadSession } from "../types/media-video.type";

interface CreateVideoUploadSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (session: VideoUploadSession) => void;
}

const videoTypeOptions = [
  { value: "CLASS_ACTIVITY", label: "Hoạt động lớp học (Foreign Teacher Activity)" },
  { value: "MONTHLY_REVIEW", label: "Đánh giá tháng học viên (Monthly Video)" },
  { value: "FINAL_PROJECT", label: "Video cuối khóa (Final Project)" },
  { value: "OTHER", label: "Khác" },
];

const getMonthOptions = () => {
  const options: { value: string; label: string }[] = [];
  const date = new Date();
  // Standard list of last 3 and next 3 months
  date.setMonth(date.getMonth() - 3);
  for (let i = 0; i < 7; i++) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    options.push({
      value: `${y}-${m}`,
      label: `Tháng ${m}/${y}`,
    });
    date.setMonth(date.getMonth() + 1);
  }
  return options.reverse();
};

export function CreateVideoUploadSessionModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateVideoUploadSessionModalProps) {
  const createSessionMutation = useCreateVideoUploadSession();

  const { data: classesData, isLoading: isLoadingClasses } = useClasses({ limit: 100 });
  const classesList = React.useMemo(() => classesData?.data || [], [classesData]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateSessionFormValues>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      classId: "",
      studentId: "",
      videoType: "MONTHLY_REVIEW",
      targetMonth: "",
      title: "",
      description: "",
    },
  });

  const selectedClassId = watch("classId");

  // Fetch students filtered by class
  const { data: studentsData, isLoading: isLoadingStudents } = useStudents({
    limit: 200,
    classId: selectedClassId || undefined,
  });
  const studentsList = React.useMemo(() => studentsData?.data || [], [studentsData]);

  // Auto-reset student if class changes
  React.useEffect(() => {
    setValue("studentId", "");
  }, [selectedClassId, setValue]);

  // Months options list
  const monthOptions = React.useMemo(() => getMonthOptions(), []);

  // Pre-fill target month if empty
  React.useEffect(() => {
    if (open && monthOptions.length > 0) {
      const currentMonth = monthOptions.find((m) => {
        const now = new Date();
        const y = now.getFullYear();
        const mStr = (now.getMonth() + 1).toString().padStart(2, "0");
        return m.value === `${y}-${mStr}`;
      });
      if (currentMonth) {
        setValue("targetMonth", currentMonth.value);
      }
    }
  }, [open, monthOptions, setValue]);

  // Auto-fill title based on class, student, type, and month selection
  const selectedStudentId = watch("studentId");
  const selectedVideoType = watch("videoType");
  const selectedTargetMonth = watch("targetMonth");

  React.useEffect(() => {
    if (!open) return;
    const currentClass = classesList.find((c) => c.id === selectedClassId);
    const currentStudent = studentsList.find((s) => s.id === selectedStudentId);
    const typeLabel = videoTypeOptions.find((t) => t.value === selectedVideoType)?.label.split(" (")[0] || "";
    const formattedMonth = selectedTargetMonth ? selectedTargetMonth.split("-").reverse().join("/") : "";

    if (currentClass && currentStudent && selectedVideoType && selectedTargetMonth) {
      setValue(
        "title",
        `Video ${typeLabel} - ${currentStudent.fullName} - Lớp ${currentClass.classCode || currentClass.name} (${formattedMonth})`
      );
    }
  }, [
    selectedClassId,
    selectedStudentId,
    selectedVideoType,
    selectedTargetMonth,
    classesList,
    studentsList,
    setValue,
    open,
  ]);

  const onSubmitForm = async (values: CreateSessionFormValues) => {
    try {
      const session = await createSessionMutation.mutateAsync({
        classId: values.classId,
        studentId: values.studentId,
        videoType: values.videoType,
        targetMonth: values.targetMonth,
        title: values.title,
        description: values.description,
      });

      toast.success("Tạo phiên tải lên bằng QR thành công!");
      onSuccess(session);
      reset();
    } catch (error: unknown) {
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể tạo phiên tải lên. Vui lòng thử lại."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-900">
            Tạo phiên tải lên Video bằng Điện thoại
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Hệ thống sẽ tạo mã QR. Giáo viên hoặc nhân viên có thể quét mã bằng điện thoại để quay/tải lên video trực tiếp mà không cần cắm cáp chuyển tập tin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 mt-2">
          {/* Class Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Lớp học <span className="text-red-500">*</span></label>
            <Controller
              control={control}
              name="classId"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="bg-white/50 border-slate-200 rounded-xl cursor-pointer">
                    <SelectValue placeholder={isLoadingClasses ? "Đang tải danh sách lớp..." : "Chọn lớp học"} />
                  </SelectTrigger>
                  <SelectContent>
                    {classesList.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.classCode || c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.classId && (
              <span className="text-[10px] text-red-500 font-semibold">{errors.classId.message}</span>
            )}
          </div>

          {/* Student Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Học viên <span className="text-red-500">*</span></label>
            <Controller
              control={control}
              name="studentId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!selectedClassId || isLoadingStudents}
                >
                  <SelectTrigger className="bg-white/50 border-slate-200 rounded-xl cursor-pointer">
                    <SelectValue
                      placeholder={
                        !selectedClassId
                          ? "Vui lòng chọn lớp học trước"
                          : isLoadingStudents
                          ? "Đang tải danh sách học viên..."
                          : "Chọn học viên"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {studentsList.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.studentId && (
              <span className="text-[10px] text-red-500 font-semibold">{errors.studentId.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Video Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Loại video <span className="text-red-500">*</span></label>
              <Controller
                control={control}
                name="videoType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white/50 border-slate-200 rounded-xl cursor-pointer">
                      <SelectValue placeholder="Chọn loại video" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoTypeOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label.split(" (")[0]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.videoType && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.videoType.message}</span>
              )}
            </div>

            {/* Target Month */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Tháng áp dụng <span className="text-red-500">*</span></label>
              <Controller
                control={control}
                name="targetMonth"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="bg-white/50 border-slate-200 rounded-xl cursor-pointer">
                      <SelectValue placeholder="Chọn tháng" />
                    </SelectTrigger>
                    <SelectContent>
                      {monthOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.targetMonth && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.targetMonth.message}</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Tiêu đề Video <span className="text-red-500">*</span></label>
            <Input
              type="text"
              placeholder="Nhập tiêu đề video..."
              className="bg-white/50 border-slate-200 rounded-xl text-sm"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-[10px] text-red-500 font-semibold">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Ghi chú / Mô tả</label>
            <Textarea
              rows={2}
              placeholder="Nhập ghi chú hoặc mô tả bổ sung (nếu có)..."
              className="bg-white/50 border-slate-200 rounded-xl text-sm resize-none"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-[10px] text-red-500 font-semibold">{errors.description.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              className="rounded-xl border border-slate-200 text-slate-700 h-10 hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={createSessionMutation.isPending}
              className="bg-[#FF161A] text-white hover:bg-[#C90012] px-6 h-10 rounded-xl font-bold cursor-pointer transition-all shadow-md shadow-[#FF161A]/10"
            >
              {createSessionMutation.isPending ? "Đang tạo phiên..." : "Tạo phiên & Xem QR"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
