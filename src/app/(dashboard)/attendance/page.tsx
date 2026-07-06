"use client";

/**
 * src/app/(dashboard)/attendance/page.tsx
 *
 * Global attendance management page. Lists class sessions across all classes,
 * filters by class/status/date, and integrates creation/edit modals.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useConfirm } from "@/hooks/use-confirm";

import { useClasses } from "@/features/classes/hooks/use-classes";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

import {
  useClassSessions,
  useClassSessionDetail,
  useCreateClassSession,
  useUpdateClassSession,
  ClassSessionTable,
  AttendanceFilters,
  classSessionSchema,
  createClassSessionFormConfig,
  attendanceApi,
  type ClassSessionFormValues,
  type ClassSessionStatus,
} from "@/features/attendance";

export default function AttendancePage() {
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [status, setStatus] = React.useState<ClassSessionStatus | "">("");
  const [sessionDate, setSessionDate] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSessionId, setSelectedSessionId] = React.useState<string | null>(null);

  // Queries for select options
  const classesQuery = useClasses({ limit: 1000 });
  const roomsQuery = useRooms({ limit: 1000 });

  const classes = classesQuery.data?.data ?? [];
  const rooms = roomsQuery.data?.data ?? [];

  // Seed mock sessions with real IDs on initial load so they map correctly
  React.useEffect(() => {
    if (classes.length > 0 && rooms.length > 0) {
      void attendanceApi.seedInitialReferences(classes[0].id, rooms[0].id);
    }
  }, [classes, rooms]);

  const classOptions = React.useMemo(
    () =>
      classes.map((c) => ({
        value: c.id,
        label: `${c.classCode} (${c.name})`,
      })),
    [classes]
  );

  const roomOptions = React.useMemo(
    () =>
      rooms.map((r) => ({
        value: r.id,
        label: `${r.code} - ${r.name}`,
      })),
    [rooms]
  );

  // Class sessions query
  const { data, isLoading, isError, error, refetch, isRefetching } = useClassSessions({
    page,
    limit,
    search: search || undefined,
    classId: classId || undefined,
    status: status || undefined,
    sessionDate: sessionDate || undefined,
  });

  // Query details for Edit mode
  const { data: sessionDetail, isLoading: isLoadingDetail } = useClassSessionDetail(
    selectedSessionId || ""
  );

  const createMutation = useCreateClassSession();
  const updateMutation = useUpdateClassSession();
  
  const confirm = useConfirm();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleClassChange = (val: string) => {
    setClassId(val);
    setPage(1);
  };

  const handleStatusChange = (val: ClassSessionStatus | "") => {
    setStatus(val);
    setPage(1);
  };

  const handleSessionDateChange = (val: string) => {
    setSessionDate(val);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setClassId("");
    setStatus("");
    setSessionDate("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedSessionId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedSessionId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="Quản lý Buổi Học"
        description="Theo dõi lịch học, quản lý các buổi học và ghi chú giảng dạy của các lớp."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm buổi học
          </Button>
        }
      />

      {/* Filter Options */}
      <AttendanceFilters
        search={search}
        onSearchChange={handleSearchChange}
        classId={classId}
        onClassChange={handleClassChange}
        status={status}
        onStatusChange={handleStatusChange}
        sessionDate={sessionDate}
        onSessionDateChange={handleSessionDateChange}
        classOptions={classOptions}
        isLoadingClasses={classesQuery.isLoading}
        showClassFilter={true}
      />

      {/* Data Table */}
      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách buổi học."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy buổi học nào"
          description={
            search || classId || status || sessionDate
              ? "Không tìm thấy buổi học khớp với bộ lọc hiện tại. Hãy thử nhập hoặc chọn bộ lọc khác."
              : "Hệ thống chưa có dữ liệu buổi học."
          }
          actionLabel={search || classId || status || sessionDate ? "Xóa bộ lọc" : undefined}
          onAction={search || classId || status || sessionDate ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ClassSessionTable
            sessions={data.data}
            classes={classes}
            rooms={rooms}
            onEdit={handleEdit}
            showClassColumn={true}
          />

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} buổi học
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

      {/* CrudFormModal */}
      <ClassSessionModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedSessionId(null);
        }}
        selectedSessionId={selectedSessionId}
        sessionDetail={sessionDetail?.data}
        isLoadingDetail={selectedSessionId ? isLoadingDetail : false}
        classOptions={classOptions}
        roomOptions={roomOptions}
        createMutation={createMutation}
        confirm={confirm}
      />
    </div>
  );
}

// Sub-component wrapper around CrudFormModal to separate hook call updates
interface ClassSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSessionId: string | null;
  sessionDetail?: any;
  isLoadingDetail: boolean;
  classOptions: any[];
  roomOptions: any[];
  createMutation: any;
  confirm: any;
}

function ClassSessionModal({
  open,
  onOpenChange,
  selectedSessionId,
  sessionDetail,
  isLoadingDetail,
  classOptions,
  roomOptions,
  createMutation,
  confirm,
}: ClassSessionModalProps) {
  const updateMutation = useUpdateClassSession();

  const handleFormSubmit = async (values: ClassSessionFormValues) => {
    const payload = {
      classId: values.classId,
      roomId: values.roomId,
      scheduleId: values.scheduleId || null,
      sessionDate: values.sessionDate,
      startTime: values.startTime,
      endTime: values.endTime,
      lessonNo: values.lessonNo !== undefined ? values.lessonNo : null,
      status: values.status,
      note: values.note ? values.note.trim() : null,
    };

    if (selectedSessionId) {
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: "Bạn có chắc chắn muốn cập nhật thay đổi cho buổi học này?",
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedSessionId, data: payload },
          {
            onSuccess: () => {
              onOpenChange(false);
            },
          }
        );
      }
    } else {
      await createMutation.mutateAsync(payload, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  const formConfigs = React.useMemo(
    () => createClassSessionFormConfig(classOptions, roomOptions, [], false),
    [classOptions, roomOptions]
  );

  return (
    <CrudFormModal
      open={open}
      onOpenChange={onOpenChange}
      title={selectedSessionId ? "Chỉnh sửa buổi học" : "Thêm buổi học mới"}
      description={
        selectedSessionId
          ? "Cập nhật thông tin chi tiết buổi học của lớp học."
          : "Điền thông tin chi tiết để thêm buổi học mới vào lớp học."
      }
      submitLabel={selectedSessionId ? "Cập nhật thông tin" : "Thêm buổi học"}
      configs={formConfigs}
      validationSchema={classSessionSchema}
      initialValues={selectedSessionId ? sessionDetail : undefined}
      onSubmit={handleFormSubmit}
      isLoadingDetails={selectedSessionId ? isLoadingDetail : false}
    />
  );
}
