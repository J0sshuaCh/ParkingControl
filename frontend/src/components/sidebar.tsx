"use client"

import { useState } from "react"
import { Car, CreditCard, Grid3x3, Settings, ParkingCircle, LayoutDashboard, Clock, Sliders, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  // Estado para controlar si el sidebar está colapsado
  const [isCollapsed, setIsCollapsed] = useState(false)

  const modules = [
    { id: "overview", label: "Panel de Control", icon: LayoutDashboard },
    { id: "vehicles", label: "Registro de Vehículos", icon: Car },
    { id: "billing", label: "Salida y Cobro", icon: CreditCard },
    { id: "spaces", label: "Gestión de Espacios", icon: Grid3x3 },
    { id: "shifts", label: "Gestión de Turnos", icon: Clock },
    { id: "config", label: "Configuración", icon: Sliders },
    { id: "admin", label: "Administración", icon: Settings },
  ]

  return (
    <aside
      className={`bg-white text-gray-800 border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Encabezado del Sidebar */}
      <div className={`p-4 border-b border-gray-200 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
          <ParkingCircle className="w-6 h-6 text-white" />
        </div>

        {/* Texto del logo (se oculta al colapsar) */}
        {!isCollapsed && (
          <div className="overflow-hidden animate-in fade-in duration-300">
            <h1 className="font-bold text-lg truncate">ParkingControl</h1>
            <p className="text-xs text-gray-500 truncate">Sistema de Gestión</p>
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
              title={isCollapsed ? module.label : ""} // Tooltip nativo cuando está colapsado
              className={`w-full transition-all duration-200 ${isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-4"
                } ${isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-800 hover:bg-gray-200 hover:text-gray-800"
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm truncate animate-in fade-in duration-200">{module.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Botón para Colapsar/Expandir */}
      <div className="p-4 border-t border-gray-200 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <div className="flex items-center text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <ChevronLeft className="w-4 h-4 mr-2" /> Ocultar Menú
            </div>
          )}
        </Button>
      </div>
    </aside>
  )
}