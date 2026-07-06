/**
 * src/lib/api/query-keys.ts
 *
 * TanStack Query key factories — standard §10
 *
 * Conventions:
 *  - Keys are structured arrays for precise cache invalidation.
 *  - Each resource has `all`, `lists`, `list(filters)`, `detail(id)`.
 *  - Feature hooks import from here — never hardcode string keys inline.
 *
 * Usage:
 *   import { studentKeys } from '@/lib/api/query-keys'
 *
 *   useQuery({ queryKey: studentKeys.detail(id), ... })
 *   queryClient.invalidateQueries({ queryKey: studentKeys.lists() })
 */

// ── Students ──────────────────────────────────────────────────────────────────

export const studentKeys = {
  all: ["students"] as const,
  lists: () => [...studentKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...studentKeys.lists(), filters] as const,
  detail: (id: string) => [...studentKeys.all, "detail", id] as const,
  parents: (id: string) => [...studentKeys.all, "detail", id, "parents"] as const,
  enrollments: (id: string) =>
    [...studentKeys.all, "detail", id, "enrollments"] as const,
  attendance: (id: string) =>
    [...studentKeys.all, "detail", id, "attendance"] as const,
  tuition: (id: string) => [...studentKeys.all, "detail", id, "tuition"] as const,
};

// ── Parents ───────────────────────────────────────────────────────────────────

export const parentKeys = {
  all: ["parents"] as const,
  lists: () => [...parentKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...parentKeys.lists(), filters] as const,
  detail: (id: string) => [...parentKeys.all, "detail", id] as const,
  children: (id: string) => [...parentKeys.all, "detail", id, "children"] as const,
};

// ── Campuses ──────────────────────────────────────────────────────────────────

export const campusKeys = {
  all: ["campuses"] as const,
  lists: () => [...campusKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...campusKeys.lists(), filters] as const,
  detail: (id: string) => [...campusKeys.all, "detail", id] as const,
};

// ── Rooms ─────────────────────────────────────────────────────────────────────

export const roomKeys = {
  all: ["rooms"] as const,
  lists: () => [...roomKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...roomKeys.lists(), filters] as const,
  byCampus: (campusId: string) =>
    [...roomKeys.all, "campus", campusId] as const,
  detail: (id: string) => [...roomKeys.all, "detail", id] as const,
};

// ── Levels ────────────────────────────────────────────────────────────────────

export const levelKeys = {
  all: ["levels"] as const,
  lists: () => [...levelKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...levelKeys.lists(), filters] as const,
  detail: (id: string) => [...levelKeys.all, "detail", id] as const,
};

// ── Courses ───────────────────────────────────────────────────────────────────

export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...courseKeys.lists(), filters] as const,
  detail: (id: string) => [...courseKeys.all, "detail", id] as const,
};

// ── Classes ───────────────────────────────────────────────────────────────────

export const classKeys = {
  all: ["classes"] as const,
  lists: () => [...classKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...classKeys.lists(), filters] as const,
  detail: (id: string) => [...classKeys.all, "detail", id] as const,
  students: (id: string) => [...classKeys.all, "detail", id, "students"] as const,
  sessions: (id: string) => [...classKeys.all, "detail", id, "sessions"] as const,
  tuition: (id: string) => [...classKeys.all, "detail", id, "tuition"] as const,
};

// ── Enrollments ───────────────────────────────────────────────────────────────

export const enrollmentKeys = {
  all: ["enrollments"] as const,
  lists: () => [...enrollmentKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...enrollmentKeys.lists(), filters] as const,
  detail: (id: string) => [...enrollmentKeys.all, "detail", id] as const,
};

// ── Attendance ────────────────────────────────────────────────────────────────

export const attendanceKeys = {
  all: ["attendance"] as const,
  lists: () => [...attendanceKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...attendanceKeys.lists(), filters] as const,
  bySession: (sessionId: string) =>
    [...attendanceKeys.all, "session", sessionId] as const,
  sessionStudents: (sessionId: string) =>
    [...attendanceKeys.all, "session", sessionId, "students"] as const,
};

// ── Tuition ───────────────────────────────────────────────────────────────────

export const tuitionKeys = {
  all: ["tuition"] as const,
  lists: () => [...tuitionKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...tuitionKeys.lists(), filters] as const,
  detail: (id: string) => [...tuitionKeys.all, "detail", id] as const,
  payments: (id: string) =>
    [...tuitionKeys.all, "detail", id, "payments"] as const,
  packages: () => [...tuitionKeys.all, "packages"] as const,
};

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authKeys = {
  me: ["auth", "me"] as const,
};

// ── Employees ─────────────────────────────────────────────────────────────────

export const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...employeeKeys.lists(), filters] as const,
  detail: (id: string) => [...employeeKeys.all, "detail", id] as const,
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...userKeys.lists(), filters] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
  roles: (id: string) => [...userKeys.all, "detail", id, "roles"] as const,
};

// ── Roles & Permissions ───────────────────────────────────────────────────────

export const roleKeys = {
  all: ["roles"] as const,
  lists: () => [...roleKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...roleKeys.lists(), filters] as const,
  detail: (id: string) => [...roleKeys.all, "detail", id] as const,
  permissions: (id: string) =>
    [...roleKeys.all, "detail", id, "permissions"] as const,
};

export const permissionKeys = {
  all: ["permissions"] as const,
  lists: () => [...permissionKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...permissionKeys.lists(), filters] as const,
};

// ── Curriculums ─────────────────────────────────────────────────────────────

export const curriculumKeys = {
  all: ["curriculums"] as const,
  lists: () => [...curriculumKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...curriculumKeys.lists(), filters] as const,
  detail: (id: string) => [...curriculumKeys.all, "detail", id] as const,
};

// ── Positions ───────────────────────────────────────────────────────────────

export const positionKeys = {
  all: ["positions"] as const,
  lists: () => [...positionKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...positionKeys.lists(), filters] as const,
  detail: (id: string) => [...positionKeys.all, "detail", id] as const,
};

// ── Schedules ───────────────────────────────────────────────────────────────

export const scheduleKeys = {
  all: ["schedules"] as const,
  lists: () => [...scheduleKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...scheduleKeys.lists(), filters] as const,
  detail: (id: string) => [...scheduleKeys.all, "detail", id] as const,
};
