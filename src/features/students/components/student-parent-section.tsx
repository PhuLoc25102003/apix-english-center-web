"use client";

/**
 * src/features/students/components/student-parent-section.tsx
 *
 * Renders the Parent Relationship section inside the Student detail profile.
 * Integrates link / unlink actions, relationship flags, and single primary contact validation.
 */

import * as React from "react";
import { Plus, Trash2, ShieldAlert, Phone, Mail, Link as LinkIcon, BadgeAlert } from "lucide-react";
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

import { useParents } from "@/features/parents/hooks/use-parents";
import { useStudentParents } from "../hooks/use-student-parents";
import { useLinkStudentParent } from "../hooks/use-link-student-parent";
import { useUnlinkStudentParent } from "../hooks/use-unlink-student-parent";

const linkRelationshipSchema = z.object({
  parentId: z.string().min(1, "Vui lòng chọn phụ huynh."),
  relationship: z.string().min(1, "Vui lòng chọn mối quan hệ."),
  isPrimaryContact: z.boolean(),
  canReceiveNotification: z.boolean(),
  canReceiveTuition: z.boolean(),
  canPickupStudent: z.boolean(),
  isEmergencyContact: z.boolean(),
});

type LinkFormValues = z.infer<typeof linkRelationshipSchema>;

interface StudentParentSectionProps {
  studentId: string;
}

export function StudentParentSection({ studentId }: StudentParentSectionProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = React.useState(false);
  const [parentSearch, setParentSearch] = React.useState("");
  const confirm = useConfirm();

  // Queries & Mutations
  const { data: linkedData, isLoading, isError, error, refetch } = useStudentParents(studentId);
  const linkMutation = useLinkStudentParent(studentId);
  const unlinkMutation = useUnlinkStudentParent(studentId);

  // Parents catalog for linking selector
  const { data: parentsCatalog, isLoading: isLoadingCatalog } = useParents({
    limit: 50,
    search: parentSearch || undefined,
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
      parentId: "",
      relationship: "",
      isPrimaryContact: false,
      canReceiveNotification: true,
      canReceiveTuition: true,
      canPickupStudent: false,
      isEmergencyContact: false,
    },
  });

  const linkedParents = linkedData?.data ?? [];
  const hasPrimaryContact = linkedParents.some((p) => p.isPrimaryContact);

  const handleLinkSubmit = (values: LinkFormValues) => {
    // Only one primary contact should be selected in UI
    if (values.isPrimaryContact && hasPrimaryContact) {
      setError("isPrimaryContact", {
        type: "manual",
        message: "Học viên này đã có một người liên hệ chính. Vui lòng tắt tùy chọn này hoặc gỡ liên hệ chính cũ.",
      });
      return;
    }

    linkMutation.mutate(values, {
      onSuccess: () => {
        setIsLinkDialogOpen(false);
        reset();
        setParentSearch("");
      },
    });
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

  if (isLoading) {
    return <LoadingState variant="table" rows={2} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Lỗi tải phụ huynh liên kết"
        message={error?.message || "Không thể tải danh sách phụ huynh."}
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
          Phụ huynh liên kết ({linkedParents.length})
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
          Liên kết phụ huynh
        </Button>
      </div>

      {/* Linked parents list */}
      {linkedParents.length === 0 ? (
        <div className="text-center p-6 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl">
          <p className="text-sm text-slate-500 font-medium">Học viên này chưa được liên kết với phụ huynh nào.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {linkedParents.map((relation) => (
            <div
              key={relation.id}
              className="glass-card p-5 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-3 relative hover:border-slate-200 transition-colors"
            >
              {/* Parent overview */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-display text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    {relation.fullName}
                    <span className="text-xs font-semibold text-[#FF161A] bg-[#FFE8EA] px-2 py-0.5 rounded-full">
                      {getRelationshipLabel(relation.relationship)}
                    </span>
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mt-0.5">
                    {relation.parentCode}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    const ok = await confirm({
                      title: "Gỡ liên kết phụ huynh",
                      description: `Bạn có chắc muốn gỡ liên kết phụ huynh ${relation.fullName} ra khỏi hồ sơ học viên? Hồ sơ phụ huynh trong hệ thống vẫn sẽ được giữ lại.`,
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

              {/* Contact info */}
              <div className="grid gap-1 text-xs text-slate-600 border-t border-slate-100/60 pt-2.5">
                <p className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {relation.phone}
                </p>
                {relation.email && (
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {relation.email}
                  </p>
                )}
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

      {/* Link Parent Dialog */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="glass-card sm:max-w-md p-6 border border-[#FF161A]/10 gap-6">
          <DialogHeader className="gap-1.5 text-left">
            <DialogTitle className="font-display text-lg font-bold text-slate-800">
              Liên kết phụ huynh với học viên
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Chọn một phụ huynh đã có trong hệ thống và thiết lập cấu hình mối quan hệ.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleLinkSubmit)} className="flex flex-col gap-4">
            {/* Search Parent Catalog */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="searchParent" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Tìm kiếm phụ huynh
              </label>
              <Input
                id="searchParent"
                placeholder="Nhập tên hoặc số điện thoại..."
                value={parentSearch}
                onChange={(e) => setParentSearch(e.target.value)}
                className="bg-white/60 focus:bg-white border-border/60 h-10"
              />
            </div>

            {/* Select Parent */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="parentId" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Chọn phụ huynh <span className="text-[#FF161A]">*</span>
              </label>
              <Controller
                control={control}
                name="parentId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val: string | null) => {
                      field.onChange(val || "");
                    }}
                    disabled={linkMutation.isPending}
                  >
                    <SelectTrigger id="parentId" className="w-full h-10 bg-white/60 focus:bg-white border border-border/60 text-sm">
                      <SelectValue placeholder={isLoadingCatalog ? "Đang tải..." : "Chọn phụ huynh liên kết"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-48 overflow-y-auto">
                      {parentsCatalog?.data && parentsCatalog.data.length > 0 ? (
                        parentsCatalog.data.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.fullName} - {p.phone}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="NONE" disabled>
                          Không tìm thấy phụ huynh nào
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.parentId && (
                <span className="text-xs font-semibold text-[#C90012]">{errors.parentId.message}</span>
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
                    <SelectTrigger id="relationship" className="w-full h-10 bg-white/60 focus:bg-white border border-border/60 text-sm">
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
              {errors.isPrimaryContact && (
                <span className="text-xs font-semibold text-[#C90012] block -mt-1 pl-6">
                  {errors.isPrimaryContact.message}
                </span>
              )}

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
