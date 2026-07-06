"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Users, GraduationCap, ClipboardCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOwnerDashboard } from "../hooks/use-dashboard";

export function OwnerDashboard() {
  const [filter, setFilter] = React.useState("month");
  const { data, isLoading } = useOwnerDashboard(filter);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
      </div>
    );
  }

  const { metrics, revenueByMonth, invoiceStatus, attendanceTrend, studentGrowth } = data;

  const metricIcons: Record<string, any> = {
    activeStudents: Users,
    activeClasses: GraduationCap,
    newEnrollments: TrendingUp,
    tuitionRevenue: ClipboardCheck,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Date Filter selector */}
      <div className="flex justify-end gap-2">
        {["day", "week", "month", "year"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer",
              filter === t
                ? "bg-[#FF161A] text-white shadow-md shadow-[#FF161A]/10"
                : "bg-white/60 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/50"
            )}
          >
            {t === "day" ? "Hôm nay" : t === "week" ? "Tuần" : t === "month" ? "Tháng" : "Năm"}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(metrics).map(([key, item]) => {
          const Icon = metricIcons[key] || Users;
          return (
            <div key={key} className="glass-card p-6 flex items-start justify-between border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {item.title}
                </span>
                <span className="font-display text-2xl font-black text-slate-900">
                  {item.value}
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    item.isPositive ? "text-emerald-600" : "text-[#C90012]"
                  )}
                >
                  {item.change}
                </span>
              </div>
              <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Rows */}
      {isMounted && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart */}
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Doanh thu theo tháng
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueByMonth}>
                  <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip formatter={(v: any) => [`${(v / 1000000).toFixed(1)}M ₫`, "Doanh thu"]} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#C90012"
                    strokeWidth={3}
                    dot={{ fill: "#C90012", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Invoice Status pie chart */}
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Tỷ lệ trạng thái hóa đơn
            </h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invoiceStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {invoiceStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, "Tỷ lệ"]} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attendance Rate line chart */}
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Tỷ lệ chuyên cần trong tuần
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrend}>
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[80, 100]} />
                  <Tooltip formatter={(v) => [`${v}%`, "Điểm danh"]} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#111827"
                    strokeWidth={2}
                    dot={{ fill: "#111827", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student growth bar chart */}
          <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
            <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Tăng trưởng học viên hoạt động
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentGrowth}>
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#C90012" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
