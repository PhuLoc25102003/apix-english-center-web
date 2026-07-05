/**
 * APIX API endpoint constants — standard §9
 *
 * Centralise all endpoint paths here.
 * Feature API files import from this module — never hardcode paths inline.
 *
 * Convention:
 *   export const STUDENTS = '/students' as const
 *   export const STUDENT_BY_ID = (id: string) => `/students/${id}` as const
 */

// ── Auth ──────────────────────────────────────────
export const AUTH_LOGIN = "/auth/login" as const;
export const AUTH_LOGOUT = "/auth/logout" as const;
export const AUTH_REFRESH = "/auth/refresh" as const;
export const AUTH_ME = "/auth/me" as const;
export const AUTH_FORGOT_PASSWORD = "/auth/forgot-password" as const;
export const AUTH_RESET_PASSWORD = "/auth/reset-password" as const;

// ── Users / Roles ──────────────────────────────────
export const USERS = "/users" as const;
export const ROLES = "/roles" as const;
export const PERMISSIONS = "/permissions" as const;

// ── Employees ─────────────────────────────────────
export const EMPLOYEES = "/employees" as const;
export const EMPLOYEE_BY_ID = (id: string) => `/employees/${id}` as const;

// ── Students ──────────────────────────────────────
export const STUDENTS = "/students" as const;
export const STUDENT_BY_ID = (id: string) => `/students/${id}` as const;

// ── Parents ───────────────────────────────────────
export const PARENTS = "/parents" as const;
export const PARENT_BY_ID = (id: string) => `/parents/${id}` as const;

// ── Campuses & Rooms ──────────────────────────────
export const CAMPUSES = "/campuses" as const;
export const CAMPUS_BY_ID = (id: string) => `/campuses/${id}` as const;
export const ROOMS = "/rooms" as const;
export const ROOM_BY_ID = (id: string) => `/rooms/${id}` as const;

// ── Courses / Curriculum ──────────────────────────
export const COURSES = "/courses" as const;
export const COURSE_BY_ID = (id: string) => `/courses/${id}` as const;

// ── Classes ───────────────────────────────────────
export const CLASSES = "/classes" as const;
export const CLASS_BY_ID = (id: string) => `/classes/${id}` as const;

// ── Schedules ─────────────────────────────────────
export const SCHEDULES = "/schedules" as const;
export const SCHEDULE_BY_ID = (id: string) => `/schedules/${id}` as const;

// ── Attendance ────────────────────────────────────
export const ATTENDANCE = "/attendance" as const;

// ── Tuition / Invoices ────────────────────────────
export const INVOICES = "/invoices" as const;
export const INVOICE_BY_ID = (id: string) => `/invoices/${id}` as const;

// ── Payroll ───────────────────────────────────────
export const PAYROLL = "/payroll" as const;

// ── Notifications ─────────────────────────────────
export const NOTIFICATIONS = "/notifications" as const;
