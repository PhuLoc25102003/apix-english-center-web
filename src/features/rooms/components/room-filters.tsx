"use client";

import * as React from "react";

import { SearchInput } from "@/components/common/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InputOption } from "@/components/forms/form-input-renderer";

interface RoomFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  campusId: string;
  onCampusChange: (value: string) => void;
  campusOptions: InputOption[];
  isLoadingCampuses?: boolean;
}

const ALL_CAMPUSES = "ALL";

export function RoomFilters({
  search,
  onSearchChange,
  campusId,
  onCampusChange,
  campusOptions,
  isLoadingCampuses = false,
}: RoomFiltersProps) {
  const campusItems = React.useMemo(
    () => [
      { value: ALL_CAMPUSES, label: "Tất cả" },
      ...campusOptions,
    ],
    [campusOptions],
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 shadow-xs backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        placeholder="Tìm kiếm mã, tên hoặc loại phòng..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
        <Select
          value={campusId || ALL_CAMPUSES}
          onValueChange={(value: string | null) =>
            onCampusChange(!value || value === ALL_CAMPUSES ? "" : value)
          }
          items={campusItems}
          disabled={isLoadingCampuses}
        >
          <SelectTrigger className="flex h-9 w-full cursor-pointer items-center gap-1 rounded-xl border-border/60 bg-white/60 px-3 py-1.5 text-sm transition-colors hover:bg-slate-50 focus:bg-white sm:w-auto">
            <span className="mr-0.5 select-none text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Cơ sở:
            </span>
            <SelectValue placeholder={isLoadingCampuses ? "Đang tải..." : "Tất cả"} />
          </SelectTrigger>
          <SelectContent>
            {campusItems.map((item) => (
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
