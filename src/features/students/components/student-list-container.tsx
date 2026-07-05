"use client";

/**
 * src/features/students/components/student-list-container.tsx
 *
 * Container component for the Student List. Handles state, fetching, error/empty states,
 * modal form workflows, and passes events down to filters and tables.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

import { useStudents } from "../hooks/use-students";
import { StudentFilters } from "./student-filters";
import { StudentTable } from "./student-table";

// Modal refactoring imports
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { studentFormConfig } from "../configs/student-form.config";
import { studentSchema, type StudentFormValues } from "../schemas/student.schema";
import { useStudent } from "../hooks/use-student";
import { useCreateStudent } from "../hooks/use-create-student";
import { useUpdateStudent } from "../hooks/use-update-student";
import { useConfirm } from "@/hooks/use-confirm";

export function StudentListContainer() {
  const [search, setSearch] = React.useState("");
  const [studentType, setStudentType] = React.useState("");
  const [accessMode, setAccessMode] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedStudentId, setSelectedStudentId] = React.useState<string | null>(null);

  // Synchronous filter update handlers that reset the page to 1
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStudentTypeChange = (val: string) => {
    setStudentType(val);
    setPage(1);
  };

  const handleAccessModeChange = (val: string) => {
    setAccessMode(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } = useStudents({
    page,
    limit,
    search: search || undefined,
    studentType: studentType || undefined,
    accessMode: accessMode || undefined,
    status: status || undefined,
  });

  // Query detail student for Edit mode
  const { data: studentDetail, isLoading: isLoadingDetail } = useStudent(
    selectedStudentId || ""
  );

  const createMutation = useCreateStudent();
  const updateMutation = useUpdateStudent();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setStudentType("");
    setAccessMode("");
    setStatus("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedStudentId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedStudentId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: StudentFormValues) => {
    if (selectedStudentId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho học viên ${studentDetail?.data?.fullName || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedStudentId, data: values },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedStudentId(null);
            },
          }
        );
      }
    } else {
      // Create mode
      await createMutation.mutateAsync(values, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Học Viên"
        description="Tra cứu danh sách học viên, theo dõi trạng thái học tập và thông tin kết nối tài khoản."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm học viên
          </Button>
        }
      />

      <StudentFilters
        search={search}
        onSearchChange={handleSearchChange}
        studentType={studentType}
        onStudentTypeChange={handleStudentTypeChange}
        accessMode={accessMode}
        onAccessModeChange={handleAccessModeChange}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi trong quá trình tải dữ liệu học viên."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy học viên nào"
          description={
            search || studentType || accessMode || status
              ? "Không có học viên nào khớp với bộ lọc hiện tại. Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
              : "Hệ thống chưa có dữ liệu học viên nào."
          }
          actionLabel={search || studentType || accessMode || status ? "Xóa bộ lọc" : undefined}
          onAction={search || studentType || accessMode || status ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <StudentTable students={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} học viên
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

      {/* Reusable form modal */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedStudentId(null);
        }}
        title={selectedStudentId ? "Chỉnh sửa hồ sơ học viên" : "Thêm học viên mới"}
        description={
          selectedStudentId
            ? "Cập nhật thông tin chi tiết của học viên."
            : "Nhập thông tin cá nhân và thiết lập chế độ tài khoản cho học viên mới."
        }
        submitLabel={selectedStudentId ? "Cập nhật thông tin" : "Tạo học viên"}
        configs={studentFormConfig}
        validationSchema={studentSchema}
        initialValues={selectedStudentId ? studentDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedStudentId ? isLoadingDetail : false}
      />
    </div>
  );
}

