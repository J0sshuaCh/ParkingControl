"use client"

import { useState } from "react"
import { Car, CreditCard, Grid3x3, Settings, ParkingCircle, LayoutDashboard, Clock, ChevronLeft, ChevronRight, Moon, Sun, BarChart3, FileText, Plus, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import { toast } from "sonner"
import { registrarEntrada, verificarPlaca } from "@/services/vehiculoService"

interface SidebarProps {
  activeModule: string
  onModuleChange: (module: string) => void
  userRole: string
}

export function Sidebar({ activeModule, onModuleChange, userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme, appliedTheme, setTheme, isHighContrast, toggleHighContrast } = useTheme()
  
  // Quick registration state
  const [quickPlate, setQuickPlate] = useState("")
  const [quickLoading, setQuickLoading] = useState(false)

  const allModules = [
    { id: "overview", label: "Panel de Control", icon: LayoutDashboard },
    { id: "vehicles", label: "Registro de Vehículos", icon: Car },
    { id: "billing", label: "Salida y Cobro", icon: CreditCard },
    { id: "history", label: "Historial de Tickets", icon: FileText },
    { id: "spaces", label: "Gestión de Espacios", icon: Grid3x3 },
    { id: "reports", label: "Reportes", icon: BarChart3 },
    { id: "admin", label: "Administración", icon: Settings },
  ]

  // Filter modules based on user role
  const modules = allModules.filter(m => {
    if (m.id === 'admin') return userRole.toLowerCase() === 'administrador';
    if (m.id === 'reports') return userRole.toLowerCase() === 'administrador' || userRole.toLowerCase() === 'supervisor';
    return true;
  });

  // Quick registration handler
  const handleQuickRegister = async () => {
    if (!quickPlate.trim()) {
      toast.warning("Ingresa una placa")
      return
    }
    if (!quickPlate.includes("-")) {
      toast.warning("La placa debe incluir guión (ej: ABC-123)")
      return
    }

    setQuickLoading(true)
    try {
      const existe = await verificarPlaca(quickPlate.toUpperCase())
      if (existe) {
        toast.error(`El vehículo ${quickPlate} ya está dentro`)
        setQuickLoading(false)
        return
      }

      const response = await registrarEntrada({
        placa: quickPlate.toUpperCase(),
        tipo_vehiculo: "Sedan",
        modo_asignacion: "auto"
      })

      toast.success("Registro rápido exitoso", {
        description: `Ticket: ${response.ticket} | Espacio: ${response.espacio}`
      })
      setQuickPlate("")
    } catch (err: any) {
      toast.error(err.message || "Error al registrar")
    } finally {
      setQuickLoading(false)
    }
  }


  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground border-r border-border flex flex-col shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Encabezado del Sidebar */}
      <div className={`p-6 border-b border-border flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
          <ParkingCircle className="w-6 h-6 text-primary-foreground" />
        </div>

        {/* Texto del logo */}
        {!isCollapsed && (
          <div className="overflow-hidden animate-in fade-in duration-300">
            <h1 className="font-bold text-lg truncate bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">ParkingControl</h1>
            <p className="text-xs text-muted-foreground truncate">Sistema de Gestión</p>
          </div>
        )}
      </div>

      {/* Quick Registration Widget */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Plus className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Registro Rápido</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="ABC-123"
              value={quickPlate}
              onChange={(e) => setQuickPlate(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleQuickRegister()}
              disabled={quickLoading}
              className="h-9 text-sm uppercase"
              maxLength={7}
            />
            <Button
              size="icon-sm"
              onClick={handleQuickRegister}
              disabled={quickLoading}
              className="h-9 w-9 shrink-0"
            >
              {quickLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Navegación */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          return (
            <Button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              variant="ghost"
              title={isCollapsed ? module.label : ""}
              className={`w-full transition-all duration-200 relative group ${isCollapsed ? "justify-center px-0 h-11" : "justify-start gap-3 px-4 h-11"
                } ${isActive
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full transition-all duration-300" />
              )}
              
              <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
              {!isCollapsed && (
                <span className="text-sm truncate animate-in fade-in duration-200">{module.label}</span>
              )}
              
              {/* Hover glow effect */}
              {!isActive && (
                <span className="absolute inset-0 rounded-md bg-primary/0 group-hover:bg-primary/5 transition-colors duration-200" />
              )}
            </Button>
          )
        })}
      </nav>

      {/* SECCIÓN INFERIOR */}
      <div className="p-4 border-t border-border flex flex-col gap-2 justify-center">

        {/* Selector de Modo de Tema */}
        <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
          <SelectTrigger className="w-full justify-start px-0 gap-3">
            <div className={`flex items-center w-full ${isCollapsed ? "justify-center" : "px-4 gap-3"}`}>
              {appliedTheme === "light" ? (
                <Sun className="w-5 h-5 text-orange-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
              {!isCollapsed && (
                <span className="text-sm truncate animate-in fade-in duration-200">
                  {theme === "system"
                    ? "Sistema"
                    : theme === "light"
                    ? "Modo Claro"
                    : "Modo Oscuro"
                  }
                </span>
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Modo Claro</SelectItem>
            <SelectItem value="dark">Modo Oscuro</SelectItem>
            <SelectItem value="system">Sistema</SelectItem>
          </SelectContent>
        </Select>

        {/* Toggle Alto Contraste */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleHighContrast}
          className={`w-full justify-start gap-3 ${isCollapsed ? "justify-center px-0" : "px-4"} ${isHighContrast ? "text-primary bg-primary/10" : ""}`}
          title="Alto contraste"
        >
          <Eye className={`w-5 h-5 ${isHighContrast ? "text-primary" : "text-muted-foreground"}`} />
          {!isCollapsed && (
            <span className="text-sm truncate">Alto Contraste</span>
          )}
        </Button>

        {/* Botón Colapsar */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200 hover:scale-110" />
          ) : (
            <div className="flex items-center text-muted-foreground text-xs uppercase font-semibold tracking-wider">
              <ChevronLeft className="w-4 h-4 mr-2 transition-transform duration-200" /> Ocultar Menú
            </div>
          )}
        </Button>
      </div>
    </aside>
  )
}