/**
 * src/lib/api/endpoints.ts
 *
 * Centralised API endpoint registry.
 *
 * Rules:
 *  - Never hardcode paths in feature API files — import from here.
 *  - All paths are relative to the Axios baseURL (NEXT_PUBLIC_API_BASE_URL).
 *  - Dynamic segments use factory functions.
 *
 * Usage:
 *   import { API_ENDPOINTS } from '@/lib/api/endpoints'
 *
 *   apiClient.get(API_ENDPOINTS.students.list)
 *   apiClient.get(API_ENDPOINTS.students.detail(id))
 */

const base = {
  auth: "/auth",
  students: "/students",
  parents: "/parents",
  campuses: "/campuses",
  rooms: "/rooms",
  levels: "/levels",
  courses: "/courses",
  classes: "/classes",
  enrollments: "/enrollments",
  attendance: "/attendance",
  invoices: "/invoices",
  tuitionPackages: "/tuition-packages",
  employees: "/employees",
  roles: "/roles",
  permissions: "/permissions",
  notifications: "/notifications",
  payroll: "/payroll",
  curriculums: "/curriculums",
  positions: "/positions",
  schedules: "/class-schedules",
  users: "/users",
  videoDeliveryBatches: "/video-delivery-batches",
  videoDeliveries: "/video-deliveries",
} as const;

