"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import { z } from "zod";

const trialSchema = z.object({
  parentName: z.string().trim().min(2, "Vui lòng nhập tên phụ huynh."),
  phone: z.string().trim().regex(/^(0|\+84)[0-9]{9,10}$/, "Vui lòng nhập số điện thoại Việt Nam hợp lệ."),
  studentLevel: z.string().min(1, "Vui lòng chọn độ tuổi hoặc khối lớp của học sinh."),
  program: z.string().min(1, "Vui lòng chọn chương trình quan tâm."),
  contactMethod: z.string().min(1),
  message: z.string().max(500, "Nội dung tối đa 500 ký tự.").optional(),
});

type TrialFormValues = z.infer<typeof trialSchema>;

export function TrialClassForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TrialFormValues>({
    resolver: zodResolver(trialSchema),
    defaultValues: { parentName: "", phone: "", studentLevel: "", program: "", contactMethod: "zalo", message: "" },
  });

  const onSubmit = async () => {
    await Promise.resolve();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center rounded-[30px] border border-green-200 bg-white/85 p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-green-600" />
        <h3 className="mt-5 font-display text-2xl font-bold text-[#111318]">Đã ghi nhận thông tin</h3>
        <p className="mt-3 max-w-md leading-7 text-[#5B6472]">Cảm ơn phụ huynh. APIX sẽ liên hệ để tư vấn lớp học phù hợp cho con trong thời gian sớm nhất.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-6 rounded-full border border-red-200 px-5 py-2.5 text-sm font-bold text-[#C90012]">Gửi thông tin khác</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tên phụ huynh" error={errors.parentName?.message}><input {...register("parentName")} className="apix-form-control" placeholder="Nguyễn Văn A" autoComplete="name" /></Field>
        <Field label="Số điện thoại" error={errors.phone?.message}><input {...register("phone")} className="apix-form-control" placeholder="09xx xxx xxx" inputMode="tel" autoComplete="tel" /></Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Độ tuổi / khối lớp" error={errors.studentLevel?.message}><select {...register("studentLevel")} className="apix-form-control"><option value="">Chọn thông tin</option><option>Mầm non (4–6 tuổi)</option><option>Tiểu học (lớp 1–5)</option><option>THCS (lớp 6–9)</option><option>Khác</option></select></Field>
        <Field label="Chương trình quan tâm" error={errors.program?.message}><select {...register("program")} className="apix-form-control"><option value="">Chọn chương trình</option><option>Tiếng Anh Mầm non</option><option>Tiếng Anh Tiểu học</option><option>Tiếng Anh THCS</option><option>Tăng cường Giao tiếp</option><option>Ngữ pháp & Hỗ trợ ở trường</option><option>Nền tảng Luyện thi</option></select></Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-bold text-[#374151]">Phương thức liên hệ mong muốn</legend>
        <div className="flex flex-wrap gap-3">
          {[{ value: "zalo", label: "Zalo" }, { value: "phone", label: "Điện thoại" }, { value: "message", label: "Tin nhắn" }].map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-full border border-red-100 bg-white/75 px-4 py-2.5 text-sm font-semibold text-[#4B5563]"><input type="radio" value={option.value} {...register("contactMethod")} className="accent-[#FF161A]" />{option.label}</label>)}
        </div>
      </fieldset>
      <Field label="Lời nhắn thêm (không bắt buộc)" error={errors.message?.message}><textarea {...register("message")} className="apix-form-control min-h-24 resize-y" placeholder="Khung giờ thuận tiện để APIX liên hệ..." /></Field>
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF161A] to-[#B80012] px-7 py-3 font-bold text-white shadow-xl shadow-red-500/25 transition-transform hover:-translate-y-0.5 disabled:opacity-60">Gửi đăng ký tư vấn <Send className="h-4 w-4" /></button>
      <p className="text-center text-xs leading-5 text-[#6B7280]">Thông tin chỉ được dùng để APIX tư vấn lớp học phù hợp.</p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="grid gap-2 text-sm font-bold text-[#374151]">{label}{children}{error && <span className="text-xs font-semibold text-red-600">{error}</span>}</label>;
}
