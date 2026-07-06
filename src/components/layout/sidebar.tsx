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
  Bell,
  Briefcase,
  FileText,
  Calendar,
  Activity,
  RefreshCw,
  Award,
  Video,
  Receipt,
  DollarSign,
  RotateCcw,
  Wallet,
  CalendarRange,
  PlusCircle,
  CalendarDays,
  PhoneCall,
  UserCog,
  Shield,
  Key,
  History,
  CheckSquare,
  FileSpreadsheet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { hasPermission } from "@/lib/permissions/has-permission";

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string | string[];
};

export type SidebarGroup = {
  title: string;
  items: SidebarNavItem[];
};

export const sidebarNavGroups: SidebarGroup[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard, permission: "dashboard:owner-read" },
      { title: "Office Board", href: "/dashboard/office", icon: Activity, permission: "dashboard:office-read" },
      { title: "Teacher Board", href: "/dashboard/teacher", icon: ClipboardList, permission: "dashboard:teacher-read" },
      { title: "My Work", href: "/dashboard/employee", icon: CheckSquare, permission: "dashboard:employee-read" },
    ],
  },
  {
    title: "People",
    items: [
      { title: "Students", href: "/students", icon: Users, permission: "student:read" },
      { title: "Parents", href: "/parents", icon: UserCheck, permission: "parent:read" },
      { title: "Employees", href: "/employees", icon: Users, permission: "employee:read" },
      { title: "Positions", href: "/positions", icon: Briefcase, permission: "employee:read" },
    ],
  },
  {
    title: "Academic",
    items: [
      { title: "Levels", href: "/levels", icon: Layers, permission: "course:read" },
      { title: "Courses", href: "/courses", icon: BookOpen, permission: "course:read" },
      { title: "Curriculums", href: "/curriculums", icon: FileText, permission: "curriculum:read" },
      { title: "Classes", href: "/classes", icon: GraduationCap, permission: "class:read" },
      { title: "Class Schedules", href: "/schedules", icon: Calendar, permission: "schedule:read" },
      { title: "Enrollments", href: "/enrollments", icon: ClipboardList, permission: "class:read" },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Attendance", href: "/attendance", icon: CalendarCheck2, permission: "attendance:read" },
      { title: "Attendance Monitor", href: "/attendance/monitor", icon: Activity, permission: "attendance:review" },
      { title: "Weekly Class Updates", href: "/weekly-updates", icon: RefreshCw, permission: "weekly-update:read" },
      { title: "Weekly Update Review", href: "/weekly-updates/review", icon: CheckSquare, permission: "weekly-update:approve" },
      { title: "Scores", href: "/scores", icon: Award, permission: "score:read" },
      { title: "Learning Reports", href: "/learning-reports", icon: FileSpreadsheet, permission: "learning-report:read" },
      { title: "Learning Report Review", href: "/learning-reports/review", icon: CheckSquare, permission: "learning-report:approve" },
      { title: "Videos / Media", href: "/media/videos", icon: Video, permission: "media-video:read" },
    ],
  },
  {
    title: "Finance & HR",
    items: [
      { title: "Tuition", href: "/tuition", icon: CreditCard, permission: "tuition:read" },
      { title: "Invoices", href: "/tuition/invoices", icon: Receipt, permission: "tuition:read" },
      { title: "Payments", href: "/tuition/payments", icon: DollarSign, permission: "tuition:read" },
      { title: "Refunds & Credits", href: "/tuition/refunds", icon: RotateCcw, permission: "refund:create" },
      { title: "Payroll", href: "/payroll", icon: Wallet, permission: "payroll:read" },
      { title: "Payroll Periods", href: "/payroll/periods", icon: CalendarRange, permission: "payroll:read" },
      { title: "Allowance Types", href: "/payroll/allowance-types", icon: PlusCircle, permission: "salary-profile:manage" },
      { title: "Leave Requests", href: "/leave-requests", icon: CalendarDays, permission: "leave:read" },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Contact Logs", href: "/contact-logs", icon: PhoneCall, permission: "contactlog:read" },
      { title: "Parent Notifications", href: "/notifications", icon: Bell, permission: "notification:read" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Users", href: "/users", icon: UserCog, permission: "user:read" },
      { title: "Roles", href: "/roles", icon: Shield, permission: "role:read" },
      { title: "Permissions", href: "/permissions", icon: Key, permission: "permission:read" },
      { title: "Campuses", href: "/campuses", icon: Building2, permission: "campus:read" },
      { title: "Rooms", href: "/rooms", icon: DoorOpen, permission: "room:read" },
      { title: "Audit Logs", href: "/audit-logs", icon: History, permission: "audit:read" },
      { title: "Settings", href: "/settings", icon: Settings, permission: "settings:read" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  // Filter groups and items based on permissions
  const visibleGroups = React.useMemo(() => {
    return sidebarNavGroups
      .map((group) => {
        const visibleItems = group.items.filter((item) => {
          if (!item.permission) return true;
          return hasPermission(item.permission);
        });
        return { ...group, items: visibleItems };
      })
      .filter((group) => group.items.length > 0);
  }, [pathname]);

  return (
    <aside className="glass-sidebar fixed bottom-0 top-0 left-0 hidden w-64 flex-col p-4 lg:flex">
      {/* Brand logo & header */}
      <Link
        href="/dashboard"
        aria-label="Go to dashboard"
        className="flex w-full justify-center py-2"
      >
        <Image
          src="/branding/apix-english-logo-transparent.png"
          alt="APIX English"
          width={1812}
          height={1376}
          sizes="112px"
          className="h-auto w-24 object-contain"
        />
      </Link>

      {/* Decorative gradient divider */}
      <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/10 to-transparent" />

      {/* Navigation List */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin">
        {visibleGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </span>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                      isActive
                        ? "bg-[#FFE8EA] text-[#C90012] font-bold"
                        : "text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]"
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
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
