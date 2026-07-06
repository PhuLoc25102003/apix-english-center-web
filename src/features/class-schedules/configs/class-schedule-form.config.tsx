import * as React from "react";
import { GraduationCap, DoorOpen, Calendar, Clock, Settings } from "lucide-react";
import type { FormInputConfig, InputOption } from "@/components/forms/form-input-renderer";

export function createClassScheduleFormConfig(
  classOptions: InputOption[],
  roomOptions: InputOption[]
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "schedule_info_header",
      label: "Thông tin lịch học lớp",
      icon: <GraduationCap className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "classId",
      label: "Lớp học",
      placeholder: "Chọn lớp học",
      type: "select",
      required: true,
      options: classOptions,
      colSpan: 2,
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      name: "roomId",
      label: "Phòng học",
      placeholder: "Chọn phòng học",
      type: "select",
      required: true,
      options: roomOptions,
      colSpan: 2,
      icon: <DoorOpen className="h-4 w-4" />,
    },
    {
      name: "dayOfWeek",
      label: "Thứ trong tuần",
      placeholder: "Chọn thứ",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Thứ Hai (Monday)" },
        { value: "2", label: "Thứ Ba (Tuesday)" },
        { value: "3", label: "Thứ Tư (Wednesday)" },
        { value: "4", label: "Thứ Năm (Thursday)" },
        { value: "5", label: "Thứ Sáu (Friday)" },
        { value: "6", label: "Thứ Bảy (Saturday)" },
        { value: "7", label: "Chủ Nhật (Sunday)" },
      ],
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "patternCode",
      label: "Khung lịch (Pattern)",
      placeholder: "Chọn khung",
      type: "select",
      options: [
        { value: "MWF", label: "Thứ 2 - 4 - 6 (MWF)" },
        { value: "TTS", label: "Thứ 3 - 5 - 7 (TTS)" },
        { value: "WEEKEND", label: "Cuối tuần (Weekend)" },
      ],
      colSpan: 1,
      icon: <Settings className="h-4 w-4" />,
    },
    {
      name: "startTime",
      label: "Giờ bắt đầu học",
      placeholder: "HH:MM",
      type: "time",
      required: true,
      colSpan: 1,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "endTime",
      label: "Giờ kết thúc học",
      placeholder: "HH:MM",
      type: "time",
      required: true,
      colSpan: 1,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "effectiveFrom",
      label: "Ngày áp dụng lịch học",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "effectiveTo",
      label: "Ngày kết thúc lịch (Nếu có)",
      type: "date",
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "status",
      label: "Lịch học đang hoạt động",
      type: "select",
      required: true,
      options: [
        { value: "ACTIVE", label: "Hoạt động (Active)" },
        { value: "INACTIVE", label: "Tạm ngưng (Inactive)" },
      ],
      colSpan: 2,
    },
  ];
}
