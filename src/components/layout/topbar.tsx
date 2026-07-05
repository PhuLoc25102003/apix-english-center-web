"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

import { MobileSidebar } from "./mobile-sidebar";
import { UserMenu } from "./user-menu";

export function Topbar() {
  const pathname = usePathname();

  // Simple path to Title mapping helper
  const getPageTitle = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return "Home";
    
    // Capitalise and clean up the page title segment
    const segment = parts[parts.length - 1];
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="glass-header sticky top-0 z-40 flex h-16 w-full items-center justify-between px-6">
      {/* Left section: Hamburger on mobile, breadcrumb/title on desktop */}
      <div className="flex items-center gap-4">
        <MobileSidebar />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#6B7280]">Pages</span>
          <span className="text-sm font-medium text-[#9CA3AF]">/</span>
          <span className="text-sm font-semibold text-[#111827]">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right section: notifications, profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white/60 text-[#6B7280] shadow-xs backdrop-blur-xs transition-colors hover:bg-white hover:text-[#111827] outline-none cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-border" />

        {/* User Menu Dropdown */}
        <UserMenu />
      </div>
    </header>
  );
}
