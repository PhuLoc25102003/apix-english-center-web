"use client";

/**
 * src/features/parents/components/parent-children-section.tsx
 *
 * Renders the Linked Students (Children) section inside the Parent detail profile.
 * Integrates link / unlink actions, relationship flags, and student search.
 */

import * as React from "react";
import { Plus, Trash2, Calendar, User, Link as LinkIcon, Phone, Mail } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { useConfirm } from "@/hooks/use-confirm";

import { useStudents } from "@/features/students/hooks/use-students";
import { useParentChildren } from "../hooks/use-parent-children";
import { useLinkParentStudent } from "../hooks/use-link-parent-student";
import { useUnlinkParentStudent } from "../hooks/use-unlink-parent-student";

const linkRelationshipSchema = z.object({
  studentId: z.string().min(1, "Vui lòng chọn học viên."),
  relationship: z.string().min(1, "Vui lòng chọn mối quan hệ."),
  isPrimaryContact: z.boolean(),
  canReceiveNotification: z.boolean(),
  canReceiveTuition: z.boolean(),
  canPickupStudent: z.boolean(),
  isEmergencyContact: z.boolean(),
});

type LinkFormValues = z.infer<typeof linkRelationshipSchema>;

interface ParentChildrenSectionProps {
  parentId: string;
}

