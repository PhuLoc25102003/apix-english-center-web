"use client";

import * as React from "react";
import Image from "next/image";
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
  Layers,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Students", href: "/students", icon: Users },
  { title: "Parents", href: "/parents", icon: UserCheck },
  { title: "Campuses", href: "/campuses", icon: Building2 },
  { title: "Rooms", href: "/rooms", icon: DoorOpen },
  { title: "Levels", href: "/levels", icon: Layers },
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
      <Link
        href="/dashboard"
        aria-label="Go to dashboard"
        className="flex w-full justify-center"
      >
        <Image
          src="/branding/apix-english-logo-transparent.png"
          alt="APIX English"
          width={1812}
          height={1376}
          sizes="112px"
          className="h-auto w-28 object-contain"
        />
      </Link>

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
