"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { Button } from "@/components/ui/button";
import { useCampuses } from "@/features/campuses";
import {
  RoomFilters,
  RoomForm,
  RoomTable,
  useCreateRoom,
  useRoom,
  useRooms,
  useUpdateRoom,
  type CreateRoomDto,
  type RoomFormValues,
} from "@/features/rooms";
import { useConfirm } from "@/hooks/use-confirm";

const PAGE_SIZE = 10;

export default function RoomsPage() {
  const [search, setSearch] = React.useState("");
  const [campusId, setCampusId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState<string | null>(null);

  const roomsQuery = useRooms({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    campusId: campusId || undefined,
  });
  const campusesQuery = useCampuses({ page: 1, limit: 1000 });
  const roomDetailQuery = useRoom(selectedRoomId ?? "");
  const createMutation = useCreateRoom();
  const updateMutation = useUpdateRoom();
  const confirm = useConfirm();

  const campusOptions = React.useMemo(
    () =>
      (campusesQuery.data?.data ?? []).map((campus) => ({
        value: campus.id,
        label: campus.name,
      })),
    [campusesQuery.data],
  );

  const handleSearchChange = React.useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCampusChange = (value: string) => {
    setCampusId(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCampusId("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedRoomId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedRoomId(id);
    setIsModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedRoomId(null);
    }
  };

  const handleFormSubmit = async (values: RoomFormValues) => {
    const payload: CreateRoomDto = {
      campusId: values.campusId,
      code: values.code.trim(),
      name: values.name.trim(),
      capacity: values.capacity,
      roomType: values.roomType?.trim() || null,
      facilitiesNote: values.facilitiesNote?.trim() || null,
      isActive: values.isActive,
    };

    if (selectedRoomId) {
      const confirmed = await confirm({
        title: "Xác nhận cập nhật",
        description: `Lưu thay đổi cho phòng ${roomDetailQuery.data?.data.name || "này"}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });

      if (!confirmed) return;

      await updateMutation.mutateAsync({ id: selectedRoomId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    handleModalChange(false);
  };

  const isLoading = roomsQuery.isLoading || campusesQuery.isLoading;
  const isError = roomsQuery.isError || campusesQuery.isError;
  const error = roomsQuery.error || campusesQuery.error;
  const hasFilters = Boolean(search || campusId);
  const data = roomsQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Phòng học"
        description="Quản lý phòng học, sức chứa và cơ sở vật chất tại các cơ sở APIX."
        action={
          <Button
            onClick={handleCreate}
            disabled={campusesQuery.isLoading || campusesQuery.isError}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#FF161A] px-4 py-2 font-semibold text-white shadow-md shadow-[#FF161A]/15 transition-all hover:bg-[#C90012]"
          >
            <Plus className="h-4 w-4" />
            Thêm phòng học
          </Button>
        }
      />

      <RoomFilters
        search={search}
        onSearchChange={handleSearchChange}
        campusId={campusId}
        onCampusChange={handleCampusChange}
        campusOptions={campusOptions}
        isLoadingCampuses={campusesQuery.isLoading || campusesQuery.isError}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải dữ liệu phòng học"
          message={error?.message || "Đã xảy ra lỗi khi tải dữ liệu."}
          onRetry={() => {
            void roomsQuery.refetch();
            void campusesQuery.refetch();
          }}
          isRetrying={roomsQuery.isRefetching || campusesQuery.isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy phòng học nào"
          description={
            hasFilters
              ? "Không có phòng học phù hợp với bộ lọc hiện tại."
              : "Hệ thống chưa có dữ liệu phòng học."
          }
          actionLabel={hasFilters ? "Xóa bộ lọc" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <RoomTable
            rooms={data.data}
            onEdit={handleEdit}
            onDeleted={() => {
              if (data.data.length === 1 && page > 1) {
                setPage((current) => current - 1);
              }
            }}
          />

          <div className="mt-4 flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Hiển thị {(data.meta.page - 1) * PAGE_SIZE + 1} -{" "}
              {Math.min(data.meta.page * PAGE_SIZE, data.meta.total)} trong tổng số{" "}
              {data.meta.total} phòng học
            </p>
            {data.meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasPreviousPage}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="h-8 rounded-lg bg-white/60 text-slate-700 hover:bg-white"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Trước
                </Button>
                <span className="select-none text-sm font-semibold text-slate-700">
                  Trang {data.meta.page} / {data.meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasNextPage}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(data.meta.totalPages, current + 1),
                    )
                  }
                  className="h-8 rounded-lg bg-white/60 text-slate-700 hover:bg-white"
                >
                  Sau
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <RoomForm
        open={isModalOpen}
        onOpenChange={handleModalChange}
        isEdit={Boolean(selectedRoomId)}
        room={selectedRoomId ? roomDetailQuery.data?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={Boolean(selectedRoomId) && roomDetailQuery.isLoading}
        detailsError={
          selectedRoomId && roomDetailQuery.isError
            ? roomDetailQuery.error.message || "Không thể tải thông tin phòng học."
            : undefined
        }
        onRetryDetails={() => void roomDetailQuery.refetch()}
      />
    </div>
  );
}
