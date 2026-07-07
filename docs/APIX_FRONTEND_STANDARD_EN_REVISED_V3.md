<!-- Read and follow this frontend standard file.

Project:
APIX English Center Management System

Tech stack:
- Next.js 15 or 16, depending on project setup
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Axios or fetch wrapper
- TanStack Query
- React Hook Form
- Zod
- TanStack Table
- Recharts

Design style:
- APIX red and white brand identity
- Modern liquid glass UI
- Clean operational dashboard layout
- Responsive desktop and mobile
- No random colors
- No messy component structure

Rules:
- Do not delete existing code unless the task explicitly says a deprecated page/module must be removed.
- Do not rewrite unrelated files.
- Only add or modify files needed for this task.
- Follow feature-based architecture.
- Components must not call API directly.
- API calls must go through lib/api and feature api files.
- Use TypeScript strictly.
- Show/hide UI by permission code, not by hardcoded role name.
- Explain which files are created or changed.

Task:
[PASTE TASK HERE] -->

# APIX English Center Management System — Frontend Engineering & Design Standard

> Version: 3.0  
> Language: English  
> Product: APIX English Center Management System  
> Design goal: modern, premium, permission-aware, fast, and optimized for real English center operations.

---

## 0. Frontend Domain Update

This version aligns the frontend with the revised backend domain.

Major changes:

1. Replace student assignment submission UI with weekly class update workflow.
2. Simplify score UI: create score item, enter numeric scores, optional note.
3. Add fast attendance screen with Office Staff pre-mark/lock support.
4. Add attendance status board for Office Staff.
5. Add payroll and leave workflows for hourly/monthly salary.
6. Add flexible tuition invoice items, refunds, and credits.
7. Add two-month flexible learning report workflow.
8. Add Video Delivery Tracking for manual Zalo forwarding; video storage is not the default workflow.
9. Add audit log pages for tracing who changed what.
10. Rebuild sidebar by business workflow groups instead of a flat module list.

---

## 1. Non-Negotiable Frontend Rules

- Use English for route folders, feature folders, components, variables, types, and API names.
- UI copy can be Vietnamese later through i18n, but code names stay English.
- Do not hardcode role names for navigation visibility.
- Use permission codes from backend.
- Components must not call `fetch` or `axios` directly.
- API calls must go through `lib/api` and feature API files.
- Use TanStack Query for server state.
- Use React Hook Form + Zod for forms.
- Use TanStack Table for list pages.
- Use Recharts for dashboard charts.
- Use liquid glass style carefully. Operational readability is more important than decoration.

---

## 2. Feature-Based Architecture

```text
src
├── app
│   ├── (auth)
│   ├── (dashboard)
│   ├── (parent)
│   ├── (student)
│   └── layout.tsx
├── components
│   ├── ui
│   ├── layout
│   ├── navigation
│   ├── data-table
│   ├── forms
│   ├── modals
│   ├── feedback
│   ├── empty-state
│   └── permission
├── features
│   ├── auth
│   ├── dashboard
│   ├── users
│   ├── roles
│   ├── permissions
│   ├── employees
│   ├── positions
│   ├── students
│   ├── parents
│   ├── campuses
│   ├── rooms
│   ├── courses
│   ├── curriculums
│   ├── classes
│   ├── schedules
│   ├── sessions
│   ├── attendance
│   ├── weekly-updates
│   ├── scores
│   ├── learning-reports
│   ├── tuition
│   ├── payroll
│   ├── leave-requests
│   ├── notifications
│   ├── contact-logs
│   ├── file-storage
│   ├── media
│   ├── audit-logs
│   ├── ai
│   └── settings
├── hooks
├── lib
│   ├── api
│   ├── auth
│   ├── query
│   ├── permissions
│   ├── dates
│   └── utils
├── providers
├── stores
├── types
└── constants
```

Each feature must follow:

```text
features/<feature-name>
├── api
│   └── <feature-name>.api.ts
├── components
├── hooks
├── schemas
├── types
├── configs
├── utils
└── index.ts
```

---

## 3. Route Structure

### 3.1 Auth routes

```text
src/app/(auth)/login/page.tsx
src/app/(auth)/forgot-password/page.tsx
src/app/(auth)/reset-password/page.tsx
```

