"use client";

/**
 * src/features/attendance/components/attendance-filters.tsx
 *
 * Filter component for class sessions listing.
 * Supports searching notes, class filtering, status filtering, and date filtering.
 */

import * as React from "react";
import { X } from "lucide-react";
import type { InputOption } from "@/components/forms/form-input-renderer";
import { SearchInput } from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ClassSessionStatus } from "../types/attendance.type";

interface AttendanceFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  classId?: string;
  onClassChange?: (value: string) => void;
  status: ClassSessionStatus | "";
  onStatusChange: (value: ClassSessionStatus | "") => void;
  sessionDate: string;
  onSessionDateChange: (value: string) => void;
  classOptions?: InputOption[];
  isLoadingClasses?: boolean;
  showClassFilter?: boolean;
}

const ALL = "ALL";
const statusItems: InputOption[] = [
  { value: ALL, label: "Tất cả" },
  { value: "PLANNED", label: "Lên kế hoạch (PLANNED)" },
  { value: "COMPLETED", label: "Đã hoàn thành (COMPLETED)" },
  { value: "CANCELLED", label: "Đã hủy (CANCELLED)" },
  { value: "RESCHEDULED", label: "Đã đổi lịch (RESCHEDULED)" },
];

export function AttendanceFilters({
  search,
  onSearchChange,
  classId,
  onClassChange,
  status,
  onStatusChange,
  sessionDate,
  onSessionDateChange,
  classOptions = [],
  isLoadingClasses = false,
  showClassFilter = true,
}: AttendanceFiltersProps) {
  const classItems = React.useMemo(
    () => [{ value: ALL, label: "Tất cả lớp" }, ...classOptions],
    [classOptions]
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 shadow-xs backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        placeholder="Tìm kiếm nội dung ghi chú..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
        {/* Class Filter */}
        {showClassFilter && onClassChange && (
          <Select
            value={classId || ALL}
            onValueChange={(value: string | null) =>
              onClassChange(!value || value === ALL ? "" : value)
            }
            items={classItems}
            disabled={isLoadingClasses}
          >
            <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
              <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Lớp học:
              </span>
              <SelectValue placeholder={isLoadingClasses ? "Đang tải..." : "Tất cả"} />
            </SelectTrigger>
            <SelectContent>
              {classItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Status Filter */}
        <Select
          value={status || ALL}
          onValueChange={(value: string | null) =>
            onStatusChange(!value || value === ALL ? "" : (value as ClassSessionStatus))
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

        {/* Date Filter */}
        <div className="relative flex items-center h-9 bg-white/60 focus-within:bg-white border border-border/60 rounded-xl px-3 py-1.5 w-full sm:w-auto">
          <span className="mr-2 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Ngày học:
          </span>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => onSessionDateChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-full sm:w-auto select-none cursor-pointer"
          />
          {sessionDate && (
            <button
              onClick={() => onSessionDateChange("")}
              className="ml-2 hover:bg-slate-200/50 p-0.5 rounded-full cursor-pointer transition-colors"
              title="Clear date"
            >
              <X className="h-3 w-3 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
