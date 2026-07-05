import * as React from "react";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-svh w-full bg-[#F8FAFC]">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Topbar/Header */}
        <Topbar />

        {/* Dynamic page content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
