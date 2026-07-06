"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Search, Award } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useScoreItems, useCreateScoreItem } from "@/features/scores/hooks/use-scores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const scoreItemSchema = z.object({
  classId: z.string().min(1, "Vui lòng chọn lớp học"),
  title: z.string().min(1, "Vui lòng nhập tên cột điểm"),
  scoreDate: z.string().optional(),
  maxScore: z.coerce.number().positive("Điểm tối đa phải lớn hơn 0").default(10),
  description: z.string().optional(),
});

type ScoreItemFormValues = z.infer<typeof scoreItemSchema>;

export default function ScoresPage() {
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const classesQuery = useClasses({ limit: 100 });
  const classes = classesQuery.data?.data ?? [];

  const { data, isLoading, isError, refetch } = useScoreItems({
    classId: classId || undefined,
  });

  const createMutation = useCreateScoreItem();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ScoreItemFormValues>({
    defaultValues: {
      classId: "",
      title: "",
      scoreDate: "",
      maxScore: 10,
      description: "",
    },
  });

  const handleFormSubmit = async (values: ScoreItemFormValues) => {
    await createMutation.mutateAsync(values, {
      onSuccess: () => {
        setIsModalOpen(false);
        reset();
        refetch();
      },
    });
  };

  const statusLabelVietnamese: Record<string, string> = {
    DRAFT: "Bản nháp",
    PUBLISHED: "Đã công bố",
    LOCKED: "Đã khóa",
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý điểm số"
        description="Định nghĩa các đầu điểm, cập nhật kết quả thi cử & kiểm tra của học viên theo lớp."
        action={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm cột điểm mới
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-3 max-w-xs">
          <Input
            placeholder="Tìm kiếm cột điểm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-xl bg-white/60 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="h-9 rounded-xl bg-white/60 border border-slate-200 text-xs font-semibold px-3 text-slate-700 cursor-pointer"
          >
            <option value="">Tất cả lớp học</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.classCode} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Score Items Table */}
      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />
      ) : !data || data.data.length === 0 ? (
        <EmptyState title="Không tìm thấy cột điểm nào" />
      ) : (
        <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Lớp học</TableHead>
                <TableHead>Đầu điểm / Mô tả</TableHead>
                <TableHead>Ngày kiểm tra</TableHead>
                <TableHead>Điểm tối đa</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold text-slate-900">
                    <span className="block">{item.className}</span>
                    <span className="block text-[10px] font-mono text-slate-500 mt-0.5">{item.classCode}</span>
                  </TableCell>
                  <TableCell>
                    <span className="block font-semibold text-slate-900">{item.title}</span>
                    {item.description && <span className="block text-[10px] text-slate-500 mt-0.5">{item.description}</span>}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">{item.scoreDate || "-"}</TableCell>
                  <TableCell className="font-bold text-slate-800">{item.maxScore}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} customLabel={statusLabelVietnamese[item.status]} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/scores/${item.id}`}
                      className="inline-flex h-8 items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                    >
                      Nhập điểm số
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">Tạo cột điểm mới</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Lớp học</label>
              <select
                {...register("classId")}
                className="h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold px-3 text-slate-800 outline-none"
              >
                <option value="">-- Chọn lớp học --</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.classCode} - {c.name}
                  </option>
                ))}
              </select>
              {errors.classId && <span className="text-[10px] font-bold text-[#C90012]">{errors.classId.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Tên cột điểm</label>
              <Input placeholder="Ví dụ: Kiểm tra 15 phút Unit 2" {...register("title")} className="h-10 rounded-xl bg-slate-50" />
              {errors.title && <span className="text-[10px] font-bold text-[#C90012]">{errors.title.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Ngày kiểm tra</label>
                <Input type="date" {...register("scoreDate")} className="h-10 rounded-xl bg-slate-50" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Điểm tối đa</label>
                <Input type="number" {...register("maxScore")} className="h-10 rounded-xl bg-slate-50" />
                {errors.maxScore && <span className="text-[10px] font-bold text-[#C90012]">{errors.maxScore.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Mô tả chi tiết</label>
              <Input placeholder="Speaking, Writing check..." {...register("description")} className="h-10 rounded-xl bg-slate-50" />
            </div>

            <div className="flex justify-end gap-2.5 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" disabled={createMutation.isPending} className="bg-[#FF161A] text-white hover:bg-[#C90012] rounded-xl cursor-pointer">
                Tạo cột điểm
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
