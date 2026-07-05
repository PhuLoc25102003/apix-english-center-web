"use client";

/**
 * src/features/students/components/student-form.tsx
 *
 * Reusable Student Form for both creating and editing student profiles.
 * Integrates with React Hook Form, Zod schema validation, and custom Select triggers.
 */

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, User, Calendar, Award, School } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentSchema, type StudentFormValues } from "../schemas/student.schema";
import type { Student } from "../types/student.type";

interface StudentFormProps {
  initialValues?: Partial<Student>;
  onSubmit: (values: StudentFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function StudentForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Lưu thông tin",
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      dateOfBirth: initialValues?.dateOfBirth ?? "",
      gender: initialValues?.gender ?? "",
      schoolName: initialValues?.schoolName ?? null,
      grade: initialValues?.grade ?? null,
      studentType: initialValues?.studentType ?? "CHILD",
      accessMode: initialValues?.accessMode ?? "PARENT_MANAGED",
      status: initialValues?.status ?? "ACTIVE",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl grid gap-6 md:grid-cols-2">
        {/* Section Title */}
        <div className="md:col-span-2 border-b border-slate-100 pb-3">
          <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
            <User className="h-5 w-5 text-[#FF161A]" />
            Thông tin cá nhân học viên
          </h3>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Họ và tên <span className="text-[#FF161A]">*</span>
          </label>
          <div className="relative">
            <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
              disabled={isSubmitting}
              aria-invalid={errors.fullName ? "true" : "false"}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.fullName.message}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="dateOfBirth" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Ngày sinh <span className="text-[#FF161A]">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              id="dateOfBirth"
              type="date"
              className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
              disabled={isSubmitting}
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
              {...register("dateOfBirth")}
            />
          </div>
          {errors.dateOfBirth && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.dateOfBirth.message}</span>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="gender" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Giới tính <span className="text-[#FF161A]">*</span>
          </label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val: string | null) => field.onChange(val || "")}
                disabled={isSubmitting}
              >
                <SelectTrigger id="gender" className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Nam</SelectItem>
                  <SelectItem value="FEMALE">Nữ</SelectItem>
                  <SelectItem value="OTHER">Khác</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.gender.message}</span>
          )}
        </div>

        {/* Student Type */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="studentType" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Loại học viên <span className="text-[#FF161A]">*</span>
          </label>
          <Controller
            control={control}
            name="studentType"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val: string | null) => field.onChange(val || "")}
                disabled={isSubmitting}
              >
                <SelectTrigger id="studentType" className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm">
                  <SelectValue placeholder="Chọn loại học viên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KINDERGARTEN">Mầm non (Kindergarten)</SelectItem>
                  <SelectItem value="CHILD">Tiểu học (Child)</SelectItem>
                  <SelectItem value="TEENAGER">Thiếu niên (Teenager)</SelectItem>
                  <SelectItem value="ADULT">Người lớn (Adult)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.studentType && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.studentType.message}</span>
          )}
        </div>

        {/* Section Title: Education & Access */}
        <div className="md:col-span-2 border-b border-slate-100 pb-3 mt-4">
          <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#FF161A]" />
            Trường học & Phân quyền truy cập
          </h3>
        </div>

        {/* School Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="schoolName" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Trường học
          </label>
          <Controller
            control={control}
            name="schoolName"
            render={({ field }) => (
              <div className="relative">
                <School className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="schoolName"
                  placeholder="Trường Tiểu học Nguyễn Huệ"
                  className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
                  disabled={isSubmitting}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.schoolName && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.schoolName.message}</span>
          )}
        </div>

        {/* Grade */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="grade" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Khối / Lớp
          </label>
          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <div className="relative">
                <Award className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="grade"
                  placeholder="Lớp 3A"
                  className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
                  disabled={isSubmitting}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.grade && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.grade.message}</span>
          )}
        </div>

        {/* Access Mode */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="accessMode" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Chế độ tài khoản <span className="text-[#FF161A]">*</span>
          </label>
          <Controller
            control={control}
            name="accessMode"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val: string | null) => field.onChange(val || "")}
                disabled={isSubmitting}
              >
                <SelectTrigger id="accessMode" className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm">
                  <SelectValue placeholder="Chọn chế độ tài khoản" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NO_ACCOUNT">Không có tài khoản</SelectItem>
                  <SelectItem value="PARENT_MANAGED">Phụ huynh quản lý</SelectItem>
                  <SelectItem value="OWN_ACCOUNT">Tài khoản riêng</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.accessMode && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.accessMode.message}</span>
          )}
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Trạng thái hoạt động <span className="text-[#FF161A]">*</span>
          </label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val: string | null) => field.onChange(val || "")}
                disabled={isSubmitting}
              >
                <SelectTrigger id="status" className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                  <SelectItem value="INACTIVE">Ngưng hoạt động</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.status.message}</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-6 h-10 shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer disabled:bg-[#9CA3AF]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