### 3.2 Dashboard routes

```text
src/app/(dashboard)/dashboard/page.tsx
src/app/(dashboard)/dashboard/owner/page.tsx
src/app/(dashboard)/dashboard/office/page.tsx
src/app/(dashboard)/dashboard/teacher/page.tsx
src/app/(dashboard)/dashboard/employee/page.tsx
```

`/dashboard` should redirect to the best dashboard based on permissions.

### 3.3 People routes

```text
src/app/(dashboard)/students/page.tsx
src/app/(dashboard)/students/[id]/page.tsx
src/app/(dashboard)/parents/page.tsx
src/app/(dashboard)/parents/[id]/page.tsx
src/app/(dashboard)/employees/page.tsx
src/app/(dashboard)/employees/[id]/page.tsx
src/app/(dashboard)/positions/page.tsx
```

Student detail tabs:

```text
Overview
Parents
Enrollments
Attendance
Scores
Weekly Updates
Learning Reports
Tuition
Media
Learning Notes
Audit
```

Teacher should not see parent private contact information unless the user has `parent:contact-read`.

### 3.4 Academic routes

```text
src/app/(dashboard)/levels/page.tsx
src/app/(dashboard)/courses/page.tsx
src/app/(dashboard)/courses/[id]/page.tsx
src/app/(dashboard)/curriculums/page.tsx
src/app/(dashboard)/lessons/page.tsx
src/app/(dashboard)/classes/page.tsx
src/app/(dashboard)/classes/[id]/page.tsx
src/app/(dashboard)/classes/[id]/students/page.tsx
src/app/(dashboard)/classes/[id]/staff/page.tsx
src/app/(dashboard)/classes/[id]/schedules/page.tsx
src/app/(dashboard)/classes/[id]/sessions/page.tsx
src/app/(dashboard)/schedule-plans/page.tsx
src/app/(dashboard)/schedule-conflicts/page.tsx
```

Class detail tabs:

```text
Overview
Students
Staff
Schedule
Sessions
Attendance
Weekly Updates
Scores
Learning Reports
Media
Audit
```

### 3.5 Daily operation routes

```text
src/app/(dashboard)/attendance/page.tsx
src/app/(dashboard)/attendance/board/page.tsx
src/app/(dashboard)/sessions/[id]/attendance/page.tsx
src/app/(dashboard)/weekly-updates/page.tsx
src/app/(dashboard)/weekly-updates/[id]/page.tsx
src/app/(dashboard)/scores/page.tsx
src/app/(dashboard)/scores/[id]/page.tsx
src/app/(dashboard)/learning-reports/page.tsx
src/app/(dashboard)/learning-reports/cycles/page.tsx
src/app/(dashboard)/learning-reports/[id]/page.tsx
src/app/(dashboard)/media/page.tsx
src/app/(dashboard)/media/[id]/page.tsx
```

### 3.6 Finance and HR routes

```text
src/app/(dashboard)/tuition/page.tsx
src/app/(dashboard)/tuition/invoices/page.tsx
src/app/(dashboard)/tuition/invoices/[id]/page.tsx
src/app/(dashboard)/tuition/payments/page.tsx
src/app/(dashboard)/tuition/refunds/page.tsx
src/app/(dashboard)/tuition/adjustments/page.tsx
src/app/(dashboard)/payroll/page.tsx
src/app/(dashboard)/payroll/periods/page.tsx
src/app/(dashboard)/payroll/periods/[id]/page.tsx
src/app/(dashboard)/payroll/salary-profiles/page.tsx
src/app/(dashboard)/payroll/allowance-types/page.tsx
src/app/(dashboard)/leave-requests/page.tsx
```

### 3.7 Communication routes

```text
src/app/(dashboard)/notifications/page.tsx
src/app/(dashboard)/notification-templates/page.tsx
src/app/(dashboard)/contact-logs/page.tsx
```

### 3.8 System routes

```text
src/app/(dashboard)/campuses/page.tsx
src/app/(dashboard)/rooms/page.tsx
src/app/(dashboard)/users/page.tsx
src/app/(dashboard)/roles/page.tsx
src/app/(dashboard)/permissions/page.tsx
src/app/(dashboard)/audit-logs/page.tsx
src/app/(dashboard)/settings/page.tsx
src/app/(dashboard)/ai/page.tsx
```

