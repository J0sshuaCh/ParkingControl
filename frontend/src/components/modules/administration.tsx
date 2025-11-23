"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, BarChart3, Download, History } from "lucide-react"
import { getTarifas, createTarifa, deleteTarifa, Tarifa } from "@/services/tarifasService"
import { useEffect } from "react"

interface User {
  id: string
  name: string
  username: string
  role: "Administrador" | "Supervisor" | "Operador"
}

// interface Rate removed in favor of Tarifa from service

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

export function Administration() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Juan Pérez", username: "jperez", role: "Administrador" },
    { id: "2", name: "María García", username: "mgarcia", role: "Supervisor" },
    { id: "3", name: "Carlos López", username: "clopez", role: "Operador" },
  ])

  const [rates, setRates] = useState<Tarifa[]>([])

  useEffect(() => {
    loadTarifas()
  }, [])

  const loadTarifas = async () => {
    const data = await getTarifas()
    setRates(data)
  }

  const [dailyReports] = useState<DailyReport[]>([
    { date: "Lunes", revenue: 450000, vehicles: 120, occupancy: 65 },
    { date: "Martes", revenue: 520000, vehicles: 145, occupancy: 75 },
    { date: "Miércoles", revenue: 480000, vehicles: 130, occupancy: 70 },
    { date: "Jueves", revenue: 510000, vehicles: 140, occupancy: 72 },
    { date: "Viernes", revenue: 580000, vehicles: 160, occupancy: 85 },
    { date: "Sábado", revenue: 620000, vehicles: 175, occupancy: 90 },
  ])

  const [auditHistory] = useState<AuditRecord[]>([
    {
      id: "1",
      timestamp: "2024-01-15 14:30",
      user: "María García",
      action: "Anular Ticket",
      ticketId: "TK-001",
      reason: "Error en cálculo de tarifa",
    },
    {
      id: "2",
      timestamp: "2024-01-15 13:45",
      user: "Carlos López",
      action: "Modificar Monto",
      ticketId: "TK-002",
      previousAmount: 50000,
      newAmount: 45000,
      reason: "Ajuste por cliente frecuente",
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:15",
      user: "Juan Pérez",
      action: "Reimprimir Ticket",
      ticketId: "TK-003",
    },
  ])

  const [newUser, setNewUser] = useState({ name: "", username: "", role: "Operador" as const })
  const [newRate, setNewRate] = useState({ tipo_vehiculo: "Carro", precio_hora: "" })
  const [userRole] = useState("Administrador")

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
          fecha_vigencia_inicio: new Date().toISOString().split('T')[0],
          estado: 'En vigencia'
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

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="rates">Tarifas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Agregar Nuevo Usuario</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Nombre completo"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="bg-input border-border"
              />
              <Input
                placeholder="Usuario"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="bg-input border-border"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                className="px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option>Administrador</option>
                <option>Supervisor</option>
                <option>Operador</option>
              </select>
              <Button onClick={handleAddUser} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
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
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
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
        </TabsContent>

        <TabsContent value="rates" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Agregar Nueva Tarifa - Lima Centro</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newRate.tipo_vehiculo}
                onChange={(e) => setNewRate({ ...newRate, tipo_vehiculo: e.target.value })}
                className="px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                {/* ACTUALIZADO: Nuevas opciones coincidentes con la BD */}
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Compacto">Compacto</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Moto">Moto</option>
              </select>

              <Input
                type="number"
                placeholder="Precio por Hora"
                value={newRate.precio_hora}
                onChange={(e) => setNewRate({ ...newRate, precio_hora: e.target.value })}
                className="bg-input border-border"
              />

              <Button onClick={handleAddRate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
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
                      <td className="py-3 px-4 font-semibold">S/. {Number(rate.precio_hora).toLocaleString()}</td>
                      <td className="py-3 px-4">{rate.estado}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRate(rate.id_tarifa)}
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
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Generar Reportes - Lima Centro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Fecha Inicio</label>
                <Input type="date" className="bg-input border-border" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fecha Fin</label>
                <Input type="date" className="bg-input border-border" />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generar Reporte</Button>
              <Button onClick={handleExportExcel} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Exportar Excel
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 bg-card border border-border">
              <h3 className="font-semibold mb-4">Ingresos Diarios</h3>
              <div className="space-y-3">
                {dailyReports.map((report) => (
                  <div key={report.date} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                    <span className="font-semibold text-accent">S/. {report.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Semanal</span>
                  <span className="font-bold text-lg text-accent">
                    S/. {dailyReports.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border border-border">
              <h3 className="font-semibold mb-4">Ocupación Promedio</h3>
              <div className="space-y-3">
                {dailyReports.map((report) => (
                  <div key={report.date}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{report.date}</span>
                      <span className="text-sm font-semibold">{report.occupancy}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${report.occupancy >= 80
                          ? "bg-destructive"
                          : report.occupancy >= 60
                            ? "bg-secondary"
                            : "bg-accent"
                          }`}
                        style={{ width: `${report.occupancy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border border-border">
            <h3 className="font-semibold mb-4">Estadísticas Detalladas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Día</th>
                    <th className="text-left py-3 px-4 font-semibold">Ingresos</th>
                    <th className="text-left py-3 px-4 font-semibold">Vehículos</th>
                    <th className="text-left py-3 px-4 font-semibold">Ocupación</th>
                    <th className="text-left py-3 px-4 font-semibold">Promedio/Vehículo</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyReports.map((report) => (
                    <tr key={report.date} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{report.date}</td>
                      <td className="py-3 px-4 font-semibold text-accent">S/. {report.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4">{report.vehicles}</td>
                      <td className="py-3 px-4">{report.occupancy}%</td>
                      <td className="py-3 px-4">S/. {Math.round(report.revenue / report.vehicles).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <History className="w-5 h-5" />
              Historial de Auditoría
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Fecha Inicio</label>
                <Input type="date" className="bg-input border-border" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fecha Fin</label>
                <Input type="date" className="bg-input border-border" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Acción</label>
                <select className="px-3 py-2 bg-input border border-border rounded-md text-foreground w-full">
                  <option>Todas</option>
                  <option>Anular Ticket</option>
                  <option>Modificar Monto</option>
                  <option>Reimprimir Ticket</option>
                </select>
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mb-6">Filtrar</Button>
          </Card>

          <Card className="p-6 bg-card border border-border">
            <h3 className="font-semibold mb-4">Registros de Auditoría ({auditHistory.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Fecha/Hora</th>
                    <th className="text-left py-3 px-4 font-semibold">Usuario</th>
                    <th className="text-left py-3 px-4 font-semibold">Acción</th>
                    <th className="text-left py-3 px-4 font-semibold">Ticket</th>
                    <th className="text-left py-3 px-4 font-semibold">Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {auditHistory.map((record) => (
                    <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-xs">{record.timestamp}</td>
                      <td className="py-3 px-4 font-medium">{record.user}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${record.action === "Anular Ticket"
                            ? "bg-destructive/20 text-destructive"
                            : record.action === "Modificar Monto"
                              ? "bg-secondary/20 text-secondary"
                              : "bg-accent/20 text-accent"
                            }`}
                        >
                          {record.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs">{record.ticketId}</td>
                      <td className="py-3 px-4 text-xs">
                        {record.previousAmount && record.newAmount ? (
                          <span>
                            S/. {record.previousAmount.toLocaleString()} → S/. {record.newAmount.toLocaleString()}
                          </span>
                        ) : record.reason ? (
                          <span className="text-muted-foreground">{record.reason}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
