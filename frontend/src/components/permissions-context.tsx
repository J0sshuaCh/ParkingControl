"use client"

import { createContext, useContext, type ReactNode } from "react"

export type UserRole = "Administrador" | "Supervisor" | "Operador"

interface Permission {
  canViewDashboard: boolean
  canRegisterVehicles: boolean
  canProcessBilling: boolean
  canManageSpaces: boolean
  canManageShifts: boolean
  canAccessConfiguration: boolean
  canAccessAdministration: boolean
  canEditTickets: boolean
  canCancelTickets: boolean
  canManageUsers: boolean
  canExportReports: boolean
}

const rolePermissions: Record<UserRole, Permission> = {
  Administrador: {
    canViewDashboard: true,
    canRegisterVehicles: true,
    canProcessBilling: true,
    canManageSpaces: true,
    canManageShifts: true,
    canAccessConfiguration: true,
    canAccessAdministration: true,
    canEditTickets: true,
    canCancelTickets: true,
    canManageUsers: true,
    canExportReports: true,
  },
  Supervisor: {
    canViewDashboard: true,
    canRegisterVehicles: true,
    canProcessBilling: true,
    canManageSpaces: true,
    canManageShifts: true,
    canAccessConfiguration: false,
    canAccessAdministration: false,
    canEditTickets: true,
    canCancelTickets: true,
    canManageUsers: false,
    canExportReports: true,
  },
  Operador: {
    canViewDashboard: true,
    canRegisterVehicles: true,
    canProcessBilling: true,
    canManageSpaces: false,
    canManageShifts: false,
    canAccessConfiguration: false,
    canAccessAdministration: false,
    canEditTickets: false,
    canCancelTickets: false,
    canManageUsers: false,
    canExportReports: false,
  },
}

interface PermissionsContextType {
  userRole: UserRole
  permissions: Permission
  hasPermission: (permission: keyof Permission) => boolean
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined)

interface PermissionsProviderProps {
  children: ReactNode
  userRole: UserRole
}

export function PermissionsProvider({ children, userRole }: PermissionsProviderProps) {
  const permissions = rolePermissions[userRole]

  const hasPermission = (permission: keyof Permission): boolean => {
    return permissions[permission]
  }

  return (
    <PermissionsContext.Provider value={{ userRole, permissions, hasPermission }}>
      {children}
    </PermissionsContext.Provider>
  )
}

export function usePermissions() {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error("usePermissions must be used within PermissionsProvider")
  }
  return context
}
