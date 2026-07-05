import * as React from "react";
import {
  Banknote,
  BookOpen,
  Clock3,
  FileText,
  GraduationCap,
  Hash,
  Layers3,
  ListChecks,
} from "lucide-react";

import type {
  FormInputConfig,
  InputOption,
} from "@/components/forms/form-input-renderer";
import { MoneyInput } from "@/components/forms/money-input";

const statusOptions: InputOption[] = [
  { value: "DRAFT", label: "Bản nháp" },
  { value: "ACTIVE", label: "Đang hoạt động" },
  { value: "INACTIVE", label: "Ngừng hoạt động" },
];

export function createCourseFormConfig(
  levelOptions: InputOption[],
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "course_info_header",
      label: "Thông tin khóa học",
      icon: <BookOpen className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "levelId",
      label: "Cấp độ",
      placeholder: "Chọn cấp độ",
      type: "select",
      required: true,
      options: levelOptions,
      colSpan: 1,
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      name: "status",
      label: "Trạng thái",
      placeholder: "Chọn trạng thái",
      type: "select",
      required: true,
      options: statusOptions,
      defaultValue: "DRAFT",
      colSpan: 1,
      icon: <ListChecks className="h-4 w-4" />,
    },
    {
      name: "code",
      label: "Mã khóa học",
      placeholder: "Ví dụ: KID-A1",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <Hash className="h-4 w-4" />,
    },
    {
      name: "name",
      label: "Tên khóa học",
      placeholder: "Ví dụ: Tiếng Anh thiếu nhi A1",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <Layers3 className="h-4 w-4" />,
    },
    {
      name: "totalLessons",
      label: "Tổng số buổi học",
      placeholder: "Ví dụ: 24",
      type: "number",
      required: true,
      colSpan: 1,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "durationMinutes",
      label: "Thời lượng mỗi buổi (phút)",
      placeholder: "Ví dụ: 90",
      type: "number",
      required: true,
      colSpan: 1,
      icon: <Clock3 className="h-4 w-4" />,
    },
    {
      name: "defaultMonthlyTuitionFee",
      label: "Học phí tháng tham khảo",
      type: "custom",
      required: true,
      colSpan: 2,
      icon: <Banknote className="h-4 w-4" />,
      customRender: ({ field, error, disabled }) => (
        <MoneyInput
          id="defaultMonthlyTuitionFee"
          value={field.value}
          onChange={field.onChange}
          placeholder="Ví dụ: 3.500.000"
          disabled={disabled}
          invalid={Boolean(error)}
        />
      ),
    },
    {
      name: "description",
      label: "Mô tả khóa học",
      placeholder: "Mục tiêu, nội dung và đối tượng của khóa học...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
}
