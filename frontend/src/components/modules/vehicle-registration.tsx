"use client"

import { createPortal } from "react-dom"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Eye, Search, Edit2, Printer, RefreshCcw, X, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { getEspaciosLibres, getVehiculosActivos, registrarEntrada, verificarPlaca, type EspacioLibre, type VehiculoActivo } from "@/services/vehiculoService"
import { updateTicket, anularTicket } from "@/services/ticketService"
import { generateEntryTicket } from "@/lib/ticketUtils"

export interface DetailModalProps {
  vehicle: VehiculoActivo | null
  onClose: () => void
  onEdit: (vehicle: VehiculoActivo) => void
  onAnulate?: (id_vehiculo: number) => void
}

export function DetailModal({ vehicle, onClose, onEdit, onAnulate }: DetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ plate: "", type: "" })
  const [showAnulConfirm, setShowAnulConfirm] = useState(false)
  const [anulReason, setAnulReason] = useState("")

  // Estado para controlar montaje en cliente (necesario para portal)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (vehicle) {
      setEditData({ plate: vehicle.placa, type: vehicle.tipo_vehiculo })
      // Resetear estados internos al abrir nuevo vehículo
      setShowAnulConfirm(false)
      setIsEditing(false)
      setAnulReason("")
    }
  }, [vehicle])

  if (!vehicle || !mounted) return null

  // --- LÓGICA DE EDICIÓN Y ANULACIÓN ---
  const handleSaveEdit = async () => {
    try {
      if (!vehicle.id_ticket) {
        toast.error("No se encontró ID de ticket para editar");
        return;
      }
      await updateTicket(vehicle.id_ticket, {
        nueva_placa: editData.plate,
        nuevo_tipo: editData.type
      });
      toast.success("Ticket actualizado correctamente");
      setIsEditing(false);
      onEdit({ ...vehicle, placa: editData.plate, tipo_vehiculo: editData.type });
      onClose();
    } catch (e: any) {
      toast.error("Error al actualizar: " + e.message);
    }
  }

  const handleAnular = async () => {
    if (!anulReason) return toast.error("Ingrese un motivo");
    try {
      if (!vehicle.id_ticket) {
        toast.error("No se encontró ID de ticket");
        return;
      }
      await anularTicket(vehicle.id_ticket, anulReason);
      toast.success("Ticket anulado correctamente");
      if (onAnulate) onAnulate(vehicle.id_vehiculo);
      onClose();
    } catch (e: any) {
      toast.error("Error al anular: " + e.message);
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalle del Vehículo</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            {/* VISTA SOLO LECTURA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Placa</p>
                <p className="text-lg font-semibold">{vehicle.placa}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="text-lg font-semibold">{vehicle.tipo_vehiculo}</p>
              </div>
            </div>
            {/* Info Extra */}
            <div>
              <p className="text-sm text-muted-foreground">Ticket</p>
              <p className="text-lg text-primary font-bold">{vehicle.codigo_ticket}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ingreso</p>
              <p className="font-mono">{vehicle.hora_ingreso}</p>
            </div>

            {showAnulConfirm ? (
              <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20 animate-in fade-in zoom-in-95">
                <p className="text-sm font-semibold text-destructive mb-2">¿Anular Ticket y Liberar Espacio?</p>
                <Input
                  placeholder="Motivo de anulación..."
                  value={anulReason}
                  onChange={e => setAnulReason(e.target.value)}
                  className="bg-background mb-2"
                />
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={handleAnular} className="flex-1">Confirmar Anulación</Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowAnulConfirm(false)}>Cancelar</Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mt-6">
                <Button onClick={() => setIsEditing(true)} variant="secondary" className="flex-1">
                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button onClick={() => setShowAnulConfirm(true)} variant="destructive" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" /> Anular
                </Button>
                <Button onClick={onClose} variant="outline">
                  Cerrar
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* VISTA EDICIÓN */}
            <div>
              <label className="text-sm font-medium">Placa</label>
              <Input
                value={editData.plate}
                onChange={e => setEditData({ ...editData, plate: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tipo</label>
              <select
                value={editData.type}
                onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Compacto">Compacto</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Moto">Moto</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSaveEdit} className="flex-1">Guardar Cambios</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancelar</Button>
            </div>
          </div>
        )}
      </Card>
    </div>,
    document.body
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
  const [selectedSpaceId, setSelectedSpaceId] = useState("")

  // Estados de UI
  const [detailModal, setDetailModal] = useState<VehiculoActivo | null>(null)
  const [filterTicket, setFilterTicket] = useState("")
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

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
    if (!formData.plate) {
      toast.warning("Por favor ingresa la placa del vehículo.")
      return
    }

    if (!formData.plate.includes("-")) {
      toast.warning("La placa debe incluir un guión (ej: ABC-123).")
      return;
    }

    if (!formData.autoAssign && !selectedSpaceId) {
      toast.warning("Por favor selecciona un espacio manual.")
      return
    }

    try {
      setLoading(true);

      const existe = await verificarPlaca(formData.plate.toUpperCase());
      if (existe) {
        toast.error(`El vehículo con placa ${formData.plate} ya se encuentra DENTRO del estacionamiento.`);
        setLoading(false);
        return;
      }

      const response = await registrarEntrada({
        placa: formData.plate.toUpperCase(),
        tipo_vehiculo: formData.type,
        modo_asignacion: formData.autoAssign ? "auto" : "manual",
        id_espacio_manual: formData.autoAssign ? undefined : selectedSpaceId
      })

      toast.success(`¡Registro Exitoso!`, {
        description: `Ticket: ${response.ticket} | Espacio: ${response.espacio}`
      })

      setFormData({ ...formData, plate: "" })
      setSelectedSpaceId("")
      fetchData()

    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "No se pudo registrar el vehículo")
    } finally {
      setLoading(false);
    }
  }

  const handleReprint = (vehicle: VehiculoActivo) => {
    generateEntryTicket(vehicle);
  }

  const filteredVehicles = vehicles.filter((v) => {
    if (filterTicket && !v.codigo_ticket.includes(filterTicket.toUpperCase()) && !v.placa.includes(filterTicket.toUpperCase())) return false
    return true
  })

  // Paginación
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage)
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredVehicles.slice(start, start + itemsPerPage)
  }, [filteredVehicles, currentPage])

  // Resetear página al filtrar
  useEffect(() => {
    setCurrentPage(1)
  }, [filterTicket])

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">Registro de Vehículos</h1>
          <p className="text-sm md:text-base text-muted-foreground">Registra la entrada de nuevos vehículos y genera tickets.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading} className="w-full sm:w-auto">
          <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {/* --- Formulario de Registro --- */}
      <Card className="p-4 md:p-6 bg-card border border-border">
        <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Registrar Entrada</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">

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
            <div className="flex items-end">
              <Button onClick={handleRegister} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Registrar Entrada
              </Button>
            </div>
          )}
        </div>

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
      <Card className="p-4 md:p-6 bg-card border border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ticket o placa..."
              value={filterTicket}
              onChange={(e) => setFilterTicket(e.target.value)}
              className="pl-9 bg-background"
            />
            {filterTicket && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setFilterTicket("")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* --- Tabla de Activos --- */}
      <Card className="p-4 md:p-6 bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold">
            Tickets de vehículos en el Parqueo 
            <Badge variant="secondary" className="ml-2">{filteredVehicles.length}</Badge>
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="rounded-l-lg text-xs md:text-sm">Ticket</TableHead>
              <TableHead className="text-xs md:text-sm">Placa</TableHead>
              <TableHead className="hidden sm:table-cell text-xs md:text-sm">Tipo</TableHead>
              <TableHead className="hidden md:table-cell text-xs md:text-sm">Hora Ingreso</TableHead>
              <TableHead className="text-xs md:text-sm">Espacio</TableHead>
              <TableHead className="hidden sm:table-cell text-xs md:text-sm">Estado</TableHead>
              <TableHead className="rounded-r-lg text-right text-xs md:text-sm">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-full bg-muted">
                      <Search className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">No hay vehículos registrados</p>
                    <p className="text-sm text-muted-foreground">Los vehículos activos aparecerán aquí</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedVehicles.map((vehicle) => (
                <TableRow key={vehicle.id_vehiculo} className="group">
                  <TableCell className="font-mono text-xs text-primary font-medium">{vehicle.codigo_ticket}</TableCell>
                  <TableCell className="font-bold">{vehicle.placa}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="font-normal">{vehicle.tipo_vehiculo}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{vehicle.hora_ingreso}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{vehicle.espacio}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 border-0">
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end opacity-70 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setDetailModal(vehicle)}
                        className="text-primary hover:bg-primary/10"
                        title="Ver Detalles / Editar / Anular"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleReprint(vehicle)}
                        className="text-muted-foreground hover:bg-muted"
                        title="Reimprimir ticket"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t gap-3">
            <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} de {filteredVehicles.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>



      <DetailModal
        vehicle={detailModal}
        onClose={() => setDetailModal(null)}
        onEdit={(updated) => {
          setVehicles(prev => prev.map(v => v.id_vehiculo === updated.id_vehiculo ? updated : v))
        }}
        onAnulate={(id) => {
          setVehicles(prev => prev.filter(v => v.id_vehiculo !== id));
          fetchData(); // Refrescar espacios libres también
        }}
      />
    </div >
  )
}