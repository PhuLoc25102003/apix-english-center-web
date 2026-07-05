import * as React from "react";
import { Hash, Building, Phone, MapPin, FileText } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const campusFormConfig: FormInputConfig[] = [
  {
    type: "section-header",
    name: "campus_info_header",
    label: "Thông tin cơ sở",
    icon: <Building className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "code",
    label: "Mã cơ sở",
    placeholder: "Ví dụ: CS01",
    type: "text",
    required: true,
    icon: <Hash className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "name",
    label: "Tên cơ sở",
    placeholder: "Ví dụ: APIX Campus Quận 1",
    type: "text",
    required: true,
    icon: <Building className="h-4 w-4" />,
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
    name: "address",
    label: "Địa chỉ",
    placeholder: "Số 123 Đường ABC, Quận XYZ, TP...",
    type: "text",
    required: true,
    icon: <MapPin className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "description",
    label: "Mô tả chi tiết",
    placeholder: "Mô tả cơ sở vật chất, quy mô...",
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