### 3.9 Parent portal routes

```text
src/app/(parent)/parent/dashboard/page.tsx
src/app/(parent)/parent/children/[id]/page.tsx
src/app/(parent)/parent/children/[id]/attendance/page.tsx
src/app/(parent)/parent/children/[id]/weekly-updates/page.tsx
src/app/(parent)/parent/children/[id]/scores/page.tsx
src/app/(parent)/parent/children/[id]/learning-reports/page.tsx
src/app/(parent)/parent/children/[id]/tuition/page.tsx
src/app/(parent)/parent/children/[id]/media/page.tsx
```

### 3.10 Student portal routes

```text
src/app/(student)/student/dashboard/page.tsx
src/app/(student)/student/timetable/page.tsx
src/app/(student)/student/weekly-updates/page.tsx
src/app/(student)/student/scores/page.tsx
src/app/(student)/student/learning-reports/page.tsx
src/app/(student)/student/media/page.tsx
```

Only students with `accessMode = OWN_ACCOUNT` should access student portal routes.

---

## 4. Sidebar Structure

The sidebar must be grouped by real workflows, not a flat list.

### 4.1 Main dashboard group

```ts
{
  title: 'Dashboard',
  items: [
    { title: 'Overview', href: '/dashboard', permission: 'dashboard:owner-read' },
    { title: 'Office Board', href: '/dashboard/office', permission: 'dashboard:office-read' },
    { title: 'Teacher Board', href: '/dashboard/teacher', permission: 'dashboard:teacher-read' },
    { title: 'My Work', href: '/dashboard/employee', permission: 'dashboard:employee-read' },
  ],
}
```

### 4.2 People group

```ts
{
  title: 'People',
  items: [
    { title: 'Students', href: '/students', permission: 'student:read' },
    { title: 'Parents', href: '/parents', permission: 'parent:read' },
    { title: 'Employees', href: '/employees', permission: 'employee:read' },
    { title: 'Positions', href: '/positions', permission: 'employee:read' },
  ],
}
```

### 4.3 Academic group

```ts
{
  title: 'Academic',
  items: [
    { title: 'Classes', href: '/classes', permission: 'class:read' },
    { title: 'My Classes', href: '/classes?scope=assigned', permission: 'class:read-assigned' },
    { title: 'Schedule Plans', href: '/schedule-plans', permission: 'schedule:read' },
    { title: 'Schedule Conflicts', href: '/schedule-conflicts', permission: 'schedule:resolve-conflict' },
    { title: 'Courses', href: '/courses', permission: 'course:read' },
    { title: 'Levels', href: '/levels', permission: 'course:read' },
    { title: 'Curriculums', href: '/curriculums', permission: 'curriculum:read' },
    { title: 'Lessons', href: '/lessons', permission: 'curriculum:read' },
  ],
}
```

### 4.4 Operations group

```ts
{
  title: 'Operations',
  items: [
    { title: 'Attendance', href: '/attendance', permission: 'attendance:read' },
    { title: 'Attendance Board', href: '/attendance/board', permission: 'attendance:review' },
    { title: 'Weekly Updates', href: '/weekly-updates', permission: 'weekly-update:read' },
    { title: 'Scores', href: '/scores', permission: 'score:read' },
    { title: 'Learning Reports', href: '/learning-reports', permission: 'learning-report:read' },
    { title: 'Media Library', href: '/media', permission: 'media:read' },
  ],
}
```

### 4.5 Finance and HR group

```ts
{
  title: 'Finance & HR',
  items: [
    { title: 'Tuition', href: '/tuition', permission: 'tuition:read' },
    { title: 'Invoices', href: '/tuition/invoices', permission: 'tuition:read' },
    { title: 'Refunds & Credits', href: '/tuition/refunds', permission: 'refund:create' },
    { title: 'Payroll', href: '/payroll', permission: 'payroll:read' },
    { title: 'Salary Profiles', href: '/payroll/salary-profiles', permission: 'salary-profile:manage' },
    { title: 'Allowance Types', href: '/payroll/allowance-types', permission: 'salary-profile:manage' },
    { title: 'Leave Requests', href: '/leave-requests', permission: 'leave:read' },
  ],
}
```

