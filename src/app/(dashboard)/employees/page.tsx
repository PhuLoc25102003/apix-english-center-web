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

import { useCampuses } from "@/features/campuses/hooks/use-campuses";
import { usePositions } from "@/features/positions/hooks/use-positions";
import {
  useEmployees,
  useEmployee,
  useCreateEmployee,
  useUpdateEmployee,
  EmployeeTable,
  createEmployeeFormConfig,
  employeeSchema,
  type EmployeeFormValues,
} from "@/features/employees";

export default function EmployeesPage() {
  const [search, setSearch] = React.useState("");
  const [campusId, setCampusId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<string | null>(null);

  const { data: campusesData } = useCampuses({ limit: 1000 });
  const { data: positionsData } = usePositions({ limit: 1000 });

  const { data, isLoading, isError, error, refetch, isRefetching } = useEmployees({
    page,
    limit,
    search: search || undefined,
    campusId: campusId || undefined,
  });

  const { data: employeeDetail, isLoading: isLoadingDetail } = useEmployee(
    selectedEmployeeId || ""
  );

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const confirm = useConfirm();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCampusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCampusId(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCampusId("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedEmployeeId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedEmployeeId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: EmployeeFormValues) => {
    const payload = {
      employeeCode: values.employeeCode.toUpperCase().trim(),
      fullName: values.fullName.trim(),
      userId: values.userId || null,
      employmentStatus: values.employmentStatus,
      dateOfBirth: values.dateOfBirth || null,
      gender: values.gender || null,
      address: values.address ? values.address.trim() : null,
      emergencyContactName: values.emergencyContactName ? values.emergencyContactName.trim() : null,
      emergencyContactPhone: values.emergencyContactPhone ? values.emergencyContactPhone.trim() : null,
      hiredDate: values.hiredDate,
      resignedDate: values.resignedDate || null,
      campusId: values.campusId || null,
      note: values.note ? values.note.trim() : null,
      positionIds: values.positionIds || [],
    };

    if (selectedEmployeeId) {
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho nhân sự ${employeeDetail?.data?.fullName || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedEmployeeId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedEmployeeId(null);
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

  const campusOptions = React.useMemo(() => {
    return (
      campusesData?.data.map((c) => ({
        value: c.id,
        label: c.name,
      })) || []
    );
  }, [campusesData]);

  const positionOptions = React.useMemo(() => {
    return (
      positionsData?.data.map((p) => ({
        value: p.id,
        label: p.name,
      })) || []
    );
  }, [positionsData]);

  const formConfigs = React.useMemo(() => {
    return createEmployeeFormConfig(campusOptions, positionOptions);
  }, [campusOptions, positionOptions]);

  const canCreate = hasPermission("employee:create");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Nhân Sự (Employees)"
        description="Quản lý thông tin hồ sơ nhân sự, giáo viên, trợ giảng và phân bổ chức vụ, cơ sở làm việc."
        action={
          canCreate ? (
            <Button
              onClick={handleCreate}
              className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Thêm nhân sự
            </Button>
          ) : null
        }
      />

      <div className="flex flex-wrap gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1 max-w-2xl">
          <SearchInput
            placeholder="Tìm theo mã hoặc tên nhân sự..."
            value={search}
            onChange={handleSearchChange}
            className="w-full sm:max-w-xs"
          />

          <select
            value={campusId}
            onChange={handleCampusChange}
            className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[200px]"
          >
            <option value="">Tất cả cơ sở</option>
            {campusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {(search || campusId) && (
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
          title="Không thể tải danh sách nhân sự"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy nhân sự nào"
          description={
            search || campusId
              ? "Không có nhân sự nào khớp với bộ lọc tìm kiếm hiện tại."
              : "Hệ thống chưa có hồ sơ nhân sự nào."
          }
          actionLabel={search || campusId ? "Xóa bộ lọc" : undefined}
          onAction={search || campusId ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <EmployeeTable employees={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} nhân sự
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
          if (!open) setSelectedEmployeeId(null);
        }}
        title={selectedEmployeeId ? "Chỉnh sửa nhân sự" : "Thêm nhân sự mới"}
        description={
          selectedEmployeeId
            ? "Cập nhật thông tin chi tiết hồ sơ nhân viên."
            : "Nhập thông tin chi tiết nhân sự mới để thực hiện phân quyền và các luồng nghiệp vụ."
        }
        submitLabel={selectedEmployeeId ? "Cập nhật thông tin" : "Thêm nhân sự"}
        configs={formConfigs}
        validationSchema={employeeSchema}
        initialValues={selectedEmployeeId ? employeeDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedEmployeeId ? isLoadingDetail : false}
      />
    </div>
  );
}
