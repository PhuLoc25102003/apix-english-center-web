import * as React from "react";
import { User, Hash, Briefcase, Calendar, Phone, MapPin, Building2, FileText } from "lucide-react";
import type { FormInputConfig, InputOption } from "@/components/forms/form-input-renderer";

export function createEmployeeFormConfig(
  campusOptions: InputOption[],
  positionOptions: InputOption[]
): FormInputConfig[] {
  return [
    {
      type: "section-header",
      name: "employee_identity_header",
      label: "Thông tin cơ bản & Định danh",
      icon: <User className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "employeeCode",
      label: "Mã nhân viên",
      placeholder: "Ví dụ: CM01, CM02",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <Hash className="h-4 w-4" />,
    },
    {
      name: "fullName",
      label: "Họ và tên",
      placeholder: "Ví dụ: Nguyễn Văn A",
      type: "text",
      required: true,
      colSpan: 1,
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "employmentStatus",
      label: "Trạng thái nhân sự",
      placeholder: "Chọn trạng thái",
      type: "select",
      required: true,
      options: [
        { value: "ACTIVE", label: "Đang làm việc (Active)" },
        { value: "INACTIVE", label: "Tạm ngưng (Inactive)" },
        { value: "ON_LEAVE", label: "Nghỉ phép dài hạn (On Leave)" },
        { value: "TERMINATED", label: "Đã thôi việc (Terminated)" },
      ],
      colSpan: 1,
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: "campusId",
      label: "Cơ sở trực thuộc",
      placeholder: "Chọn cơ sở",
      type: "select",
      options: campusOptions,
      colSpan: 1,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      name: "positionIds",
      label: "Chức vụ / Vai trò",
      type: "multi-select",
      options: positionOptions,
      colSpan: 2,
    },
    {
      type: "section-header",
      name: "employee_personal_header",
      label: "Lịch trình & Thông tin cá nhân",
      icon: <Calendar className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "gender",
      label: "Giới tính",
      placeholder: "Chọn giới tính",
      type: "select",
      options: [
        { value: "MALE", label: "Nam" },
        { value: "FEMALE", label: "Nữ" },
        { value: "OTHER", label: "Khác" },
      ],
      colSpan: 1,
    },
    {
      name: "dateOfBirth",
      label: "Ngày sinh",
      type: "date",
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "address",
      label: "Địa chỉ thường trú",
      placeholder: "Số nhà, Tên đường, Quận...",
      type: "text",
      colSpan: 2,
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      name: "hiredDate",
      label: "Ngày vào làm",
      type: "date",
      required: true,
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "resignedDate",
      label: "Ngày nghỉ việc (Nếu có)",
      type: "date",
      colSpan: 1,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      type: "section-header",
      name: "employee_emergency_header",
      label: "Liên hệ khẩn cấp",
      icon: <Phone className="h-5 w-5 text-[#FF161A]" />,
    },
    {
      name: "emergencyContactName",
      label: "Tên người liên hệ",
      placeholder: "Ví dụ: Bố/Mẹ/Vợ...",
      type: "text",
      colSpan: 1,
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "emergencyContactPhone",
      label: "SĐT liên hệ khẩn cấp",
      placeholder: "09xxxxxxxx",
      type: "text",
      colSpan: 1,
      icon: <Phone className="h-4 w-4" />,
    },
    {
      name: "note",
      label: "Ghi chú thêm",
      placeholder: "Kinh nghiệm giảng dạy, chứng chỉ...",
      type: "textarea",
      colSpan: 2,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
}
