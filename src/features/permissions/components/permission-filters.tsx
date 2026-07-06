"use client";

/**
 * src/features/permissions/components/permission-filters.tsx
 *
 * Filter component for listing permissions.
 */

import * as React from "react";
import { SearchInput } from "@/components/common/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PermissionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  module: string;
  onModuleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const moduleItems = [
  { value: "ALL", label: "Tất cả phân hệ" },
  { value: "DASHBOARD", label: "DASHBOARD" },
  { value: "USER", label: "USER (Người dùng)" },
  { value: "ROLE", label: "ROLE (Vai trò)" },
  { value: "PERMISSION", label: "PERMISSION (Quyền)" },
  { value: "EMPLOYEE", label: "EMPLOYEE (Nhân viên)" },
  { value: "STUDENT", label: "STUDENT (Học viên)" },
  { value: "PARENT", label: "PARENT (Phụ huynh)" },
  { value: "CLASS", label: "CLASS (Lớp học)" },
  { value: "SCHEDULE", label: "SCHEDULE (Lịch học)" },
  { value: "ATTENDANCE", label: "ATTENDANCE (Điểm danh)" },
  { value: "WEEKLY_UPDATE", label: "WEEKLY_UPDATE (Báo cáo tuần)" },
  { value: "SCORE", label: "SCORE (Điểm số)" },
  { value: "LEARNING_REPORT", label: "LEARNING_REPORT (Báo cáo định kỳ)" },
  { value: "TUITION", label: "TUITION (Học phí)" },
  { value: "PAYROLL", label: "PAYROLL (Lương)" },
  { value: "LEAVE", label: "LEAVE (Nghỉ phép)" },
  { value: "NOTIFICATION", label: "NOTIFICATION (Thông báo)" },
  { value: "CONTACTLOG", label: "CONTACTLOG (Nhật ký liên lạc)" },
  { value: "MEDIA", label: "MEDIA (Hình ảnh/Video)" },
  { value: "AUDIT", label: "AUDIT (Lịch sử hệ thống)" },
  { value: "SETTINGS", label: "SETTINGS (Cài đặt)" },
];

const statusItems = [
  { value: "ALL", label: "Tất cả" },
  { value: "ACTIVE", label: "Kích hoạt" },
  { value: "INACTIVE", label: "Khóa" },
];

export function PermissionFilters({
  search,
  onSearchChange,
  module,
  onModuleChange,
  status,
  onStatusChange,
}: PermissionFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
      <SearchInput
        placeholder="Tìm kiếm mã quyền, mô tả..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        {/* Module Filter */}
        <Select
          value={module || "ALL"}
          onValueChange={(val: string | null) => onModuleChange(!val || val === "ALL" ? "" : val)}
          items={moduleItems}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Phân hệ:</span>
            <SelectValue placeholder="Tất cả phân hệ" />
          </SelectTrigger>
          <SelectContent>
            {moduleItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={status || "ALL"}
          onValueChange={(val: string | null) => onStatusChange(!val || val === "ALL" ? "" : val)}
          items={statusItems}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Trạng thái:</span>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {statusItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
