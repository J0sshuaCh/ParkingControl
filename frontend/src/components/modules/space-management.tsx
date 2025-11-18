"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Car,
  Lock,
  CheckCircle,
  ParkingCircle,
  X,
  AlertTriangle,
  Map,
} from "lucide-react"

// --- TIPOS DE DATOS ---

// Definimos el estado de un espacio
type SpaceStatus = "libre" | "ocupado" | "reservado"

// Definimos la estructura de un espacio de estacionamiento
interface Space {
  id: string // Ej: "A-01"
  status: SpaceStatus
  vehiclePlate?: string // Placa del vehículo si está ocupado
  reservedFor?: string // Motivo de la reserva
  reservedUntil?: string // Duración de la reserva
}

// --- DATOS DE EJEMPLO (MOCK) ---

// Generamos una lista inicial de 30 espacios
const initialSpaces: Space[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `A-${String(i + 1).padStart(2, "0")}`,
    status: "libre" as SpaceStatus,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `B-${String(i + 1).padStart(2, "0")}`,
    status: "libre" as SpaceStatus,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `C-${String(i + 1).padStart(2, "0")}`,
    status: "libre" as SpaceStatus,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `D-${String(i + 1).padStart(2, "0")}`,
    status: "libre" as SpaceStatus,
  })),
]

// Pre-poblamos algunos espacios para el demo
initialSpaces[1] = { id: "A-02", status: "ocupado", vehiclePlate: "ABC-123" }
initialSpaces[2] = { id: "A-03", status: "ocupado", vehiclePlate: "XYZ-789" }
initialSpaces[12] = {
  id: "B-03",
  status: "reservado",
  reservedFor: "Mantenimiento",
  reservedUntil: "2 horas",
}

// --- COMPONENTE MODAL DE RESERVA (para HU8) ---

interface ReserveModalProps {
  space: Space | null
  onClose: () => void
  onConfirm: (spaceId: string, reason: string, duration: string) => void
}

function ReserveModal({ space, onClose, onConfirm }: ReserveModalProps) {
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("")

  if (!space) return null

  const handleConfirm = () => {
    if (reason && duration) {
      onConfirm(space.id, reason, duration)
      onClose() // Cierra el modal después de confirmar
    } else {
      // Reemplazamos alert() con un feedback más integrado si es posible
      // Por ahora, un simple alert() como en tu componente de registro
      alert("Por favor, ingrese el motivo y la duración.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
            <label className="text-sm font-medium">Duración</label>
            <Input
              placeholder="Ej: 2 horas, Fin del día"
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
    </div>
  )
}

// --- COMPONENTE ALERTA DE CAPACIDAD (para HU9) ---

interface CapacityAlertProps {
  show: boolean
  onClose: () => void
}

function CapacityAlert({ show, onClose }: CapacityAlertProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
    </div>
  )
}

// --- COMPONENTE PRINCIPAL: GESTIÓN DE ESPACIOS ---

export function SpaceManagement() {
  const [spaces, setSpaces] = useState<Space[]>(initialSpaces)
  const [modalSpace, setModalSpace] = useState<Space | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  // --- Cálculos de Estadísticas (HU7) ---
  // useMemo optimiza para que no se recalcule en cada render
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
    if (stats.capacityPercent === 100) {
      setShowAlert(true)
      // Aquí se podría agregar un efecto de sonido si se desea
    } else {
      setShowAlert(false)
    }
  }, [stats.capacityPercent])

  // --- Manejadores de Eventos ---

  // Manejador para reservar (HU8)
  const handleConfirmReservation = (
    spaceId: string,
    reason: string,
    duration: string,
  ) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space.id === spaceId
          ? {
              ...space,
              status: "reservado",
              reservedFor: reason,
              reservedUntil: duration,
              vehiclePlate: undefined, // Limpiar placa si la había
            }
          : space,
      ),
    )
    setModalSpace(null)
  }

  // Manejador para cancelar una reserva (lógica extra)
  const handleCancelReservation = (spaceId: string) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space.id === spaceId
          ? {
              ...space,
              status: "libre",
              reservedFor: undefined,
              reservedUntil: undefined,
            }
          : space,
      ),
    )
  }

  // Manejador para clic en un espacio del mapa
  const handleSpaceClick = (space: Space) => {
    if (space.status === "libre") {
      setModalSpace(space) // Abrir modal de reserva (HU8)
    }
    if (space.status === "reservado") {
      // Opcional: permitir cancelar la reserva
      // Por ahora, un simple alert para demostrar
      if (confirm(`¿Desea cancelar la reserva del espacio ${space.id}?`)) {
        handleCancelReservation(space.id)
      }
    }
    // Si está "ocupado", no hacemos nada al hacer clic
  }

  // --- Renderizado del Mapa (HU7) ---
  const getSpaceClass = (status: SpaceStatus) => {
    switch (status) {
      case "libre":
        return "bg-green-100 text-green-700 hover:bg-green-200"
      case "ocupado":
        return "bg-red-100 text-red-700 opacity-80 cursor-not-allowed"
      case "reservado":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
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
                className={`text-lg font-bold ${
                  stats.capacityPercent === 100 ? "text-destructive" : "text-foreground"
                }`}
              >
                {stats.capacityPercent}%
              </p>
            </div>
            <div className="w-full bg-input rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  stats.capacityPercent === 100
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
      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Map className="w-5 h-5 mr-2" />
          Mapa de Estacionamiento
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {spaces.map((space) => (
            <Button
              key={space.id}
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center p-2 text-center ${getSpaceClass(
                space.status,
              )}`}
              onClick={() => handleSpaceClick(space)}
              disabled={space.status === "ocupado"}
            >
              <span className="font-bold text-lg">{space.id}</span>
              <div className="mt-1">{getSpaceIcon(space.status)}</div>
              {space.status === "ocupado" && (
                <span className="text-xs font-mono mt-1">
                  {space.vehiclePlate}
                </span>
              )}
            </Button>
          ))}
        </div>
      </Card>

      {/* --- Renderizado de Modales --- */}
      <ReserveModal
        space={modalSpace}
        onClose={() => setModalSpace(null)}
        onConfirm={handleConfirmReservation}
      />
      <CapacityAlert show={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  )
}
