"use client"

import { Car, CreditCard, Grid3x3, Settings, LayoutDashboard, BarChart3, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileFooterNavProps {
  activeModule: string
  onModuleChange: (module: string) => void
  userRole: string
}

export function MobileFooterNav({ activeModule, onModuleChange, userRole }: MobileFooterNavProps) {
  const allModules = [
    { id: "overview", label: "Panel", icon: LayoutDashboard },
    { id: "vehicles", label: "Entrada", icon: Car },
    { id: "billing", label: "Salida", icon: CreditCard },
    { id: "history", label: "Historial", icon: FileText },
    { id: "spaces", label: "Espacios", icon: Grid3x3 },
    { id: "reports", label: "Reportes", icon: BarChart3 },
    { id: "admin", label: "Admin", icon: Settings },
  ]

  const modules = allModules.filter(m => {
    if (m.id === 'admin') return userRole.toLowerCase() === 'administrador'
    if (m.id === 'reports') return userRole.toLowerCase() === 'administrador' || userRole.toLowerCase() === 'supervisor'
    return true
  })

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl md:hidden safe-bottom">
      <div className="flex items-center justify-around px-1 py-1.5">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl min-w-0 flex-1 transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              )}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-105"
              )} />
              <span className={cn(
                "text-[10px] font-medium truncate leading-tight transition-colors",
                isActive && "text-primary font-semibold"
              )}>
                {module.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
