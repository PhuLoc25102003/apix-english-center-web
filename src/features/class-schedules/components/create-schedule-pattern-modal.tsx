"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CalendarDays,
  GraduationCap,
  DoorOpen,
  Clock,
  Settings,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateClassSchedulePattern } from "../hooks/use-create-class-schedule-pattern";

const patternOptions = [
  {
    value: "MON_WED_FRI_SLOT_1",
    label: "Thứ 2 - 4 - 6, Ca 1, 18:00 - 19:30",
    weekdays: "Thứ Hai, Thứ Tư, Thứ Sáu",
    timeRange: "18:00 - 19:30",
    weeklyCount: 3,
  },
  {
    value: "MON_WED_FRI_SLOT_2",
    label: "Thứ 2 - 4 - 6, Ca 2, 19:30 - 21:00",
    weekdays: "Thứ Hai, Thứ Tư, Thứ Sáu",
    timeRange: "19:30 - 21:00",
    weeklyCount: 3,
  },
  {
    value: "TUE_THU_SAT_SLOT_1",
    label: "Thứ 3 - 5 - 7, Ca 1, 18:00 - 19:30",
    weekdays: "Thứ Ba, Thứ Năm, Thứ Bảy",
    timeRange: "18:00 - 19:30",
    weeklyCount: 3,
  },
  {
    value: "TUE_THU_SAT_SLOT_2",
    label: "Thứ 3 - 5 - 7, Ca 2, 19:30 - 21:00",
    weekdays: "Thứ Ba, Thứ Năm, Thứ Bảy",
    timeRange: "19:30 - 21:00",
    weeklyCount: 3,
  },
  {
    value: "SAT_SUN_MORNING",
    label: "Thứ 7 - Chủ nhật, Sáng, 09:00 - 11:00",
    weekdays: "Thứ Bảy, Chủ Nhật",
    timeRange: "09:00 - 11:00",
    weeklyCount: 2,
  },
  {
    value: "SAT_SUN_AFTERNOON",
    label: "Thứ 7 - Chủ nhật, Chiều, 15:00 - 17:00",
    weekdays: "Thứ Bảy, Chủ Nhật",
    timeRange: "15:00 - 17:00",
    weeklyCount: 2,
  },
];

