<!-- Read and follow the frontend standard file:

docs/APIX_FRONTEND_STANDARD_EN.md

Project:
APIX English Center Management System

Tech stack:
- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Axios
- TanStack Query
- React Hook Form
- Zod
- Recharts

Design style:
- APIX red and white brand color
- Modern liquid glass UI
- Clean dashboard layout
- Responsive desktop and mobile
- No random colors
- No messy component structure

Rules:
- Do not delete existing code.
- Do not rewrite unrelated files.
- Only add or modify files needed for this task.
- Follow feature-based architecture.
- Components must not call API directly.
- API calls must go through lib/api and feature api files.
- Use TypeScript strictly.
- Explain which files are created or changed.

Task:
[PASTE TASK HERE] -->

# APIX English Center Management System — Frontend Engineering & Design Standard

> Version: 2.0  
> Language: English  
> Target reader: Frontend engineers, UI designers, QA, backend engineers, and AI coding assistants.  
> Product: APIX English Center Management System.  
> Design goal: modern, premium, maintainable, permission-aware, fast, accessible, and visually aligned with APIX English branding.

---

## 0. AI Reading Rules

This document is written in English to align with code, component names, routes, API contracts, TypeScript types, and AI coding tools.

When generating frontend code from this file:

- Use English for all folders, components, variables, functions, schemas, and routes.
- Do not translate route names or component names into Vietnamese.
- Keep UI text configurable so the app can support Vietnamese and English later.
- Do not hardcode roles in the UI.
- Show/hide navigation and actions by permission code.
- Follow feature-based architecture.
- Prefer adding new components and variants instead of breaking existing components.
- Preserve the APIX visual identity: red, white, clean surfaces, liquid glass, modern education dashboard.

---

## 1. Product Overview

APIX English Center Management System is a web dashboard for managing a private English center that teaches children and teenagers.

The frontend supports these user groups:

- Owner
- Office Staff
- Teacher
- Teaching Assistant
- Parent
- Student

The frontend must support these modules:

- Authentication
- Dashboard
- Employee management
- Position management
- Role and permission management
- Student management
- Parent management
- Campus and room management
- Course, curriculum, and lesson management
- Class management
- Schedule management
- Enrollment, transfer, freeze, trial, make-up class
- Attendance
- Homework
- Score
- Learning report
- Tuition
- Payroll
- Leave request
- Notification
- Contact log
- File upload
- AI features
- System settings

This is not just a CRUD admin panel. It is an operating system for an English center.

---

## 2. Technology Stack

| Concern              | Technology                                |
| -------------------- | ----------------------------------------- |
| Framework            | Next.js 15                                |
| UI runtime           | React 19                                  |
| Language             | TypeScript                                |
| Styling              | TailwindCSS                               |
| Component foundation | Shadcn UI                                 |
| Server state         | TanStack Query                            |
| Client state         | Redux Toolkit                             |
| Forms                | React Hook Form                           |
| Validation           | Zod                                       |
| Tables               | TanStack Table                            |
| Charts               | Recharts                                  |
| Icons                | Lucide React                              |
| Animation            | Framer Motion, used carefully             |
| Date handling        | date-fns                                  |
| API client           | Fetch wrapper or Axios wrapper            |
| Testing              | Vitest, React Testing Library, Playwright |
| Linting              | ESLint                                    |
| Formatting           | Prettier                                  |
| Package manager      | pnpm                                      |

---

## 3. Brand and Visual Direction

### 3.1 Brand identity

The APIX logo uses a strong red background and bold white mark. The interface should feel:

```text
Modern
Confident
Fast
Premium
Clean
Educational
Friendly for parents
Operationally powerful for staff
```

### 3.2 Visual style

Use a modern liquid glass direction:

- Translucent panels
- Soft blur
- Subtle borders
- Bright but controlled red accents
- Large clean spacing
- Rounded cards
- Floating dashboard surfaces
- Smooth but restrained motion

The interface should not look like a generic admin template.

### 3.3 Design tokens

Use these tokens as a starting point.

```ts
export const brandColors = {
  apixRed: '#FF161A',
  apixRedDark: '#C90012',
  apixRedSoft: '#FFE8EA',
  ink: '#111827',
  mutedInk: '#6B7280',
  surface: '#FFFFFF',
  surfaceSoft: '#F8FAFC',
  glassWhite: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.42)',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
};
```

### 3.4 Typography

Recommended font strategy:

