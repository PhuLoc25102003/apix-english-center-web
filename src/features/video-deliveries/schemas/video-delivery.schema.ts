import { z } from "zod";
import { videoDeliveryTypes } from "../types/video-delivery.type";

export const videoDeliveryBatchSchema = z
  .object({
    classId: z.string().min(1, "Class is required"),
    videoType: z.enum(videoDeliveryTypes),
    targetMonth: z.string().regex(/^\d{4}-\d{2}$/, "Target month is invalid").nullable().optional(),
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().nullable().optional(),
    dueDate: z.string().nullable().optional(),
    studentIds: z.array(z.string()).optional(),
  })
  .superRefine((value, context) => {
    if (value.videoType === "MONTHLY_PERSONAL_VIDEO" && !value.targetMonth) {
      context.addIssue({
        code: "custom",
        path: ["targetMonth"],
        message: "Target month is required for monthly personal videos",
      });
    }
  });

export const videoDeliveryReasonSchema = z.object({
  reason: z.string().trim().min(1, "A reason is required"),
});
