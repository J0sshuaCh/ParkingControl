"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Car, Lock, CheckCircle, ParkingCircle, X, AlertTriangle, Map } from "lucide-react"
import { toast } from "sonner"

// --- Importar el servicio de espacios ---
// RUTA CORREGIDA: Incluimos .js para asegurar que el compilador resuelva el módulo transpuesto.
import { getMapaOcupacion, reservarEspacio, liberarEspacio } from "@/services/espaciosService"

// --- CONFIGURACIÓN BASE ---
const USER_ID = 1; // HARDCODED: Esto debe ser dinámico desde el contexto de autenticación

// --- TIPOS DE DATOS ---

// Definimos el estado de un espacio
type SpaceStatus = "libre" | "ocupado" | "reservado"

// Definimos la estructura de un espacio de estacionamiento
interface Space {
  id: string // Código del espacio, Ej: "A-01" (Viene de e.codigo en la BD)
  // 'dbId' es el id_espacio numérico de la base de datos
  dbId?: number;
  status: SpaceStatus
  vehiclePlate?: string // Placa del vehículo si está ocupado
  reservedFor?: string // Motivo de la reserva
  reservedUntil?: string // Duración de la reserva
}

// --- Importamos createPortal para renders fuera del flujo normal ---
import { createPortal } from "react-dom";

// --- COMPONENTE MODAL DE RESERVA (para HU8) ---

function ReserveModal({ space, onClose, onConfirm }: any) {
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!space || !mounted) return null

  const handleConfirm = () => {
    if (reason && duration) {
      onConfirm(space.id, reason, duration)
      onClose()
    } else {
      console.log("Por favor, ingrese el motivo y la duración.")
      toast.warning("Por favor, ingrese el motivo y la duración.")
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reservar Espacio: {space.id}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Motivo de Reserva</label>
            <Input
              placeholder="Ej: Mantenimiento, Cliente VIP"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Duración (Horas)</label>
            <Input
              type="number"
              min="1"
              max="24"
              placeholder="Ej: 2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirmar Reserva
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </div>,
    document.body
  )
}


