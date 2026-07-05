"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  DoorOpen,
  BookOpen,
  GraduationCap,
  ClipboardList,
  CalendarCheck2,
  CreditCard,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/students", icon: Users },
  { title: "Parents", href: "/parents", icon: UserCheck },
  { title: "Campuses", href: "/campuses", icon: Building2 },
  { title: "Rooms", href: "/rooms", icon: DoorOpen },
  { title: "Courses", href: "/courses", icon: BookOpen },
  { title: "Classes", href: "/classes", icon: GraduationCap },
  { title: "Enrollments", href: "/enrollments", icon: ClipboardList },
  { title: "Attendance", href: "/attendance", icon: CalendarCheck2 },
  { title: "Tuition", href: "/tuition", icon: CreditCard },
  { title: "Settings", href: "/settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-sidebar fixed bottom-0 top-0 left-0 hidden w-64 flex-col p-6 lg:flex">
      {/* Brand logo & header */}
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

      {/* Decorative gradient divider */}
      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/10 to-transparent" />

      {/* Navigation List */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-2 scrollbar-thin">
        {sidebarNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#FFE8EA] text-[#C90012] font-semibold"
                  : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-[#FF161A]" : "text-[#9CA3AF] group-hover:text-[#4B5563]"
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
