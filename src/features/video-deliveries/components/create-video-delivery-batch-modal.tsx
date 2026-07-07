"use client";
import { toast } from "sonner";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { isApiError } from "@/lib/api";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useCreateVideoDeliveryBatch } from "../hooks/use-create-video-delivery-batch";
import { videoDeliveryBatchSchema } from "../schemas/video-delivery.schema";
import { videoDeliveryTypes, type CreateVideoDeliveryBatchDto } from "../types/video-delivery.type";

const title = (value: string) => value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
export function CreateVideoDeliveryBatchModal({ open, onOpenChange, classId }: { open: boolean; onOpenChange: (open: boolean) => void; classId?: string }) {
  const classes = useClasses({ page: 1, limit: 200 }); const mutation = useCreateVideoDeliveryBatch();
  return <CrudFormModal open={open} onOpenChange={onOpenChange} title="Create video delivery batch" description="Create tracking rows for a class. No video upload is required." submitLabel="Create batch" validationSchema={videoDeliveryBatchSchema} initialValues={classId ? { classId } : undefined}
    configs={[
      { name: "classId", label: "Class", type: "select", required: true, disabled: Boolean(classId), options: classes.data?.data.map((item) => ({ value: item.id, label: item.name })) ?? [] },
      { name: "videoType", label: "Video type", type: "select", required: true, options: videoDeliveryTypes.map((item) => ({ value: item, label: title(item) })) },
      { name: "targetMonth", label: "Target month", type: "custom", customRender: ({ field, disabled }) => <input type="month" className="h-10 w-full rounded-xl border border-slate-200 bg-white/60 px-3 text-sm" disabled={disabled} value={field.value ?? ""} onChange={(event) => field.onChange(event.target.value || null)} /> },
      { name: "dueDate", label: "Due date", type: "date" }, { name: "title", label: "Title", type: "text", required: true, colSpan: 2 }, { name: "description", label: "Description", type: "textarea", colSpan: 2 },
    ]}
    onSubmit={async (values: CreateVideoDeliveryBatchDto) => {
      try {
        await mutation.mutateAsync({ ...values, classId: classId ?? values.classId });
        toast.success("Đã tạo đợt gửi video");
        onOpenChange(false);
      } catch (error) {
        const details = isApiError(error) ? error.details.map((item) => item.message).join(" · ") : "";
        toast.error(isApiError(error) ? details || error.message : "Không thể tạo đợt gửi video");
      }
    }} />;
}
