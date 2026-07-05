"use client";

/**
 * src/features/parents/components/parent-form.tsx
 *
 * Reusable Parent Form for both creating and editing parent profiles.
 * Integrates React Hook Form, Zod validation, and controlled inputs.
 */

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, User, Phone, Mail, MapPin, Briefcase, FileText } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parentSchema, type ParentFormValues } from "../schemas/parent.schema";
import type { Parent } from "../types/parent.type";

interface ParentFormProps {
  initialValues?: Partial<Parent>;
  onSubmit: (values: ParentFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ParentForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Lưu thông tin",
}: ParentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      fullName: initialValues?.fullName ?? "",
      phone: initialValues?.phone ?? "",
      email: initialValues?.email ?? "",
      address: initialValues?.address ?? null,
      jobTitle: initialValues?.jobTitle ?? null,
      note: initialValues?.note ?? null,
    },
  });

  // Intercept submit to clean up empty email string to null
  const handleFormSubmit = (data: ParentFormValues) => {
    onSubmit({
      ...data,
      email: data.email ? data.email.trim() : null,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl grid gap-6 md:grid-cols-2">
        {/* Section Title */}
        <div className="md:col-span-2 border-b border-slate-100 pb-3">
          <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
            <User className="h-5 w-5 text-[#FF161A]" />
            Thông tin phụ huynh
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

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Số điện thoại <span className="text-[#FF161A]">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="phone"
              placeholder="09xxxxxxxx"
              type="tel"
              className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
              disabled={isSubmitting}
              aria-invalid={errors.phone ? "true" : "false"}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.phone.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Địa chỉ Email
          </label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  placeholder="parent@example.com"
                  type="email"
                  className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
                  disabled={isSubmitting}
                  aria-invalid={errors.email ? "true" : "false"}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.email && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.email.message}</span>
          )}
        </div>

        {/* Job Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="jobTitle" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Nghề nghiệp
          </label>
          <Controller
            control={control}
            name="jobTitle"
            render={({ field }) => (
              <div className="relative">
                <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="jobTitle"
                  placeholder="Kỹ sư, Giáo viên, Kinh doanh..."
                  className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
                  disabled={isSubmitting}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.jobTitle && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.jobTitle.message}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Địa chỉ thường trú
          </label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="address"
                  placeholder="Số 123 Đường ABC, Quận XYZ, TP..."
                  className="pl-9 h-10 bg-white/60 focus:bg-white border-border/60"
                  disabled={isSubmitting}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.address && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.address.message}</span>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="note" className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Ghi chú thêm
          </label>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <div className="relative">
                <FileText className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                <Textarea
                  id="note"
                  placeholder="Thông tin liên hệ phụ, thời gian liên lạc phù hợp..."
                  className="pl-9 min-h-24 bg-white/60 focus:bg-white border-border/60 resize-y"
                  disabled={isSubmitting}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </div>
            )}
          />
          {errors.note && (
            <span className="text-xs font-semibold text-[#C90012]">{errors.note.message}</span>
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
