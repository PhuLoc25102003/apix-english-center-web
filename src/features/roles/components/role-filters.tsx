"use client";

/**
 * src/features/roles/components/role-filters.tsx
 *
 * Filter component for roles page.
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

interface RoleFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  isSystem: string;
  onIsSystemChange: (value: string) => void;
}

const statusItems = [
  { value: "ALL", label: "Tất cả" },
  { value: "ACTIVE", label: "Hoạt động" },
  { value: "INACTIVE", label: "Ngưng hoạt động" },
];

const isSystemItems = [
  { value: "ALL", label: "Tất cả" },
  { value: "SYSTEM", label: "Vai trò hệ thống" },
  { value: "CUSTOM", label: "Vai trò tùy chỉnh" },
];

export function RoleFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  isSystem,
  onIsSystemChange,
}: RoleFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
      <SearchInput
        placeholder="Tìm kiếm mã, tên vai trò..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        {/* System Role Filter */}
        <Select
          value={isSystem || "ALL"}
          onValueChange={(val: string | null) => onIsSystemChange(!val || val === "ALL" ? "" : val)}
          items={isSystemItems}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Loại:</span>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {isSystemItems.map((item) => (
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
