import * as React from "react";
import { Shield, FileText } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const getRoleFormConfig = (isEdit: boolean): FormInputConfig[] => [
  {
    type: "section-header",
    name: "role_info_header",
    label: "Thông tin vai trò",
    icon: <Shield className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "code",
    label: "Mã vai trò (Code)",
    placeholder: "Ví dụ: ACADEMIC_MANAGER",
    type: "text",
    required: true,
    disabled: isEdit, // Disable code update if editing
    icon: <Shield className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "name",
    label: "Tên vai trò",
    placeholder: "Ví dụ: Quản lý học vụ",
    type: "text",
    required: true,
    icon: <Shield className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "description",
    label: "Mô tả chi tiết",
    placeholder: "Mô tả trách nhiệm, quyền hạn của vai trò này...",
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