| Role       | Font style                                  |
| ---------- | ------------------------------------------- |
| Display    | Modern geometric sans, bold, tight tracking |
| Body       | Highly readable sans-serif                  |
| Data/table | Tabular-friendly sans-serif                 |

Suggested web fonts:

```text
Display: Sora or Plus Jakarta Sans
Body: Inter
Data: Inter with tabular numbers
```

### 3.5 Logo placement

Main app shell:

```text
Top-left: APIX logo mark + APIX English
Top bar: search, quick actions, notifications, profile
Sidebar: permission-based navigation
Main area: glass dashboard cards
```

Do not overuse the logo. Use it strongly on login and lightly in the dashboard.

### 3.6 Signature UI element

Use a signature visual called the `Learning Arc`.

The Learning Arc is a red curved highlight inspired by the APIX logo mark. Use it as:

- Login background accent
- Dashboard header accent
- Progress card decoration
- Empty state illustration element

Use it sparingly. One strong brand gesture is better than many decorations.

---

## 4. Frontend Architecture

Use feature-based architecture.

```text
src
│
├── app
│   ├── (auth)
│   │   ├── login
│   │   ├── forgot-password
│   │   └── reset-password
│   ├── (dashboard)
│   │   ├── dashboard
│   │   ├── students
│   │   ├── parents
│   │   ├── employees
│   │   ├── campuses
│   │   ├── rooms
│   │   ├── courses
│   │   ├── classes
│   │   ├── schedules
│   │   ├── attendance
│   │   ├── homework
│   │   ├── scores
│   │   ├── learning-reports
│   │   ├── tuition
│   │   ├── payroll
│   │   ├── contact-logs
│   │   ├── notifications
│   │   └── settings
│   ├── layout.tsx
│   └── globals.css
│
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
│
├── features
│   ├── auth
│   ├── users
│   ├── roles
│   ├── employees
│   ├── students
│   ├── parents
│   ├── campuses
│   ├── rooms
│   ├── courses
│   ├── classes
│   ├── schedules
│   ├── attendance
│   ├── homework
│   ├── scores
│   ├── learning-reports
│   ├── tuition
│   ├── payroll
│   ├── notifications
│   ├── contact-logs
│   ├── dashboard
│   └── ai
│
├── hooks
├── lib
│   ├── api
│   ├── auth
│   ├── query
│   ├── permissions
│   ├── dates
│   └── utils
│
├── providers
├── schemas
├── stores
├── styles
├── types
└── constants
```

Each feature should follow this pattern:

```text
features/students
│
├── api
│   └── student.api.ts
├── components
│   ├── StudentForm.tsx
│   ├── StudentTable.tsx
│   ├── StudentDetailCard.tsx
│   └── StudentParentSection.tsx
├── hooks
│   ├── useStudents.ts
│   ├── useStudentDetail.ts
│   └── useCreateStudent.ts
├── schemas
│   └── student.schema.ts
├── types
│   └── student.type.ts
├── utils
└── index.ts
```

---

## 5. SOLID Principles for Frontend

### 5.1 Single Responsibility Principle

A component should do one main job.

Wrong:

```text
StudentPage handles API calls, table rendering, form state, modal state, validation, and permissions.
```

Correct:

```text
StudentPage composes smaller units:
- StudentToolbar
- StudentTable
- StudentCreateDialog
- StudentFilters
```

### 5.2 Open/Closed Principle

Components should be open for extension and closed for breaking modification.

Use variants:

```tsx
<Button variant="primary" />
<Button variant="danger" />
<Button variant="glass" />
```

Do not rewrite a shared component for one page-specific case. Add a variant or compose a wrapper.

### 5.3 Liskov Substitution Principle

Component variants must preserve expected behavior.

If `AppDialog` accepts `open` and `onOpenChange`, every variant must keep those props working.

### 5.4 Interface Segregation Principle

Do not create huge prop interfaces.

Wrong:

```ts
type StudentFormProps = {
  student: Student;
  parents: Parent[];
  classes: Class[];
  invoices: Invoice[];
  scores: Score[];
  reports: Report[];
};
```

Correct:

```ts
type StudentFormProps = {
  initialValues?: StudentFormValues;
  onSubmit: (values: StudentFormValues) => void;
  isSubmitting?: boolean;
};
```

### 5.5 Dependency Inversion Principle

UI components should depend on abstractions, not direct API calls.

Wrong:

```tsx
function StudentForm() {
  await axios.post('/students', values);
}
```

Correct:

