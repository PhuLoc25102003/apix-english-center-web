import { useQuery } from "@tanstack/react-query";
import {
  fetchOwnerStats,
  fetchOfficeStats,
  fetchTeacherStats,
  fetchEmployeeStats,
} from "../api/dashboard.api";
import type {
  OwnerDashboardStats,
  OfficeDashboardStats,
  TeacherDashboardStats,
  EmployeeDashboardStats,
} from "../types/dashboard.type";

export function useOwnerDashboard(filter = "month") {
  return useQuery<OwnerDashboardStats>({
    queryKey: ["dashboard", "owner", filter],
    queryFn: () => fetchOwnerStats(filter),
    initialData: {
      metrics: {
        activeStudents: { title: "Học viên đang học", value: 145, change: "+12% tháng này", isPositive: true },
        activeClasses: { title: "Lớp học hoạt động", value: 16, change: "+2 lớp mới", isPositive: true },
        newEnrollments: { title: "Ghi danh mới", value: 24, change: "+5% so với tháng trước", isPositive: true },
        tuitionRevenue: { title: "Doanh thu học phí", value: "312M ₫", change: "+18M ₫ tuần này", isPositive: true },
      },
      revenueByMonth: [
        { label: "T1", revenue: 220000000 },
        { label: "T2", revenue: 250000000 },
        { label: "T3", revenue: 280000000 },
        { label: "T4", revenue: 240000000 },
        { label: "T5", revenue: 290000000 },
        { label: "T6", revenue: 312000000 },
      ],
      invoiceStatus: [
        { name: "Đã thanh toán", value: 75, color: "#C90012" }, // Brand APIX Red
        { name: "Chưa thanh toán", value: 20, color: "#9CA3AF" },
        { name: "Quá hạn", value: 5, color: "#111827" },
      ],
      attendanceTrend: [
        { day: "Thứ 2", rate: 94.5 },
        { day: "Thứ 3", rate: 96.2 },
        { day: "Thứ 4", rate: 95.0 },
        { day: "Thứ 5", rate: 93.8 },
        { day: "Thứ 6", rate: 94.8 },
        { day: "Thứ 7", rate: 97.5 },
        { day: "Chủ nhật", rate: 98.1 },
      ],
      studentGrowth: [
        { month: "Tháng 2", count: 110 },
        { month: "Tháng 3", count: 120 },
        { month: "Tháng 4", count: 125 },
        { month: "Tháng 5", count: 135 },
        { month: "Tháng 6", count: 145 },
      ],
    },
    retry: false,
    staleTime: 5000,
  });
}

export function useOfficeDashboard() {
  return useQuery<OfficeDashboardStats>({
    queryKey: ["dashboard", "office"],
    queryFn: fetchOfficeStats,
    initialData: {
      todayClasses: [
        {
          id: "c-1",
          className: "Starters A1",
          classCode: "STA1-26",
          timeSlot: "18:00 - 19:30",
          teacherName: "Mr. John Doe",
          roomCode: "Room 101",
          status: "OVERDUE",
          dueMinutes: 35,
        },
        {
          id: "c-2",
          className: "Flyers B2",
          classCode: "FLB2-12",
          timeSlot: "19:30 - 21:00",
          teacherName: "Ms. Sarah Connor",
          roomCode: "Room 103",
          status: "IN_PROGRESS",
          dueMinutes: 10,
        },
        {
          id: "c-3",
          className: "Movers A2",
          classCode: "MOA2-08",
          timeSlot: "19:30 - 21:00",
          teacherName: "Mr. Alex Mercer",
          roomCode: "Room 102",
          status: "NOT_STARTED",
          dueMinutes: 45,
        },
      ],
      pendingWeeklyUpdatesCount: 4,
      pendingReportsCount: 12,
      tuitionOverdueCount: 8,
      absentTodayCount: 5,
    },
    retry: false,
    staleTime: 5000,
  });
}

export function useTeacherDashboard() {
  return useQuery<TeacherDashboardStats>({
    queryKey: ["dashboard", "teacher"],
    queryFn: fetchTeacherStats,
    initialData: {
      assignedClasses: [
        {
          id: "tc-1",
          className: "Movers A2",
          classCode: "MOA2-08",
          nextSessionTime: "Hôm nay, 19:30",
          roomCode: "Room 102",
          attendanceStatus: "NOT_MARKED",
        },
        {
          id: "tc-2",
          className: "IELTS Foundation",
          classCode: "IELTS-F01",
          nextSessionTime: "Ngày mai, 18:00",
          roomCode: "Room 201",
          attendanceStatus: "REVIEWED",
        },
      ],
      pendingUpdatesCount: 2,
      pendingReportsCount: 5,
      overdueTasksCount: 1,
    },
    retry: false,
    staleTime: 5000,
  });
}

export function useEmployeeDashboard() {
  return useQuery<EmployeeDashboardStats>({
    queryKey: ["dashboard", "employee"],
    queryFn: fetchEmployeeStats,
    initialData: {
      salarySummary: {
        baseSalary: 12000000,
        allowances: 1500000,
        leaveDeductions: 500000,
        netSalary: 13000000,
      },
      leaveStatus: {
        pending: 1,
        approved: 2,
        remainingDays: 12,
      },
      workHoursThisMonth: 160,
    },
    retry: false,
    staleTime: 5000,
  });
}