### 4.6 Communication group

```ts
{
  title: 'Communication',
  items: [
    { title: 'Notifications', href: '/notifications', permission: 'notification:read' },
    { title: 'Contact Logs', href: '/contact-logs', permission: 'contactlog:read' },
    { title: 'Templates', href: '/notification-templates', permission: 'notification-template:manage' },
  ],
}
```

### 4.7 System group

```ts
{
  title: 'System',
  items: [
    { title: 'Campuses', href: '/campuses', permission: 'campus:read' },
    { title: 'Rooms', href: '/rooms', permission: 'room:read' },
    { title: 'Users', href: '/users', permission: 'user:read' },
    { title: 'Roles', href: '/roles', permission: 'role:read' },
    { title: 'Audit Logs', href: '/audit-logs', permission: 'audit:read' },
    { title: 'AI Tools', href: '/ai', permission: 'ai:use' },
    { title: 'Settings', href: '/settings', permission: 'settings:read' },
  ],
}
```

---

## 5. Role-Specific UX

### 5.1 Owner / Center Manager

Landing dashboard should show:

- Revenue chart.
- Invoice status chart.
- Attendance trend.
- Student growth.
- Classes today.
- Attendance overdue classes.
- Pending weekly updates.
- Learning reports overdue.
- Payroll period status.
- Audit hot list for recent sensitive changes.

Owner uses management workflows, not routine approval by default.

### 5.2 Office Staff

Office dashboard should be task-first:

- Today's classes.
- Attendance board with class status.
- Absent students needing follow-up.
- Weekly updates waiting approval.
- Learning reports waiting publish.
- Tuition due/overdue reminders.
- Parent contact follow-up list.

### 5.3 Teacher

Teacher dashboard should show only assigned work:

- My classes today.
- Attendance tasks due in 30 minutes.
- Weekly updates to submit.
- Learning reports due soon/overdue.
- Draft scores.
- Recent student notes.

Teacher class pages must show students and academic information, but hide parent contact details by default.

### 5.4 Parent

Parent dashboard must use child switcher:

```text
Parent Dashboard
├── Child switcher
├── Tuition by month
├── Attendance summary
├── Weekly updates by week
├── Scores
├── Learning reports
├── Timetable
└── Media
```

### 5.5 Student

Student portal is only for `OWN_ACCOUNT` students:

- Timetable.
- Weekly updates.
- Scores.
- Learning reports.
- Media.

---

## 6. Page Requirements

### 6.1 Attendance page

Routes:

```text
/attendance
/attendance/board
/sessions/[id]/attendance
```

Attendance board for Office Staff:

- Filter by date, campus, class, status.
- Cards/table for today's sessions.
- Status badge: NOT_STARTED, IN_PROGRESS, SUBMITTED, REVIEWED, OVERDUE.
- Show `dueAt` and minutes remaining/overdue.
- Show teacher name and room.
- Quick action: Open attendance, Review, Contact absent parents.

Session attendance screen:

- Header: class, session date, time, room, teacher, attendance status.
- Student table/card list optimized for speed.
- Bulk actions:
  - Mark all present.
  - Mark selected absent.
  - Mark selected excused.
- Per student status buttons: PRESENT, LATE, ABSENT, EXCUSED.
- Optional note.
- Absence reason.
- Office Staff locked indicator.
- If record is locked by Office Staff, teacher sees disabled controls.
- Submit button for teacher.
- Review button for Office Staff.
- Save should be optimistic but must handle backend conflicts.

### 6.2 Weekly updates page

Routes:

```text
/weekly-updates
/weekly-updates/[id]
/classes/[id]/weekly-updates
```

List filters:

- Class.
- Teacher.
- Week.
- Status.

Detail form:

- Class and week.
- One section per session in that week.
- Fields:
  - Session date.
  - Lesson number.
  - Learning content.
  - Homework content.
  - Note.
- Multiple image upload support.
- Save draft.
- Submit to Office Staff.
- Office Staff actions: Approve, Reject, Publish.
- Parent/student view is read-only after publish.

Do not create student homework submission UI.

### 6.3 Score page

