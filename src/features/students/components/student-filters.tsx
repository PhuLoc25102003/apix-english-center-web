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
  accessMode: string;
  onAccessModeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function StudentFilters({
  search,
  onSearchChange,
  studentType,
  onStudentTypeChange,
  accessMode,
  onAccessModeChange,
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
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        {/* Student Type Filter */}
        <div className="flex-1 min-w-[140px] sm:flex-none">
          <Select
            value={studentType || "ALL"}
            onValueChange={(val: string | null) => onStudentTypeChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors">
              <SelectValue placeholder="Độ tuổi / Loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Mọi độ tuổi</SelectItem>
              <SelectItem value="KINDERGARTEN">Mầm non (Kindergarten)</SelectItem>
              <SelectItem value="CHILD">Tiểu học (Child)</SelectItem>
              <SelectItem value="TEENAGER">Thiếu niên (Teenager)</SelectItem>
              <SelectItem value="ADULT">Người lớn (Adult)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Access Mode Filter */}
        <div className="flex-1 min-w-[140px] sm:flex-none">
          <Select
            value={accessMode || "ALL"}
            onValueChange={(val: string | null) => onAccessModeChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[170px] bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors">
              <SelectValue placeholder="Chế độ tài khoản" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Mọi chế độ tài khoản</SelectItem>
              <SelectItem value="NO_ACCOUNT">Không có tài khoản</SelectItem>
              <SelectItem value="PARENT_MANAGED">Phụ huynh quản lý</SelectItem>
              <SelectItem value="OWN_ACCOUNT">Tài khoản riêng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[120px] sm:flex-none">
          <Select
            value={status || "ALL"}
            onValueChange={(val: string | null) => onStatusChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Mọi trạng thái</SelectItem>
              <SelectItem value="ACTIVE">Hoạt động</SelectItem>
              <SelectItem value="INACTIVE">Ngưng hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
