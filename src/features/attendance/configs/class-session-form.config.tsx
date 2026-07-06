import * as React from "react";
import {
  GraduationCap,
  BookOpen,
  DoorOpen,
  Layers,
  ListChecks,
  Calendar,
  Hash,
  Clock,
  FileText,
} from "lucide-react";
import type { FormInputConfig, InputOption } from "@/components/forms/form-input-renderer";

/**
 * src/features/attendance/configs/class-session-form.config.tsx
 *
 * Configures form fields for Class Session creation/update modals.
 */

export function createClassSessionFormConfig(
  classOptions: InputOption[],
  roomOptions: InputOption[],
  scheduleOptions: InputOption[],
  isClassDisabled = false
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "session_info_header",
      label: "Thông tin buổi học",
      icon: <GraduationCap className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "classId",
      label: "Lớp học",
      placeholder: "Chọn lớp học",
      type: "select",
      required: true,
      options: classOptions,
      disabled: isClassDisabled,
      colSpan: 1,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "roomId",
      label: "Phòng học",
      placeholder: "Chọn phòng học",
      type: "select",
      required: true,
      options: roomOptions,
      colSpan: 1,
      icon: <DoorOpen className="h-4 w-4" />,
    },
    {
      name: "scheduleId",
      label: "Lịch học liên kết",
      placeholder: "Chọn lịch học (nếu có)",
      type: "select",
      options: scheduleOptions,
      colSpan: 1,
      icon: <Layers className="h-4 w-4" />,
    },
    {
      name: "status",
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
      type: "select",
      required: true,
      options: [
        { value: "PLANNED", label: "Lên kế hoạch (PLANNED)" },
        { value: "COMPLETED", label: "Đã hoàn thành (COMPLETED)" },
        { value: "CANCELLED", label: "Đã hủy (CANCELLED)" },
        { value: "RESCHEDULED", label: "Đã đổi lịch (RESCHEDULED)" },
      ],
      defaultValue: "PLANNED",
      colSpan: 1,
      icon: <ListChecks className="h-4 w-4" />,
    },
    {
      name: "sessionDate",
      label: "Ngày học",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "lessonNo",
      label: "Buổi học số",
      placeholder: "Ví dụ: 1, 2...",
      type: "number",
      colSpan: 1,
      icon: <Hash className="h-4 w-4" />,
    },
    {
      name: "startTime",
      label: "Giờ bắt đầu",
      type: "time",
      required: true,
      colSpan: 1,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "endTime",
      label: "Giờ kết thúc",
      type: "time",
      required: true,
      colSpan: 1,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "note",
      label: "Ghi chú",
      placeholder: "Nội dung học tập, lý do đổi lịch...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
}