export const API_ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  auth: {
    login: `${base.auth}/login`,
    logout: `${base.auth}/logout`,
    refresh: `${base.auth}/refresh-token`,
    me: `${base.auth}/me`,
    forgotPassword: `${base.auth}/forgot-password`,
    resetPassword: `${base.auth}/reset-password`,
    changePassword: `${base.auth}/change-password`,
  },

  // ── Students ──────────────────────────────────────────────────────────────
  students: {
    list: base.students,
    create: base.students,
    detail: (id: string) => `${base.students}/${id}`,
    update: (id: string) => `${base.students}/${id}`,
    delete: (id: string) => `${base.students}/${id}`,
    parents: (id: string) => `${base.students}/${id}/parents`,
    enrollments: (id: string) => `${base.students}/${id}/enrollments`,
    attendance: (id: string) => `${base.students}/${id}/attendance`,
    scores: (id: string) => `${base.students}/${id}/scores`,
    tuition: (id: string) => `${base.students}/${id}/tuition`,
  },

  // ── Parents ───────────────────────────────────────────────────────────────
  parents: {
    list: base.parents,
    create: base.parents,
    detail: (id: string) => `${base.parents}/${id}`,
    update: (id: string) => `${base.parents}/${id}`,
    delete: (id: string) => `${base.parents}/${id}`,
    children: (id: string) => `${base.parents}/${id}/children`,
    createAccount: (id: string) => `${base.parents}/${id}/account`,
  },

  // ── Campuses ──────────────────────────────────────────────────────────────
  campuses: {
    list: base.campuses,
    create: base.campuses,
    detail: (id: string) => `${base.campuses}/${id}`,
    update: (id: string) => `${base.campuses}/${id}`,
    delete: (id: string) => `${base.campuses}/${id}`,
    lookup: `${base.campuses}/lookup`,
  },

  // ── Rooms ─────────────────────────────────────────────────────────────────
  rooms: {
    list: base.rooms,
    create: base.rooms,
    detail: (id: string) => `${base.rooms}/${id}`,
    update: (id: string) => `${base.rooms}/${id}`,
    delete: (id: string) => `${base.rooms}/${id}`,
    byCampus: (campusId: string) => `${base.campuses}/${campusId}/rooms`,
  },

  // ── Levels ────────────────────────────────────────────────────────────────
  levels: {
    list: base.levels,
    create: base.levels,
    detail: (id: string) => `${base.levels}/${id}`,
    update: (id: string) => `${base.levels}/${id}`,
    delete: (id: string) => `${base.levels}/${id}`,
  },

  // ── Courses ───────────────────────────────────────────────────────────────
  courses: {
    list: base.courses,
    create: base.courses,
    detail: (id: string) => `${base.courses}/${id}`,
    update: (id: string) => `${base.courses}/${id}`,
    delete: (id: string) => `${base.courses}/${id}`,
  },

  // ── Classes ───────────────────────────────────────────────────────────────
  classes: {
    list: base.classes,
    create: base.classes,
    detail: (id: string) => `${base.classes}/${id}`,
    update: (id: string) => `${base.classes}/${id}`,
    delete: (id: string) => `${base.classes}/${id}`,
    students: (id: string) => `${base.classes}/${id}/students`,
    sessions: (id: string) => `${base.classes}/${id}/sessions`,
    schedules: (id: string) => `${base.classes}/${id}/schedules`,
  },

  // ── Enrollments ───────────────────────────────────────────────────────────
  enrollments: {
    list: base.enrollments,
    create: base.enrollments,
    detail: (id: string) => `${base.enrollments}/${id}`,
    update: (id: string) => `${base.enrollments}/${id}`,
    byClass: (classId: string) => `${base.enrollments}/class/${classId}`,
    transfer: (id: string) => `${base.enrollments}/${id}/transfer`,
    freeze: (id: string) => `${base.enrollments}/${id}/freeze`,
    unfreeze: (id: string) => `${base.enrollments}/${id}/unfreeze`,
    withdraw: (id: string) => `${base.enrollments}/${id}/withdraw`,
  },

  // ── Attendance ────────────────────────────────────────────────────────────
  attendance: {
    list: base.attendance,
    bySession: (sessionId: string) =>
      `${base.attendance}/sessions/${sessionId}`,
    bulkMark: `${base.attendance}/bulk`,
    update: (id: string) => `${base.attendance}/${id}`,
  },

  // ── Tuition ───────────────────────────────────────────────────────────────
  tuition: {
    invoices: base.invoices,
    createInvoice: base.invoices,
    byStudent: (studentId: string) => `/students/${studentId}/invoices`,
    byClass: (classId: string) => `/classes/${classId}/invoices`,
    addPayment: (id: string) => `${base.invoices}/${id}/payments`,
    payments: (id: string) => `${base.invoices}/${id}/payments`,
    packages: base.tuitionPackages,
    packageDetail: (id: string) => `${base.tuitionPackages}/${id}`,
  },

  // ── Employees ─────────────────────────────────────────────────────────────
  employees: {
    list: base.employees,
    create: base.employees,
    detail: (id: string) => `${base.employees}/${id}`,
    update: (id: string) => `${base.employees}/${id}`,
    delete: (id: string) => `${base.employees}/${id}`,
  },

  // ── Roles & Permissions ───────────────────────────────────────────────────
  roles: {
    list: base.roles,
    create: base.roles,
    detail: (id: string) => `${base.roles}/${id}`,
    update: (id: string) => `${base.roles}/${id}`,
    delete: (id: string) => `${base.roles}/${id}`,
    permissions: (id: string) => `${base.roles}/${id}/permissions`,
    removePermission: (id: string, permissionId: string) => `${base.roles}/${id}/permissions/${permissionId}`,
    lookup: `${base.roles}/lookup`,
  },
  permissions: {
    list: base.permissions,
    detail: (id: string) => `${base.permissions}/${id}`,
    create: base.permissions,
    update: (id: string) => `${base.permissions}/${id}`,
    delete: (id: string) => `${base.permissions}/${id}`,
    lookup: `${base.permissions}/lookup`,
  },
  users: {
    list: base.users,
    create: base.users,
    detail: (id: string) => `${base.users}/${id}`,
    update: (id: string) => `${base.users}/${id}`,
    delete: (id: string) => `${base.users}/${id}`,
    deactivate: (id: string) => `${base.users}/${id}/deactivate`,
    lock: (id: string) => `${base.users}/${id}/lock`,
    unlock: (id: string) => `${base.users}/${id}/unlock`,
    roles: (id: string) => `${base.users}/${id}/roles`,
    removeRole: (id: string, roleId: string) => `${base.users}/${id}/roles/${roleId}`,
    resetPassword: (id: string) => `${base.users}/${id}/reset-password`,
    lookup: `${base.users}/lookup`,
  },


  // ── Notifications ─────────────────────────────────────────────────────────
  notifications: {
    list: base.notifications,
    markRead: (id: string) => `${base.notifications}/${id}/read`,
    markAllRead: `${base.notifications}/read-all`,
  },

  // ── Curriculums ───────────────────────────────────────────────────────────
  curriculums: {
    list: base.curriculums,
    create: base.curriculums,
    detail: (id: string) => `${base.curriculums}/${id}`,
    update: (id: string) => `${base.curriculums}/${id}`,
    delete: (id: string) => `${base.curriculums}/${id}`,
  },

  // ── Positions ─────────────────────────────────────────────────────────────
  positions: {
    list: base.positions,
    create: base.positions,
    detail: (id: string) => `${base.positions}/${id}`,
    update: (id: string) => `${base.positions}/${id}`,
    delete: (id: string) => `${base.positions}/${id}`,
  },

  // ── Schedules ─────────────────────────────────────────────────────────────
  schedules: {
    list: base.schedules,
    create: base.schedules,
    detail: (id: string) => `${base.schedules}/${id}`,
    update: (id: string) => `${base.schedules}/${id}`,
    delete: (id: string) => `${base.schedules}/${id}`,
  },

  // ── Media Videos ──────────────────────────────────────────────────────────
  mediaVideos: {
    list: "/media/videos",
    detail: (id: string) => `/media/videos/${id}`,
    approve: (id: string) => `/media/videos/${id}/approve`,
    reject: (id: string) => `/media/videos/${id}/reject`,
    shareLinks: (id: string) => `/media/videos/${id}/share-links`,
    revokeShareLink: (id: string) => `/media/videos/share-links/${id}/revoke`,
    manualZaloMessage: (id: string) => `/media/videos/${id}/manual-zalo-message`,
    uploadSessions: "/media/videos/upload-sessions",
    uploadSessionDetail: (token: string) => `/media/videos/upload-sessions/${token}`,
    presign: (token: string) => `/media/videos/upload-sessions/${token}/presign`,
    complete: (token: string) => `/media/videos/upload-sessions/${token}/complete`,
    deliveryStatus: (id: string) => `/notification-deliveries/${id}/status`,
  },
  videoDeliveryBatches: {
    list: base.videoDeliveryBatches,
    create: base.videoDeliveryBatches,
    detail: (id: string) => `${base.videoDeliveryBatches}/${id}`,
    update: (id: string) => `${base.videoDeliveryBatches}/${id}`,
    cancel: (id: string) => `${base.videoDeliveryBatches}/${id}/cancel`,
  },
  videoDeliveries: {
    list: base.videoDeliveries,
    detail: (id: string) => `${base.videoDeliveries}/${id}`,
    stats: `${base.videoDeliveries}/stats`,
    prepareMessage: (id: string) => `${base.videoDeliveries}/${id}/prepare-message`,
    copied: (id: string) => `${base.videoDeliveries}/${id}/copied`,
    openedZalo: (id: string) => `${base.videoDeliveries}/${id}/opened-zalo`,
    sent: (id: string) => `${base.videoDeliveries}/${id}/sent`,
    failed: (id: string) => `${base.videoDeliveries}/${id}/failed`,
    skipped: (id: string) => `${base.videoDeliveries}/${id}/skipped`,
    reopen: (id: string) => `${base.videoDeliveries}/${id}/reopen`,
  },
} as const;
