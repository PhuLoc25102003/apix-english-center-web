import * as React from "react";
import { Briefcase, Hash, FileText } from "lucide-react";
import type { FormInputConfig } from "@/components/forms/form-input-renderer";

export const positionFormConfig: FormInputConfig[] = [
  {
    type: "section-header",
    name: "position_info_header",
    label: "Thông tin chức vụ",
    icon: <Briefcase className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "code",
    label: "Mã chức vụ",
    placeholder: "Ví dụ: TEACHER, ASSISTANT, OFFICE_STAFF",
    type: "text",
    required: true,
    colSpan: 1,
    icon: <Hash className="h-4 w-4" />,
  },
  {
    name: "name",
    label: "Tên chức vụ",
    placeholder: "Ví dụ: Giáo viên bản ngữ",
    type: "text",
    required: true,
    colSpan: 1,
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    name: "description",
    label: "Mô tả vai trò chức vụ",
    placeholder: "Mô tả công việc, nhiệm vụ...",
    type: "textarea",
    colSpan: 2,
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "isTeachingPosition",
    label: "Đây là vị trí giảng dạy",
    type: "switch",
    defaultValue: false,
    colSpan: 2,
  },
  {
    name: "isActive",
    label: "Trạng thái hoạt động",
    type: "switch",
    defaultValue: true,
    colSpan: 2,
  },
];
