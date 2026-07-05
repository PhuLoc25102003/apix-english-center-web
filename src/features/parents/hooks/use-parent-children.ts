"use client";

/**
 * src/features/parents/hooks/use-parent-children.ts
 *
 * Query hook for retrieving children linked to a parent.
 */

import { useQuery } from "@tanstack/react-query";
import { parentChildApi } from "../api/parent-child.api";
import { parentKeys } from "@/lib/api/query-keys";

export function useParentChildren(parentId: string) {
  return useQuery({
    queryKey: parentKeys.children(parentId),
    queryFn: () => parentChildApi.getChildren(parentId),
    enabled: !!parentId,
  });
}
