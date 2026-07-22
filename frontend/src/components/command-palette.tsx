"use client"

import * as React from "react"
import {
  Car,
  CreditCard,
  Grid3x3,
  Settings,
  LayoutDashboard,
  FileText,
  BarChart3,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command"
import { useTheme } from "@/components/theme-provider"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (module: string) => void
  onLogout: () => void
  userRole: string
}

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
  onLogout,
  userRole,
}: CommandPaletteProps) {
  const { appliedTheme, setTheme } = useTheme()

  const modules = [
    { id: "overview", label: "Panel de Control", icon: LayoutDashboard, shortcut: "1" },
    { id: "vehicles", label: "Registro de Vehículos", icon: Car, shortcut: "2" },
    { id: "billing", label: "Salida y Cobro", icon: CreditCard, shortcut: "3" },
    { id: "history", label: "Historial de Tickets", icon: FileText, shortcut: "4" },
    { id: "spaces", label: "Gestión de Espacios", icon: Grid3x3, shortcut: "5" },
    { id: "reports", label: "Reportes", icon: BarChart3, shortcut: "6" },
    { id: "admin", label: "Administración", icon: Settings, shortcut: "7" },
  ]

  // Filter modules based on user role
  const visibleModules = modules.filter(m => {
    if (m.id === 'admin') return userRole.toLowerCase() === 'administrador';
    if (m.id === 'reports') return userRole.toLowerCase() === 'administrador' || userRole.toLowerCase() === 'supervisor';
    return true;
  });

  const runCommand = React.useCallback(
    (command: () => void | Promise<void>) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Command Palette" description="Busca módulos o ejecuta acciones rápidas...">
      <CommandInput placeholder="Escribe un comando o busca..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        
        <CommandGroup heading="Módulos">
          {visibleModules.map((module) => {
            const Icon = module.icon
            return (
              <CommandItem
                key={module.id}
                onSelect={() => runCommand(() => onNavigate(module.id))}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{module.label}</span>
                <CommandShortcut>⌘{module.shortcut}</CommandShortcut>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandGroup heading="Apariencia">
          <CommandItem
            onSelect={() => runCommand(() => setTheme(appliedTheme === "light" ? "dark" : "light"))}
          >
            {appliedTheme === "light" ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            <span>Cambiar a modo {appliedTheme === "light" ? "oscuro" : "claro"}</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Cuenta">
          <CommandItem
            onSelect={() => runCommand(() => onLogout())}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
