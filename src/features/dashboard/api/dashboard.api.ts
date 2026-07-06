import { apiClient } from "@/lib/api/api-client";
import type {
  OwnerDashboardStats,
  OfficeDashboardStats,
  TeacherDashboardStats,
  EmployeeDashboardStats,
} from "../types/dashboard.type";

export async function fetchOwnerStats(filter: string): Promise<OwnerDashboardStats> {
  const { data } = await apiClient.get<OwnerDashboardStats>(`/dashboard/owner`, {
    params: { range: filter },
  });
  return data;
}

export async function fetchOfficeStats(): Promise<OfficeDashboardStats> {
  const { data } = await apiClient.get<OfficeDashboardStats>(`/dashboard/office`);
  return data;
}

export async function fetchTeacherStats(): Promise<TeacherDashboardStats> {
  const { data } = await apiClient.get<TeacherDashboardStats>(`/dashboard/teacher`);
  return data;
}

export async function fetchEmployeeStats(): Promise<EmployeeDashboardStats> {
  const { data } = await apiClient.get<EmployeeDashboardStats>(`/dashboard/employee`);
  return data;
}
