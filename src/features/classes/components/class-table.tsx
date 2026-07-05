"use client";

import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { StatusBadge } from "@/components/common/status-badge";
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
import { useDeleteClass } from "../hooks/use-delete-class";
import type { ClassRecord, ClassStatus } from "../types/class.type";

interface ClassTableProps {
  classes: ClassRecord[];
  onEdit: (id: string) => void;
  onDeleted?: () => void;
}

export const classStatusLabels: Record<ClassStatus, string> = {
  PLANNING: "Đang lên kế hoạch",
  OPEN: "Đang tuyển sinh",
  ACTIVE: "Đang học",
  CLOSED: "Đã kết thúc",
  CANCELLED: "Đã hủy",
};

export function formatClassDate(value: string): string {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

export function ClassTable({ classes, onEdit, onDeleted }: ClassTableProps) {
  const router = useRouter();
  const confirm = useConfirm();
  const deleteMutation = useDeleteClass();

  const handleDelete = async (classItem: ClassRecord) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa lớp học",
      description: `Bạn có chắc chắn muốn xóa lớp ${classItem.name} (${classItem.classCode})? Hành động này không thể hoàn tác.`,
      confirmLabel: "Xóa",
      cancelLabel: "Hủy",
      variant: "destructive",
    });

    if (confirmed) {
      deleteMutation.mutate(classItem.id, { onSuccess: onDeleted });
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-white/40 shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="h-12 font-semibold text-slate-600">Mã lớp</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Tên lớp</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Khóa học</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Cơ sở</TableHead>
              <TableHead className="h-12 text-center font-semibold text-slate-600">Sức chứa</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Thời gian</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Trạng thái</TableHead>
              <TableHead className="h-12 min-w-48 font-semibold text-slate-600">Ghi chú</TableHead>
              <TableHead className="h-12 w-20">
                <span className="sr-only">Thao tác</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow
                key={classItem.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50/40"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {classItem.classCode}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {classItem.name}
                </TableCell>
                <TableCell className="font-medium text-slate-600">
                  {classItem.courseName || "-"}
                </TableCell>
                <TableCell className="font-medium text-slate-600">
                  {classItem.campusName || "-"}
                </TableCell>
                <TableCell className="text-center font-semibold tabular-nums text-slate-700">
                  {classItem.capacity}
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm font-medium text-slate-600">
                  {formatClassDate(classItem.startDate)} -{" "}
                  {formatClassDate(classItem.expectedEndDate)}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={classItem.status}
                    customLabel={classStatusLabels[classItem.status]}
                  />
                </TableCell>
                <TableCell
                  className="max-w-64 truncate font-medium text-slate-600"
                  title={classItem.note || undefined}
                >
                  {classItem.note || "-"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent outline-none transition-colors hover:bg-slate-100"
                      aria-label={`Tùy chọn lớp ${classItem.name}`}
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card w-44 p-1">
                      <DropdownMenuItem
                        onClick={() => router.push(`/classes/${classItem.id}`)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Eye className="h-4 w-4 text-slate-400" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(classItem.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => void handleDelete(classItem)}
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
