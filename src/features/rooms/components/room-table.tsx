"use client";

import { Edit, MoreVertical, Trash2 } from "lucide-react";

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
import { useDeleteRoom } from "../hooks/use-delete-room";
import type { Room } from "../types/room.type";

interface RoomTableProps {
  rooms: Room[];
  onEdit: (id: string) => void;
}

export function RoomTable({ rooms, onEdit }: RoomTableProps) {
  const confirm = useConfirm();
  const deleteMutation = useDeleteRoom();

  const handleDelete = async (room: Room) => {
    const confirmed = await confirm({
      title: "Xác nhận xóa phòng học",
      description: `Bạn có chắc chắn muốn xóa phòng ${room.name} (${room.code})? Hành động này không thể hoàn tác.`,
      confirmLabel: "Xóa",
      cancelLabel: "Hủy",
      variant: "destructive",
    });

    if (confirmed) {
      deleteMutation.mutate(room.id);
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-white/40 shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="h-12 font-semibold text-slate-600">Cơ sở</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Mã phòng</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Tên phòng</TableHead>
              <TableHead className="h-12 text-center font-semibold text-slate-600">Sức chứa</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Loại phòng</TableHead>
              <TableHead className="h-12 min-w-56 font-semibold text-slate-600">Cơ sở vật chất</TableHead>
              <TableHead className="h-12 font-semibold text-slate-600">Trạng thái</TableHead>
              <TableHead className="h-12 w-20">
                <span className="sr-only">Thao tác</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50/40"
              >
                <TableCell className="font-medium text-slate-600">
                  {room.campusName || "-"}
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {room.code}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {room.name}
                </TableCell>
                <TableCell className="text-center font-semibold tabular-nums text-slate-700">
                  {room.capacity}
                </TableCell>
                <TableCell className="font-medium text-slate-600">
                  {room.roomType || "-"}
                </TableCell>
                <TableCell
                  className="max-w-72 truncate font-medium text-slate-600"
                  title={room.facilitiesNote || undefined}
                >
                  {room.facilitiesNote || "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={room.isActive ? "ACTIVE" : "INACTIVE"}
                    customLabel={room.isActive ? "Hoạt động" : "Ngừng hoạt động"}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent outline-none transition-colors hover:bg-slate-100"
                      aria-label={`Tùy chọn phòng ${room.name}`}
                    >
                      <MoreVertical className="h-4 w-4 text-slate-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card w-40 p-1">
                      <DropdownMenuItem
                        onClick={() => onEdit(room.id)}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Edit className="h-4 w-4 text-slate-400" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => void handleDelete(room)}
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
