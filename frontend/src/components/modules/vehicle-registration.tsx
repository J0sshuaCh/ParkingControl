"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Eye, Search, Edit2, Printer } from "lucide-react"

interface Vehicle {
  id: string
  plate: string
  type: string
  entryTime: string
  space: string
  status: string
  ticket: string
}

interface DetailModalProps {
  vehicle: Vehicle | null
  onClose: () => void
  onEdit: (vehicle: Vehicle) => void
}

function DetailModal({ vehicle, onClose, onEdit }: DetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<Vehicle>>(vehicle || {})

  // keep editData in sync when the passed vehicle changes
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
              <p className="text-lg font-semibold">{vehicle.plate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p className="text-lg font-semibold">{vehicle.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora de Ingreso</p>
              <p className="text-lg font-semibold">{vehicle.entryTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Espacio Asignado</p>
              <p className="text-lg font-semibold">{vehicle.space}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Número de Ticket</p>
              <p className="text-lg font-semibold">{vehicle.ticket}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                {vehicle.status}
              </span>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
                Cerrar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Placa</label>
              <Input
                value={editData.plate || ""}
                onChange={(e) => setEditData({ ...editData, plate: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <Input
                value={editData.type || ""}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Espacio</label>
              <Input
                value={editData.space || ""}
                onChange={(e) => setEditData({ ...editData, space: e.target.value })}
                className="bg-input border-border"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  onEdit(editData as Vehicle)
                  setIsEditing(false)
                }}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Guardar
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 bg-transparent">
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export function VehicleRegistration() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      plate: "ABC-123",
      type: "Sedan",
      entryTime: "09:30",
      space: "A-01",
      status: "Activo",
      ticket: "TK-001",
    },
    {
      id: "2",
      plate: "XYZ-789",
      type: "SUV",
      entryTime: "10:15",
      space: "B-05",
      status: "Activo",
      ticket: "TK-002",
    },
    {
      id: "3",
      plate: "DEF-456",
      type: "Compacto",
      entryTime: "08:45",
      space: "A-12",
      status: "Activo",
      ticket: "TK-003",
    },
  ])

  const [formData, setFormData] = useState({ plate: "", type: "Sedan", autoAssign: true })
  const [selectedSpace, setSelectedSpace] = useState("")
  const [detailModal, setDetailModal] = useState<Vehicle | null>(null)
  const [filterTicket, setFilterTicket] = useState("")

  const handleRegister = () => {
    if (formData.plate) {
      const assignedSpace = formData.autoAssign
        ? `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${String(Math.floor(Math.random() * 20) + 1).padStart(2, "0")}`
        : selectedSpace

      if (!formData.autoAssign && !assignedSpace) {
        alert("Por favor selecciona un espacio")
        return
      }

      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        plate: formData.plate,
        type: formData.type,
        entryTime: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        space: assignedSpace,
        status: "Activo",
        ticket: `TK-${String(vehicles.length + 1).padStart(3, "0")}`,
      }
      setVehicles([newVehicle, ...vehicles])
      setFormData({ plate: "", type: "Sedan", autoAssign: true })
      setSelectedSpace("")

      alert(`Vehículo registrado correctamente en espacio ${assignedSpace}`)
    }
  }

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id))
  }

  const handleEditVehicle = (editedVehicle: Vehicle) => {
    setVehicles(vehicles.map((v) => (v.id === editedVehicle.id ? editedVehicle : v)))
    setDetailModal(null)
    alert("Vehículo actualizado correctamente")
  }

  const handleReprint = (vehicle: Vehicle) => {
    alert(`Reimprimiendo ticket ${vehicle.ticket} para placa ${vehicle.plate}`)
  }

  const filteredVehicles = vehicles.filter((v) => {
    if (filterTicket && !v.ticket.includes(filterTicket.toUpperCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Registro de Vehículos</h1>
        <p className="text-muted-foreground">Registra la entrada de nuevos vehículos al estacionamiento</p>
      </div>

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Registrar Entrada</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Placa del Vehículo</label>
            <Input
              placeholder="ABC-123"
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value.toUpperCase() })}
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Vehículo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option>Sedan</option>
              <option>SUV</option>
              <option>Compacto</option>
              <option>Camioneta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Asignación</label>
            <select
              value={formData.autoAssign ? "auto" : "manual"}
              onChange={(e) => setFormData({ ...formData, autoAssign: e.target.value === "auto" })}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
            >
              <option value="auto">Automática</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          {!formData.autoAssign && (
            <div>
              <label className="block text-sm font-medium mb-2">Seleccionar Espacio</label>
              <select
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="">Elige un espacio</option>
                <option value="A-01">A-01</option>
                <option value="A-02">A-02</option>
                <option value="B-01">B-01</option>
                <option value="B-02">B-02</option>
              </select>
            </div>
          )}
          <div className="flex items-end">
            <Button onClick={handleRegister} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Registrar
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Buscar por Ticket</label>
            <div className="flex gap-2">
              <Input
                placeholder="TK-001"
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

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Historial Reciente ({filteredVehicles.length})</h2>
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
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-primary">{vehicle.ticket}</td>
                  <td className="py-3 px-4 font-medium">{vehicle.plate}</td>
                  <td className="py-3 px-4">{vehicle.type}</td>
                  <td className="py-3 px-4">{vehicle.entryTime}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-medium">
                      {vehicle.space}
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DetailModal vehicle={detailModal} onClose={() => setDetailModal(null)} onEdit={handleEditVehicle} />
    </div>
  )
}
