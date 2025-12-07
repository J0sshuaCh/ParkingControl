"use client"

import { useState } from "react"
import { Car, CreditCard, Grid3x3, Settings, ParkingCircle, LayoutDashboard, Clock, Sliders, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
  userRole: string
}

export function Sidebar({ activeModule, onModuleChange, userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const allModules = [
    { id: "overview", label: "Panel de Control", icon: LayoutDashboard },
    { id: "vehicles", label: "Registro de Vehículos", icon: Car },
    { id: "billing", label: "Salida y Cobro", icon: CreditCard },
    { id: "spaces", label: "Gestión de Espacios", icon: Grid3x3 },
    { id: "admin", label: "Administración", icon: Settings },
  ]

  // Filter modules based on user role
  const modules = allModules.filter(m => {
    if (m.id === 'admin') return userRole.toLowerCase() === 'administrador';
    return true;
  });

  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground border-r border-border flex flex-col shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Encabezado del Sidebar */}
      <div className={`p-6 border-b border-border flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <ParkingCircle className="w-6 h-6 text-primary-foreground" />
        </div>

        {/* Texto del logo */}
        {!isCollapsed && (
          <div className="overflow-hidden animate-in fade-in duration-300">
            <h1 className="font-bold text-lg truncate">ParkingControl</h1>
            <p className="text-xs text-muted-foreground truncate">Sistema de Gestión</p>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-2 space-y-2 overflow-y-auto overflow-x-hidden">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          return (
            <Button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              variant={isActive ? "default" : "ghost"}
              title={isCollapsed ? module.label : ""}
              className={`w-full transition-all duration-200 ${isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-4"
                } ${isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm truncate animate-in fade-in duration-200">{module.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* SECCIÓN INFERIOR */}
      <div className="p-4 border-t border-border flex flex-col gap-2 justify-center">

        {/* Botón Modo Oscuro */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full hover:bg-accent hover:text-accent-foreground justify-start px-0"
        >
          <div className={`flex items-center w-full ${isCollapsed ? "justify-center" : "px-4 gap-3"}`}>
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-orange-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}

            {!isCollapsed && (
              <span className="text-sm truncate animate-in fade-in duration-200">
                {theme === "light" ? "Modo Claro" : "Modo Oscuro"}
              </span>
            )}
          </div>
        </Button>

        {/* Botón Colapsar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full hover:bg-accent hover:text-accent-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <div className="flex items-center text-muted-foreground text-xs uppercase font-semibold tracking-wider">
              <ChevronLeft className="w-4 h-4 mr-2" /> Ocultar Menú
            </div>
          )}
        </Button>
      </div>
    </aside>
  )
}