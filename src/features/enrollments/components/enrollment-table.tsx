"use client";

import * as React from "react";
import { MoreVertical, CheckCircle, XCircle, Pencil } from "lucide-react";
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
import { useCancelEnrollment } from "../hooks/use-cancel-enrollment";
import { useCompleteEnrollment } from "../hooks/use-complete-enrollment";
import type { Enrollment } from "../types/enrollment.type";

interface EnrollmentTableProps {
  enrollments: Enrollment[];
  onEdit: (enrollment: Enrollment) => void;
}

const statusLabels: Record<string, string> = {
  TRIAL: "Học thử",
  ACTIVE: "Đang học",
  FROZEN: "Bảo lưu",
  TRANSFERRED: "Đã chuyển lớp",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};

const statusClasses: Record<string, string> = {
  TRIAL: "bg-blue-50 text-blue-700 border-blue-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FROZEN: "bg-amber-50 text-amber-700 border-amber-200",
  TRANSFERRED: "bg-purple-50 text-purple-700 border-purple-200",
  COMPLETED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
};

const sourceLabels: Record<string, string> = {
  WALK_IN: "Trực tiếp",
  REFERRAL: "Giới thiệu",
  ONLINE: "Trực tuyến",
  OTHER: "Nguồn khác",
};

export function EnrollmentTable({ enrollments, onEdit }: EnrollmentTableProps) {
  const cancelMutation = useCancelEnrollment();
  const completeMutation = useCompleteEnrollment();
  const confirm = useConfirm();

  const canCancel = hasPermission("enrollment:cancel");
  const canComplete = hasPermission("enrollment:complete");
  const canEdit = hasPermission("enrollment:update");

  const formatLocalDate = (val: string | null) => {
    if (!val) return "-";
    const [year, month, day] = val.split("-");
    return year && month && day ? `${day}/${month}/${year}` : val;
  };

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12">Mã ghi danh</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Học viên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Lớp học</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày ghi danh</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày bắt đầu</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày kết thúc</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Nguồn</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {item.enrollmentCode || "-"}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {item.studentFullName}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  <div className="flex flex-col">
                    <span>{item.className}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.classCode}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {formatLocalDate(item.enrolledDate)}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {formatLocalDate(item.startDate)}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {formatLocalDate(item.endDate)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      statusClasses[item.status] || "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {statusLabels[item.status] || item.status}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {sourceLabels[item.source] || item.source}
                </TableCell>
                <TableCell>
                  {/* Dropdown Menu actions */}
                  {(canEdit || canCancel || canComplete) &&
                    ["ACTIVE", "TRIAL", "FROZEN"].includes(item.status) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                          aria-label="Tùy chọn ghi danh"
                        >
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] glass-card p-1">
                          {canEdit && (
                            <DropdownMenuItem
                              onClick={() => onEdit(item)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <Pencil className="h-4 w-4 text-slate-500" />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                          )}
                          {canComplete && (
                            <DropdownMenuItem
                              onClick={async () => {
                                const ok = await confirm({
                                  title: "Xác nhận hoàn thành khóa học",
                                  description: `Đánh dấu học viên ${item.studentFullName} đã hoàn thành khóa học tại lớp ${item.className}?`,
                                  confirmLabel: "Xác nhận",
                                  cancelLabel: "Hủy",
                                  variant: "default",
                                });
                                if (ok) {
                                  completeMutation.mutate(item.id);
                                }
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span>Hoàn thành học</span>
                            </DropdownMenuItem>
                          )}
                          {canCancel && (
                            <DropdownMenuItem
                              onClick={async () => {
                                const ok = await confirm({
                                  title: "Xác nhận hủy ghi danh",
                                  description: `Bạn có chắc chắn muốn hủy ghi danh của học viên ${item.studentFullName} tại lớp ${item.className}?`,
                                  confirmLabel: "Hủy học",
                                  cancelLabel: "Quay lại",
                                  variant: "destructive",
                                });
                                if (ok) {
                                  cancelMutation.mutate(item.id);
                                }
                              }}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <XCircle className="h-4 w-4 text-rose-500" />
                              <span>Hủy ghi danh</span>
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
