import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "../api/employee.api";
import { employeeKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useEmployees(params?: ListParams) {
  return useQuery({
    queryKey: employeeKeys.list(params ?? {}),
    queryFn: () => employeeApi.getAll(params),
  });
}
