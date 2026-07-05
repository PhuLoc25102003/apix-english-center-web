"use client";

import { Edit, MoreVertical, Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge";
import { formatVnd } from "@/components/forms/money-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCourse } from "../hooks/use-delete-course";
import type { Course, CourseStatus } from "../types/course.type";

interface CourseTableProps {
  courses: Course[];
  onEdit: (id: string) => void;
  onDeleted?: () => void;
}

const statusLabels: Record<CourseStatus, string> = {
  DRAFT: "Bản nháp",
  ACTIVE: "Đang hoạt động",
  INACTIVE: "Ngừng hoạt động",
};

export function CourseTable({ courses, onEdit, onDeleted }: CourseTableProps) {
  const confirm = useConfirm();
  const deleteMutation = useDeleteCourse();

  const handleDelete = async (course: Course) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa khóa học",
      description: `Bạn có chắc chắn muốn xóa khóa học ${course.name} (${course.code})? Hành động này không thể hoàn tác.`,
      confirmLabel: "Xóa",
      cancelLabel: "Hủy",
      variant: "destructive",
    });

    if (confirmed) {
      deleteMutation.mutate(course.id, { onSuccess: onDeleted });
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-white/40 shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="h-12 font-semibold text-slate-600">Cấp độ</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Mã</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Khóa học</TableHead>
              <TableHead className="h-12 min-w-56 font-semibold text-slate-600">Mô tả</TableHead>
              <TableHead className="h-12 text-center font-semibold text-slate-600">Số buổi</TableHead>
              <TableHead className="h-12 text-center font-semibold text-slate-600">Thời lượng</TableHead>
              <TableHead className="h-12 text-right font-semibold text-slate-600">Học phí</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Trạng thái</TableHead>
              <TableHead className="h-12 w-20">
                <span className="sr-only">Thao tác</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50/40"
              >
                <TableCell className="font-medium text-slate-600">
                  {course.levelName || "-"}
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {course.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {course.name}
                </TableCell>
                <TableCell
                  className="max-w-72 truncate font-medium text-slate-600"
                  title={course.description || undefined}
                >
                  {course.description || "-"}
                </TableCell>
                <TableCell className="text-center font-semibold tabular-nums text-slate-700">
                  {course.totalLessons}
                </TableCell>
                <TableCell className="text-center font-medium tabular-nums text-slate-600">
                  {course.durationMinutes} phút
                </TableCell>
                <TableCell className="text-right font-semibold whitespace-nowrap tabular-nums text-slate-800">
                  {formatVnd(course.defaultTuitionFee)}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={course.status}
                    customLabel={statusLabels[course.status]}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent outline-none transition-colors hover:bg-slate-100"
                      aria-label={`Tùy chọn khóa học ${course.name}`}
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card w-40 p-1">
                      <DropdownMenuItem
                        onClick={() => onEdit(course.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => void handleDelete(course)}
                        disabled={deleteMutation.isPending}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4 text-rose-400" />
                        Xóa
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
  );
}