Routes:

```text
/scores
/scores/[id]
/classes/[id]/scores
```

Score item form:

- Title.
- Class.
- Score date.
- Max score.
- Description.

Score entry grid:

- Student name.
- Score value.
- Optional note.
- Save draft.
- Publish.

Avoid complex score component/weight UI unless explicitly requested later.

### 6.4 Learning reports page

Routes:

```text
/learning-reports
/learning-reports/cycles
/learning-reports/[id]
/classes/[id]/learning-reports
```

Cycle page:

- Create two-month cycle.
- Set period start/end.
- Set teacher deadline.
- View progress by class.
- Send reminder.

Report editor:

- One flexible rich textarea or markdown-safe editor for the teacher's narrative report.
- Optional internal note, staff only.
- Submit to Office Staff.
- Office Staff can approve/reject/publish.
- Parent sees only published report content.

Do not force fixed fields like Listening/Speaking/Reading/Writing unless the center later adds templates.

### 6.5 Tuition page

Routes:

```text
/tuition
/tuition/invoices
/tuition/invoices/[id]
/tuition/payments
/tuition/refunds
/tuition/adjustments
```

Invoice UI:

- Student and class.
- Billing month range.
- Monthly tuition line.
- Extra fee lines: book, material, test, uniform, other.
- Discounts/credits.
- Paid/remaining amount.
- Payment history.
- Refund/credit section.

Parent view:

- Tuition due by month.
- Invoice status.
- Payment history.
- Refund/credit information if published/visible.

### 6.6 Payroll page

Routes:

```text
/payroll
/payroll/periods
/payroll/periods/[id]
/payroll/salary-profiles
/payroll/allowance-types
/leave-requests
```

Salary profile form:

- Employee.
- Salary type: HOURLY or MONTHLY.
- Hourly rate.
- Monthly base salary.
- Standard work days, default 26.
- Deduct approved leave.
- Effective dates.

Allowance type form:

- Name.
- Category.
- Calculation type.
- Default amount.

Payroll period page:

- Calculate payroll.
- Show payroll items by employee.
- Expand item to show payroll lines.
- Show work hours, allowances, leave deductions, net salary.
- Approve.
- Mark as paid.

Employee view:

- Monthly salary summary.
- Payroll lines.
- Leave deduction explanation.

### 6.7 Leave request page

Employee can:

- Create leave request.
- View status.
- Request cancellation before leave date.

Manager/HR can:

- Approve/reject leave.
- Approve cancellation.
- See payroll impact warning.

### 6.8 Video Delivery Tracking

**Product principle:** Web manages workflow and accountability. Zalo sends the actual video quickly.

The default video feature is **Video Delivery Tracking**. Teachers record videos on mobile and send them to the center's internal Zalo group. Office Staff use the web to identify recipients, filter by class/month/video type, prepare and copy a message, open the parent's Zalo contact, and record sent/failed/skipped outcomes. The web provides tracking, accountability, filters, message templates, and history logs.

The system does **not** require uploading or storing videos by default. Direct forwarding in Zalo remains the fastest operational method. "Manual Zalo Delivery" means that a staff member performs the forwarding and records the result; it is not automatic Zalo API integration and the UI must never imply automatic sending.

Primary routes:

```text
/video-deliveries
/video-deliveries/batches/[id]
/classes/[id]/video-deliveries
/students/[id]/video-deliveries
```

Primary components live under `src/features/video-deliveries` and cover batch creation, delivery filters and table, summary statistics, prepared-message preview, manual Zalo actions, status badges, and delivery history.

QR upload, temporary upload links, object storage, review, playback, and public share links are optional future enhancements. They are not MVP, are not the default monthly-video workflow, and must not be required before a staff member can deliver a video.

#### 6.8.1 Manual Zalo Delivery Flow

1. Teacher records a video and sends it to the center/internal Zalo group.
2. Office Staff filters deliveries by class, month, and video type in the web.
3. Office Staff prepares and copies the parent message.
4. Office Staff opens Zalo and forwards the actual video manually.
5. Office Staff returns to the web and records sent, failed, or skipped status.
6. The web updates statistics and the accountability history.

#### 6.8.2 Permission Rules

