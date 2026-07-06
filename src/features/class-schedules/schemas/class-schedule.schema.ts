import { z } from "zod";

export const classScheduleSchema = z
  .object({
    classId: z.string().min(1, "Vui lòng chọn lớp học"),
    roomId: z.string().min(1, "Vui lòng chọn phòng học"),
    dayOfWeek: z.coerce
      .number()
      .min(1, "Thứ trong tuần không hợp lệ (1-7)")
      .max(7, "Thứ trong tuần không hợp lệ (1-7)"),
    startTime: z.string().min(1, "Giờ bắt đầu không được để trống"),
    endTime: z.string().min(1, "Giờ kết thúc không được để trống"),
    effectiveFrom: z.string().min(1, "Ngày hiệu lực không được để trống"),
    effectiveTo: z.string().nullable().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"], {
      message: "Trạng thái lịch học không hợp lệ",
    }),
    patternCode: z.enum(["MWF", "TTS", "WEEKEND"]).nullable().optional(),
  })
  .refine(
    (data) => {
      // Validate startTime < endTime (format HH:mm)
      if (data.startTime && data.endTime) {
        const [startHour, startMin] = data.startTime.split(":").map(Number);
        const [endHour, endMin] = data.endTime.split(":").map(Number);
        if (startHour !== undefined && endHour !== undefined) {
          const startVal = startHour * 60 + startMin;
          const endVal = endHour * 60 + endMin;
          return endVal > startVal;
        }
      }
      return true;
    },
    {
      message: "Giờ kết thúc phải sau giờ bắt đầu",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      if (data.effectiveFrom && data.effectiveTo) {
        return new Date(data.effectiveTo) >= new Date(data.effectiveFrom);
      }
      return true;
    },
    {
      message: "Ngày kết thúc hiệu lực phải sau hoặc bằng ngày bắt đầu hiệu lực",
      path: ["effectiveTo"],
    }
  );

export type ClassScheduleFormValues = z.infer<typeof classScheduleSchema>;
