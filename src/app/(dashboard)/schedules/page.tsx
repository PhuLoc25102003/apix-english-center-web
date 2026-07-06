"use client";

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/search-input";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useConfirm } from "@/hooks/use-confirm";
import { hasPermission } from "@/lib/permissions/has-permission";

import { useClasses } from "@/features/classes/hooks/use-classes";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import {
  useClassSchedules,
  useClassSchedule,
  useCreateClassSchedule,
  useUpdateClassSchedule,
  ClassScheduleTable,
  createClassScheduleFormConfig,
  classScheduleSchema,
  type ClassScheduleFormValues,
} from "@/features/class-schedules";

export default function SchedulesPage() {
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [roomId, setRoomId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = React.useState<string | null>(null);

  const { data: classesData } = useClasses({ limit: 1000 });
  const { data: roomsData } = useRooms({ limit: 1000 });

  const { data, isLoading, isError, error, refetch, isRefetching } = useClassSchedules({
    page,
    limit,
    search: search || undefined,
    classId: classId || undefined,
    roomId: roomId || undefined,
  });

  const { data: scheduleDetail, isLoading: isLoadingDetail } = useClassSchedule(
    selectedScheduleId || ""
  );

  const createMutation = useCreateClassSchedule();
  const updateMutation = useUpdateClassSchedule();
  const confirm = useConfirm();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassId(e.target.value);
    setPage(1);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomId(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setClassId("");
    setRoomId("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedScheduleId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedScheduleId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: ClassScheduleFormValues) => {
    const payload = {
      classId: values.classId,
      roomId: values.roomId,
      dayOfWeek: Number(values.dayOfWeek),
      startTime: values.startTime,
      endTime: values.endTime,
      effectiveFrom: values.effectiveFrom,
      effectiveTo: values.effectiveTo || null,
      status: values.status,
      patternCode: values.patternCode || null,
    };

    if (selectedScheduleId) {
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: "Bạn có chắc chắn muốn lưu các thay đổi cho lịch học này?",
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedScheduleId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedScheduleId(null);
            },
          }
        );
      }
    } else {
      await createMutation.mutateAsync(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  const classOptions = React.useMemo(() => {
    return (
      classesData?.data.map((c) => ({
        value: c.id,
        label: `${c.classCode} - ${c.name}`,
      })) || []
    );
  }, [classesData]);

  const roomOptions = React.useMemo(() => {
    return (
      roomsData?.data.map((r) => ({
        value: r.id,
        label: `${r.code} (${r.campusName || ""})`,
      })) || []
    );
  }, [roomsData]);

  const formConfigs = React.useMemo(() => {
    return createClassScheduleFormConfig(classOptions, roomOptions);
  }, [classOptions, roomOptions]);

  const canCreate = hasPermission("class-schedule:create");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Lịch Học Lớp (Class Schedules)"
        description="Định cấu hình thời khóa biểu cố định, phòng học cố định cho các lớp học theo các ngày trong tuần."
        action={
          canCreate ? (
            <Button
              onClick={handleCreate}
              className="font-semibold bg-[#FF161A] text-[#FFF] hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Tạo lịch học mới
            </Button>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1 max-w-3xl">
          <SearchInput
            placeholder="Tìm theo từ khóa..."
            value={search}
            onChange={handleSearchChange}
            className="w-full sm:max-w-xs"
          />

          <select
            value={classId}
            onChange={handleClassChange}
            className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[200px]"
          >
            <option value="">Tất cả lớp học</option>
            {classOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={roomId}
            onChange={handleRoomChange}
            className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[200px]"
          >
            <option value="">Tất cả phòng học</option>
            {roomOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {(search || classId || roomId) && (
          <Button
            onClick={handleClearFilters}
            variant="ghost"
            className="text-slate-500 hover:text-slate-900 cursor-pointer text-xs"
          >
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải lịch học"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy lịch học nào"
          description={
            search || classId || roomId
              ? "Không tìm thấy lịch học khớp với bộ lọc tìm kiếm."
              : "Hệ thống chưa cấu hình lịch học cố định nào."
          }
          actionLabel={search || classId || roomId ? "Xóa bộ lọc" : undefined}
          onAction={search || classId || roomId ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ClassScheduleTable schedules={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} lịch học
            </p>
            {data.meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>
                <span className="text-sm font-semibold text-slate-700 select-none">
                  Trang {data.meta.page} / {data.meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasNextPage}
                  onClick={() => setPage((prev) => Math.min(prev + 1, data.meta.totalPages))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  Sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Crud modal form */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedScheduleId(null);
        }}
        title={selectedScheduleId ? "Chỉnh sửa lịch học" : "Cấu hình lịch học mới"}
        description={
          selectedScheduleId
            ? "Cập nhật ngày, giờ, phòng học cho lịch biểu này."
            : "Nhập các thông tin chi tiết để định cấu hình thời khóa biểu mới cho lớp học."
        }
        submitLabel={selectedScheduleId ? "Cập nhật lịch" : "Lưu cấu hình"}
        configs={formConfigs}
        validationSchema={classScheduleSchema}
        initialValues={selectedScheduleId ? {
          ...scheduleDetail?.data,
          // Coerce dayOfWeek to string for select component compatibility
          dayOfWeek: scheduleDetail?.data?.dayOfWeek?.toString(),
        } : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedScheduleId ? isLoadingDetail : false}
      />
    </div>
  );
}
