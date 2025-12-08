"use client"

import { User, LogOut, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { getDashboardOverview } from "@/services/dashboardService"

interface HeaderProps {
  userName: string
  onLogout: () => void
  onNavigate: (module: string) => void
}

export function Header({ userName, onLogout, onNavigate }: HeaderProps) {
  const [isFull, setIsFull] = useState(false);

  // Efecto para verificar si está lleno (se ejecuta al cargar y cada 30 segundos)
  useEffect(() => {
    const checkOccupancy = async () => {
      try {
        const data = await getDashboardOverview();
        // Si data.stats.freeSpaces es 0, activamos la alerta
        if (data && data.stats.freeSpaces === 0) {
          setIsFull(true);
        } else {
          setIsFull(false);
        }
      } catch (error) {
        console.error("Error verificando ocupación en Header:", error);
      }
    };

    // 1. Ejecutar inmediatamente
    checkOccupancy();

    // 2. Ejecutar cada 30 segundos para mantenerlo actualizado en tiempo real
    const intervalId = setInterval(checkOccupancy, 800);

    // Limpieza al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">

      {/* SECCIÓN IZQUIERDA: ALERTA DE SISTEMA LLENO */}
      <div className="flex-1 flex items-center">
        {isFull && (
          // 2. Acción al hacer click: Ir al módulo de espacios ('spaces')
          <div onClick={() => onNavigate('spaces')}
            className="flex items-center gap-3 px-4 py-2 bg-red-600 text-white rounded-md shadow-md animate-pulse transition-all duration-300 transform hover:scale-105 cursor-pointer hover:bg-red-700"
            title="Ir a Gestión de Espacios para liberar lugar"
          >
            <div className="bg-white/20 p-1 rounded-full">
              <AlertCircle className="w-5 h-5 font-bold" />
            </div>
            <span className="text-sm font-bold tracking-wide uppercase">
              ¡Estacionamiento Lleno!
            </span>
          </div>
        )}
      </div>

      {/* SECCIÓN DERECHA: USUARIO */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg border border-transparent hover:border-border transition-all">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{userName}</span>
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          title="Cerrar Sesión"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}