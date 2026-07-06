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
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useStudents } from "@/features/students/hooks/use-students";

interface VideoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  classId: string;
  onClassIdChange: (value: string) => void;
  studentId: string;
  onStudentIdChange: (value: string) => void;
  videoType: string;
  onVideoTypeChange: (value: string) => void;
  targetMonth: string;
  onTargetMonthChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  parentVisible?: string;
  onParentVisibleChange?: (value: string) => void;
}

const videoTypeItems = [
  { value: "ALL", label: "Tất cả loại" },
  { value: "CLASS_ACTIVITY", label: "Hoạt động lớp học" },
  { value: "MONTHLY_REVIEW", label: "Đánh giá tháng" },
  { value: "FINAL_PROJECT", label: "Video cuối khóa" },
  { value: "OTHER", label: "Khác" },
];

const statusItems = [
  { value: "ALL", label: "Tất cả trạng thái" },
  { value: "UPLOADED", label: "Đã tải lên" },
  { value: "PROCESSING", label: "Đang xử lý" },
  { value: "READY", label: "Sẵn sàng" },
  { value: "APPROVED", label: "Đã duyệt" },
  { value: "REJECTED", label: "Từ chối" },
  { value: "DELIVERED", label: "Đã gửi Zalo" },
  { value: "ARCHIVED", label: "Lưu trữ" },
];

const parentVisibleItems = [
  { value: "ALL", label: "Tất cả hiển thị" },
  { value: "VISIBLE", label: "Hiển thị PH" },
  { value: "HIDDEN", label: "Ẩn PH" },
];

// Generate last 6 months for month filter
const getMonthOptions = () => {
  const options = [{ value: "ALL", label: "Tất cả tháng" }];
  const date = new Date();
  for (let i = 0; i < 6; i++) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    options.push({
      value: `${y}-${m}`,
      label: `Tháng ${m}/${y}`,
    });
    date.setMonth(date.getMonth() - 1);
  }
  return options;
};

export function VideoFilters({
  search,
  onSearchChange,
  classId,
  onClassIdChange,
  studentId,
  onStudentIdChange,
  videoType,
  onVideoTypeChange,
  targetMonth,
  onTargetMonthChange,
  status,
  onStatusChange,
  parentVisible,
  onParentVisibleChange,
}: VideoFiltersProps) {
  // Fetch classes
  const { data: classesData } = useClasses({ limit: 100 });
  const classesList = classesData?.data || [];

  // Fetch students (optionally filter by class if selected)
  const { data: studentsData } = useStudents({
    limit: 200,
    classId: classId || undefined,
  });
  const studentsList = studentsData?.data || [];

  const monthItems = React.useMemo(() => getMonthOptions(), []);

  return (
    <div className="flex flex-col gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <SearchInput
          placeholder="Tìm tên video..."
          value={search}
          onChange={onSearchChange}
          className="w-full sm:max-w-xs"
        />

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Class Selector */}
          <Select
            value={classId || "ALL"}
            onValueChange={(val) => onClassIdChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Lớp:</span>
              <SelectValue placeholder="Tất cả lớp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả lớp</SelectItem>
              {classesList.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.classCode || c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Student Selector */}
          <Select
            value={studentId || "ALL"}
            onValueChange={(val) => onStudentIdChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Học viên:</span>
              <SelectValue placeholder="Tất cả học viên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả học viên</SelectItem>
              {studentsList.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Video Type Selector */}
          <Select
            value={videoType || "ALL"}
            onValueChange={(val) => onVideoTypeChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Loại:</span>
              <SelectValue placeholder="Tất cả loại" />
            </SelectTrigger>
            <SelectContent>
              {videoTypeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month Selector */}
          <Select
            value={targetMonth || "ALL"}
            onValueChange={(val) => onTargetMonthChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Tháng:</span>
              <SelectValue placeholder="Tất cả tháng" />
            </SelectTrigger>
            <SelectContent>
              {monthItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Selector */}
          <Select
            value={status || "ALL"}
            onValueChange={(val) => onStatusChange(!val || val === "ALL" ? "" : val)}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Trạng thái:</span>
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Parent Visibility Filter */}
          {onParentVisibleChange && (
            <Select
              value={parentVisible || "ALL"}
              onValueChange={(val) => onParentVisibleChange(!val || val === "ALL" ? "" : val)}
            >
              <SelectTrigger className="w-full sm:w-[160px] bg-white/60 focus:bg-white text-sm border-slate-200 hover:bg-slate-50 transition-colors px-3 py-1.5 h-9 rounded-xl flex items-center gap-1 cursor-pointer">
                <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider select-none mr-0.5">Hiển thị PH:</span>
                <SelectValue placeholder="Tất cả" />
              </SelectTrigger>
              <SelectContent>
                {parentVisibleItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
