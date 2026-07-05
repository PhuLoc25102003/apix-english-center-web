"use client";

import * as React from "react";

import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useLevels } from "@/features/levels";
import { createCourseFormConfig } from "../configs/course-form.config";
import { courseSchema, type CourseFormValues } from "../schemas/course.schema";
import type { Course } from "../types/course.type";

interface CourseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  course?: Course;
  onSubmit: (values: CourseFormValues) => Promise<void>;
  isLoadingDetails?: boolean;
  detailsError?: string;
  onRetryDetails?: () => void;
}

export function CourseForm({
  open,
  onOpenChange,
  isEdit,
  course,
  onSubmit,
  isLoadingDetails = false,
  detailsError,
  onRetryDetails,
}: CourseFormProps) {
  const levelsQuery = useLevels({ page: 1, limit: 1000 });
  const levelOptions = React.useMemo(
    () =>
      [...(levelsQuery.data?.data ?? [])]
        .sort((left, right) => left.orderIndex - right.orderIndex)
        .map((level) => ({
          value: level.id,
          label: level.isActive ? level.name : `${level.name} (ngừng hoạt động)`,
        })),
    [levelsQuery.data],
  );
  const configs = React.useMemo(
    () => createCourseFormConfig(levelOptions),
    [levelOptions],
  );
  const levelError = levelsQuery.error?.message;

  return (
    <CrudFormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
      description={
        isEdit
          ? "Cập nhật chương trình, thời lượng và học phí của khóa học."
          : "Thiết lập khóa học mới theo cấp độ đào tạo của APIX."
      }
      submitLabel={isEdit ? "Lưu thay đổi" : "Thêm khóa học"}
      configs={configs}
      validationSchema={courseSchema}
      initialValues={course}
      onSubmit={onSubmit}
      isLoadingDetails={isLoadingDetails || levelsQuery.isLoading}
      detailsError={detailsError || levelError}
      onRetryDetails={() => {
        if (detailsError) onRetryDetails?.();
        if (levelError) void levelsQuery.refetch();
      }}
    />
  );
}