```tsx
function StudentForm({ onSubmit }: Props) {
  return <form onSubmit={handleSubmit(onSubmit)} />;
}
```

---

## 6. Routing and Layout

### 6.1 Route groups

Use route groups:

```text
app/(auth)
app/(dashboard)
```

### 6.2 Dashboard shell

The dashboard shell should include:

```text
AppSidebar
TopBar
Breadcrumb
MainContent
CommandMenu
NotificationPanel
UserMenu
```

### 6.3 Permission-based navigation

Do not show navigation items based on role name. Use permission codes.

```ts
export const sidebarItems = [
  {
    title: 'Students',
    href: '/students',
    permission: 'student:read',
  },
  {
    title: 'Tuition',
    href: '/tuition',
    permission: 'tuition:read',
  },
  {
    title: 'Payroll',
    href: '/payroll',
    permission: 'payroll:read',
  },
];
```

Render:

```ts
const visibleItems = sidebarItems.filter((item) =>
  hasPermission(currentUser.permissions, item.permission),
);
```

---

## 7. Authentication Flow

### 7.1 Login

Login screen must include:

- APIX logo
- Strong red visual identity
- Liquid glass login card
- Email/phone/username input
- Password input
- Forgot password link
- Clear validation messages

### 7.2 Token handling

Recommended approach:

- Store access token in memory when possible.
- Store refresh token in secure HTTP-only cookie if backend supports it.
- If token must be stored on frontend, prefer a controlled auth storage module and never spread token logic across the app.
- Auto-refresh access token through a single API client interceptor/wrapper.
- Logout must clear all auth state and query cache.

### 7.3 Auth state

Auth state should include:

```ts
export type CurrentUser = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  permissions: string[];
  roles: string[];
  campusScopes?: string[];
};
```

The UI may display roles, but business visibility must depend on permissions.

---

## 8. Student and Parent Account UX

The system must support students without phones or login accounts.

### 8.1 Student create/edit form

The student form must include an account access section:

```text
Student account access
[ ] Create a login account for this student
```

If checked:

```text
Email / Phone / Username
Temporary password
Access mode: OWN_ACCOUNT
```

If unchecked:

```text
Access mode options:
- Parent managed
- No account
```

Recommended default:

| Student type | Default access mode           |
| ------------ | ----------------------------- |
| Kindergarten | PARENT_MANAGED                |
| Child        | PARENT_MANAGED                |
| Teenager     | OWN_ACCOUNT or PARENT_MANAGED |
| Adult        | OWN_ACCOUNT                   |

### 8.2 Parent profile

A parent can exist as a contact profile without a login account.

The parent detail page should show:

```text
Login account: Not created
Action: Create parent login account
```

### 8.3 Parent dashboard

A parent may have multiple children.

Parent dashboard structure:

```text
Parent Dashboard
│
├── Child switcher
│   ├── Nguyen Minh Anh
│   └── Tran Bao Ngoc
│
├── Attendance
├── Homework
├── Scores
├── Tuition
├── Timetable
└── Learning Reports
```

### 8.4 Student portal

Only students with `accessMode = OWN_ACCOUNT` can use the student portal.

Students with `PARENT_MANAGED` or `NO_ACCOUNT` must not see student login features.

---

## 9. API Client Standard

Centralize API calls.

```text
lib/api
│
├── api-client.ts
├── api-error.ts
├── api-response.ts
└── endpoints.ts
```

Example response type:

```ts
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: PageMeta;
};

export type ApiError = {
  success: false;
  errorCode: string;
  message: string;
  details?: Array<{
    field?: string;
    message: string;
  }>;
};
```

Do not call `fetch` or `axios` directly inside UI components.

---

## 10. TanStack Query Standard

Use TanStack Query for server state.

Query key convention:

```ts
export const studentKeys = {
  all: ['students'] as const,
  lists: () => [...studentKeys.all, 'list'] as const,
  list: (filters: StudentFilters) => [...studentKeys.lists(), filters] as const,
  detail: (id: string) => [...studentKeys.all, 'detail', id] as const,
};
```

Mutation rule:

```text
After create/update/delete, invalidate affected list and detail queries.
```

Do not store server lists in Redux unless there is a very strong reason.

---

## 11. Form Standard

Use:

```text
React Hook Form + Zod
```

Example:

```ts
export const studentSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  studentType: z.enum(['KINDERGARTEN', 'CHILD', 'TEENAGER', 'ADULT']),
  accessMode: z.enum(['NO_ACCOUNT', 'PARENT_MANAGED', 'OWN_ACCOUNT']),
  phone: z.string().optional(),
});
```

