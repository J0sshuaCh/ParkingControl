"use client"

import { Car, CreditCard, Grid3x3, Settings, ParkingCircle, LayoutDashboard, Clock, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
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
    <aside className="w-64 bg-white text-gray-800 border-r border-gray-200 flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
            <ParkingCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">ParkingControl</h1>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          return (
            <Button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 transition-smooth ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{module.label}</span>
            </Button>
          )
        })}
      </nav>

      {/* <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">v2.0 - ParkingControl</p>
      </div> */}
    </aside>
  )
}
