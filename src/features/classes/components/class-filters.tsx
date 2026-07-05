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
import type { ClassStatus } from "../types/class.type";

interface ClassFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  courseId: string;
  onCourseChange: (value: string) => void;
  campusId: string;
  onCampusChange: (value: string) => void;
  status: ClassStatus | "";
  onStatusChange: (value: ClassStatus | "") => void;
  courseOptions: InputOption[];
  campusOptions: InputOption[];
  isLoadingOptions?: boolean;
}

const ALL = "ALL";
const statusItems: InputOption[] = [
  { value: ALL, label: "Tất cả" },
  { value: "PLANNING", label: "Đang lên kế hoạch" },
  { value: "OPEN", label: "Đang tuyển sinh" },
  { value: "ACTIVE", label: "Đang học" },
  { value: "CLOSED", label: "Đã kết thúc" },
  { value: "CANCELLED", label: "Đã hủy" },
];

export function ClassFilters({
  search,
  onSearchChange,
  courseId,
  onCourseChange,
  campusId,
  onCampusChange,
  status,
  onStatusChange,
  courseOptions,
  campusOptions,
  isLoadingOptions = false,
}: ClassFiltersProps) {
  const courseItems = React.useMemo(
    () => [{ value: ALL, label: "Tất cả" }, ...courseOptions],
    [courseOptions],
  );
  const campusItems = React.useMemo(
    () => [{ value: ALL, label: "Tất cả" }, ...campusOptions],
    [campusOptions],
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 shadow-xs backdrop-blur-md xl:flex-row xl:items-center xl:justify-between">
      <SearchInput
        placeholder="Tìm kiếm mã hoặc tên lớp..."
        value={search}
        onChange={onSearchChange}
        className="w-full xl:max-w-xs"
      />

      <div className="flex w-full flex-wrap items-center gap-2.5 xl:w-auto">
        <Select
          value={courseId || ALL}
          onValueChange={(value: string | null) =>
            onCourseChange(!value || value === ALL ? "" : value)
          }
          items={courseItems}
          disabled={isLoadingOptions}
        >
          <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
            <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Khóa học:
            </span>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {courseItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={campusId || ALL}
          onValueChange={(value: string | null) =>
            onCampusChange(!value || value === ALL ? "" : value)
          }
          items={campusItems}
          disabled={isLoadingOptions}
        >
          <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
            <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Cơ sở:
            </span>
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent>
            {campusItems.map((item) => (
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
              !value || value === ALL ? "" : (value as ClassStatus),
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
