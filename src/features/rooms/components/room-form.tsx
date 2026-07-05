"use client";

import * as React from "react";

import type { InputOption } from "@/components/forms/form-input-renderer";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { createRoomFormConfig } from "../configs/room-form.config";
import { roomSchema, type RoomFormValues } from "../schemas/room.schema";
import type { Room } from "../types/room.type";

interface RoomFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room?: Room;
  campusOptions: InputOption[];
  onSubmit: (values: RoomFormValues) => Promise<void>;
  isLoadingDetails?: boolean;
}

export function RoomForm({
  open,
  onOpenChange,
  room,
  campusOptions,
  onSubmit,
  isLoadingDetails = false,
}: RoomFormProps) {
  const configs = React.useMemo(
    () => createRoomFormConfig(campusOptions),
    [campusOptions],
  );

  return (
    <CrudFormModal
      open={open}
      onOpenChange={onOpenChange}
      title={room ? "Chỉnh sửa phòng học" : "Thêm phòng học mới"}
      description={
        room
          ? "Cập nhật thông tin và cơ sở vật chất của phòng học."
          : "Nhập thông tin để tạo một phòng học mới tại cơ sở đã chọn."
      }
      submitLabel={room ? "Lưu thay đổi" : "Thêm phòng học"}
      configs={configs}
      validationSchema={roomSchema}
      initialValues={room}
      onSubmit={onSubmit}
      isLoadingDetails={isLoadingDetails}
    />
  );
}