Form UX rules:

- Use inline validation.
- Keep error messages clear.
- Disable submit button while submitting.
- Show success toast after successful action.
- Keep destructive actions behind confirmation dialogs.
- Preserve user input when validation fails.

---

## 12. Component System

### 12.1 Base components

Create wrappers around Shadcn UI when needed.

```text
components/ui
components/forms
components/data-table
components/feedback
components/permission
```

Required shared components:

```text
AppButton
AppCard
AppDialog
AppDrawer
AppDataTable
AppFormField
AppSelect
AppDatePicker
AppBadge
AppStatusBadge
AppEmptyState
AppPageHeader
AppBreadcrumb
PermissionGate
ConfirmDialog
```

### 12.1.1 Global Confirmation System (`useConfirm`)

To avoid duplicating dialog open states and rendering local JSX in multiple components, trigger confirmations programmatically using the global `useConfirm` hook:

```tsx
import { useConfirm } from "@/hooks/use-confirm";

const confirm = useConfirm();

const handleAction = async () => {
  const isConfirmed = await confirm({
    title: "Xác nhận hành động",
    description: "Bạn có chắc chắn muốn thực hiện hành động này không?",
    confirmLabel: "Xác nhận",
    cancelLabel: "Hủy",
    variant: "default", // or "destructive"
  });

  if (isConfirmed) {
    // Execute action
  }
};
```

### 12.2 Data table

Every list page should share the same table system.

Required table features:

- Server-side pagination
- Server-side sorting
- Search
- Filters
- Column visibility
- Row actions
- Loading skeleton
- Empty state
- Error state

### 12.3 Status badges

Use consistent colors.

```text
ACTIVE       green
INACTIVE     gray
PENDING      yellow
OVERDUE      red
PAID         green
UNPAID       red
DRAFT        gray
APPROVED     green
REJECTED     red
```

---

## 13. Page Standards

### 13.1 List page layout

```text
PageHeader
  title
  description
  primary action

FilterBar
  search
  status filter
  date range filter

DataTable
  rows
  actions
  pagination
```

### 13.2 Detail page layout

```text
Header card
  avatar/logo
  title
  status
  quick actions

Tabs
  Overview
  Related data
  History
  Files
  Audit
```

### 13.3 Create/update flow

Use modal for simple forms.  
Use full page for complex workflows.

Simple modal examples:

```text
Create campus
Create room
Create position
```

Full page examples:

```text
Create student with parent links
Create class with schedule and staff
Create invoice with items and discounts
```

---

## 14. Feature Requirements

### 14.1 Students

Student pages must support:

- List students
- Create student
- Edit student
- View student detail
- Link parents
- Manage account access mode
- Create login account later
- View enrollments
- View attendance
- View homework
- View scores
- View learning reports
- View tuition

### 14.2 Parents

Parent pages must support:

- List parents
- Create parent profile
- Edit parent profile
- Link children
- Manage notification permissions
- Manage pickup permission
- Create login account later
- View contact logs

### 14.3 Classes

Class pages must support:

- Create class
- Assign teacher
- Assign teaching assistant
- Set capacity
- Enroll students
- Create recurring schedule
- Detect schedule conflicts
- Generate sessions
- View class attendance
- View homework
- View scores

### 14.4 Attendance

Attendance page must support:

- Class session selector
- Student list
- Present/Late/Absent/Excused controls
- Bulk mark present
- Save attendance
- Notes
- Absence warning

### 14.5 Tuition

Tuition pages must support:

- Invoice list
- Invoice detail
- Create invoice
- Add payment
- Refund workflow
- Overdue status
- Reminder status
- Payment history

### 14.6 Contact logs

Contact log pages must support:

- Create contact log
- View by parent
- View by student
- Filter by channel
- Filter by employee
- Teacher users must not see direct parent communication actions unless explicitly granted permission.

---

## 15. Permission System in Frontend

### 15.1 Permission gate

```tsx
type PermissionGateProps = {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const permissions = useCurrentUserPermissions();

  if (!permissions.includes(permission)) {
    return fallback;
  }

  return <>{children}</>;
}
```

### 15.2 Do not rely only on frontend permission checks

Frontend permission checks improve UX but do not secure data. Backend must enforce all permissions again.

---

## 16. Security Requirements

Frontend must:

