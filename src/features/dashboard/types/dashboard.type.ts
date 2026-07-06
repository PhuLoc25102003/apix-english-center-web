export type MetricCardData = {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
};

export type RevenueData = {
  label: string;
  revenue: number;
};

export type InvoiceStatusData = {
  name: string;
  value: number;
  color: string;
};

export type AttendanceTrendData = {
  day: string;
  rate: number;
};

export type StudentGrowthData = {
  month: string;
  count: number;
};

export type OwnerDashboardStats = {
  metrics: {
    activeStudents: MetricCardData;
    activeClasses: MetricCardData;
    newEnrollments: MetricCardData;
    tuitionRevenue: MetricCardData;
  };
  revenueByMonth: RevenueData[];
  invoiceStatus: InvoiceStatusData[];
  attendanceTrend: AttendanceTrendData[];
  studentGrowth: StudentGrowthData[];
};

export type OfficeDashboardStats = {
  todayClasses: Array<{
    id: string;
    className: string;
    classCode: string;
    timeSlot: string;
    teacherName: string;
    roomCode: string;
    status: "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "REVIEWED" | "OVERDUE";
    dueMinutes: number;
  }>;
  pendingWeeklyUpdatesCount: number;
  pendingReportsCount: number;
  tuitionOverdueCount: number;
  absentTodayCount: number;
};

export type TeacherDashboardStats = {
  assignedClasses: Array<{
    id: string;
    className: string;
    classCode: string;
    nextSessionTime: string;
    roomCode: string;
    attendanceStatus: "NOT_MARKED" | "SUBMITTED" | "REVIEWED" | "OVERDUE";
  }>;
  pendingUpdatesCount: number;
  pendingReportsCount: number;
  overdueTasksCount: number;
};

export type EmployeeDashboardStats = {
  salarySummary: {
    baseSalary: number;
    allowances: number;
    leaveDeductions: number;
    netSalary: number;
  };
  leaveStatus: {
    pending: number;
    approved: number;
    remainingDays: number;
  };
  workHoursThisMonth: number;
};
