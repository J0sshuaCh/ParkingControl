"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Eye, Search, Edit2, Printer, RefreshCcw } from "lucide-react"
import { getEspaciosLibres, getVehiculosActivos, registrarEntrada, type EspacioLibre, type VehiculoActivo } from "@/services/vehiculoService"

interface DetailModalProps {
  vehicle: VehiculoActivo | null
  onClose: () => void
  onEdit: (vehicle: VehiculoActivo) => void
}

function DetailModal({ vehicle, onClose, onEdit }: DetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<VehiculoActivo>>(vehicle || {})

  useEffect(() => {
    setEditData(vehicle || {})
  }, [vehicle])

  if (!vehicle) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <h2 className="text-xl font-bold mb-4">Detalle del Vehículo</h2>
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Placa</p>
              <p className="text-lg font-semibold">{vehicle.placa}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="text-lg font-semibold">{vehicle.tipo_vehiculo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora de Ingreso</p>
              <p className="text-lg font-semibold">{vehicle.hora_ingreso}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Espacio Asignado</p>
              <p className="text-lg font-semibold">{vehicle.espacio}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Número de Ticket</p>
              <p className="text-lg font-semibold text-primary">{vehicle.codigo_ticket}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                {vehicle.status}
              </span>
            </div>
            <div className="flex gap-2 mt-6">
              {/* Nota: La edición completa requeriría otro endpoint en el backend */}
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          // Modo edición simplificado (solo visual por ahora si no tienes endpoint de update)
          <div className="space-y-4">
            {/* ... formulario de edición si decides implementarlo ... */}
          </div>
        )}
      </Card>
    </div>
  )
}

export function VehicleRegistration() {
  // Estados de datos
  const [vehicles, setVehicles] = useState<VehiculoActivo[]>([])
  const [espaciosLibres, setEspaciosLibres] = useState<EspacioLibre[]>([])
  const [loading, setLoading] = useState(false)

  // Estados del formulario
  const [formData, setFormData] = useState({
    plate: "",
    type: "Sedan",
    autoAssign: true
  })
  const [selectedSpaceId, setSelectedSpaceId] = useState("") // Guardamos el ID, no el código

  // Estados de UI
  const [detailModal, setDetailModal] = useState<VehiculoActivo | null>(null)
  const [filterTicket, setFilterTicket] = useState("")

  // --- Cargar Datos Iniciales ---
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [espaciosData, vehiculosData] = await Promise.all([
        getEspaciosLibres(),
        getVehiculosActivos()
      ])
      setEspaciosLibres(espaciosData)
      setVehicles(vehiculosData)
    } catch (error) {
      console.error("Error cargando datos:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // --- Manejador de Registro ---
  const handleRegister = async () => {
    // Validaciones simples
    if (!formData.plate) {
      alert("Por favor ingresa la placa del vehículo.")
      return
    }
    if (!formData.autoAssign && !selectedSpaceId) {
      alert("Por favor selecciona un espacio manual.")
      return
    }

    try {
      const response = await registrarEntrada({
        placa: formData.plate.toUpperCase(),
        tipo_vehiculo: formData.type,
        modo_asignacion: formData.autoAssign ? "auto" : "manual",
        id_espacio_manual: formData.autoAssign ? undefined : selectedSpaceId
      })

      alert(`✅ ¡Registro Exitoso!\nTicket: ${response.ticket}\nEspacio: ${response.espacio}`)

      // Resetear formulario
      setFormData({ ...formData, plate: "" })
      setSelectedSpaceId("")

      // Recargar datos para actualizar tabla y quitar el espacio usado de la lista
      fetchData()

    } catch (err: any) {
      console.error(err)
      alert(`❌ Error: ${err.message || "No se pudo registrar el vehículo"}`)
    }
  }

  const handleReprint = (vehicle: VehiculoActivo) => {
    alert(`Imprimiendo ticket ${vehicle.codigo_ticket} para placa ${vehicle.placa}`)
  }

  // Filtrado en frontend
  const filteredVehicles = vehicles.filter((v) => {
    if (filterTicket && !v.codigo_ticket.includes(filterTicket.toUpperCase()) && !v.placa.includes(filterTicket.toUpperCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Registro de Vehículos</h1>
          <p className="text-muted-foreground">Registra la entrada de nuevos vehículos y genera tickets.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {/* --- Formulario de Registro --- */}
      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Registrar Entrada</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Placa */}
          <div>
            <label className="block text-sm font-medium mb-2">Placa del Vehículo</label>
            <Input
              placeholder="ABC-123"
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
              className="bg-input border-border uppercase"
              maxLength={7}
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Vehículo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Compacto">Compacto</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Moto">Moto</option>
            </select>
          </div>

          {/* Asignación */}
          <div>
            <label className="block text-sm font-medium mb-2">Asignación</label>
            <select
              value={formData.autoAssign ? "auto" : "manual"}
              onChange={(e) => setFormData({ ...formData, autoAssign: e.target.value === "auto" })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="auto">Automática (Siguiente Libre)</option>
              <option value="manual">Manual (Elegir)</option>
            </select>
          </div>

          {/* Espacio Manual (Condicional) */}
          {!formData.autoAssign ? (
            <div>
              <label className="block text-sm font-medium mb-2">Seleccionar Espacio</label>
              <select
                value={selectedSpaceId}
                onChange={(e) => setSelectedSpaceId(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="">-- Elige un espacio --</option>
                {espaciosLibres.map((espacio) => (
                  <option key={espacio.id_espacio} value={espacio.id_espacio}>
                    {espacio.codigo}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Botón Registrar (si es automático ocupa el 4to slot)
            <div className="flex items-end">
              <Button onClick={handleRegister} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Entrada
              </Button>
            </div>
          )}
        </div>

        {/* Botón Registrar (si es manual ocupa una nueva fila para no deformar el grid) */}
        {!formData.autoAssign && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleRegister} className="w-full md:w-1/4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Entrada
            </Button>
          </div>
        )}
      </Card>

      {/* --- Filtros --- */}
      <Card className="p-6 bg-card border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Buscar por Ticket o Placa</label>
            <div className="flex gap-2">
              <Input
                placeholder="Ej: TK-001 o ABC-123"
                value={filterTicket}
                onChange={(e) => setFilterTicket(e.target.value)}
                className="flex-1 bg-input border-border"
              />
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Tabla de Historial --- */}
      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Vehículos en Parqueo ({filteredVehicles.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Ticket</th>
                <th className="text-left py-3 px-4 font-semibold">Placa</th>
                <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold">Hora Ingreso</th>
                <th className="text-left py-3 px-4 font-semibold">Espacio</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
                <th className="text-left py-3 px-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay vehículos registrados actualmente.
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id_vehiculo} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium text-primary">{vehicle.codigo_ticket}</td>
                    <td className="py-3 px-4 font-medium">{vehicle.placa}</td>
                    <td className="py-3 px-4">{vehicle.tipo_vehiculo}</td>
                    <td className="py-3 px-4">{vehicle.hora_ingreso}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">
                        {vehicle.espacio}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDetailModal(vehicle)}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReprint(vehicle)}
                        className="text-secondary hover:bg-secondary/10"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DetailModal vehicle={detailModal} onClose={() => setDetailModal(null)} onEdit={() => { }} />
    </div>
  )
}