import * as React from "react";
import { Building2, DoorOpen, Hash, Users, Tags, FileText } from "lucide-react";

import type {
  FormInputConfig,
  InputOption,
} from "@/components/forms/form-input-renderer";

export function createRoomFormConfig(
  campusOptions: InputOption[],
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "room_info_header",
      label: "Thông tin phòng học",
      icon: <DoorOpen className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "campusId",
      label: "Cơ sở",
      placeholder: "Chọn cơ sở",
      type: "select",
      required: true,
      options: campusOptions,
      colSpan: 2,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      name: "code",
      label: "Mã phòng",
      placeholder: "Ví dụ: P101",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <Hash className="h-4 w-4" />,
    },
    {
      name: "name",
      label: "Tên phòng",
      placeholder: "Ví dụ: Phòng học 101",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <DoorOpen className="h-4 w-4" />,
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
      name: "roomType",
      label: "Loại phòng",
      placeholder: "Ví dụ: Phòng học tiêu chuẩn",
      type: "text",
      colSpan: 1,
      icon: <Tags className="h-4 w-4" />,
    },
    {
      name: "facilitiesNote",
      label: "Ghi chú cơ sở vật chất",
      placeholder: "Máy chiếu, điều hòa, bảng tương tác...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "isActive",
      label: "Phòng đang hoạt động",
      type: "switch",
      defaultValue: true,
      colSpan: 2,
    },
  ];
}