Use `video-delivery:*` permission codes for page access, batch management, message preparation/copying, opening Zalo, status transitions, reopening, and assignment. Never hardcode role names.

#### 6.8.3 Optional Future Media/QR Capability

The following legacy routes describe an optional media library only. They must not appear as the primary video workflow or force QR/file upload:

Routes:

```text
/media/videos
/media/videos/upload
/media/videos/[id]
/upload/video/[uploadToken]
/classes/[id]/videos
/students/[id]/videos (if permission allows)
```

#### 6.8.4 Optional QR Video Upload UX Flow (Future Enhancement)
1. **Initiate**: Desktop user selects class, student, video type, and target month, then clicks "Upload bằng điện thoại" (or "QR Upload Video").
2. **Session Creation**: Backend creates an upload session and returns a session token and QR payload.
3. **Display QR**: Desktop displays a QR code containing the mobile upload URL `/upload/video/[uploadToken]`.
4. **Scan & Open**: Mobile user scans the QR and opens the public upload page.
5. **Select Video**: Mobile page displays details (student, class, month) and prompts user to choose a video from camera/gallery.
6. **Direct Upload**: Mobile uploads file directly to object storage via a presigned URL, showing real-time upload progress.
7. **Complete**: Mobile calls complete-upload API. Desktop polls the session status and automatically updates the UI.
8. **Review & Deliver**: Office Staff reviews the video, approves/rejects, generates a share link, copies the prepared Manual Zalo message, opens Zalo via `https://zalo.me/{phoneNumber}`, sends it manually, and marks it as sent.

#### 6.8.5 Optional Media Component Architecture (src/features/media-videos)
- **VideoListContainer**: Coordinates listing, filtering, and review workflows.
- **VideoTable**: Tabular metadata view (title, status, size, actions).
- **VideoFilters**: Filter criteria (class, student, status, type, month).
- **CreateVideoUploadSessionModal**: Form to trigger a new QR session.
- **VideoUploadQrDialog**: Renders QR, countdown timer, and runs status polling.
- **MobileVideoUploadPage**: Responsive, clean, and simple mobile-first page.
- **VideoReviewPanel**: Admin video player and metadata approval tool.
- **VideoPreviewCard**: Liquid glass layout for video playback.
- **VideoStatusBadge**: Color-coded badges for status transitions.
- **VideoShareLinkPanel**: Panel for generating and revoking share links.
- **ManualZaloVideoDeliveryPanel**: Semi-automated Zalo copy-message and status-tracking panel.

#### 6.8.6 Optional Upload UX & Security Rules

These rules apply only when the optional media capability is explicitly used. Upload must never be the primary action for normal monthly video delivery.
- **Optional Mobile Upload Only**: If this future capability is enabled, desktop may offer mobile upload as a secondary, explicitly optional action. It must not replace Video Delivery Tracking.
- **Mobile Simplicity**: Touch-optimized interface with large buttons. Cannot change student/class inputs. No parent private data exposed.
- **Security Check**: Session tokens must expire. Show expired/invalid session states. Validate file size and MIME type.
- **No Direct Storage Exposure**: Do not expose internal storage bucket keys in the UI.
- **Manual Zalo Delivery**: Copy to clipboard -> open link `https://zalo.me/{phone}` -> mark as sent.


### 6.9 Audit log page

Route:

```text
/audit-logs
```

Filters:

- Actor.
- Entity type.
- Entity ID.
- Action.
- Date range.

Detail drawer:

- Old value.
- New value.
- IP/user agent.
- Reason.
- Related route/entity link.

---

## 7. Dashboard Charts

### 7.1 Owner dashboard charts

Use Recharts:

- Revenue line chart by day/week/month/year.
- Invoice status donut chart.
- Attendance trend line chart.
- Student growth bar chart.
- Class occupancy bar chart.
- Teacher workload bar chart.
- Learning report overdue trend.

### 7.2 Office dashboard widgets

- Attendance status cards.
- Absent students follow-up list.
- Pending weekly update approvals.
- Pending learning report publications.
- Tuition reminder list.
- Contact logs today.

### 7.3 Teacher dashboard widgets

- Today's class timeline.
- Attendance deadline countdown.
- Weekly update draft/submission status.
- Learning report deadlines.
- Draft score items.

