"use client";

import * as React from "react";

import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useCampuses } from "@/features/campuses";
import { useCourses } from "@/features/courses";
import { createClassFormConfig } from "../configs/class-form.config";
import { classSchema, type ClassFormValues } from "../schemas/class.schema";
import type { ClassRecord } from "../types/class.type";

interface ClassFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  classItem?: ClassRecord;
  onSubmit: (values: ClassFormValues) => Promise<void>;
  isLoadingDetails?: boolean;
  detailsError?: string;
  onRetryDetails?: () => void;
}

export function ClassForm({
  open,
  onOpenChange,
  isEdit,
  classItem,
  onSubmit,
  isLoadingDetails = false,
  detailsError,
  onRetryDetails,
}: ClassFormProps) {
  const coursesQuery = useCourses({ page: 1, limit: 1000 });
  const campusesQuery = useCampuses({ page: 1, limit: 1000 });
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
  const configs = React.useMemo(
    () => createClassFormConfig(courseOptions, campusOptions),
    [campusOptions, courseOptions],
  );
  const optionsError =
    coursesQuery.error?.message || campusesQuery.error?.message;

  return (
    <CrudFormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
      description={
        isEdit
          ? `Cập nhật thông tin lớp ${classItem?.classCode || ""}. Mã lớp do hệ thống quản lý.`
          : "Thiết lập lớp học mới. Mã lớp sẽ được hệ thống tự động tạo."
      }
      submitLabel={isEdit ? "Lưu thay đổi" : "Thêm lớp học"}
      configs={configs}
      validationSchema={classSchema}
      initialValues={classItem}
      onSubmit={onSubmit}
      isLoadingDetails={
        isLoadingDetails || coursesQuery.isLoading || campusesQuery.isLoading
      }
      detailsError={detailsError || optionsError}
      onRetryDetails={() => {
        if (detailsError) onRetryDetails?.();
        if (coursesQuery.isError) void coursesQuery.refetch();
        if (campusesQuery.isError) void campusesQuery.refetch();
      }}
    />
  );
}
