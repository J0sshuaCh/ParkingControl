"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Printer, Search, RefreshCcw, MousePointerClick, X, Edit2 } from "lucide-react";
import { buscarTicketPorPlaca, procesarPago } from "@/services/ticketService";
import type { Ticket } from "@/services/ticketService";
import { getVehiculosActivos, type VehiculoActivo } from "@/services/vehiculoService";
import { generateExitTicket } from "@/lib/ticketUtils";
import { DetailModal } from "./vehicle-registration";

export function ExitAndBilling() {
  // Estados de Cobro
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [detailModalVehicle, setDetailModalVehicle] = useState<VehiculoActivo | null>(null);

  // Estados de la Lista de Vehículos
  const [vehicles, setVehicles] = useState<VehiculoActivo[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listFilter, setListFilter] = useState("");

  // --- Función para cargar la lista de vehículos ---
  const fetchVehicles = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await getVehiculosActivos();
      setVehicles(data);
    } catch (err) {
      console.error("Error al cargar lista de vehículos:", err);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // --- Lógica de Selección y Búsqueda ---
  const handleSelectVehicle = async (plate: string) => {
    setError("");
    setSuccess("");
    setCurrentTicket(null);

    try {
      const ticket = await buscarTicketPorPlaca(plate.toUpperCase());
      setCurrentTicket(ticket);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se encontró el ticket o el vehículo ya salió.");
    }
  };

  // --- Lógica de Pago ---
  const handlePayment = async () => {
    if (!currentTicket) return;
    setError("");

    try {
      const finalAmount = currentTicket.monto_total ?? 0;

      await procesarPago(currentTicket.id_ticket, currentTicket.id_espacio, finalAmount);

      setSuccess(`Pago de S/. ${finalAmount.toFixed(2)} procesado exitosamente.`);
      setCurrentTicket(null);
      fetchVehicles();

    } catch (err: any) {
      setError(err.message || "Error al procesar el pago.");
    }
  };

  const handlePrint = () => {
    if (currentTicket) {
      generateExitTicket(currentTicket);
    }
  };

  const handleCancel = () => {
    setCurrentTicket(null);
    setError("");
    setSuccess("");
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return "0h 0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  // Filtrar la lista visualmente
  const filteredVehicles = vehicles.filter(v =>
    v.placa.includes(listFilter.toUpperCase()) ||
    v.codigo_ticket.includes(listFilter.toUpperCase())
  );

  return (
    // CAMBIO: Grid de 3 columnas
    <div className="space-y-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* --- COLUMNA IZQUIERDA (2/3): LISTA DE VEHÍCULOS --- */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Salida y Cobro</h1>
          <p className="text-muted-foreground">Seleccione un vehículo de la lista para procesar su salida.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Vehículos en Parqueo
            <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {filteredVehicles.length}
            </span>
          </h2>
          <Button variant="outline" size="sm" onClick={fetchVehicles} disabled={loadingList}>
            <RefreshCcw className={`w-4 h-4 mr-2 ${loadingList ? 'animate-spin' : ''}`} />
            Actualizar Lista
          </Button>
        </div>

        <Card className="p-0 bg-card border border-border overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrar por placa o número de ticket..."
                className="pl-9 bg-background"
                value={listFilter}
                onChange={(e) => setListFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-auto max-h-[600px]">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground sticky top-0 z-10 uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3 px-6 font-medium">Ticket</th>
                  <th className="py-3 px-6 font-medium">Placa</th>
                  <th className="py-3 px-6 font-medium hidden sm:table-cell">Ingreso</th>
                  <th className="py-3 px-6 font-medium">Tipo</th>
                  <th className="py-3 px-6 font-medium">Espacio</th>
                  <th className="py-3 px-6 font-medium text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                      {loadingList ? "Cargando vehículos..." : "No se encontraron vehículos."}
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle) => {
                    const isSelected = currentTicket?.id_ticket.toString() === vehicle.id_vehiculo.toString();
                    return (
                      <tr
                        key={vehicle.id_vehiculo}
                        className={`transition-colors hover:bg-muted/50 ${isSelected ? "bg-primary/5" : ""}`}
                      >
                        <td className="py-3 px-6 font-mono text-xs text-muted-foreground">{vehicle.codigo_ticket}</td>
                        <td className="py-3 px-6 font-bold text-foreground">{vehicle.placa}</td>
                        <td className="py-3 px-6 hidden sm:table-cell text-muted-foreground">{vehicle.hora_ingreso}</td>
                        <td className="py-3 px-6">{vehicle.tipo_vehiculo}</td>
                        <td className="py-3 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                            {vehicle.espacio}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-right flex gap-2 justify-end">
                          {/* Botón Detalles/Editar/Anular */}
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setDetailModalVehicle(vehicle)}
                            title="Editar / Anular"
                            className="shadow-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>

                          {/* Botón Cobrar (Distintivo) */}
                          <Button
                            size="sm"
                            variant={isSelected ? "secondary" : "default"}
                            onClick={() => handleSelectVehicle(vehicle.placa)}
                            className="h-8 shadow-none"
                            disabled={isSelected}
                          >
                            {isSelected ? "Seleccionado" : "Cobrar"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* --- COLUMNA DERECHA (1/3): PANTALLA DE COBRO --- */}
      <div className="lg:col-span-1 space-y-6 sticky top-6">
        {/* Mensajes de estado */}
        {error && (
          <Card className="p-4 bg-destructive/10 border-destructive text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </Card>
        )}
        {success && (
          <Card className="p-4 bg-green-100 border-green-200 text-green-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> {success}
          </Card>
        )}

        {/* TICKET DE COBRO */}
        {currentTicket ? (
          <Card className="p-6 bg-card border border-primary/50 shadow-md animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  Ticket: {currentTicket.codigo_ticket}
                </h2>
                <p className="text-sm text-muted-foreground">Resumen de estancia</p>
              </div>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded-md">
                <span className="text-muted-foreground">Placa</span>
                <span className="font-bold text-lg">{currentTicket.placa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Vehículo</span>
                <span className="font-medium">{currentTicket.tipo_vehiculo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Espacio</span>
                <span className="font-medium">{currentTicket.codigo_espacio}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Hora Ingreso</span>
                <span>{new Date(currentTicket.hora_entrada).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tiempo Total</span>
                <span className="font-mono font-bold">{formatDuration(currentTicket.tiempo_permanencia ?? 0)}</span>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl mb-6 text-center border border-primary/10">
              <p className="text-xs text-muted-foreground uppercase font-bold mb-1 tracking-wider">Total a Pagar</p>
              <p className="text-5xl font-extrabold text-primary">
                S/. {(currentTicket.monto_total ?? 0).toFixed(2)}
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={handlePayment} className="w-full h-12 text-lg font-bold shadow-sm">
                <CheckCircle className="w-5 h-5 mr-2" /> CONFIRMAR PAGO
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handlePrint} variant="outline" className="w-full">
                  <Printer className="w-4 h-4 mr-2" /> Imprimir
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive hover:text-white"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          // Estado vacío
          <div className="hidden lg:flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl text-muted-foreground bg-muted/20">
            <MousePointerClick className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-medium">Seleccione un vehículo de la lista</p>
            <p className="text-sm">para ver el detalle de cobro</p>
          </div>
        )}
      </div>

      <DetailModal
        vehicle={detailModalVehicle}
        onClose={() => setDetailModalVehicle(null)}
        onEdit={(updatedVehicle) => {
          // Actualizar la lista localmente si se editó
          setVehicles(prev => prev.map(v => v.id_vehiculo === updatedVehicle.id_vehiculo ? updatedVehicle : v))
        }}
        onAnulate={(id) => {
          setVehicles(prev => prev.filter(v => v.id_vehiculo !== id));
        }}
      />
    </div >
  );
}