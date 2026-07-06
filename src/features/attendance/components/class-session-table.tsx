"use client";

/**
 * src/features/attendance/components/class-session-table.tsx
 *
 * Renders the table list of class sessions with status badges and action dropdowns.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Edit, Trash2, UserCheck } from "lucide-react";

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
import { useDeleteClassSession } from "../hooks/use-delete-class-session";
import type { ClassSession, ClassSessionStatus } from "../types/attendance.type";
import type { ClassRecord } from "@/features/classes/types/class.type";
import type { Room } from "@/features/rooms/types/room.type";

interface ClassSessionTableProps {
  sessions: ClassSession[];
  classes: ClassRecord[];
  rooms: Room[];
  onEdit: (id: string) => void;
  showClassColumn?: boolean;
}

const statusLabels: Record<ClassSessionStatus, string> = {
  PLANNED: "Lên kế hoạch",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  RESCHEDULED: "Đổi lịch",
};

const statusBadgeKeys: Record<ClassSessionStatus, string> = {
  PLANNED: "PLANNING",
  COMPLETED: "ACTIVE",
  CANCELLED: "CANCELLED",
  RESCHEDULED: "OPEN",
};

export function ClassSessionTable({
  sessions,
  classes,
  rooms,
  onEdit,
  showClassColumn = true,
}: ClassSessionTableProps) {
  const router = useRouter();
  const deleteMutation = useDeleteClassSession();
  const confirm = useConfirm();

  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              {showClassColumn && (
                <TableHead className="font-semibold text-slate-600 h-12">Lớp học</TableHead>
              )}
              <TableHead className="font-semibold text-slate-600 h-12">Phòng học</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ngày học</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Giờ học</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 text-center">Buổi số</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Trạng thái</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ghi chú</TableHead>
              <TableHead className="w-[80px] h-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const classObj = classes.find((c) => c.id === session.classId);
              const roomObj = rooms.find((r) => r.id === session.roomId);

              const classLabel = classObj
                ? `${classObj.classCode} (${classObj.name})`
                : "-";
              const roomLabel = roomObj
                ? `${roomObj.code} - ${roomObj.name}`
                : "-";

              return (
                <TableRow
                  key={session.id}
                  className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                >
                  {showClassColumn && (
                    <TableCell className="font-semibold text-slate-900">
                      {classLabel}
                    </TableCell>
                  )}
                  <TableCell className="text-slate-600 font-medium">
                    {roomLabel}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium tabular-nums">
                    {session.sessionDate}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium tabular-nums">
                    {session.startTime} - {session.endTime}
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium text-center tabular-nums">
                    {session.lessonNo !== null ? session.lessonNo : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={statusBadgeKeys[session.status]}
                      customLabel={statusLabels[session.status]}
                    />
                  </TableCell>
                  <TableCell className="text-slate-500 max-w-[200px] truncate" title={session.note || undefined}>
                    {session.note || "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="flex h-8 w-8 items-center justify-center hover:bg-slate-100 rounded-lg outline-none transition-colors border border-transparent cursor-pointer"
                        aria-label="Tùy chọn buổi học"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px] glass-card p-1">
                        <DropdownMenuItem
                          onClick={() => router.push(`/sessions/${session.id}/attendance`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <UserCheck className="h-4 w-4 text-emerald-500" />
                          <span>Điểm danh</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onEdit(session.id)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit className="h-4 w-4 text-slate-400" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Xác nhận xóa buổi học",
                              description: `Bạn có chắc chắn muốn xóa buổi học ngày ${session.sessionDate} của lớp này? Hành động này không thể hoàn tác.`,
                              confirmLabel: "Xóa",
                              cancelLabel: "Hủy",
                              variant: "destructive",
                            });
                            if (ok) {
                              deleteMutation.mutate(session.id);
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
