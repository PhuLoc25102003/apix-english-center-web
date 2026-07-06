"use client";

/**
 * src/features/attendance/components/attendance-status-control.tsx
 *
 * Compact segmented button control for selecting student attendance status.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AttendanceStatus } from "../types/attendance.type";

interface AttendanceStatusControlProps {
  value: AttendanceStatus | null;
  onChange: (value: AttendanceStatus) => void;
  disabled?: boolean;
}

interface StatusOption {
  value: AttendanceStatus;
  label: string;
  classNameActive: string;
}

const statusOptions: StatusOption[] = [
  {
    value: "PRESENT",
    label: "Có mặt",
    classNameActive: "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-100",
  },
  {
    value: "LATE",
    label: "Muộn",
    classNameActive: "bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-100",
  },
  {
    value: "EXCUSED",
    label: "Có phép",
    classNameActive: "bg-sky-50 text-sky-700 border-sky-300 ring-2 ring-sky-100",
  },
  {
    value: "ABSENT",
    label: "Vắng",
    classNameActive: "bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-100",
  },
];

export function AttendanceStatusControl({
  value,
  onChange,
  disabled = false,
}: AttendanceStatusControlProps) {
  return (
    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/60 border border-slate-200/50 backdrop-blur-xs select-none">
      {statusOptions.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold border border-transparent transition-all cursor-pointer whitespace-nowrap",
              isActive
                ? opt.classNameActive
                : "text-slate-500 hover:text-slate-800 hover:bg-white/80",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
