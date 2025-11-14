"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Printer, Send, Trash2, Edit2 } from "lucide-react"

interface Ticket {
  id: string
  plate: string
  entryTime: string
  exitTime: string
  duration: string
  amount: number
  status: "Pendiente" | "Pagado" | "Inválido"
  supervisor?: string
  cancellationReason?: string
}

interface CancellationModalProps {
  ticket: Ticket | null
  onCancel: (reason: string) => void
  onClose: () => void
}

function CancellationModal({ ticket, onCancel, onClose }: CancellationModalProps) {
  const [reason, setReason] = useState("")

  if (!ticket) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border border-border p-6 animate-slide-up">
        <h2 className="text-xl font-bold mb-4">Anular Ticket</h2>
        <p className="text-sm text-muted-foreground mb-4">Ticket: {ticket.id}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Motivo de Anulación</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe el motivo de la anulación..."
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground text-sm"
            rows={4}
          />
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              onCancel(reason)
              setReason("")
            }}
            className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Anular
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Cancelar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export function ExitAndBilling() {
  const [plate, setPlate] = useState("")
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null)
  const [editingAmount, setEditingAmount] = useState(false)
  const [editedAmount, setEditedAmount] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      plate: "ABC-123",
      entryTime: "09:30",
      exitTime: "12:45",
      duration: "3h 15m",
      amount: 45000,
      status: "Pagado",
    },
    {
      id: "2",
      plate: "XYZ-789",
      entryTime: "10:15",
      exitTime: "14:30",
      duration: "4h 15m",
      amount: 55000,
      status: "Pagado",
    },
  ])
  const [cancellationModal, setCancellationModal] = useState<Ticket | null>(null)
  const [userRole] = useState("Supervisor")

  const handleSearchVehicle = () => {
    if (plate) {
      const exitTime = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      const ticket: Ticket = {
        id: Date.now().toString(),
        plate: plate.toUpperCase(),
        entryTime: "09:30",
        exitTime,
        duration: "3h 45m",
        amount: 50000,
        status: "Pendiente",
      }
      setCurrentTicket(ticket)
      setEditedAmount(ticket.amount.toString())
    }
  }

  const handlePayment = () => {
    if (currentTicket) {
      const finalAmount = editingAmount ? Number.parseInt(editedAmount) : currentTicket.amount
      const paidTicket = { ...currentTicket, amount: finalAmount, status: "Pagado" as const }
      setTickets([paidTicket, ...tickets])
      setCurrentTicket(null)
      setPlate("")
      setEditingAmount(false)
      alert("Pago procesado correctamente")
    }
  }

  const handleCancelTicket = (reason: string) => {
    if (cancellationModal) {
      const cancelledTicket = {
        ...cancellationModal,
        status: "Inválido" as const,
        cancellationReason: reason,
      }
      setTickets(tickets.map((t) => (t.id === cancelledTicket.id ? cancelledTicket : t)))
      setCancellationModal(null)
      alert("Ticket anulado correctamente")
    }
  }

  const handlePrint = () => {
    alert("Imprimiendo ticket...")
  }

  const handleSendDigital = () => {
    alert("Ticket enviado digitalmente")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Salida y Cobro</h1>
        <p className="text-muted-foreground">Registra salidas de vehículos y procesa pagos</p>
      </div>

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Buscar Vehículo</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Ingresa la placa del vehículo"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            className="flex-1 bg-input border-border"
          />
          <Button onClick={handleSearchVehicle} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Buscar
          </Button>
        </div>
      </Card>

      {currentTicket && (
        <Card className="p-6 bg-card border border-border border-accent">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent" />
            Ticket de Pago
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Placa</p>
              <p className="text-xl font-bold">{currentTicket.plate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="text-xl font-bold">{currentTicket.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora Ingreso</p>
              <p className="text-lg">{currentTicket.entryTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora Salida</p>
              <p className="text-lg">{currentTicket.exitTime}</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-2">Monto Total</p>
            {!editingAmount ? (
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-accent">S/. {currentTicket.amount.toLocaleString()}</p>
                <Button size="sm" variant="outline" onClick={() => setEditingAmount(true)} className="bg-transparent">
                  <Edit2 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  className="flex-1 bg-input border-border text-lg font-bold"
                />
                <Button
                  size="sm"
                  onClick={() => setEditingAmount(false)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  OK
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handlePayment} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <CheckCircle className="w-4 h-4 mr-2" />
              Procesar Pago
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex-1 bg-transparent">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button onClick={handleSendDigital} variant="outline" className="flex-1 bg-transparent">
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
            <Button
              onClick={() => {
                setCurrentTicket(null)
                setPlate("")
                setEditingAmount(false)
              }}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {userRole === "Supervisor" && (
        <Card className="p-6 bg-card border border-border border-destructive/30">
          <h2 className="text-lg font-semibold mb-4">Anular o Modificar Ticket (Supervisor)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Placa</th>
                  <th className="text-left py-3 px-4 font-semibold">Monto</th>
                  <th className="text-left py-3 px-4 font-semibold">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{ticket.id}</td>
                    <td className="py-3 px-4">{ticket.plate}</td>
                    <td className="py-3 px-4 font-semibold">S/. {ticket.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          ticket.status === "Pagado"
                            ? "bg-green-100 text-green-700"
                            : ticket.status === "Inválido"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {ticket.status !== "Inválido" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCancellationModal(ticket)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Anular
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Historial de Pagos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Placa</th>
                <th className="text-left py-3 px-4 font-semibold">Ingreso</th>
                <th className="text-left py-3 px-4 font-semibold">Salida</th>
                <th className="text-left py-3 px-4 font-semibold">Duración</th>
                <th className="text-left py-3 px-4 font-semibold">Monto</th>
                <th className="text-left py-3 px-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{ticket.plate}</td>
                  <td className="py-3 px-4">{ticket.entryTime}</td>
                  <td className="py-3 px-4">{ticket.exitTime}</td>
                  <td className="py-3 px-4">{ticket.duration}</td>
                  <td className="py-3 px-4 font-semibold">S/. {ticket.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.status === "Pagado"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "Inválido"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CancellationModal
        ticket={cancellationModal}
        onCancel={handleCancelTicket}
        onClose={() => setCancellationModal(null)}
      />
    </div>
  )
}
