"use client";

import * as React from "react";

import type { InputOption } from "@/components/forms/form-input-renderer";
import { SearchInput } from "@/components/common/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CourseStatus } from "../types/course.type";

interface CourseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  levelId: string;
  onLevelChange: (value: string) => void;
  status: CourseStatus | "";
  onStatusChange: (value: CourseStatus | "") => void;
  levelOptions: InputOption[];
  isLoadingLevels?: boolean;
}

const ALL = "ALL";
const statusItems: InputOption[] = [
  { value: ALL, label: "Tất cả" },
  { value: "DRAFT", label: "Bản nháp" },
  { value: "ACTIVE", label: "Đang hoạt động" },
  { value: "INACTIVE", label: "Ngừng hoạt động" },
];

export function CourseFilters({
  search,
  onSearchChange,
  levelId,
  onLevelChange,
  status,
  onStatusChange,
  levelOptions,
  isLoadingLevels = false,
}: CourseFiltersProps) {
  const levelItems = React.useMemo(
    () => [{ value: ALL, label: "Tất cả" }, ...levelOptions],
    [levelOptions],
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 shadow-xs backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        placeholder="Tìm kiếm mã hoặc tên khóa học..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
        <Select
          value={levelId || ALL}
          onValueChange={(value: string | null) =>
            onLevelChange(!value || value === ALL ? "" : value)
          }
          items={levelItems}
          disabled={isLoadingLevels}
        >
          <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
            <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Cấp độ:
            </span>
            <SelectValue placeholder={isLoadingLevels ? "Đang tải..." : "Tất cả"} />
          </SelectTrigger>
          <SelectContent>
            {levelItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={status || ALL}
          onValueChange={(value: string | null) =>
            onStatusChange(
              !value || value === ALL ? "" : (value as CourseStatus),
            )
          }
          items={statusItems}
        >
          <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
            <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Trạng thái:
            </span>
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
