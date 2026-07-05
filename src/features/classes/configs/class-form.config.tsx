import * as React from "react";
import {
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  ListChecks,
  Users,
} from "lucide-react";

import type {
  FormInputConfig,
  InputOption,
} from "@/components/forms/form-input-renderer";

const statusOptions: InputOption[] = [
  { value: "PLANNING", label: "Đang lên kế hoạch" },
  { value: "OPEN", label: "Đang tuyển sinh" },
  { value: "ACTIVE", label: "Đang học" },
  { value: "CLOSED", label: "Đã kết thúc" },
  { value: "CANCELLED", label: "Đã hủy" },
];

export function createClassFormConfig(
  courseOptions: InputOption[],
  campusOptions: InputOption[],
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "class_info_header",
      label: "Thông tin lớp học",
      icon: <GraduationCap className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "courseId",
      label: "Khóa học",
      placeholder: "Chọn khóa học",
      type: "select",
      required: true,
      options: courseOptions,
      colSpan: 1,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "campusId",
      label: "Cơ sở",
      placeholder: "Chọn cơ sở",
      type: "select",
      required: true,
      options: campusOptions,
      colSpan: 1,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      name: "name",
      label: "Tên lớp",
      placeholder: "Ví dụ: English Kids A1 - Tối 2/4/6",
      type: "text",
      required: true,
      colSpan: 2,
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      name: "capacity",
      label: "Sức chứa",
      placeholder: "Ví dụ: 20",
      type: "number",
      required: true,
      colSpan: 1,
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "status",
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
      type: "select",
      required: true,
      options: statusOptions,
      defaultValue: "PLANNING",
      colSpan: 1,
      icon: <ListChecks className="h-4 w-4" />,
    },
    {
      name: "startDate",
      label: "Ngày bắt đầu",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      name: "expectedEndDate",
      label: "Ngày kết thúc dự kiến",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <CalendarDays className="h-4 w-4" />,
    },
    {
      name: "note",
      label: "Ghi chú",
      placeholder: "Thông tin bổ sung về lớp học...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
}
