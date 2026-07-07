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

import { useCourses } from "@/features/courses/hooks/use-courses";
import {
  useCurriculums,
  useCurriculum,
  useCreateCurriculum,
  useUpdateCurriculum,
  CurriculumTable,
  createCurriculumFormConfig,
  curriculumSchema,
  type CurriculumFormValues,
} from "@/features/curriculums";

export default function CurriculumsPage() {
  const [search, setSearch] = React.useState("");
  const [courseId, setCourseId] = React.useState("");
  const [isActive, setIsActive] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCurriculumId, setSelectedCurriculumId] = React.useState<string | null>(null);

  const { data: coursesData } = useCourses({ limit: 1000 });

  const { data, isLoading, isError, error, refetch, isRefetching } = useCurriculums({
    page,
    limit,
    search: search || undefined,
    courseId: courseId || undefined,
    isActive: isActive === "" ? undefined : isActive === "true",
  });

  const { data: curriculumDetail, isLoading: isLoadingDetail } = useCurriculum(
    selectedCurriculumId || ""
  );

  const createMutation = useCreateCurriculum();
  const updateMutation = useUpdateCurriculum();
  const confirm = useConfirm();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseId(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCourseId("");
    setIsActive("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedCurriculumId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedCurriculumId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: CurriculumFormValues) => {
    const payload = {
      courseId: values.courseId,
      name: values.name.trim(),
      versionName: values.versionName.trim(),
      description: values.description ? values.description.trim() : null,
      isActive: values.isActive,
    };

    if (selectedCurriculumId) {
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho giáo trình ${curriculumDetail?.data?.name || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedCurriculumId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedCurriculumId(null);
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

  const courseOptions = React.useMemo(() => {
    return (
      coursesData?.data.map((c) => ({
        value: c.id,
        label: `${c.code} - ${c.name}`,
      })) || []
    );
  }, [coursesData]);

  const formConfigs = React.useMemo(() => {
    return createCurriculumFormConfig(courseOptions);
  }, [courseOptions]);

  const canCreate = hasPermission("curriculum:create");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Giáo trình (Curriculums)"
        description="Quản lý cấu trúc bài giảng, giáo án chi tiết và tài liệu học tập của các khóa học tại trung tâm."
        action={
          canCreate ? (
            <Button
              onClick={handleCreate}
              className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Tạo giáo trình
            </Button>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1 max-w-2xl">
          <SearchInput
            placeholder="Tìm tên giáo trình..."
            value={search}
            onChange={handleSearchChange}
            className="w-full sm:max-w-xs"
          />

          <select
            value={courseId}
            onChange={handleCourseChange}
            className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[200px]"
          >
            <option value="">Tất cả khóa học</option>
            {courseOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={isActive}
            onChange={(e) => {
              setIsActive(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[180px]"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Tạm ngưng</option>
          </select>
        </div>

        {(search || courseId || isActive) && (
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
          title="Không thể tải danh sách giáo trình"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy giáo trình nào"
          description={
            search || courseId || isActive
              ? "Không tìm thấy kết quả khớp với bộ lọc hiện tại."
              : "Hệ thống chưa có giáo trình nào."
          }
          actionLabel={search || courseId || isActive ? "Xóa bộ lọc" : undefined}
          onAction={search || courseId || isActive ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <CurriculumTable curriculums={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} giáo trình
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
          if (!open) setSelectedCurriculumId(null);
        }}
        title={selectedCurriculumId ? "Chỉnh sửa giáo trình" : "Tạo giáo trình mới"}
        description={
          selectedCurriculumId
            ? "Cập nhật thông tin chi tiết giáo trình."
            : "Nhập thông tin chi tiết giáo trình mới để tích hợp với giáo án các bài học."
        }
        submitLabel={selectedCurriculumId ? "Lưu thay đổi" : "Tạo giáo trình"}
        configs={formConfigs}
        validationSchema={curriculumSchema}
        initialValues={selectedCurriculumId ? curriculumDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedCurriculumId ? isLoadingDetail : false}
      />
    </div>
  );
}
