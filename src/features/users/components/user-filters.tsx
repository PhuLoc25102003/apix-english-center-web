"use client";

/**
 * src/features/users/components/user-filters.tsx
 *
 * Filter component for user list page.
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
import { useRoleLookup } from "@/features/roles/hooks/use-roles";
import { useCampuses } from "@/features/campuses/hooks/use-campuses";
import { userStatusOptions } from "../configs/user-form.config";

interface UserFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  roleId: string;
  onRoleIdChange: (value: string) => void;
  campusId: string;
  onCampusIdChange: (value: string) => void;
}

export function UserFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  roleId,
  onRoleIdChange,
  campusId,
  onCampusIdChange,
}: UserFiltersProps) {
  // Query roles lookup
  const { data: rolesData } = useRoleLookup();
  const roles = rolesData?.data || [];

  // Query campuses lookup
  const { data: campusesData } = useCampuses({ limit: 100 });
  const campuses = campusesData?.data || [];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
      <SearchInput
        placeholder="Tìm kiếm họ tên, email, SĐT..."
        value={search}
        onChange={onSearchChange}
        className="w-full sm:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        {/* Campus Filter */}
        <Select
          value={campusId || "ALL"}
          onValueChange={(val: string | null) => onCampusIdChange(!val || val === "ALL" ? "" : val)}
          items={[{ value: "ALL", label: "Tất cả cơ sở" }, ...campuses.map(c => ({ value: c.id, label: c.name }))]}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Cơ sở:</span>
            <SelectValue placeholder="Tất cả cơ sở" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả cơ sở</SelectItem>
            {campuses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Role Filter */}
        <Select
          value={roleId || "ALL"}
          onValueChange={(val: string | null) => onRoleIdChange(!val || val === "ALL" ? "" : val)}
          items={[{ value: "ALL", label: "Tất cả vai trò" }, ...roles.map(r => ({ value: r.id, label: r.name }))]}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Vai trò:</span>
            <SelectValue placeholder="Tất cả vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả vai trò</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={status || "ALL"}
          onValueChange={(val: string | null) => onStatusChange(!val || val === "ALL" ? "" : val)}
          items={[{ value: "ALL", label: "Tất cả trạng thái" }, ...userStatusOptions]}
        >
          <SelectTrigger className="w-full sm:w-auto bg-white/60 focus:bg-white text-sm border-border/60 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Trạng thái:</span>
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            {userStatusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
