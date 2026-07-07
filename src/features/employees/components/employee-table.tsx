"use client";

import * as React from "react";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
import { useConfirm } from "@/hooks/use-confirm";
import { hasPermission } from "@/lib/permissions/has-permission";
import { useDeleteEmployee } from "../hooks/use-delete-employee";
import type { Employee } from "../types/employee.type";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (id: string) => void;
}

const statusLabels: Record<string, string> = {
  ACTIVE: "Đang làm việc",
  INACTIVE: "Tạm ngưng",
  ON_LEAVE: "Nghỉ phép dài hạn",
  TERMINATED: "Đã thôi việc",
};

const statusClasses: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-slate-50 text-slate-500 border-slate-200",
  ON_LEAVE: "bg-amber-50 text-amber-700 border-amber-200",
  TERMINATED: "bg-rose-50 text-rose-700 border-rose-200",
};

export function EmployeeTable({ employees, onEdit }: EmployeeTableProps) {
  const deleteMutation = useDeleteEmployee();
  const confirm = useConfirm();
  const router = useRouter();

  const canUpdate = hasPermission("employee:update");
  const canDelete = hasPermission("employee:delete");

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
              <TableHead className="font-semibold text-slate-600 h-12">Mã NV</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Họ và tên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Cơ sở</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Chức vụ / Vai trò</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày vào làm</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
              >
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {item.employeeCode}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {item.fullName}
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {item.campusName || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.positions && item.positions.length > 0 ? (
                      item.positions.map((pos) => (
                        <span
                          key={pos.id}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {pos.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 text-xs font-medium">-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {formatLocalDate(item.hiredDate)}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      statusClasses[item.employmentStatus] ||
                      "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {statusLabels[item.employmentStatus] || item.employmentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  {(canUpdate || canDelete) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn nhân sự"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        <DropdownMenuItem
                          onClick={() => router.push(`/employees/${item.id}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Eye className="h-4 w-4 text-slate-400" />
                          <span>Chi tiết</span>
                        </DropdownMenuItem>
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
                                title: "Xác nhận xóa nhân sự",
                                description: `Bạn có chắc chắn muốn xóa nhân viên ${item.fullName}? Hành động này không thể hoàn tác.`,
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
