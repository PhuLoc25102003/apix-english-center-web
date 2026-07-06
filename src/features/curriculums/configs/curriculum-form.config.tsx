import * as React from "react";
import { BookOpen, FileText, Settings } from "lucide-react";
import type { FormInputConfig, InputOption } from "@/components/forms/form-input-renderer";

export function createCurriculumFormConfig(
  courseOptions: InputOption[]
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "curriculum_info_header",
      label: "Thông tin giáo trình",
      icon: <BookOpen className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "courseId",
      label: "Khóa học liên kết",
      placeholder: "Chọn khóa học",
      type: "select",
      required: true,
      options: courseOptions,
      colSpan: 2,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "name",
      label: "Tên giáo trình",
      placeholder: "Ví dụ: Cambridge English Starters",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "versionName",
      label: "Phiên bản giáo trình",
      placeholder: "Ví dụ: Edition 3.0",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <Settings className="h-4 w-4" />,
    },
    {
      name: "description",
      label: "Mô tả chi tiết",
      placeholder: "Mô tả nội dung giáo án, số lượng bài học...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "isActive",
      label: "Giáo trình đang áp dụng",
      type: "switch",
      defaultValue: true,
      colSpan: 2,
    },
  ];
}
