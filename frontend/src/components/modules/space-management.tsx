"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Lock, Wrench } from "lucide-react"

interface ParkingSpace {
  id: string
  number: string
  status: "free" | "occupied" | "reserved" | "maintenance"
  vehicle?: string
  reservedBy?: string
  reservationReason?: string
  reservationDuration?: string
  reservationStartDate?: string
  reservationEndDate?: string
  observations?: string
}

interface ReservationModalProps {
  space: ParkingSpace | null
  onReserve: (reason: string, duration: string, startDate: string, endDate: string, observations: string) => void
  onClose: () => void
}

function ReservationModal({ space, onReserve, onClose }: ReservationModalProps) {
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("1")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [observations, setObservations] = useState("")

  if (!space) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <h2 className="text-xl font-bold mb-4">Reservar Espacio</h2>
        <p className="text-sm text-muted-foreground mb-4">Espacio: {space.number}</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Motivo de Reserva</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="">Seleccionar motivo</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Cliente VIP">Cliente VIP</option>
              <option value="Evento Especial">Evento Especial</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duración (horas)</label>
            <Input
              type="number"
              min="1"
              max="24"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha Inicio</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fecha Fin</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Observaciones</label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Notas adicionales..."
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => {
              onReserve(reason, duration, startDate, endDate, observations)
              setReason("")
              setDuration("1")
              setStartDate("")
              setEndDate("")
              setObservations("")
            }}
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Reservar
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cancelar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export function SpaceManagement() {
  const [spaces, setSpaces] = useState<ParkingSpace[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: `${i + 1}`,
      number: `${String.fromCharCode(65 + Math.floor(i / 6))}-${String((i % 6) + 1).padStart(2, "0")}`,
      status: Math.random() > 0.6 ? (Math.random() > 0.5 ? "occupied" : "reserved") : "free",
      vehicle: Math.random() > 0.6 ? `ABC-${Math.floor(Math.random() * 900) + 100}` : undefined,
    })),
  )

  const [reservationModal, setReservationModal] = useState<ParkingSpace | null>(null)

  const occupiedCount = spaces.filter((s) => s.status === "occupied").length
  const reservedCount = spaces.filter((s) => s.status === "reserved").length
  const maintenanceCount = spaces.filter((s) => s.status === "maintenance").length
  const freeCount = spaces.filter((s) => s.status === "free").length
  const capacityPercent = Math.round(((occupiedCount + reservedCount) / spaces.length) * 100)
  const isAtCapacity = capacityPercent >= 90

  const handleReserveSpace = (
    spaceId: string,
    reason: string,
    duration: string,
    startDate: string,
    endDate: string,
    observations: string,
  ) => {
    setSpaces(
      spaces.map((space) =>
        space.id === spaceId
          ? {
              ...space,
              status: "reserved",
              reservedBy: "Supervisor",
              reservationReason: reason,
              reservationDuration: duration,
              reservationStartDate: startDate,
              reservationEndDate: endDate,
              observations: observations,
            }
          : space,
      ),
    )
    setReservationModal(null)
    alert(`Espacio ${spaces.find((s) => s.id === spaceId)?.number} reservado correctamente`)
  }

  const toggleSpace = (id: string) => {
    setSpaces(
      spaces.map((space) => {
        if (space.id === id) {
          const statuses: Array<"free" | "occupied" | "reserved" | "maintenance"> = [
            "free",
            "occupied",
            "reserved",
            "maintenance",
          ]
          const currentIndex = statuses.indexOf(space.status)
          const nextStatus = statuses[(currentIndex + 1) % statuses.length]
          return {
            ...space,
            status: nextStatus,
            vehicle: nextStatus === "occupied" ? `ABC-${Math.floor(Math.random() * 900) + 100}` : undefined,
          }
        }
        return space
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Espacios</h1>
        <p className="text-muted-foreground">Visualiza y gestiona los espacios de estacionamiento</p>
      </div>

      {isAtCapacity && (
        <Card className="p-4 bg-destructive/10 border border-destructive/30 flex items-center gap-3 animate-pulse">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          <div>
            <p className="font-semibold text-destructive">Capacidad Máxima Alcanzada</p>
            <p className="text-sm text-destructive/80">El estacionamiento está casi lleno ({capacityPercent}%)</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Espacios Libres</p>
          <p className="text-3xl font-bold text-accent">{freeCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((freeCount / spaces.length) * 100)}% disponible
          </p>
        </Card>
        <Card className="p-4 bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Ocupados</p>
          <p className="text-3xl font-bold text-destructive">{occupiedCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((occupiedCount / spaces.length) * 100)}% del total
          </p>
        </Card>
        <Card className="p-4 bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Reservados</p>
          <p className="text-3xl font-bold text-secondary">{reservedCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((reservedCount / spaces.length) * 100)}% del total
          </p>
        </Card>
        <Card className="p-4 bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Mantenimiento</p>
          <p className="text-3xl font-bold text-primary">{maintenanceCount}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round((maintenanceCount / spaces.length) * 100)}% del total
          </p>
        </Card>
        <Card className="p-4 bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Capacidad</p>
          <p className="text-3xl font-bold">{capacityPercent}%</p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all ${
                capacityPercent >= 90 ? "bg-destructive" : capacityPercent >= 70 ? "bg-secondary" : "bg-accent"
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Mapa de Espacios</h2>
        <div className="grid grid-cols-6 gap-3">
          {spaces.map((space) => (
            <div key={space.id} className="relative">
              <button
                onClick={() => toggleSpace(space.id)}
                className={`w-full aspect-square rounded-lg border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                  space.status === "free"
                    ? "bg-accent/20 border-accent text-accent hover:bg-accent/30"
                    : space.status === "occupied"
                      ? "bg-destructive/20 border-destructive text-destructive hover:bg-destructive/30"
                      : space.status === "reserved"
                        ? "bg-secondary/20 border-secondary text-secondary hover:bg-secondary/30"
                        : "bg-primary/20 border-primary text-primary hover:bg-primary/30"
                }`}
                title={
                  space.vehicle
                    ? `Placa: ${space.vehicle}`
                    : space.status === "maintenance"
                      ? "En mantenimiento"
                      : "Libre"
                }
              >
                <span>{space.number}</span>
                {space.vehicle && <span className="text-xs mt-1">{space.vehicle}</span>}
                {space.status === "reserved" && <Lock className="w-3 h-3 mt-1" />}
                {space.status === "maintenance" && <Wrench className="w-3 h-3 mt-1" />}
              </button>
              {space.status === "free" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReservationModal(space)}
                  className="absolute -bottom-8 left-0 right-0 text-xs h-6 mt-1"
                >
                  Reservar
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-6 mt-8 pt-6 border-t border-border flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded" />
            <span className="text-sm">Libre</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive rounded" />
            <span className="text-sm">Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded" />
            <span className="text-sm">Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded" />
            <span className="text-sm">Mantenimiento</span>
          </div>
        </div>
      </Card>

      <ReservationModal
        space={reservationModal}
        onReserve={(reason, duration, startDate, endDate, observations) => {
          if (reservationModal) {
            handleReserveSpace(reservationModal.id, reason, duration, startDate, endDate, observations)
          }
        }}
        onClose={() => setReservationModal(null)}
      />
    </div>
  )
}
