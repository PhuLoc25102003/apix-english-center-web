"use client";

/**
 * src/features/students/components/student-filters.tsx
 *
 * Filter bar component for Student listing page.
 * Includes search input and status/type/access mode dropdown selectors.
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

interface StudentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  studentType: string;
  onStudentTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

const studentTypeItems = [
  { value: "ALL", label: "Tất cả" },
  { value: "KINDERGARTEN", label: "Mầm non" },
  { value: "CHILD", label: "Tiểu học" },
  { value: "TEENAGER", label: "Thiếu niên" },
  { value: "ADULT", label: "Người lớn" },
];

const statusItems = [
  { value: "ALL", label: "Tất cả" },
  { value: "ACTIVE", label: "Hoạt động" },
  { value: "INACTIVE", label: "Ngưng hoạt động" },
];

export function StudentFilters({
  search,
  onSearchChange,
  studentType,
  onStudentTypeChange,
  status,
  onStatusChange,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
      {/* Search Input */}
      <SearchInput
        placeholder="Tìm kiếm mã, tên học viên..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      {/* Select Dropdowns */}
      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        {/* Student Type Filter */}
        <Select
          value={studentType || "ALL"}
          onValueChange={(val: string | null) => onStudentTypeChange(!val || val === "ALL" ? "" : val)}
          items={studentTypeItems}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Độ tuổi:</span>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả</SelectItem>
            <SelectItem value="KINDERGARTEN">Mầm non</SelectItem>
            <SelectItem value="CHILD">Tiểu học</SelectItem>
            <SelectItem value="TEENAGER">Thiếu niên</SelectItem>
            <SelectItem value="ADULT">Người lớn</SelectItem>
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
            <SelectItem value="ALL">Tất cả</SelectItem>
            <SelectItem value="ACTIVE">Hoạt động</SelectItem>
            <SelectItem value="INACTIVE">Ngưng hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
