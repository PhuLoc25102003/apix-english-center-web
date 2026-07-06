"use client";

import * as React from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { hasPermission } from "@/lib/permissions/has-permission";
import { useDeleteClassSchedule } from "../hooks/use-delete-class-schedule";
import type { ClassSchedule } from "../types/class-schedule.type";

interface ClassScheduleTableProps {
  schedules: ClassSchedule[];
  onEdit: (id: string) => void;
}

const dayOfWeekLabels: Record<number, string> = {
  1: "Thứ Hai",
  2: "Thứ Ba",
  3: "Thứ Tư",
  4: "Thứ Năm",
  5: "Thứ Sáu",
  6: "Thứ Bảy",
  7: "Chủ Nhật",
};

export function ClassScheduleTable({
  schedules,
  onEdit,
}: ClassScheduleTableProps) {
  const deleteMutation = useDeleteClassSchedule();
  const confirm = useConfirm();

  const canUpdate = hasPermission("class-schedule:update");
  const canDelete = hasPermission("class-schedule:delete");

  const formatLocalDate = (val: string | null) => {
    if (!val) return "-";
    const [year, month, day] = val.split("-");
    return year && month && day ? `${day}/${month}/${year}` : val;
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    // If it is HH:mm:ss, truncate to HH:mm
    return timeStr.substring(0, 5);
  };

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Lớp học</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Phòng học / Cơ sở</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Thứ</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Giờ học (Slot)</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Khung lịch</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Hiệu lực từ</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Hiệu lực đến</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-semibold text-slate-900">
                  <div className="flex flex-col">
                    <span>{item.className || "-"}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.classCode || "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-900 font-semibold">
                  <div className="flex flex-col">
                    <span>{item.roomName || "-"}</span>
                    <span className="text-[10px] text-slate-400">
                      {item.campusName || "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-700 font-semibold">
                  {dayOfWeekLabels[item.dayOfWeek] || item.dayOfWeek}
                </TableCell>
                <TableCell className="text-slate-700 font-semibold">
                  {formatTime(item.startTime)} - {formatTime(item.endTime)}
                </TableCell>
                <TableCell>
                  {item.patternCode ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {item.patternCode}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs font-medium">-</span>
                  )}
                </TableCell>
                <TableCell className="text-slate-600 font-medium text-xs">
                  {formatLocalDate(item.effectiveFrom)}
                </TableCell>
                <TableCell className="text-slate-600 font-medium text-xs">
                  {formatLocalDate(item.effectiveTo)}
                </TableCell>
                <TableCell>
                  {item.status === "ACTIVE" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                      Tạm ngưng
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {(canUpdate || canDelete) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn lịch học"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        {canUpdate && (
                          <DropdownMenuItem
                            onClick={() => onEdit(item.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Edit className="h-4 w-4 text-slate-400" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                        )}
                        {canDelete && (
                          <DropdownMenuItem
                            onClick={async () => {
                              const ok = await confirm({
                                title: "Xác nhận xóa lịch học",
                                description: `Bạn có chắc chắn muốn xóa lịch học của lớp này? Hành động này không thể hoàn tác.`,
                                confirmLabel: "Xóa",
                                cancelLabel: "Hủy",
                                variant: "destructive",
                              });
                              if (ok) {
                                deleteMutation.mutate(item.id);
                              }
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-rose-400" />
                            <span>Xóa</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
