'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

type AdminRole = 'admin' | 'editor' | 'viewer';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AdminRole[];
  fallback?: React.ReactNode;
}

/**
 * RoleGuard component to conditionally render UI elements based on the user's admin role.
 * 
 * ADMIN: Full access
 * EDITOR: Can view/edit but not delete or access settings
 * VIEWER: Read-only access
 */
export default function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleGuardProps) {
  const { data: session } = useSession();
  
  const userRole = (session?.user as any)?.role as AdminRole || 'viewer';
  
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}
