"use client";

/**
 * src/features/students/components/student-table.tsx
 *
 * Renders the table list of students with responsive headers, status badges,
 * and an action menu that integrates with the delete mutation.
 */

import * as React from "react";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { StatusBadge } from "@/components/common/status-badge";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteStudent } from "../hooks/use-delete-student";
import type { Student, StudentType, AccessMode } from "../types/student.type";

interface StudentTableProps {
  students: Student[];
  onEdit: (id: string) => void;
}

export function StudentTable({ students, onEdit }: StudentTableProps) {
  const deleteMutation = useDeleteStudent();
  const router = useRouter();
  const confirm = useConfirm();

  // Helper translations for display
  const getStudentTypeLabel = (type: StudentType) => {
    const labels: Record<StudentType, string> = {
      KINDERGARTEN: "Mầm non",
      CHILD: "Tiểu học",
      TEENAGER: "Thiếu niên",
      ADULT: "Người lớn",
    };
    return labels[type] || type;
  };

  const getAccessModeLabel = (mode: AccessMode) => {
    const labels: Record<AccessMode, string> = {
      NO_ACCOUNT: "Không tài khoản",
      PARENT_MANAGED: "Phụ huynh quản lý",
      OWN_ACCOUNT: "Tài khoản riêng",
    };
    return labels[mode] || mode;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b border-slate-100">
                <TableHead className="font-semibold text-slate-600 h-12">Mã học viên</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Họ và tên</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Ngày sinh</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Loại học viên</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Tài khoản</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
                <TableHead className="w-[80px] h-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                >
                  <TableCell className="font-mono text-xs font-semibold text-slate-600">
                    {student.studentCode}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {student.fullName}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {formatDate(student.dateOfBirth)}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {getStudentTypeLabel(student.studentType)}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {getAccessModeLabel(student.accessMode)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={student.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn học viên"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        <DropdownMenuItem
                          onClick={() => router.push(`/students/${student.id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span>Chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(student.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit className="h-4 w-4 text-slate-400" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Xác nhận xóa học viên",
                              description: `Bạn có chắc chắn muốn xóa học viên ${student.fullName}? Hành động này không thể hoàn tác.`,
                              confirmLabel: "Xóa",
                              cancelLabel: "Hủy",
                              variant: "destructive",
                            });
                            if (ok) {
                              deleteMutation.mutate(student.id);
                            }
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-rose-400" />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
