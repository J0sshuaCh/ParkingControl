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
  Loader2, // Icono de carga
} from "lucide-react"
// Importamos los servicios de la API (ruta corregida usando el alias @)
import { getEspacios, reservarEspacio } from "../../services/espacioService"

// --- TIPOS DE DATOS ---

// Esta interfaz AHORA debe coincidir con la respuesta de tu API
type SpaceStatus = "Libre" | "Ocupado" | "Reservado" | "Mantenimiento"; // Ajusta a tus ENUMs

interface Space {
  id_espacio: number;       // El ID real de la BD (PK)
  id: string;             // El número de espacio (ej: "A-01")
  status: SpaceStatus;
  vehiclePlate?: string;  // Placa si está ocupado
  reservedFor?: string;   // Motivo de la reserva
  reservedUntil?: string; // Duración de la reserva
}

// --- COMPONENTE MODAL DE RESERVA (para HU8) ---

interface ReserveModalProps {
  space: Space | null
  onClose: () => void
  onConfirm: (id_espacio: number, reason: string, duration: string) => void
  loading: boolean;
}

function ReserveModal({ space, onClose, onConfirm, loading }: ReserveModalProps) {
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("")

  if (!space) return null

  const handleConfirm = () => {
    if (reason && duration) {
      // Pasamos el ID numérico (id_espacio) al manejador
      onConfirm(space.id_espacio, reason, duration)
    } else {
      alert("Por favor, ingrese el motivo y la duración.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reservar Espacio: {space.id}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
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
              disabled={loading}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Duración</label>
            <Input
              placeholder="Ej: 2 horas, Fin del día"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-input border-border"
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Reserva"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={loading}
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
// (Este componente no cambia, sigue siendo igual que antes)
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
          <Button variant="ghost" size="sm" onClick={onClose} className="text-destructive-foreground hover:bg-destructive/80">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-destructive-foreground mb-4">
          El estacionamiento ha llegado al 100% de su capacidad. No se pueden
          registrar nuevas entradas hasta que se liberen espacios.
        </p>
        <Button onClick={onClose} className="w-full bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90">
          Entendido
        </Button>
      </Card>
    </div>
  )
}

// --- COMPONENTE PRINCIPAL: GESTIÓN DE ESPACIOS ---

export function SpaceManagement() { // Renombrado a SpaceManagement
  // El estado de los espacios ahora se inicializa vacío
  const [spaces, setSpaces] = useState<Space[]>([])
  const [modalSpace, setModalSpace] = useState<Space | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  
  // Estados para Carga y Errores
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estado de carga para el modal
  const [modalLoading, setModalLoading] = useState(false);

  // --- Carga de Datos (HU7) ---
  const fetchSpaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEspacios();
      // Asegúrate que los status de la BD coincidan con "libre", "ocupado", "reservado"
      setSpaces(data);
    } catch (err) {
      setError("No se pudieron cargar los espacios. Intente de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para llamar a fetchSpaces() solo una vez, al montar el componente
  useEffect(() => {
    fetchSpaces();
  }, []);

  // --- Cálculos de Estadísticas (HU7) ---
  const stats = useMemo(() => {
    const total = spaces.length
    if (total === 0) return { total: 0, occupied: 0, reserved: 0, free: 0, capacityPercent: 0 };
    
    const occupied = spaces.filter((s) => s.status === "Ocupado").length
    const reserved = spaces.filter((s) => s.status === "Reservado").length
    const free = spaces.filter((s) => s.status === "Libre").length
    const capacityPercent = total > 0 ? Math.round(((occupied + reserved) / total) * 100) : 0

    return { total, occupied, reserved, free, capacityPercent }
  }, [spaces])

  // --- Efecto para Alerta de Capacidad (HU9) ---
  useEffect(() => {
    if (stats.capacityPercent === 100) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [stats.capacityPercent])

  // --- Manejadores de Eventos ---

  // Manejador para reservar (HU8)
  const handleConfirmReservation = async (
    id_espacio: number,
    reason: string,
    duration: string,
  ) => {
    setModalLoading(true);
    try {
      // Debes obtener el id_usuario de tu sistema de autenticación (ej: un Context)
      const mock_id_usuario = "1"; // ¡REEMPLAZAR ESTO!

      await reservarEspacio(id_espacio, {
        motivo: reason,
        duracion: duration,
        id_usuario: mock_id_usuario 
      });

      // Si la reserva fue exitosa, cerramos el modal y recargamos los datos
      setModalSpace(null);
      fetchSpaces(); // Recargamos el mapa para mostrar el estado actualizado
      
    } catch (err) {
      console.error(err);
      alert("Error al reservar el espacio. Es posible que ya no esté libre.");
    } finally {
      setModalLoading(false);
    }
  }

  // Manejador para clic en un espacio del mapa
  const handleSpaceClick = (space: Space) => {
    if (space.status === "Libre") {
      setModalSpace(space) // Abrir modal de reserva (HU8)
    }
    // (Lógica para cancelar reserva iría aquí)
  }

  // --- Renderizado del Mapa (HU7) ---
  const getSpaceClass = (status: SpaceStatus) => {
    switch (status) {
      case "Libre":
        return "bg-green-100 text-green-700 hover:bg-green-200"
      case "Ocupado":
        return "bg-red-100 text-red-700 opacity-80 cursor-not-allowed"
      case "Reservado":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-500" // Estado de 'Mantenimiento' u otro
    }
  }

  const getSpaceIcon = (status: SpaceStatus) => {
    switch (status) {
      case "Libre":
        return <CheckCircle className="w-4 h-4" />
      case "Ocupado":
        return <Car className="w-4 h-4" />
      case "Reservado":
        return <Lock className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  // --- Renderizado de Estados de Carga y Error ---

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Cargando espacios...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-destructive">
        <AlertTriangle className="w-12 h-12" />
        <p className="mt-4 text-lg font-semibold">Error de Conexión</p>
        <p>{error}</p>
        <Button onClick={fetchSpaces} className="mt-4">
          Reintentar
        </Button>
      </div>
    )
  }

  // --- Renderizado Principal ---
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
              key={space.id_espacio} // Usamos el PK de la BD como key
              variant="outline"
              className={`h-20 flex flex-col items-center justify-center p-2 text-center ${getSpaceClass(
                space.status,
              )}`}
              onClick={() => handleSpaceClick(space)}
              disabled={space.status === "Ocupado"}
            >
              <span className="font-bold text-lg">{space.id}</span>
              <div className="mt-1">{getSpaceIcon(space.status)}</div>
              {space.status === "Ocupado" && (
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
        loading={modalLoading}
      />
      <CapacityAlert show={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  )
}