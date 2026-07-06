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
import { hasPermission } from "@/lib/permissions/has-permission";

import { useClasses } from "@/features/classes/hooks/use-classes";
import { useStudents } from "@/features/students/hooks/use-students";
import {
  useEnrollments,
  useCreateEnrollment,
  useUpdateEnrollment,
  EnrollmentTable,
  createEnrollmentFormConfig,
  enrollmentSchema,
  type CreateEnrollmentDto,
  type UpdateEnrollmentDto,
  type Enrollment,
} from "@/features/enrollments";

export default function EnrollmentsPage() {
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingEnrollment, setEditingEnrollment] = React.useState<Enrollment | null>(null);

  // Fetch classes and students for selects and filter dropdowns
  const { data: classesData } = useClasses({ limit: 1000 });
  const { data: studentsData } = useStudents({ limit: 1000 });

  const { data, isLoading, isError, error, refetch, isRefetching } = useEnrollments({
    page,
    limit,
    search: search || undefined,
    classId: classId || undefined,
  });

  const createMutation = useCreateEnrollment();
  const updateMutation = useUpdateEnrollment();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassId(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setClassId("");
    setPage(1);
  };

  const handleCreate = () => {
    setEditingEnrollment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (enrollment: Enrollment) => {
    setEditingEnrollment(enrollment);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    if (editingEnrollment) {
      const payload: UpdateEnrollmentDto = {
        enrolledDate: values.enrolledDate,
        startDate: values.startDate,
        endDate: values.endDate || null,
        status: values.status,
        source: values.source,
        note: values.note?.trim() || null,
      };
      await updateMutation.mutateAsync({ id: editingEnrollment.id, data: payload });
    } else {
      const payload: CreateEnrollmentDto = {
        studentId: values.studentId,
        classId: values.classId,
        enrolledDate: values.enrolledDate,
        startDate: values.startDate,
        status: values.status,
        source: values.source,
        note: values.note?.trim() || null,
      };
      await createMutation.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const studentOptions = React.useMemo(() => {
    return (
      studentsData?.data.map((student) => ({
        value: student.id,
        label: `${student.studentCode} - ${student.fullName}`,
      })) || []
    );
  }, [studentsData]);

  const classOptions = React.useMemo(() => {
    return (
      classesData?.data.map((cls) => ({
        value: cls.id,
        label: `${cls.classCode} - ${cls.name}`,
      })) || []
    );
  }, [classesData]);

  const formConfigs = React.useMemo(() => {
    return createEnrollmentFormConfig(studentOptions, classOptions, editingEnrollment !== null);
  }, [studentOptions, classOptions, editingEnrollment]);

  const canCreate = hasPermission("enrollment:create");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Ghi danh (Enrollments)"
        description="Quản lý hồ sơ đăng ký ghi danh, học thử, tạm dừng và chuyển đổi lớp học của học viên."
        action={
          canCreate ? (
            <Button
              onClick={handleCreate}
              className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Ghi danh học viên
            </Button>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1 max-w-2xl">
          <SearchInput
            placeholder="Tìm kiếm mã, học viên..."
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
        </div>

        {(search || classId) && (
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
          title="Không thể tải danh sách ghi danh"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy bản ghi danh nào"
          description={
            search || classId
              ? "Không có dữ liệu khớp với bộ lọc hiện tại. Hãy thử lại."
              : "Hệ thống chưa có dữ liệu ghi danh học viên."
          }
          actionLabel={search || classId ? "Xóa bộ lọc" : undefined}
          onAction={search || classId ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <EnrollmentTable enrollments={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} ghi danh
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

      {/* Ghi danh modal form */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingEnrollment ? "Cập nhật ghi danh" : "Ghi danh học viên mới"}
        description="Đăng ký cho học viên ghi danh vào lớp học chính thức hoặc học thử."
        submitLabel={editingEnrollment ? "Lưu thay đổi" : "Ghi danh học"}
        configs={formConfigs}
        validationSchema={enrollmentSchema}
        initialValues={editingEnrollment ?? undefined}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