### 7.4 Parent dashboard widgets

- Child switcher.
- Current tuition due.
- Weekly update feed.
- Recent scores.
- Attendance by month.
- Media feed.

### 7.5 Employee dashboard widgets

- Current payroll period estimate.
- Approved leave days.
- Leave requests status.
- Work log hours.

---

## 8. API and Feature Mapping

| Feature | API file | Key hooks | Backend endpoints |
|---|---|---|---|
| Attendance | `features/attendance/api/attendance.api.ts` | `useAttendanceSessions`, `useSessionAttendance`, `useMarkAttendance`, `useSubmitAttendance`, `useReviewAttendance` | `/api/v1/attendance`, `/api/v1/sessions/{id}/attendance` |
| Weekly Updates | `features/weekly-updates/api/weekly-update.api.ts` | `useWeeklyUpdates`, `useWeeklyUpdate`, `useSubmitWeeklyUpdate`, `useApproveWeeklyUpdate`, `usePublishWeeklyUpdate` | `/api/v1/weekly-updates` |
| Scores | `features/scores/api/score.api.ts` | `useScoreItems`, `useScoreItem`, `useSaveScoreRecords`, `usePublishScoreItem` | `/api/v1/score-items` |
| Learning Reports | `features/learning-reports/api/learning-report.api.ts` | `useReportCycles`, `useReports`, `useSubmitReport`, `useApproveReport`, `usePublishReport` | `/api/v1/learning-reports` |
| Tuition | `features/tuition/api/tuition.api.ts` | `useInvoices`, `useInvoice`, `useCreatePayment`, `useRefundRequests` | `/api/v1/invoices`, `/api/v1/refund-requests` |
| Payroll | `features/payroll/api/payroll.api.ts` | `usePayrollPeriods`, `usePayrollItems`, `useCalculatePayroll`, `useApprovePayrollItem` | `/api/v1/payroll-periods` |
| Leave | `features/leave-requests/api/leave-request.api.ts` | `useLeaveRequests`, `useCreateLeaveRequest`, `useApproveLeaveRequest`, `useRequestLeaveCancel` | `/api/v1/leave-requests` |
| Media | `features/media/api/media.api.ts` | `useMediaItems`, `useMediaItem`, `useCreateMediaItem`, `usePublishMediaItem` | `/api/v1/media-items` |
| Audit | `features/audit-logs/api/audit-log.api.ts` | `useAuditLogs`, `useAuditLogDetail` | `/api/v1/audit-logs` |
| Dashboard | `features/dashboard/api/dashboard.api.ts` | `useOwnerDashboard`, `useOfficeDashboard`, `useTeacherDashboard`, `useParentDashboard` | `/api/v1/dashboard/*` |

---

## 9. Permission Gates

Use reusable permission components.

```tsx
<PermissionGate permission="weekly-update:approve">
  <ApproveWeeklyUpdateButton />
</PermissionGate>
```

Do not rely only on frontend permission checks. Backend must enforce again.

Sidebar item visibility must use permission codes.

Actions must be hidden or disabled if the user does not have permission.

Forbidden API response should show a clear permission error screen or toast.

---

## 10. Shared UI Components

Required shared components:

```text
AppShell
AppSidebar
TopBar
CommandMenu
NotificationPanel
PageShell
PageHeader
GlassCard
MetricCard
StatusBadge
PermissionGate
AppDataTable
FilterBar
DateRangeFilter
ConfirmDialog
CrudFormModal
DetailDrawer
FileUploadDropzone
MediaPreview
AuditDiffViewer
DeadlineBadge
```

Attendance-specific reusable components:

```text
AttendanceStatusBoard
AttendanceStudentRow
AttendanceQuickActions
AttendanceDeadlineBadge
AttendanceFollowUpDrawer
```

Weekly update components:

```text
WeeklyUpdateForm
WeeklyUpdateSessionItemEditor
WeeklyUpdateApprovalPanel
WeeklyUpdateParentPreview
```

Payroll components:

```text
SalaryProfileForm
AllowanceTypeForm
PayrollPeriodTable
PayrollItemLines
PayrollCalculationSummary
```

---

## 11. Forms and Validation

Use React Hook Form + Zod.

