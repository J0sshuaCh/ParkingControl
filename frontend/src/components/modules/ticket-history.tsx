"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, CalendarClock } from "lucide-react"
import { getTicketHistory, type TicketHistorial } from "@/services/ticketService"
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"

export function TicketHistory() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [historyData, setHistoryData] = useState<TicketHistorial[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const fetchHistory = useCallback(async () => {
        setLoadingHistory(true);
        try {
            let start, end;
            if (viewMode === 'week') {
                start = format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
                end = format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
            } else {
                start = format(startOfMonth(currentDate), 'yyyy-MM-dd');
                end = format(endOfMonth(currentDate), 'yyyy-MM-dd');
            }
            const data = await getTicketHistory(start, end);
            setHistoryData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingHistory(false);
        }
    }, [currentDate, viewMode]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const nextPeriod = () => {
        if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
        else setCurrentDate(addMonths(currentDate, 1));
    }

    const prevPeriod = () => {
        if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
        else setCurrentDate(subMonths(currentDate, 1));
    }

    const filteredData = historyData.filter(t => {
        if (statusFilter === "all") return true;
        return t.estado === statusFilter;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Historial de Tickets</h1>
                <p className="text-muted-foreground">Consulta el historial de tickets emitidos por semana.</p>
            </div>

            <Card className="p-6 bg-card border border-border">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">
                            Historial {viewMode === 'week' ? 'Semanal' : 'Mensual'}
                        </h2>
                        <div className="flex bg-muted rounded-md p-1">
                            <button
                                onClick={() => setViewMode('week')}
                                className={`px-3 py-1 text-xs rounded-sm transition-all ${viewMode === 'week' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Semana
                            </button>
                            <button
                                onClick={() => setViewMode('month')}
                                className={`px-3 py-1 text-xs rounded-sm transition-all ${viewMode === 'month' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Mes
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 justify-center">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-1 bg-input border border-border rounded-md text-sm"
                        >
                            <option value="all">Todos los Estados</option>
                            <option value="Emitido">Emitido</option>
                            <option value="Pagado">Pagado</option>
                            <option value="Anulado">Anulado</option>
                            <option value="Reservado">Reservado</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={prevPeriod}>&lt;</Button>
                            <div className="text-center min-w-[150px]">
                                <p className="text-sm font-medium">
                                    {viewMode === 'week' ? 'Semana del' : 'Mes de'}
                                </p>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {viewMode === 'week'
                                        ? `${format(startOfWeek(currentDate, { weekStartsOn: 1 }), "dd MMM", { locale: es })} al ${format(endOfWeek(currentDate, { weekStartsOn: 1 }), "dd MMM", { locale: es })}`
                                        : format(currentDate, "MMMM yyyy", { locale: es })
                                    }
                                </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={nextPeriod}>&gt;</Button>
                        </div>
                    </div>
                </div>

                {loadingHistory ? (
                    <p className="text-center py-8">Cargando historial...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left py-2 px-4 rounded-l-md">Ticket</th>
                                    <th className="text-left py-2 px-4">Placa</th>
                                    <th className="text-left py-2 px-4">Entrada</th>
                                    <th className="text-left py-2 px-4">Salida</th>
                                    <th className="text-left py-2 px-4">Estado</th>
                                    <th className="text-left py-2 px-4 rounded-r-md">Detalles / Motivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-4 text-muted-foreground">No hay tickets en este periodo para el filtro seleccionado.</td></tr>
                                ) : (
                                    filteredData.map(t => (
                                        <tr key={t.id_ticket} className="border-b border-border hover:bg-muted/20">
                                            <td className="py-2 px-4 font-mono">{t.codigo_ticket}</td>
                                            <td className="py-2 px-4">{t.placa} <span className="text-xs text-muted-foreground">({t.tipo_vehiculo})</span></td>
                                            <td className="py-2 px-4">{t.hora_entrada}</td>
                                            <td className="py-2 px-4">{t.hora_salida || "-"}</td>
                                            <td className="py-2 px-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold
                                        ${t.estado === 'Emitido' ? 'bg-blue-100 text-blue-700' :
                                                        t.estado === 'Pagado' ? 'bg-green-100 text-green-700' :
                                                            t.estado === 'Reservado' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'}
                                    `}>
                                                    {t.estado}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 text-xs text-muted-foreground">
                                                {t.estado === 'Reservado' ? (
                                                    <span className="flex items-center gap-1 text-yellow-700">
                                                        <CalendarClock className="w-3 h-3" /> {t.motivo_anulacion}
                                                    </span>
                                                ) : t.motivo_anulacion ? (
                                                    <span className="text-destructive flex items-center gap-1">
                                                        <Trash2 className="w-3 h-3" /> Anulado: {t.motivo_anulacion}
                                                    </span>
                                                ) : t.monto_total ? `Total: S/ ${t.monto_total}` : "En curso"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    )
}
