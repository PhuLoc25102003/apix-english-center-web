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
  ClassFilters,
  ClassForm,
  ClassTable,
  useClass,
  useClasses,
  useCreateClass,
  useUpdateClass,
  type ClassFormValues,
  type ClassStatus,
  type CreateClassDto,
} from "@/features/classes";
import { useCourses } from "@/features/courses";
import { useConfirm } from "@/hooks/use-confirm";

const PAGE_SIZE = 10;

export default function ClassesPage() {
  const [search, setSearch] = React.useState("");
  const [courseId, setCourseId] = React.useState("");
  const [campusId, setCampusId] = React.useState("");
  const [status, setStatus] = React.useState<ClassStatus | "">("");
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedClassId, setSelectedClassId] = React.useState<string | null>(
    null,
  );

  const classesQuery = useClasses({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    courseId: courseId || undefined,
    campusId: campusId || undefined,
    status: status || undefined,
  });
  const coursesQuery = useCourses({ page: 1, limit: 1000 });
  const campusesQuery = useCampuses({ page: 1, limit: 1000 });
  const classDetailQuery = useClass(selectedClassId ?? "");
  const createMutation = useCreateClass();
  const updateMutation = useUpdateClass();
  const confirm = useConfirm();

  const courseOptions = React.useMemo(
    () =>
      (coursesQuery.data?.data ?? []).map((course) => ({
        value: course.id,
        label: `${course.code} - ${course.name}`,
      })),
    [coursesQuery.data],
  );
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

  const handleCourseChange = (value: string) => {
    setCourseId(value);
    setPage(1);
  };

  const handleCampusChange = (value: string) => {
    setCampusId(value);
    setPage(1);
  };

  const handleStatusChange = (value: ClassStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCourseId("");
    setCampusId("");
    setStatus("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedClassId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedClassId(id);
    setIsModalOpen(true);
  };

  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) setSelectedClassId(null);
  };

  const handleFormSubmit = async (values: ClassFormValues) => {
    const payload: CreateClassDto = {
      courseId: values.courseId,
      campusId: values.campusId,
      name: values.name.trim(),
      capacity: values.capacity,
      startDate: values.startDate,
      expectedEndDate: values.expectedEndDate,
      status: values.status,
      note: values.note?.trim() || null,
    };

    if (selectedClassId) {
      const confirmed = await confirm({
        title: "Xác nhận cập nhật",
        description: `Lưu thay đổi cho lớp ${classDetailQuery.data?.data.name || "này"}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });

      if (!confirmed) return;

      await updateMutation.mutateAsync({ id: selectedClassId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }

    handleModalChange(false);
  };

  const isLoading =
    classesQuery.isLoading || coursesQuery.isLoading || campusesQuery.isLoading;
  const isError =
    classesQuery.isError || coursesQuery.isError || campusesQuery.isError;
  const error = classesQuery.error || coursesQuery.error || campusesQuery.error;
  const isLoadingOptions =
    coursesQuery.isLoading ||
    coursesQuery.isError ||
    campusesQuery.isLoading ||
    campusesQuery.isError;
  const hasFilters = Boolean(search || courseId || campusId || status);
  const data = classesQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Lớp học"
        description="Quản lý lớp học, khóa học, cơ sở, sức chứa và thời gian đào tạo tại APIX."
        action={
          <Button
            onClick={handleCreate}
            disabled={isLoadingOptions}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#FF161A] px-4 py-2 font-semibold text-white shadow-md shadow-[#FF161A]/15 transition-all hover:bg-[#C90012]"
          >
            <Plus className="h-4 w-4" />
            Thêm lớp học
          </Button>
        }
      />

      <ClassFilters
        search={search}
        onSearchChange={handleSearchChange}
        courseId={courseId}
        onCourseChange={handleCourseChange}
        campusId={campusId}
        onCampusChange={handleCampusChange}
        status={status}
        onStatusChange={handleStatusChange}
        courseOptions={courseOptions}
        campusOptions={campusOptions}
        isLoadingOptions={isLoadingOptions}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải dữ liệu lớp học"
          message={error?.message || "Đã xảy ra lỗi khi tải dữ liệu."}
          onRetry={() => {
            void classesQuery.refetch();
            void coursesQuery.refetch();
            void campusesQuery.refetch();
          }}
          isRetrying={
            classesQuery.isRefetching ||
            coursesQuery.isRefetching ||
            campusesQuery.isRefetching
          }
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy lớp học nào"
          description={
            hasFilters
              ? "Không có lớp học phù hợp với bộ lọc hiện tại."
              : "Hệ thống chưa có dữ liệu lớp học."
          }
          actionLabel={hasFilters ? "Xóa bộ lọc" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ClassTable
            classes={data.data}
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
              {data.meta.total} lớp học
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

      <ClassForm
        open={isModalOpen}
        onOpenChange={handleModalChange}
        isEdit={Boolean(selectedClassId)}
        classItem={selectedClassId ? classDetailQuery.data?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={
          Boolean(selectedClassId) && classDetailQuery.isLoading
        }
        detailsError={
          selectedClassId && classDetailQuery.isError
            ? classDetailQuery.error.message || "Không thể tải thông tin lớp học."
            : undefined
        }
        onRetryDetails={() => void classDetailQuery.refetch()}
      />
    </div>
  );
}
