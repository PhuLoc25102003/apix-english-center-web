import * as React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full bg-[#F8FAFC]">
      {/* ── Sidebar ── */}
      <aside className="glass-sidebar fixed bottom-0 top-0 left-0 hidden w-64 flex-col p-6 lg:flex">
        {/* Sidebar Header / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-apix-gradient shadow-md shadow-[#FF161A]/10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 4L40 38H4L22 4Z" fill="white" fillOpacity="0.95" />
              <path
                d="M14 28H30"
                stroke="#FF161A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-[#111827]">
              APIX
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#6B7280] uppercase">
              English Center
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/10 to-transparent" />

        {/* Sidebar Nav Items Placeholder */}
        <nav className="flex flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-3 rounded-lg bg-[#FFE8EA] px-3 py-2 text-sm font-semibold text-[#C90012]">
            <span className="h-2 w-2 rounded-full bg-[#FF161A]" />
            Dashboard
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] opacity-60">
            <span className="h-2 w-2 rounded-full bg-transparent" />
            Students
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] opacity-60">
            <span className="h-2 w-2 rounded-full bg-transparent" />
            Classes
          </div>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] opacity-60">
            <span className="h-2 w-2 rounded-full bg-transparent" />
            Tuition
          </div>
        </nav>

        {/* User profile section */}
        <div className="mt-auto flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#E5E7EB] flex items-center justify-center font-semibold text-xs text-[#4B5563]">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#111827]">John Doe</span>
            <span className="text-[10px] text-[#6B7280]">Staff</span>
          </div>
        </div>
      </aside>

      {/* ── Main content wrapper ── */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Topbar Header */}
        <header className="glass-header sticky top-0 z-40 flex h-16 w-full items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#6B7280]">Pages</span>
            <span className="text-sm font-medium text-[#9CA3AF]">/</span>
            <span className="text-sm font-semibold text-[#111827]">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xs text-[#6B7280] cursor-pointer">
              🔔
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