const schema = z.object({
  classId: z.string().min(1, "Vui lòng chọn lớp học"),
  roomId: z.string().min(1, "Vui lòng chọn phòng học"),
  schedulePattern: z.string().min(1, "Vui lòng chọn khung lịch cố định"),
  effectiveFrom: z.string().min(1, "Vui lòng chọn ngày hiệu lực bắt đầu"),
  effectiveTo: z.string().nullable().optional(),
  generateMonths: z.coerce.number().min(1).max(12).default(4),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

type FormValues = z.infer<typeof schema>;

interface CreateSchedulePatternModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classes: Array<{ value: string; label: string }>;
  rooms: Array<{ value: string; label: string }>;
  onSuccess?: () => void;
}

export function CreateSchedulePatternModal({
  open,
  onOpenChange,
  classes,
  rooms,
  onSuccess,
}: CreateSchedulePatternModalProps) {
  const mutation = useCreateClassSchedulePattern();
  const [result, setResult] = React.useState<any | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      classId: "",
      roomId: "",
      schedulePattern: "",
      effectiveFrom: new Date().toISOString().split("T")[0],
      effectiveTo: "",
      generateMonths: 4,
      status: "ACTIVE",
    },
  });

  const selectedPatternValue = watch("schedulePattern");
  const effectiveFromValue = watch("effectiveFrom");
  const generateMonthsValue = watch("generateMonths") || 4;

  const selectedPattern = React.useMemo(() => {
    return patternOptions.find((p) => p.value === selectedPatternValue);
  }, [selectedPatternValue]);

  // Rough estimation of generated sessions
  const estimatedSessions = React.useMemo(() => {
    if (!selectedPattern || !effectiveFromValue) return 0;
    const weeks = (generateMonthsValue * 30.4) / 7;
    return Math.round(weeks * selectedPattern.weeklyCount);
  }, [selectedPattern, effectiveFromValue, generateMonthsValue]);

  const handleFormSubmit = async (values: FormValues) => {
    const payload = {
      classId: values.classId,
      roomId: values.roomId,
      schedulePattern: values.schedulePattern,
      effectiveFrom: values.effectiveFrom,
      effectiveTo: values.effectiveTo || null,
      generateMonths: values.generateMonths,
      status: values.status,
    };

    try {
      const resp = await mutation.mutateAsync(payload);
      if (resp.success && resp.data) {
        setResult(resp.data);
        onSuccess?.();
      }
    } catch (err: any) {
      toast.error(err.message || "Không thể tạo lịch học theo khung.");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => (!val ? handleClose() : onOpenChange(val))}>
      <DialogContent className="sm:max-w-[550px] glass-card border border-white/40 shadow-xl rounded-2xl bg-white/90 p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#FF161A]" />
            Cấu hình thời khóa biểu theo khung cố định
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs">
            Hệ thống sẽ tự động sinh các buổi học và bảng điểm danh trống cho lớp trong 4 tháng tới.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          /* Result view */
          <div className="flex flex-col items-center gap-5 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Cấu hình thời khóa biểu thành công!</h4>
              <p className="text-slate-500 text-xs mt-1">Lịch học đã được lưu và sinh buổi học tự động.</p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Số buổi học đã sinh</span>
                <span className="text-sm font-bold text-slate-800">{result.generatedSessionsCount} buổi</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Số bản ghi điểm danh</span>
                <span className="text-sm font-bold text-slate-800">{result.generatedAttendanceRecordsCount} bản ghi</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Buổi đầu tiên</span>
                <span className="text-xs font-semibold text-slate-700">{result.firstSessionDate || "-"}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Buổi cuối cùng</span>
                <span className="text-xs font-semibold text-slate-700">{result.lastSessionDate || "-"}</span>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-10 font-semibold cursor-pointer"
            >
              Hoàn tất
            </Button>
          </div>
        ) : (
          /* Form view */
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Class Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                  Lớp học
                </label>
                <Controller
                  control={control}
                  name="classId"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
                    >
                      <option value="">Chọn lớp học</option>
                      {classes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.classId && <span className="text-[10px] text-rose-500 font-semibold">{errors.classId.message}</span>}
              </div>

              {/* Room Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <DoorOpen className="h-3.5 w-3.5 text-slate-400" />
                  Phòng học
                </label>
                <Controller
                  control={control}
                  name="roomId"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
                    >
                      <option value="">Chọn phòng học</option>
                      {rooms.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.roomId && <span className="text-[10px] text-rose-500 font-semibold">{errors.roomId.message}</span>}
              </div>
            </div>

            {/* Schedule Pattern */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Settings className="h-3.5 w-3.5 text-slate-400" />
                Khung lịch học cố định
              </label>
              <Controller
                control={control}
                name="schedulePattern"
                render={({ field }) => (
                  <select
                    {...field}
                    className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
                  >
                    <option value="">Chọn khung lịch học</option>
                    {patternOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.schedulePattern && (
                <span className="text-[10px] text-rose-500 font-semibold">{errors.schedulePattern.message}</span>
              )}
            </div>

            {/* Pattern Preview Panel */}
            {selectedPattern && (
              <div className="border border-red-100 bg-[#FFF8F8] rounded-xl p-3 text-xs flex flex-col gap-1 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF161A] block">Xem trước khung lịch</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  Lịch học: <span className="text-[#FF161A] font-bold">{selectedPattern.weekdays}</span>
                </p>
                <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Ca học: <span className="font-semibold text-slate-700">{selectedPattern.timeRange}</span>
                </p>
                <p className="text-slate-500 text-[11px] mt-1 italic">
                  Ước tính sẽ tự động sinh khoảng <strong className="text-slate-700">{estimatedSessions} buổi học</strong> cho lớp trong 4 tháng tới.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Effective From */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Hiệu lực từ ngày
                </label>
                <input
                  type="date"
                  {...register("effectiveFrom")}
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
                {errors.effectiveFrom && (
                  <span className="text-[10px] text-rose-500 font-semibold">{errors.effectiveFrom.message}</span>
                )}
              </div>

              {/* Generate Months */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Thời gian tự động sinh (Tháng)
                </label>
                <input
                  type="number"
                  {...register("generateMonths")}
                  placeholder="Mặc định: 4"
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
                {errors.generateMonths && (
                  <span className="text-[10px] text-rose-500 font-semibold">{errors.generateMonths.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Effective To */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  Hiệu lực đến ngày (Tùy chọn)
                </label>
                <input
                  type="date"
                  {...register("effectiveTo")}
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <Settings className="h-3.5 w-3.5 text-slate-400" />
                  Trạng thái
                </label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
                    >
                      <option value="ACTIVE">Hoạt động (Active)</option>
                      <option value="INACTIVE">Tạm ngưng (Inactive)</option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="rounded-xl h-10 font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="bg-[#FF161A] text-white hover:bg-[#C90012] px-5 rounded-xl h-10 font-semibold shadow-md shadow-[#FF161A]/10 cursor-pointer"
              >
                {mutation.isPending ? "Đang xử lý..." : "Lưu & Sinh lịch học"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