Examples:

```ts
export const salaryProfileSchema = z.object({
  employeeId: z.string().uuid(),
  salaryType: z.enum(['HOURLY', 'MONTHLY']),
  hourlyRate: z.number().nonnegative().optional(),
  monthlyBaseSalary: z.number().nonnegative().optional(),
  standardWorkDays: z.number().int().positive().default(26),
  deductApprovedLeave: z.boolean().default(true),
  effectiveFrom: z.string().min(1),
  effectiveTo: z.string().optional(),
}).superRefine((value, ctx) => {
  if (value.salaryType === 'HOURLY' && !value.hourlyRate) {
    ctx.addIssue({ code: 'custom', path: ['hourlyRate'], message: 'Hourly rate is required' });
  }
  if (value.salaryType === 'MONTHLY' && !value.monthlyBaseSalary) {
    ctx.addIssue({ code: 'custom', path: ['monthlyBaseSalary'], message: 'Monthly base salary is required' });
  }
});
```

```ts
export const scoreItemSchema = z.object({
  classId: z.string().uuid(),
  title: z.string().min(1),
  scoreDate: z.string().optional(),
  maxScore: z.number().positive().optional(),
  description: z.string().optional(),
});
```

---

## 12. Data Table Standard

Every list page must support:

- Server-side pagination.
- Server-side sorting where useful.
- Search.
- Filters.
- Loading skeleton.
- Empty state.
- Error state.
- Row actions.
- Permission-aware actions.

Filters should follow the same glass filter bar pattern:

```text
Search on the left
Select/date filters on the right
Compact 36px select triggers
ALL sentinel mapped to omitted API param
Changing filters resets pagination to page 1
```

---

## 13. Responsive Rules

Desktop:

- Fixed sidebar.
- Tables with sticky headers.
- Detail drawer or right panel for review workflows.

Tablet:

- Sidebar collapses.
- Important table rows can become compact cards.

Mobile:

- Sidebar drawer.
- Attendance should become fast tap cards.
- Sticky bottom action bar for save/submit.
- Avoid horizontal scrolling for parent/student portals.

---

## 14. Development Roadmap

### Sprint 1: Foundation

```text
API client
Query client
Auth store
Permission system
AppShell
Sidebar grouped by workflow
Shared table/filter/modal components
```

### Sprint 2: Master data and people

```text
Campuses
Rooms
Levels
Courses
Employees
Positions
Students
Parents
```

### Sprint 3: Academic core

```text
Classes
Class staff
Enrollments
Schedule patterns
Schedule plans
Session generation UI
Schedule conflict UI
```

### Sprint 4: Attendance operations

```text
Attendance board
Session attendance page
Office Staff pre-mark/lock
Teacher submit
Office review
Absence follow-up
```

### Sprint 5: Weekly updates, scores, reports

```text
Weekly class updates
Score item simple grid
Learning report cycles
Two-month report editor
Approval/publish workflows
```

### Sprint 6: Tuition and communication

```text
Invoices
Extra fee items
Payments
Refunds/credits
Notifications
Contact logs
Parent portal tuition/updates/scores/reports
```

### Sprint 7: Payroll, leave, media, audit

```text
Salary profiles
Allowance types
Leave requests
Payroll periods
Employee payroll view
Media/video library
Audit logs
```

### Sprint 8: Dashboards and AI

```text
Owner dashboard charts
Office dashboard task board
Teacher dashboard
Parent/student dashboards
AI draft weekly update
AI draft learning report
AI risk insight
```

---

## 15. Definition of Done

A frontend feature is done only when:

- Route exists and matches backend API contract.
- Feature folder contains API, hooks, types, schemas, and components.
- No UI component calls API directly.
- Permission guard exists at page/action level.
- Loading, empty, error, success states exist.
- Forms use Zod validation.
- Mutations invalidate correct query keys.
- User gets toast feedback after actions.
- List pages use server-side pagination.
- Tables/cards are responsive.
- Parent/student/teacher data visibility is correct.
- No parent contact info appears on teacher screens unless permission allows it.
- Audit-sensitive actions use confirmation where needed.
- UI follows APIX red/white liquid glass style without reducing readability.
- Backend and frontend status enums match exactly.