export function ParentChildrenSection({ parentId }: ParentChildrenSectionProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = React.useState(false);
  const [studentSearch, setStudentSearch] = React.useState("");
  const confirm = useConfirm();

  // Queries & Mutations
  const { data: childrenData, isLoading, isError, error, refetch } = useParentChildren(parentId);
  const linkMutation = useLinkParentStudent(parentId);
  const unlinkMutation = useUnlinkParentStudent(parentId);

  // Students catalog for linking selector
  const { data: studentsCatalog, isLoading: isLoadingCatalog } = useStudents({
    limit: 50,
    search: studentSearch || undefined,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkRelationshipSchema),
    defaultValues: {
      studentId: "",
      relationship: "",
      isPrimaryContact: false,
      canReceiveNotification: true,
      canReceiveTuition: true,
      canPickupStudent: false,
      isEmergencyContact: false,
    },
  });

  const linkedChildren = childrenData?.data ?? [];

  const handleLinkSubmit = (values: LinkFormValues) => {
    linkMutation.mutate(
      {
        studentId: values.studentId,
        payload: {
          parentId,
          relationship: values.relationship,
          isPrimaryContact: values.isPrimaryContact,
          canReceiveNotification: values.canReceiveNotification,
          canReceiveTuition: values.canReceiveTuition,
          canPickupStudent: values.canPickupStudent,
          isEmergencyContact: values.isEmergencyContact,
        },
      },
      {
        onSuccess: () => {
          setIsLinkDialogOpen(false);
          reset();
          setStudentSearch("");
        },
      }
    );
  };



  const getRelationshipLabel = (rel: string) => {
    const labels: Record<string, string> = {
      FATHER: "Bố",
      MOTHER: "Mẹ",
      GUARDIAN: "Người giám hộ",
      OTHER: "Mối quan hệ khác",
    };
    return labels[rel] || rel;
  };

  const getGenderLabel = (gender: string) => {
    if (gender === "MALE") return "Nam";
    if (gender === "FEMALE") return "Nữ";
    return "Khác";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return <LoadingState variant="table" rows={2} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Lỗi tải danh sách học viên liên kết"
        message={error?.message || "Không thể tải danh sách học viên."}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-[#FF161A]" />
          Học viên liên kết ({linkedChildren.length})
        </h3>
        <Button
          onClick={() => {
            clearErrors();
            reset();
            setIsLinkDialogOpen(true);
          }}
          className="font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 px-3 py-1.5 h-8 text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Liên kết học viên
        </Button>
      </div>

      {/* Linked children list */}
      {linkedChildren.length === 0 ? (
        <div className="text-center p-6 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl">
          <p className="text-sm text-slate-500 font-medium">Phụ huynh này chưa được liên kết với học viên nào.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {linkedChildren.map((relation) => (
            <div
              key={relation.id}
              className="glass-card p-5 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-3 relative hover:border-slate-200 transition-colors"
            >
              {/* Student overview */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    {relation.fullName}
                    <span className="text-xs font-semibold text-[#FF161A] bg-[#FFE8EA] px-2 py-0.5 rounded-full">
                      {getRelationshipLabel(relation.relationship)}
                    </span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mt-0.5">
                    {relation.studentCode}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    const ok = await confirm({
                      title: "Gỡ liên kết học viên",
                      description: `Bạn có chắc muốn gỡ liên kết học viên ${relation.fullName} ra khỏi hồ sơ phụ huynh? Hồ sơ học viên trong hệ thống vẫn sẽ được giữ lại.`,
                      confirmLabel: "Hủy liên kết",
                      cancelLabel: "Hủy",
                      variant: "destructive",
                    });
                    if (ok) {
                      unlinkMutation.mutate(relation.id);
                    }
                  }}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                  title="Hủy liên kết"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Student info */}
              <div className="grid gap-1 text-xs text-slate-600 border-t border-slate-100/60 pt-2.5">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Ngày sinh: {formatDate(relation.dateOfBirth)}
                </p>
                <p className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Giới tính: {getGenderLabel(relation.gender)}
                </p>
              </div>

              {/* Relationship flag badges */}
              <div className="flex flex-wrap gap-1.5 mt-1 border-t border-slate-100/60 pt-2.5">
                {relation.isPrimaryContact && (
                  <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                    Liên hệ chính
                  </Badge>
                )}
                {relation.isEmergencyContact && (
                  <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-50 border border-rose-100 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                    Khẩn cấp
                  </Badge>
                )}
                {relation.canReceiveNotification && (
                  <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-100 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                    Nhận thông báo
                  </Badge>
                )}
                {relation.canReceiveTuition && (
                  <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-100 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                    Nhận học phí
                  </Badge>
                )}
                {relation.canPickupStudent && (
                  <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border border-indigo-100 rounded-lg px-2 py-0.5 text-[10px] font-semibold">
                    Đón học sinh
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link Student Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="glass-card sm:max-w-md p-6 border border-[#FF161A]/10 gap-6">
          <DialogHeader className="gap-1.5 text-left">
            <DialogTitle className="font-display text-lg font-bold text-slate-800">
              Liên kết học viên với phụ huynh
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Chọn một học viên đã có trong hệ thống và thiết lập cấu hình mối quan hệ.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleLinkSubmit)} className="flex flex-col gap-4">
            {/* Search Student Catalog */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="searchStudent" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Tìm kiếm học viên
              </label>
              <Input
                id="searchStudent"
                placeholder="Nhập tên học viên..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="bg-white/60 focus:bg-white border-border/60 h-10"
              />
            </div>

            {/* Select Student */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="studentId" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Chọn học viên <span className="text-[#FF161A]">*</span>
              </label>
              <Controller
                control={control}
                name="studentId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val: string | null) => {
                      field.onChange(val || "");
                    }}
                    disabled={linkMutation.isPending}
                  >
                    <SelectTrigger id="studentId" className="w-full h-10 bg-white/60 focus:bg-white border border-border/60 text-sm">
                      <SelectValue placeholder={isLoadingCatalog ? "Đang tải..." : "Chọn học viên liên kết"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-48 overflow-y-auto">
                      {studentsCatalog?.data && studentsCatalog.data.length > 0 ? (
                        studentsCatalog.data.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.fullName} ({s.studentCode})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="NONE" disabled>
                          Không tìm thấy học viên nào
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.studentId && (
                <span className="text-xs font-semibold text-[#C90012]">{errors.studentId.message}</span>
              )}
            </div>

            {/* Relationship Type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="relationship" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Mối quan hệ <span className="text-[#FF161A]">*</span>
              </label>
              <Controller
                control={control}
                name="relationship"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val: string | null) => field.onChange(val || "")}
                    disabled={linkMutation.isPending}
                  >
                    <SelectTrigger id="relationship" className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm">
                      <SelectValue placeholder="Chọn quan hệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MOTHER">Mẹ (Mother)</SelectItem>
                      <SelectItem value="FATHER">Bố (Father)</SelectItem>
                      <SelectItem value="GUARDIAN">Người giám hộ (Guardian)</SelectItem>
                      <SelectItem value="OTHER">Mối quan hệ khác</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.relationship && (
                <span className="text-xs font-semibold text-[#C90012]">{errors.relationship.message}</span>
              )}
            </div>

            {/* Checkbox fields grid */}
            <div className="grid gap-3 border border-slate-100 bg-slate-50/50 p-4 rounded-2xl mt-1">
              {/* isPrimaryContact */}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={linkMutation.isPending}
                  className="accent-[#FF161A] h-4 w-4"
                  {...register("isPrimaryContact")}
                />
                Người liên hệ chính
              </label>

              {/* isEmergencyContact */}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={linkMutation.isPending}
                  className="accent-[#FF161A] h-4 w-4"
                  {...register("isEmergencyContact")}
                />
                Liên hệ khẩn cấp
              </label>

              {/* canReceiveNotification */}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={linkMutation.isPending}
                  className="accent-[#FF161A] h-4 w-4"
                  {...register("canReceiveNotification")}
                />
                Nhận thông tin thông báo học tập
              </label>

              {/* canReceiveTuition */}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={linkMutation.isPending}
                  className="accent-[#FF161A] h-4 w-4"
                  {...register("canReceiveTuition")}
                />
                Nhận hóa đơn & Đóng học phí
              </label>

              {/* canPickupStudent */}
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={linkMutation.isPending}
                  className="accent-[#FF161A] h-4 w-4"
                  {...register("canPickupStudent")}
                />
                Đưa đón học viên
              </label>
            </div>

            {/* Action buttons */}
            <DialogFooter className="gap-2 sm:justify-end border-t border-[#FF161A]/10 pt-4 -mx-6 -mb-6 px-6 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLinkDialogOpen(false)}
                disabled={linkMutation.isPending}
                className="w-full sm:w-auto hover:bg-slate-50 cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={linkMutation.isPending}
                className="w-full sm:w-auto font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] disabled:bg-[#9CA3AF] cursor-pointer"
              >
                {linkMutation.isPending ? "Đang lưu..." : "Liên kết"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
