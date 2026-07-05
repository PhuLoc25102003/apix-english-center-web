"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { Button } from "@/components/ui/button";
import {
  CourseFilters,
  CourseForm,
  CourseTable,
  useCourse,
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  type CourseFormValues,
  type CourseStatus,
  type CreateCourseDto,
} from "@/features/courses";
import { useLevels } from "@/features/levels";
import { useConfirm } from "@/hooks/use-confirm";

const PAGE_SIZE = 10;

export default function CoursesPage() {
  const [search, setSearch] = React.useState("");
  const [levelId, setLevelId] = React.useState("");
  const [status, setStatus] = React.useState<CourseStatus | "">("");
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(
    null,
  );

  const coursesQuery = useCourses({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    levelId: levelId || undefined,
    status: status || undefined,
  });
  const levelsQuery = useLevels({ page: 1, limit: 1000 });
  const courseDetailQuery = useCourse(selectedCourseId ?? "");
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const confirm = useConfirm();

  const levelOptions = React.useMemo(
    () =>
      [...(levelsQuery.data?.data ?? [])]
        .sort((left, right) => left.orderIndex - right.orderIndex)
        .map((level) => ({ value: level.id, label: level.name })),
    [levelsQuery.data],
  );

  const handleSearchChange = React.useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleLevelChange = (value: string) => {
    setLevelId(value);
    setPage(1);
  };

  const handleStatusChange = (value: CourseStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setLevelId("");
    setStatus("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedCourseId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedCourseId(id);
    setIsModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) setSelectedCourseId(null);
  };

  const handleFormSubmit = async (values: CourseFormValues) => {
    const payload: CreateCourseDto = {
      levelId: values.levelId,
      code: values.code.trim(),
      name: values.name.trim(),
      description: values.description?.trim() || null,
      totalLessons: values.totalLessons,
      durationMinutes: values.durationMinutes,
      defaultTuitionFee: values.defaultTuitionFee,
      status: values.status,
    };

    if (selectedCourseId) {
      const confirmed = await confirm({
        title: "Xác nhận cập nhật",
        description: `Lưu thay đổi cho khóa học ${courseDetailQuery.data?.data.name || "này"}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });

      if (!confirmed) return;

      await updateMutation.mutateAsync({ id: selectedCourseId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    handleModalChange(false);
  };

  const isLoading = coursesQuery.isLoading || levelsQuery.isLoading;
  const isError = coursesQuery.isError || levelsQuery.isError;
  const error = coursesQuery.error || levelsQuery.error;
  const hasFilters = Boolean(search || levelId || status);
  const data = coursesQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Khóa học"
        description="Quản lý chương trình, số buổi, thời lượng và học phí khóa học tại APIX."
        action={
          <Button
            onClick={handleCreate}
            disabled={levelsQuery.isLoading || levelsQuery.isError}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#FF161A] px-4 py-2 font-semibold text-white shadow-md shadow-[#FF161A]/15 transition-all hover:bg-[#C90012]"
          >
            <Plus className="h-4 w-4" />
            Thêm khóa học
          </Button>
        }
      />

      <CourseFilters
        search={search}
        onSearchChange={handleSearchChange}
        levelId={levelId}
        onLevelChange={handleLevelChange}
        status={status}
        onStatusChange={handleStatusChange}
        levelOptions={levelOptions}
        isLoadingLevels={levelsQuery.isLoading || levelsQuery.isError}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải dữ liệu khóa học"
          message={error?.message || "Đã xảy ra lỗi khi tải dữ liệu."}
          onRetry={() => {
            void coursesQuery.refetch();
            void levelsQuery.refetch();
          }}
          isRetrying={coursesQuery.isRefetching || levelsQuery.isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy khóa học nào"
          description={
            hasFilters
              ? "Không có khóa học phù hợp với bộ lọc hiện tại."
              : "Hệ thống chưa có dữ liệu khóa học."
          }
          actionLabel={hasFilters ? "Xóa bộ lọc" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <CourseTable
            courses={data.data}
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
              {data.meta.total} khóa học
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

      <CourseForm
        open={isModalOpen}
        onOpenChange={handleModalChange}
        isEdit={Boolean(selectedCourseId)}
        course={selectedCourseId ? courseDetailQuery.data?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={
          Boolean(selectedCourseId) && courseDetailQuery.isLoading
        }
        detailsError={
          selectedCourseId && courseDetailQuery.isError
            ? courseDetailQuery.error.message || "Không thể tải thông tin khóa học."
            : undefined
        }
        onRetryDetails={() => void courseDetailQuery.refetch()}
      />
    </div>
  );
}
