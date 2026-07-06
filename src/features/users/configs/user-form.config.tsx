import * as React from "react";
import { User, Mail, Phone, Lock } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const userStatusOptions = [
  { value: "PENDING", label: "Chờ kích hoạt (PENDING)" },
  { value: "ACTIVE", label: "Đang hoạt động (ACTIVE)" },
  { value: "INACTIVE", label: "Ngưng hoạt động (INACTIVE)" },
  { value: "LOCKED", label: "Đang khóa (LOCKED)" },
];

export const getUserFormConfig = (isEdit: boolean): FormInputConfig[] => {
  const configs: FormInputConfig[] = [
    {
      type: "section-header",
      name: "user_info_header",
      label: "Thông tin cá nhân người dùng",
      icon: <User className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "fullName",
      label: "Họ và tên",
      placeholder: "Ví dụ: Nguyễn Văn A",
      type: "text",
      required: true,
      icon: <User className="h-4 w-4" />,
      colSpan: 1,
    },
    {
      name: "username",
      label: "Tên tài khoản (Username)",
      placeholder: "Ví dụ: nguyenvana",
      type: "text",
      disabled: isEdit, // Often username cannot be updated
      icon: <User className="h-4 w-4" />,
      colSpan: 1,
    },
    {
      name: "email",
      label: "Địa chỉ Email",
      placeholder: "nguyenvana@gmail.com",
      type: "email",
      icon: <Mail className="h-4 w-4" />,
      colSpan: 1,
    },
    {
      name: "phone",
      label: "Số điện thoại",
      placeholder: "09xxxxxxxx",
      type: "text",
      icon: <Phone className="h-4 w-4" />,
      colSpan: 1,
    },
    {
      name: "status",
      label: "Trạng thái tài khoản",
      type: "select",
      required: true,
      options: userStatusOptions,
      colSpan: isEdit ? 2 : 1,
    },
  ];

  // Only show password field on create mode
  if (!isEdit) {
    configs.push({
      name: "temporaryPassword",
      label: "Mật khẩu tạm thời",
      placeholder: "Nhập mật khẩu ban đầu...",
      type: "password",
      icon: <Lock className="h-4 w-4" />,
      colSpan: 1,
    });
  }

  return configs;
};
