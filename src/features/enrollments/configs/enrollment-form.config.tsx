import * as React from "react";
import { User, GraduationCap, Calendar, Compass, FileText } from "lucide-react";
import type { FormInputConfig, InputOption } from "@/components/forms/form-input-renderer";

export function createEnrollmentFormConfig(
  studentOptions: InputOption[],
  classOptions: InputOption[]
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "enrollment_info_header",
      label: "Thông tin ghi danh học viên",
      icon: <GraduationCap className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "studentId",
      label: "Học viên",
      placeholder: "Chọn học viên",
      type: "select",
      required: true,
      options: studentOptions,
      colSpan: 2,
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "classId",
      label: "Lớp học",
      placeholder: "Chọn lớp học",
      type: "select",
      required: true,
      options: classOptions,
      colSpan: 2,
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      name: "enrolledDate",
      label: "Ngày ghi danh",
      type: "date",
      required: true,
      defaultValue: new Date().toISOString().slice(0, 10),
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "startDate",
      label: "Ngày bắt đầu học",
      placeholder: "Chọn ngày",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "endDate",
      label: "Ngày kết thúc học (Dự kiến)",
      placeholder: "Chọn ngày",
      type: "date",
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "status",
      label: "Trạng thái ghi danh",
      placeholder: "Chọn trạng thái",
      type: "select",
      required: true,
      defaultValue: "ACTIVE",
      options: [
        { value: "TRIAL", label: "Học thử" },
        { value: "ACTIVE", label: "Đang học" },
        { value: "FROZEN", label: "Bảo lưu" },
        { value: "TRANSFERRED", label: "Đã chuyển lớp" },
        { value: "COMPLETED", label: "Hoàn thành" },
        { value: "CANCELLED", label: "Đã hủy" },
      ],
      colSpan: 1,
      icon: <Compass className="h-4 w-4" />,
    },
    {
      name: "source",
      label: "Nguồn tuyển sinh",
      placeholder: "Chọn nguồn",
      type: "select",
      required: true,
      defaultValue: "WALK_IN",
      options: [
        { value: "WALK_IN", label: "Trực tiếp (Walk-in)" },
        { value: "REFERRAL", label: "Giới thiệu (Referral)" },
        { value: "ONLINE", label: "Trực tuyến (Online)" },
        { value: "OTHER", label: "Nguồn khác (Other)" },
      ],
      colSpan: 2,
      icon: <Compass className="h-4 w-4" />,
    },
    {
      name: "note",
      label: "Ghi chú ghi danh",
      placeholder: "Nhập ghi chú hoặc yêu cầu của phụ huynh...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
}