- Never log tokens.
- Never expose secrets in environment variables.
- Never trust user input.
- Escape or sanitize rich text.
- Avoid `dangerouslySetInnerHTML` unless sanitized.
- Handle 401 by refreshing token or logging out.
- Handle 403 with a clear permission error screen.
- Clear query cache on logout.
- Validate file type and size before upload.

---

## 17. Performance Requirements

Frontend must:

- Use pagination for large lists.
- Debounce search input.
- Use query caching.
- Lazy load heavy modules.
- Use skeleton loading.
- Avoid unnecessary global state.
- Avoid rendering huge tables without pagination or virtualization.
- Memoize expensive table columns when needed.
- Optimize images and avatars.

Use dynamic imports for heavy pages:

```ts
const PayrollDashboard = dynamic(() => import('@/features/payroll/components/PayrollDashboard'));
```

---

## 18. Accessibility Requirements

Minimum requirements:

- Keyboard navigation works.
- Focus states are visible.
- Color is not the only way to communicate status.
- Dialogs trap focus.
- Form errors are associated with fields.
- Buttons have accessible names.
- Tables have meaningful headers.
- Reduced motion is respected.

---

## 19. Copywriting Rules

Interface copy should be clear, direct, and action-based.

Use:

```text
Save changes
Create student
Mark attendance
Collect payment
Send report
```

Avoid:

```text
Submit
Confirm action
Process data
```

Error messages should tell users what happened and what to do.

Good:

```text
This room is already booked at this time. Choose another room or change the schedule.
```

Bad:

```text
Invalid request.
```

---

## 20. UI Examples

### 20.1 Login concept

```text
Full red gradient background
Large APIX logo mark
Liquid glass login card
Learning Arc accent behind card
Simple form with strong focus states
```

### 20.2 Dashboard concept

```text
Top header with APIX logo
Left glass sidebar
White/soft gray background
Red active navigation item
Floating metric cards
Schedule timeline
Urgent alerts panel
```

### 20.3 Student detail concept

```text
Student profile card
Access mode badge: Parent managed / Own account / No account
Parent/guardian cards
Learning progress tabs
Attendance summary
Tuition summary
```

---

## 21. Add-Only Maintenance Rule

Shared components should not be broken for new requirements.

When a page needs a new behavior:

1. Add a new prop if it is generic.
2. Add a variant if it is visual.
3. Compose a wrapper if it is feature-specific.
4. Create a feature component if it is domain-specific.

Do not modify a shared component in a way that breaks existing pages.

---

## 22. Testing Standard

Required tests:

```text
Unit tests for utilities
Component tests for complex components
Form validation tests
Permission rendering tests
Playwright E2E tests for critical workflows
```

Critical E2E flows:

```text
Login
Create student without login account
Create parent and link to student
Create student with own account
Create class
Create schedule
Mark attendance
Create invoice
Collect payment
Create contact log
```

---

## 23. Development Roadmap

### Phase 1: UI foundation

```text
Project setup
TailwindCSS
Shadcn UI
Design tokens
App layout
Auth layout
API client
Query provider
Permission provider
```

### Phase 2: Auth and RBAC UI

```text
Login
Forgot password
Current user profile
Permission-based sidebar
Roles
Permissions
User roles
```

### Phase 3: Master data UI

```text
Campus
Room
Level
Course
Curriculum
Lesson
```

### Phase 4: People UI

```text
Employees
Positions
Parents
Students
Student-parent links
Student account mode
Parent login account creation
```

### Phase 5: Academic UI

```text
Classes
Class staff
Enrollments
Schedules
Sessions
Conflict detection UI
```

### Phase 6: Operations UI

```text
Attendance
Homework
Scores
Learning reports
Report delivery
Contact logs
```

### Phase 7: Finance and HR UI

```text
Invoices
Payments
Refunds
Installments
Payroll
Leave requests
```

### Phase 8: Automation and AI UI

```text
Notifications
AI learning report generator
AI homework generator
AI lesson plan generator
AI student progress analysis
```

---

## 24. Definition of Done

A frontend task is done only when:

- UI follows the APIX design tokens.
- Page is responsive.
- Loading state exists.
- Empty state exists.
- Error state exists.
- Form validation exists.
- Permission checks exist.
- API calls are centralized through feature API files.
- TanStack Query keys are stable.
- No direct fetch/axios call exists inside presentational components.
- TypeScript types are defined.
- Component does not break existing shared behavior.
- Basic tests are added for important logic.
- Accessibility basics are respected.