// --- COMPONENTE MODAL DE DETALLE DE RESERVA ---
function ReservationDetailsModal({ space, onClose, onCancel }: any) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState("Calculando...");

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Efecto del timer rediseñado (El usuario lo había revertido, lo restauramos)
  useEffect(() => {
    if (!space?.reservedUntil) {
      setTimeLeft("N/A");
      return;
    }

    const updateTimer = () => {
      const end = new Date(space.reservedUntil);

      // Validar fecha
      if (isNaN(end.getTime())) {
        setTimeLeft("Fecha Inválida");
        return;
      }

      const now = new Date();
      const diffMs = end.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeLeft("Vencido");
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer(); // Ejecutar inmediatamente
    const interval = setInterval(updateTimer, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, [space]);

  if (!space || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalle de Reserva: {space.id}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Motivo:</span>
              <span>{space.reservedFor || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Vence:</span>
              <span>{space.reservedUntil ? new Date(space.reservedUntil).toLocaleString() : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tiempo Restante:</span>
              <span className="font-bold text-primary">{timeLeft}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => onCancel(space.id)}
              variant="destructive"
              className="flex-1"
            >
              Liberar Espacio
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </Card>
    </div>,
    document.body
  )
}

// --- COMPONENTE ALERTA DE CAPACIDAD (para HU9) ---
function CapacityAlert({ show, onClose }: { show: boolean, onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!show || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <Card className="w-full max-w-md bg-destructive border-destructive p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-destructive-foreground flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            ¡Capacidad Máxima!
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-destructive-foreground hover:bg-destructive/80"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-destructive-foreground mb-4">
          El estacionamiento ha llegado al 100% de su capacidad. No se pueden
          registrar nuevas entradas hasta que se liberen espacios.
        </p>
        <Button
          onClick={onClose}
          className="w-full bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
        >
          Entendido
        </Button>
      </Card>
    </div>,
    document.body
  )
}

// --- COMPONENTE PRINCIPAL: GESTIÓN DE ESPACIOS ---

export function SpaceManagement() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalSpace, setModalSpace] = useState<Space | null>(null)
  const [detailsSpace, setDetailsSpace] = useState<Space | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  // --- Función de Carga de Datos (HU7) ---
  const fetchSpaces = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // USANDO EL SERVICIO
      const data = await getMapaOcupacion();

      // Mapeamos los datos del backend y los guardamos
      setSpaces(data.map(s => ({ ...s, dbId: s.dbId })));
    } catch (err: any) {
      console.error("Error al cargar espacios:", err)
      setError(err.message || "No se pudo conectar con el backend para cargar el mapa.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpaces()
    // Implementar polling para actualización en tiempo real (HU7)
    // const interval = setInterval(fetchSpaces, 5000); 

    // return () => clearInterval(interval); 
  }, [fetchSpaces])

  // --- Cálculos de Estadísticas (HU7) ---
  const stats = useMemo(() => {
    const total = spaces.length
    const occupied = spaces.filter((s) => s.status === "ocupado").length
    const reserved = spaces.filter((s) => s.status === "reservado").length
    const free = total - occupied - reserved
    const capacityPercent = total > 0 ? Math.round(((occupied + reserved) / total) * 100) : 0

    return { total, occupied, reserved, free, capacityPercent }
  }, [spaces])

  // --- Efecto para Alerta de Capacidad (HU9) ---
  useEffect(() => {
    // Si la capacidad es 100% y no estamos cargando, disparamos la alerta
    if (stats.capacityPercent === 100 && !loading) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }, [stats.capacityPercent, loading])

  // --- Manejadores de Eventos ---

  // Manejador para reservar (HU8)
  const handleConfirmReservation = async (
    spaceId: string, // Código del espacio
    reason: string,
    duration: string,
  ) => {
    try {
      await reservarEspacio(spaceId, reason, parseInt(duration), USER_ID);
      fetchSpaces();
      setModalSpace(null);
      console.log(`Espacio ${spaceId} reservado exitosamente.`)

    } catch (err: any) {
      console.error("Error al confirmar reserva:", err);
      toast.error(`Error al reservar: ${err.message || 'Error de conexión'}`);
    }
  }
  const handleCancelReservation = async (spaceId: string) => {
    const spaceToFree = spaces.find(s => s.id === spaceId);
    if (!spaceToFree || !spaceToFree.dbId) {
      toast.error("ID numérico del espacio no encontrado para liberar.");
      return;
    }

    try {
      if (window.confirm(`¿Desea liberar y eliminar la reserva del espacio ${spaceId}?`)) {
        await liberarEspacio(spaceToFree.dbId);
        fetchSpaces(); // Actualizar el mapa
        setDetailsSpace(null); // Cerrar modal de detalle
        console.log(`Espacio ${spaceId} liberado exitosamente.`);
      }
    } catch (err: any) {
      console.error("Error al cancelar reserva:", err);
      toast.error(`Error al cancelar reserva: ${err.message || 'Error de conexión'}`);
    }
  }

  // Manejador para clic en un espacio del mapa
  const handleSpaceClick = (space: Space) => {
    if (space.status === "libre") {
      setModalSpace(space) // Abrir modal de reserva (HU8)
    }
    if (space.status === "reservado") {
      setDetailsSpace(space) // Abrir modal de detalles
    }
  }

  // --- Renderizado del Mapa (HU7) ---
  const getSpaceClass = (status: SpaceStatus) => {
    switch (status) {
      case "libre":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-emerald-900/50 dark:hover:to-emerald-800/40 hover:shadow-md hover:-translate-y-0.5"
      case "ocupado":
        return "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 opacity-90 cursor-not-allowed"
      case "reservado":
        return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/50 dark:hover:to-amber-800/40 hover:shadow-md hover:-translate-y-0.5"
    }
  }

  const getSpaceIcon = (status: SpaceStatus) => {
    switch (status) {
      case "libre":
        return <CheckCircle className="w-4 h-4" />
      case "ocupado":
        return <Car className="w-4 h-4" />
      case "reservado":
        return <Lock className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Card className="p-6 bg-card border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Card>
        <Card className="p-4 md:p-6 bg-card border border-border">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-1.5 md:gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-16 sm:h-20 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-destructive border-destructive">
        <AlertTriangle className="w-5 h-5 mx-auto mb-2" />
        {error}
        <Button className="mt-4" onClick={fetchSpaces}>Reintentar Carga</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Gestión de Espacios
        </h1>
        <p className="text-muted-foreground">
          Visualiza y gestiona los espacios del estacionamiento en tiempo real.
        </p>
      </div>

      {/* --- Panel de Estadísticas (HU7) --- */}
      <Card className="p-6 bg-card border border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <ParkingCircle className="w-10 h-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Espacios Libres</p>
              <p className="text-3xl font-bold">{stats.free}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Car className="w-10 h-10 text-destructive" />
            <div>
              <p className="text-sm text-muted-foreground">Ocupados</p>
              <p className="text-3xl font-bold">{stats.occupied}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Lock className="w-10 h-10 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Reservados</p>
              <p className="text-3xl font-bold">{stats.reserved}</p>
            </div>
          </div>
          {/* --- Panel de Capacidad (HU9) --- */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-muted-foreground">Capacidad</p>
              <p
                className={`text-lg font-bold ${stats.capacityPercent === 100 ? "text-destructive" : "text-foreground"
                  }`}
              >
                {stats.capacityPercent}%
              </p>
            </div>
            <div className="w-full bg-input rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${stats.capacityPercent === 100
                  ? "bg-destructive"
                  : "bg-primary"
                  }`}
                style={{ width: `${stats.capacityPercent}%` }}
              ></div>
            </div>
            {stats.capacityPercent === 100 && (
              <p className="text-xs text-destructive font-medium text-center mt-1">
                ¡Capacidad Máxima Alcanzada!
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* --- Mapa de Espacios (HU7) --- */}
      <Card className="p-4 md:p-6 bg-card border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold flex items-center">
            <Map className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary" />
            Mapa de Estacionamiento
          </h2>
          {/* Leyenda */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/30 border border-emerald-200 dark:border-emerald-800" />
              <span className="text-muted-foreground">Libre</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/30 border border-red-200 dark:border-red-800" />
              <span className="text-muted-foreground">Ocupado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/30 border border-amber-200 dark:border-amber-800" />
              <span className="text-muted-foreground">Reservado</span>
            </div>
          </div>
        </div>
        
        {/* Grid de espacios con mejor diseño */}
        <div className="relative p-4 bg-muted/30 rounded-xl border border-border/50">
          {/* Decorative road lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border/30" />
          
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
            {spaces.map((space) => (
              <Button
                key={space.id}
                variant="outline"
                className={`h-16 sm:h-20 flex flex-col items-center justify-center p-1.5 md:p-2 text-center text-xs rounded-lg border-2 transition-all duration-200 ${getSpaceClass(
                  space.status,
                )}`}
                onClick={() => handleSpaceClick(space)}
                disabled={space.status === "ocupado"}
                title={`${space.id} - ${space.status}${space.vehiclePlate ? ` - ${space.vehiclePlate}` : ''}`}
              >
                <span className="font-bold text-sm md:text-base">{space.id}</span>
                <div className="mt-0.5 md:mt-1">{getSpaceIcon(space.status)}</div>
                {space.status === "ocupado" && (
                  <span className="text-[9px] md:text-[10px] font-mono mt-0.5 md:mt-1 truncate max-w-full opacity-75">
                    {space.vehiclePlate}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* --- Renderizado de Modales --- */}
      <ReserveModal
        space={modalSpace}
        onClose={() => setModalSpace(null)}
        onConfirm={handleConfirmReservation}
      />
      <ReservationDetailsModal
        space={detailsSpace}
        onClose={() => setDetailsSpace(null)}
        onCancel={handleCancelReservation}
      />
      <CapacityAlert show={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  )
}