"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Printer, Send, Edit2 } from "lucide-react";
import { buscarTicketPorPlaca, procesarPago } from "@/services/ticketService";
// Importamos solo la interfaz, no la función duplicada
import type { Ticket } from "@/services/ticketService";

export function ExitAndBilling() {
  const [plate, setPlate] = useState("");
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [editingAmount, setEditingAmount] = useState(false);
  const [editedAmount, setEditedAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearchVehicle = async () => {
    setError("");
    setSuccess("");
    setCurrentTicket(null);

    if (!plate) return;

    try {
      const ticket = await buscarTicketPorPlaca(plate.toUpperCase());
      setCurrentTicket(ticket);
      // Inicializamos el monto editado con el monto total calculado por el backend
      setEditedAmount((ticket.monto_total ?? 0).toFixed(2));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se encontró el vehículo o ya salió.");
    }
  };

  const handlePayment = async () => {
    if (!currentTicket) return;
    setError("");

    try {
      const finalAmount = editingAmount
        ? Number.parseFloat(editedAmount)
        : (currentTicket.monto_total ?? 0);

      if (isNaN(finalAmount) || finalAmount < 0) {
        setError("El monto ingresado no es válido.");
        return;
      }

      // Como id_espacio ya no es opcional en la interfaz, quitamos el "!"
      await procesarPago(currentTicket.id_ticket, currentTicket.id_espacio, finalAmount);

      setSuccess(`Cobro de S/. ${finalAmount.toFixed(2)} registrado correctamente.`);
      setCurrentTicket(null);
      setPlate("");
      setEditingAmount(false);
    } catch (err: any) {
      setError(err.message || "Error al procesar el pago.");
    }
  };

  const handlePrint = () => {
    alert("Imprimiendo ticket...");
  };

  const handleSendDigital = () => {
    alert("Ticket enviado digitalmente");
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return "0h 0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

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
            onKeyDown={(e) => e.key === 'Enter' && handleSearchVehicle()} // Agregado búsqueda con Enter
            className="flex-1 bg-input border-border"
          />
          <Button onClick={handleSearchVehicle} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Buscar
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-sm font-medium">{success}</p>}
      </Card>

      {currentTicket && (
        <Card className="p-6 bg-card border border-border border-accent animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent" /> Ticket de Pago
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Placa</p>
              <p className="text-xl font-bold">{currentTicket.placa}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Espacio</p>
              <p className="text-lg">{currentTicket.codigo_espacio}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo Vehículo</p>
              <p className="text-lg">{currentTicket.tipo_vehiculo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora Ingreso</p>
              <p className="text-lg">{new Date(currentTicket.hora_entrada).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hora Salida (Est.)</p>
              <p className="text-lg">{currentTicket.hora_salida ? new Date(currentTicket.hora_salida).toLocaleString() : "Ahora"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="text-lg">{formatDuration(currentTicket.tiempo_permanencia ?? 0)}</p>
            </div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-2">Monto Total</p>
            {!editingAmount ? (
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-accent">S/. {(currentTicket.monto_total ?? 0).toFixed(2)}</p>
                <Button size="sm" variant="outline" onClick={() => setEditingAmount(true)} className="bg-transparent">
                  <Edit2 className="w-4 h-4 mr-1" /> Editar
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
              <CheckCircle className="w-4 h-4 mr-2" /> Procesar Pago
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex-1 bg-transparent">
              <Printer className="w-4 h-4 mr-2" /> Imprimir
            </Button>
            <Button onClick={handleSendDigital} variant="outline" className="flex-1 bg-transparent">
              <Send className="w-4 h-4 mr-2" /> Enviar
            </Button>
            <Button
              onClick={() => {
                setCurrentTicket(null);
                setPlate("");
                setEditingAmount(false);
              }}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}