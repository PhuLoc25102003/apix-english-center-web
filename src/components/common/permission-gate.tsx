"use client";

import * as React from "react";
import { hasPermission } from "@/lib/permissions/has-permission";

type PermissionGateProps = {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function PermissionGate({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) {
  const allowed = hasPermission(permission);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
