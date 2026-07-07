"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useEmployees } from "@/features/employees/hooks/use-employees";
import { videoDeliveryStatuses, videoDeliveryTypes, type VideoDeliveryFilters as Filters } from "../types/video-delivery.type";

const label = (value: string) => value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
export function VideoDeliveryFilters({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  const classes = useClasses({ page: 1, limit: 200 }); const employees = useEmployees({ page: 1, limit: 200 });
  const update = (key: keyof Filters, value: string) => onChange({ ...filters, page: 1, [key]: value || undefined });
  const selectClass = "h-10 rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-700 outline-none focus:border-[#FF161A]";
  return <div className="glass-card grid gap-3 rounded-2xl border border-white/60 p-4 md:grid-cols-2 xl:grid-cols-4">
    <label className="relative xl:col-span-2"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input aria-label="Search deliveries" value={filters.search ?? ""} onChange={(event) => update("search", event.target.value)} placeholder="Search student, parent, phone or title" className="pl-9" /></label>
    <select aria-label="Class" className={selectClass} value={filters.classId ?? ""} onChange={(event) => update("classId", event.target.value)}><option value="">All classes</option>{classes.data?.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
    <select aria-label="Video type" className={selectClass} value={filters.videoType ?? ""} onChange={(event) => update("videoType", event.target.value)}><option value="">All video types</option>{videoDeliveryTypes.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select>
    <Input aria-label="Target month" type="month" value={filters.targetMonth ?? ""} onChange={(event) => update("targetMonth", event.target.value)} />
    <select aria-label="Status" className={selectClass} value={filters.status ?? ""} onChange={(event) => update("status", event.target.value)}><option value="">All statuses</option>{videoDeliveryStatuses.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select>
    <select aria-label="Assigned employee" className={selectClass} value={filters.assignedToEmployeeId ?? ""} onChange={(event) => update("assignedToEmployeeId", event.target.value)}><option value="">All assignees</option>{employees.data?.data.map((item) => <option key={item.id} value={item.id}>{item.fullName}</option>)}</select>
    <div className="flex gap-2"><select aria-label="Sent by employee" className={`${selectClass} min-w-0 flex-1`} value={filters.sentByEmployeeId ?? ""} onChange={(event) => update("sentByEmployeeId", event.target.value)}><option value="">Sent by anyone</option>{employees.data?.data.map((item) => <option key={item.id} value={item.id}>{item.fullName}</option>)}</select><Button variant="outline" size="icon" aria-label="Clear filters" onClick={() => onChange({ page: 1, limit: filters.limit ?? 20 })}><X className="h-4 w-4" /></Button></div>
  </div>;
}

