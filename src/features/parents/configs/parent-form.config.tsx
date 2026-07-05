import * as React from "react";
import { User, Phone, Mail, MapPin, Briefcase, FileText } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const parentFormConfig: FormInputConfig[] = [
  {
    type: "section-header",
    name: "parent_info_header",
    label: "Thông tin phụ huynh",
    icon: <User className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "fullName",
    label: "Họ và tên",
    placeholder: "Nguyễn Văn A",
    type: "text",
    required: true,
    icon: <User className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "phone",
    label: "Số điện thoại",
    placeholder: "09xxxxxxxx",
    type: "text",
    required: true,
    icon: <Phone className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "email",
    label: "Địa chỉ Email",
    placeholder: "parent@example.com",
    type: "email",
    icon: <Mail className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "jobTitle",
    label: "Nghề nghiệp",
    placeholder: "Kỹ sư, Giáo viên, Kinh doanh...",
    type: "text",
    icon: <Briefcase className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "address",
    label: "Địa chỉ thường trú",
    placeholder: "Số 123 Đường ABC, Quận XYZ, TP...",
    type: "text",
    icon: <MapPin className="h-4 w-4" />,
    colSpan: 2,
  },
  {
    name: "note",
    label: "Ghi chú thêm",
    placeholder: "Thông tin liên hệ phụ, thời gian liên lạc phù hợp...",
    type: "textarea",
    icon: <FileText className="h-4 w-4" />,
    colSpan: 2,
  },
];
