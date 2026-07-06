import * as React from "react";
import { Hash, Layers3, ArrowUpDown, FileText } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const levelFormConfig: FormInputConfig[] = [
  {
    type: "section-header",
    name: "level_info_header",
    label: "Thông tin cấp độ",
    icon: <Layers3 className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "code",
    label: "Mã cấp độ",
    placeholder: "Ví dụ: STARTER",
    type: "text",
    required: true,
    icon: <Hash className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "name",
    label: "Tên cấp độ",
    placeholder: "Ví dụ: Starter",
    type: "text",
    required: true,
    icon: <Layers3 className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "orderIndex",
    label: "Thứ tự sắp xếp",
    placeholder: "Ví dụ: 1",
    type: "number",
    required: true,
    icon: <ArrowUpDown className="h-4 w-4" />,
    colSpan: 2,
  },
  {
    name: "description",
    label: "Mô tả chi tiết",
    placeholder: "Mô tả về chương trình, đối tượng học viên của cấp độ...",
    type: "textarea",
    icon: <FileText className="h-4 w-4" />,
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
