import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | APIX English Center",
  description: "Dashboard overview for APIX English Center.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827]">
          Center Overview
        </h1>
        <p className="text-sm text-[#6B7280]">
          Welcome to the APIX English Center Management System. Here is a summary of activities.
        </p>
      </div>

      {/* Metrics Grid Placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="glass-card p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            Total Students
          </span>
          <span className="font-display text-3xl font-bold text-[#111827]">
            128
          </span>
          <span className="text-xs font-medium text-emerald-600">
            ▲ +12% this month
          </span>
        </div>

        {/* Metric 2 */}
        <div className="glass-card p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            Active Classes
          </span>
          <span className="font-display text-3xl font-bold text-[#111827]">
            14
          </span>
          <span className="text-xs font-medium text-emerald-600">
            ▲ +2 new this week
          </span>
        </div>

        {/* Metric 3 */}
        <div className="glass-card p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            Attendance Today
          </span>
          <span className="font-display text-3xl font-bold text-[#111827]">
            94.2%
          </span>
          <span className="text-xs font-medium text-emerald-600">
            ▲ +1.5% compared to yesterday
          </span>
        </div>

        {/* Metric 4 */}
        <div className="glass-card p-6 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            Pending Invoice Value
          </span>
          <span className="font-display text-3xl font-bold text-[#111827]">
            42M ₫
          </span>
          <span className="text-xs font-medium text-[#C90012]">
            ▼ -8% compared to last period
          </span>
        </div>
      </div>

      {/* Placeholder Details Area */}
      <div className="glass-card p-6">
        <h2 className="font-display text-lg font-bold text-[#111827] mb-4">
          Recent Registrations
        </h2>
        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-border bg-[#F8FAFC]">
          <span className="text-sm font-medium text-[#6B7280]">
            Student list implementation coming in Phase 4
          </span>
        </div>
      </div>
    </div>
  );
}
