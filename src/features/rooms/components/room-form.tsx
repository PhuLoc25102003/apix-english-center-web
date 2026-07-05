"use client";

import * as React from "react";

import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useCampuses } from "@/features/campuses";
import { createRoomFormConfig } from "../configs/room-form.config";
import { roomSchema, type RoomFormValues } from "../schemas/room.schema";
import type { Room } from "../types/room.type";

interface RoomFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit: boolean;
  room?: Room;
  onSubmit: (values: RoomFormValues) => Promise<void>;
  isLoadingDetails?: boolean;
  detailsError?: string;
  onRetryDetails?: () => void;
}

export function RoomForm({
  open,
  onOpenChange,
  isEdit,
  room,
  onSubmit,
  isLoadingDetails = false,
  detailsError,
  onRetryDetails,
}: RoomFormProps) {
  const campusesQuery = useCampuses({ page: 1, limit: 1000 });
  const campusOptions = React.useMemo(
    () =>
      (campusesQuery.data?.data ?? []).map((campus) => ({
        value: campus.id,
        label: campus.name,
      })),
    [campusesQuery.data],
  );
  const configs = React.useMemo(
    () => createRoomFormConfig(campusOptions),
    [campusOptions],
  );

  return (
    <CrudFormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa phòng học" : "Thêm phòng học mới"}
      description={
        isEdit
          ? "Cập nhật thông tin và cơ sở vật chất của phòng học."
          : "Nhập thông tin để tạo một phòng học mới tại cơ sở đã chọn."
      }
      submitLabel={isEdit ? "Lưu thay đổi" : "Thêm phòng học"}
      configs={configs}
      validationSchema={roomSchema}
      initialValues={room}
      onSubmit={onSubmit}
      isLoadingDetails={isLoadingDetails || campusesQuery.isLoading}
      detailsError={detailsError}
      onRetryDetails={onRetryDetails}
    />
  );
}
