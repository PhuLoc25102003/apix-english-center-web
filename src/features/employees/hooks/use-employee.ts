import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "../api/employee.api";
import { employeeKeys } from "@/lib/api/query-keys";

export function useEmployee(id: string) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeeApi.getById(id),
    enabled: Boolean(id),
  });
}
