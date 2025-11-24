"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, BarChart3, Download, History, Save, X } from "lucide-react"
import { getTarifas, createTarifa, deleteTarifa, updateTarifa, type Tarifa } from "@/services/tarifasService"

// --- Tipos adicionales ---
interface User {
  id: string
  name: string
  username: string
  role: "Administrador" | "Supervisor" | "Operador"
}

interface DailyReport {
  date: string
  revenue: number
  vehicles: number
  occupancy: number
}

interface AuditRecord {
  id: string
  timestamp: string
  user: string
  action: string
  ticketId: string
  previousAmount?: number
  newAmount?: number
  reason?: string
}

// --- COMPONENTE MODAL DE EDICIÓN ---
function EditTarifaModal({ tarifa, onClose, onSave }: { tarifa: Tarifa | null, onClose: () => void, onSave: (id: number, data: Partial<Tarifa>) => void }) {
  const [formData, setFormData] = useState<Partial<Tarifa>>({})

  useEffect(() => {
    if (tarifa) {
      setFormData({
        precio_hora: tarifa.precio_hora,
        estado: tarifa.estado
      })
    }
  }, [tarifa])

  if (!tarifa) return null

  const handleSave = () => {
    if (formData.precio_hora && formData.estado) {
      onSave(tarifa.id_tarifa, formData)
      onClose()
    } else {
      alert("Por favor complete los campos")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm bg-card border border-border p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Editar Tarifa: {tarifa.tipo_vehiculo}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Precio por Hora (S/.)</label>
            <Input
              type="number"
              step="0.10"
              // Convertimos a string para mostrarlo en el input (evita warnings de uncontrolled inputs)
              value={formData.precio_hora?.toString() || ''}
              onChange={(e) => {
                // CORRECCIÓN: Convertimos el string del input a número flotante
                const val = parseFloat(e.target.value);
                setFormData({
                  ...formData,
                  // Si es NaN (campo vacío), guardamos undefined o 0, si no, el valor numérico
                  precio_hora: isNaN(val) ? 0 : val
                });
              }}
              className="bg-input border-border"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Estado</label>
            <select
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            >
              <option value="En vigencia">En vigencia</option>
              <option value="Pasado">Pasado</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" /> Guardar
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---
export function Administration() {
  // Estados
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Juan Pérez", username: "jperez", role: "Administrador" },
    { id: "2", name: "María García", username: "mgarcia", role: "Supervisor" },
    { id: "3", name: "Carlos López", username: "clopez", role: "Operador" },
  ])
  const [rates, setRates] = useState<Tarifa[]>([])

  // Estado para el modal de edición
  const [editingTarifa, setEditingTarifa] = useState<Tarifa | null>(null)

  // Formulario nueva tarifa
  const [newUser, setNewUser] = useState({ name: "", username: "", role: "Operador" as const })
  const [newRate, setNewRate] = useState({ tipo_vehiculo: "Sedan", precio_hora: "" })
  const [userRole] = useState("Administrador")

  // Datos dummy para reportes y auditoria
  const [dailyReports] = useState<DailyReport[]>([
    { date: "Lunes", revenue: 450000, vehicles: 120, occupancy: 65 },
    { date: "Martes", revenue: 520000, vehicles: 145, occupancy: 75 },
    { date: "Miércoles", revenue: 480000, vehicles: 130, occupancy: 70 },
    { date: "Jueves", revenue: 510000, vehicles: 140, occupancy: 72 },
    { date: "Viernes", revenue: 580000, vehicles: 160, occupancy: 85 },
    { date: "Sábado", revenue: 620000, vehicles: 175, occupancy: 90 },
  ])
  const [auditHistory] = useState<AuditRecord[]>([
    { id: "1", timestamp: "2024-01-15 14:30", user: "María García", action: "Anular Ticket", ticketId: "TK-001", reason: "Error en cálculo de tarifa" },
    { id: "2", timestamp: "2024-01-15 13:45", user: "Carlos López", action: "Modificar Monto", ticketId: "TK-002", previousAmount: 50000, newAmount: 45000, reason: "Ajuste por cliente frecuente" },
    { id: "3", timestamp: "2024-01-15 12:15", user: "Juan Pérez", action: "Reimprimir Ticket", ticketId: "TK-003" },
  ])

  // Carga inicial
  useEffect(() => {
    loadTarifas()
  }, [])

  const loadTarifas = async () => {
    try {
      const data = await getTarifas()
      setRates(data)
    } catch (error) {
      console.error("Error cargando tarifas", error)
    }
  }

  // --- HANDLERS ---

  const handleAddUser = () => {
    if (newUser.name && newUser.username) {
      setUsers([...users, { id: Date.now().toString(), ...newUser }])
      setNewUser({ name: "", username: "", role: "Operador" })
      alert("Usuario agregado correctamente")
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
    alert("Usuario eliminado")
  }

  const handleAddRate = async () => {
    if (newRate.tipo_vehiculo && newRate.precio_hora) {
      try {
        await createTarifa({
          tipo_vehiculo: newRate.tipo_vehiculo,
          precio_hora: Number(newRate.precio_hora),
          estado: 'En vigencia',
          fecha_vigencia_inicio: new Date().toISOString().split('T')[0]
        })
        setNewRate({ tipo_vehiculo: "Sedan", precio_hora: "" })
        alert("Tarifa agregada correctamente")
        loadTarifas()
      } catch (error) {
        console.error(error)
        alert("Error al agregar tarifa")
      }
    }
  }

  const handleDeleteRate = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta tarifa?")) {
      try {
        await deleteTarifa(id)
        alert("Tarifa eliminada")
        loadTarifas()
      } catch (error) {
        console.error(error)
        alert("Error al eliminar tarifa")
      }
    }
  }

  // Nuevo Handler para guardar edición
  const handleUpdateRate = async (id: number, data: Partial<Tarifa>) => {
    try {
      await updateTarifa(id, data)
      alert("Tarifa actualizada correctamente")
      loadTarifas()
      setEditingTarifa(null)
    } catch (error: any) {
      console.error(error)
      alert("Error al actualizar: " + (error.message || "Desconocido"))
    }
  }

  const handleExportExcel = () => {
    alert("Descargando reporte en Excel...")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Administración</h1>
        <p className="text-muted-foreground">Gestiona usuarios, tarifas, reportes y auditoría - Lima Centro</p>
      </div>

      {userRole !== "Administrador" && (
        <Card className="p-4 bg-secondary/10 border border-secondary/30">
          <p className="text-sm text-secondary">
            Acceso limitado: Solo administradores pueden acceder a todas las funciones
          </p>
        </Card>
      )}

      <Tabs defaultValue="rates" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="rates">Tarifas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
        </TabsList>

        {/* --- TAB USUARIOS --- */}
        <TabsContent value="users" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Usuario</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Nombre completo" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="bg-input border-border" />
              <Input placeholder="Usuario" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="bg-input border-border" />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })} className="px-3 py-2 bg-input border border-border rounded-md text-foreground">
                <option>Administrador</option>
                <option>Supervisor</option>
                <option>Operador</option>
              </select>
              <Button onClick={handleAddUser} className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> Agregar</Button>
            </div>
          </Card>
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Usuarios del Sistema ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                    <th className="text-left py-3 px-4 font-semibold">Rol</th>
                    <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">{user.role}</span></td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10"><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* --- TAB TARIFAS (CON EDICIÓN) --- */}
        <TabsContent value="rates" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Agregar Nueva Tarifa - Lima Centro</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select value={newRate.tipo_vehiculo} onChange={(e) => setNewRate({ ...newRate, tipo_vehiculo: e.target.value })} className="px-3 py-2 bg-input border border-border rounded-md text-foreground">
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Compacto">Compacto</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Moto">Moto</option>
              </select>
              <Input type="number" placeholder="Precio por Hora" value={newRate.precio_hora} onChange={(e) => setNewRate({ ...newRate, precio_hora: e.target.value })} className="bg-input border-border" />
              <Button onClick={handleAddRate} className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" /> Agregar</Button>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Tarifas Vigentes ({rates.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Tipo Vehículo</th>
                    <th className="text-left py-3 px-4 font-semibold">Precio Hora</th>
                    <th className="text-left py-3 px-4 font-semibold">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((rate) => (
                    <tr key={rate.id_tarifa} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{rate.tipo_vehiculo}</td>
                      <td className="py-3 px-4 font-semibold">S/. {Number(rate.precio_hora).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${rate.estado === 'En vigencia' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {rate.estado}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        {/* BOTÓN EDITAR CONECTADO */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => setEditingTarifa(rate)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteRate(rate.id_tarifa)} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* --- TAB REPORTES --- */}
        <TabsContent value="reports" className="space-y-4">
          {/* ... (Contenido de reportes sin cambios) ... */}
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Generar Reportes</h2>
            {/* ... inputs ... */}
            <div className="flex gap-3 flex-wrap mt-4">
              <Button className="bg-primary text-primary-foreground">Generar Reporte</Button>
              <Button onClick={handleExportExcel} variant="outline" className="flex items-center gap-2 bg-transparent"><Download className="w-4 h-4" /> Exportar Excel</Button>
            </div>
          </Card>
          {/* ... Tabla simple de reportes ... */}
        </TabsContent>

        {/* --- TAB AUDITORIA --- */}
        <TabsContent value="audit" className="space-y-4">
          {/* ... (Contenido de auditoría sin cambios) ... */}
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><History className="w-5 h-5" /> Historial</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border"><th className="text-left py-3 px-4">Acción</th><th className="text-left py-3 px-4">Usuario</th></tr>
                </thead>
                <tbody>
                  {auditHistory.map(r => (
                    <tr key={r.id} className="border-b border-border"><td className="py-3 px-4">{r.action}</td><td className="py-3 px-4">{r.user}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Renderizado del Modal de Edición */}
      <EditTarifaModal
        tarifa={editingTarifa}
        onClose={() => setEditingTarifa(null)}
        onSave={handleUpdateRate}
      />
    </div>
  )
}