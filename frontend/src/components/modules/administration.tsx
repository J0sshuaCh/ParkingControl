"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, History, X, UserPlus } from "lucide-react"
import { getTarifas, createTarifa, deleteTarifa, updateTarifa, type Tarifa } from "@/services/tarifasService"
import { getUsuarios, createUsuario, deleteUsuario, updateUsuario, type Usuario } from "@/services/usuariosService"

// --- TIPOS ---

interface AuditRecord {
  id: string; timestamp: string; user: string; action: string; ticketId?: string; previousAmount?: number; newAmount?: number; reason?: string;
}

// Mapeo de Roles para facilitar la conversión de nombre a ID
const ROLES: Record<string, number> = {
  "Administrador": 1,
  "Supervisor": 2,
  "Operador": 3
};
// Inverso para mostrar el nombre en el select de edición
const ROLE_ID_TO_NAME: Record<number, string> = {
  1: "Administrador",
  2: "Supervisor",
  3: "Operador"
};
// --- COMPONENTE MODAL DE EDICIÓN USUARIO ---
function EditUserModal({ user, onClose, onSave }: { user: Usuario | null, onClose: () => void, onSave: (id: number, data: Partial<Usuario>) => void }) {
  const [formData, setFormData] = useState<Partial<Usuario>>({})
  const [roleName, setRoleName] = useState("")

  useEffect(() => {
    if (user) {
      setFormData({
        nombre_completo: user.nombre_completo,
        email: user.email,
        username: user.username,
        estado: user.estado
      })
      // Intentamos deducir el rol actual por el nombre que viene del backend o usar Operador por defecto
      setRoleName(user.nombre_rol ? user.nombre_rol.charAt(0).toUpperCase() + user.nombre_rol.slice(1) : "Operador")
    }
  }, [user])

  if (!user) return null

  const handleSave = () => {
    // Convertimos el nombre del rol seleccionado a su ID
    const id_rol = ROLES[roleName] || 3;

    onSave(user.id_usuario, {
      ...formData,
      id_rol: id_rol // Enviamos el ID del rol para que la DB lo entienda
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-in fade-in zoom-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Editar Usuario</h3>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1">Nombre Completo</label>
            <Input
              value={formData.nombre_completo || ''}
              onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1">Usuario</label>
            <Input
              value={formData.username || ''}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1">Email</label>
            <Input
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1">Rol</label>
              <select
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              >
                <option>Operador</option>
                <option>Supervisor</option>
                <option>Administrador</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1">Estado</label>
              <select
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              >
                <option value="Activo">Activo</option>
                <option value="Ausente">Ausente</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground">Guardar Cambios</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
// --- COMPONENTE MODAL DE EDICIÓN TARIFA ---
function EditTarifaModal({ tarifa, onClose, onSave }: { tarifa: Tarifa | null, onClose: () => void, onSave: (id: number, data: Partial<Tarifa>) => void }) {
  const [formData, setFormData] = useState<Partial<Tarifa>>({})

  useEffect(() => {
    if (tarifa) {
      setFormData({ precio_hora: tarifa.precio_hora, estado: tarifa.estado })
    }
  }, [tarifa])

  if (!tarifa) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm bg-card border border-border p-6 animate-in fade-in zoom-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Editar Tarifa: {tarifa.tipo_vehiculo}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}><X className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1">Precio (S/.)</label>
            <Input
              type="number"
              step="0.10"
              value={formData.precio_hora?.toString() || ''}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setFormData({ ...formData, precio_hora: isNaN(val) ? 0 : val })
              }}
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1">Estado</label>
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
            <Button onClick={() => { onSave(tarifa.id_tarifa, formData); onClose(); }} className="w-full">Guardar</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function Administration() {
  // --- ESTADOS ---
  const [users, setUsers] = useState<Usuario[]>([])
  const [rates, setRates] = useState<Tarifa[]>([])
  const [editingTarifa, setEditingTarifa] = useState<Tarifa | null>(null)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null) // Nuevo estado
  // Estado formulario nuevo usuario
  const [newUser, setNewUser] = useState({
    nombre_completo: "",
    username: "",
    password: "",
    email: "",
    roleName: "Operador"
  })

  // Estado formulario nueva tarifa
  const [newRate, setNewRate] = useState({ tipo_vehiculo: "Sedan", precio_hora: "" })

  const [auditHistory] = useState<AuditRecord[]>([
    { id: "1", timestamp: "2024-01-15 14:30", user: "María García", action: "Anular Ticket", ticketId: "TK-001" },
  ])

  // --- CARGA DE DATOS ---
  const loadData = useCallback(async () => {
    try {
      const [tarifasData, usuariosData] = await Promise.all([getTarifas(), getUsuarios()])
      setRates(tarifasData)
      setUsers(usuariosData)
    } catch (error) {
      console.error("Error cargando datos:", error)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  // --- HANDLERS USUARIOS ---
  const handleAddUser = async () => {
    if (!newUser.nombre_completo || !newUser.username || !newUser.password || !newUser.email) {
      alert("Por favor completa todos los campos del usuario.")
      return
    }

    try {
      const roleId = ROLES[newUser.roleName] || 3;
      await createUsuario({
        nombre_completo: newUser.nombre_completo,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        id_rol: roleId
      })
      alert("Usuario creado exitosamente")
      setNewUser({ nombre_completo: "", username: "", password: "", email: "", roleName: "Operador" })
      loadData()
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Error al crear usuario")
    }
  }
  const handleUpdateUser = async (id: number, data: Partial<Usuario>) => {
    try {
      await updateUsuario(id, data)
      alert("Usuario actualizado correctamente")
      loadData()
      setEditingUser(null)
    } catch (error: any) {
      console.error(error)
      alert("Error al actualizar usuario: " + (error.message || "Error desconocido"))
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (confirm("¿Eliminar este usuario permanentemente?")) {
      try {
        await deleteUsuario(id)
        loadData()
      } catch (error) {
        alert("No se pudo eliminar el usuario.")
      }
    }
  }

  // --- HANDLERS TARIFAS ---
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
        loadData()
      } catch (error) { console.error(error); alert("Error al agregar tarifa") }
    }
  }

  const handleUpdateRate = async (id: number, data: Partial<Tarifa>) => {
    try {
      await updateTarifa(id, data)
      loadData()
    } catch (e) { alert("Error al actualizar") }
  }

  const handleDeleteRate = async (id: number) => {
    if (confirm("¿Eliminar tarifa?")) {
      try { await deleteTarifa(id); loadData() } catch (e) { alert("Error eliminando") }
    }
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Administración</h1>
        <p className="text-muted-foreground">Gestión integral del sistema.</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="rates">Tarifas</TabsTrigger>
        </TabsList>

        {/* --- TAB USUARIOS --- */}
        <TabsContent value="users" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> Registrar Nuevo Usuario
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                placeholder="Nombre Completo"
                value={newUser.nombre_completo}
                onChange={(e) => setNewUser({ ...newUser, nombre_completo: e.target.value })}
                className="bg-input border-border"
              />
              <Input
                placeholder="Usuario (Login)"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="bg-input border-border"
              />
              <Input
                type="email"
                placeholder="Correo Electrónico"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="bg-input border-border"
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="bg-input border-border"
              />
              <select
                value={newUser.roleName}
                onChange={(e) => setNewUser({ ...newUser, roleName: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-input text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option>Operador</option>
                <option>Supervisor</option>
                <option>Administrador</option>
              </select>

              <Button onClick={handleAddUser} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" /> Crear Usuario
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Usuarios Registrados ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id_usuario} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{user.nombre_completo}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3 text-muted-foreground">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${user.nombre_rol === 'administrador' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                          {user.nombre_rol?.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                          {user.estado}
                        </span>
                      </td>
                      <td className="p-3 flex justify-end gap-2">
                        {/* Botón EDITAR conectado */}
                        <Button variant="ghost" size="sm" onClick={() => setEditingUser(user)} className="text-primary hover:bg-primary/10">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id_usuario)} className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={6} className="text-center p-8 text-muted-foreground">No hay usuarios registrados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* --- TAB TARIFAS --- */}
        <TabsContent value="rates" className="space-y-4">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Agregar Nueva Tarifa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newRate.tipo_vehiculo}
                onChange={(e) => setNewRate({ ...newRate, tipo_vehiculo: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-input text-foreground px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Compacto">Compacto</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Moto">Moto</option>
              </select>
              <Input
                type="number"
                placeholder="Precio"
                value={newRate.precio_hora}
                onChange={(e) => setNewRate({ ...newRate, precio_hora: e.target.value })}
                className="bg-input border-border"
              />
              <Button onClick={handleAddRate} className="bg-primary text-primary-foreground"><Plus className="mr-2 h-4 w-4" /> Agregar</Button>
            </div>
          </Card>
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4">Tarifas Vigentes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr><th className="p-3">Vehículo</th><th className="p-3">Precio</th><th className="p-3">Estado</th><th className="p-3 text-right">Acciones</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rates.map(r => (
                    <tr key={r.id_tarifa} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 font-medium">{r.tipo_vehiculo}</td>
                      <td className="p-3 font-bold text-primary">S/. {Number(r.precio_hora).toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {r.estado}
                        </span>
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditingTarifa(r)} className="text-primary hover:bg-primary/10"><Edit2 className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteRate(r.id_tarifa)}><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        {/* --- Tab AUDIT (Mejora a futuro) --- 
        <TabsContent value="audit">
          <Card className="p-6 bg-card border border-border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><History className="w-5 h-5" /> Historial</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr><th className="p-3">Acción</th><th className="p-3">Usuario</th><th className="p-3">Detalle</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {auditHistory.map(r => (
                    <tr key={r.id} className="hover:bg-muted/50"><td className="p-3">{r.action}</td><td className="p-3">{r.user}</td><td className="p-3 text-muted-foreground">{r.ticketId}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      
      */}
      </Tabs>
      {/* Modal de Edición */}
      <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleUpdateUser} />
      <EditTarifaModal tarifa={editingTarifa} onClose={() => setEditingTarifa(null)} onSave={handleUpdateRate} />
    </div>
  )
}