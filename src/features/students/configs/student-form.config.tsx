import * as React from "react";
import { User, Calendar, Award, School } from "lucide-react";
import { FormInputConfig } from "@/components/forms/form-input-renderer";

export const genderItems = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

export const studentTypeItems = [
  { value: "KINDERGARTEN", label: "Mầm non (Kindergarten)" },
  { value: "CHILD", label: "Tiểu học (Child)" },
  { value: "TEENAGER", label: "Thiếu niên (Teenager)" },
  { value: "ADULT", label: "Người lớn (Adult)" },
];

export const accessModeItems = [
  { value: "NO_ACCOUNT", label: "Không có tài khoản" },
  { value: "PARENT_MANAGED", label: "Phụ huynh quản lý" },
  { value: "OWN_ACCOUNT", label: "Tài khoản riêng" },
];

export const statusItems = [
  { value: "ACTIVE", label: "Hoạt động" },
  { value: "INACTIVE", label: "Ngưng hoạt động" },
];

export const studentFormConfig: FormInputConfig[] = [
  {
    type: "section-header",
    name: "personal_info_header",
    label: "Thông tin cá nhân học viên",
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
    name: "dateOfBirth",
    label: "Ngày sinh",
    type: "date",
    required: true,
    icon: <Calendar className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "gender",
    label: "Giới tính",
    type: "select",
    required: true,
    placeholder: "Chọn giới tính",
    options: genderItems,
    colSpan: 1,
  },
  {
    name: "studentType",
    label: "Loại học viên",
    type: "select",
    required: true,
    placeholder: "Chọn loại học viên",
    options: studentTypeItems,
    colSpan: 1,
  },
  {
    type: "section-header",
    name: "education_header",
    label: "Trường học & Phân quyền truy cập",
    icon: <Award className="h-5 w-5 text-[#FF161A]" />,
  },
  {
    name: "schoolName",
    label: "Trường học",
    placeholder: "Trường Tiểu học Nguyễn Huệ",
    type: "text",
    icon: <School className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "grade",
    label: "Khối / Lớp",
    placeholder: "Lớp 3A",
    type: "text",
    icon: <Award className="h-4 w-4" />,
    colSpan: 1,
  },
  {
    name: "accessMode",
    label: "Chế độ tài khoản",
    type: "select",
    required: true,
    placeholder: "Chọn chế độ tài khoản",
    options: accessModeItems,
    colSpan: 1,
  },
  {
    name: "status",
    label: "Trạng thái hoạt động",
    type: "select",
    required: true,
    placeholder: "Chọn trạng thái",
    options: statusItems,
    colSpan: 1,
  },
];
