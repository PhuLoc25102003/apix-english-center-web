/**
 * APIX Brand Color Tokens — standard §3.3
 *
 * Use these constants instead of raw hex values in code.
 * The CSS variables in globals.css are the primary source of truth
 * for Tailwind; use these constants in JS logic (e.g., Recharts colors).
 */

export const brandColors = {
  apixRed: "#FF161A",
  apixRedDark: "#C90012",
  apixRedSoft: "#FFE8EA",
  ink: "#111827",
  mutedInk: "#6B7280",
  surface: "#FFFFFF",
  surfaceSoft: "#F8FAFC",
  glassWhite: "rgba(255, 255, 255, 0.72)",
  glassBorder: "rgba(255, 255, 255, 0.42)",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
} as const;

export type BrandColor = keyof typeof brandColors;

/**
 * Status badge color map — standard §12.3
 *
 * Maps status strings to Tailwind CSS class fragments.
 * Use AppStatusBadge component to render these consistently.
 */
export const statusColors = {
  ACTIVE: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  INACTIVE: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  PENDING: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },
  OVERDUE: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  PAID: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  UNPAID: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  DRAFT: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  APPROVED: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  REJECTED: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
} as const;

export type StatusKey = keyof typeof statusColors;

/**
 * Recharts-friendly color palette using APIX brand.
 * Use for charts, graphs, and data visualisations.
 */
export const chartColors = [
  brandColors.apixRed,
  "#F59E0B",
  "#16A34A",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
] as const;
