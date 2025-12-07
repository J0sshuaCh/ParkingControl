import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generarReporte } from '@/services/reportesService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2, DollarSign, Car, Clock, Calendar, BarChart3, Search, Download, FileText } from 'lucide-react';

// --- INTERFACES ---
interface PaidTicket {
    id_ticket: number;
    codigo_ticket: string;
    hora_entrada: string;
    hora_salida: string;
    tiempo_permanencia: number;
    monto_total: number;
    placa: string;
    tipo_vehiculo: string;
    codigo_espacio: string;
}

export function ReportsModule() {
    // Estados para Filtros y Gráficos
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState<any>(null);

    // Estados para la Tabla de Detalle
    const [paidTickets, setPaidTickets] = useState<PaidTicket[]>([]);
    const [loadingTickets, setLoadingTickets] = useState(false);

    const handleGenerate = async () => {
        if (!fechaInicio || !fechaFin) {
            alert("Por favor selecciona ambas fechas");
            return;
        }

        setLoading(true);
        setLoadingTickets(true);

        try {
            // 1. Generar estadísticas y gráficos
            const data = await generarReporte(fechaInicio, fechaFin);
            setReportData(data);

            // 2. Cargar el detalle de tickets (Tabla)
            // Nota: Aquí usamos el endpoint que tenías. 
            // Idealmente, el backend debería aceptar filtros de fecha en /api/tickets también.
            // Por ahora, traemos todos y filtramos en el cliente o mostramos lo que devuelva el backend.
            const res = await fetch('http://localhost:8800/api/tickets?estado=Pagado');
            if (res.ok) {
                const tickets: PaidTicket[] = await res.json();

                // Opcional: Filtrar en frontend si el backend devuelve todo el historial
                // const ticketsFiltrados = tickets.filter(t => t.hora_salida >= fechaInicio && t.hora_salida <= fechaFin);
                setPaidTickets(tickets);
            }

        } catch (error) {
            console.error(error);
            alert("Error al generar el reporte");
        } finally {
            setLoading(false);
            setLoadingTickets(false);
        }
    };

    const handleExportExcel = () => {
        // Aquí iría la lógica real de exportación a Excel (usando librerías como xlsx)
        alert("Generando archivo Excel con el detalle de " + paidTickets.length + " tickets...");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* --- SECCIÓN DE FILTROS --- */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-background p-4 rounded-lg shadow-sm border">
                <div className="space-y-2 w-full md:w-auto">
                    <h2 className="text-2xl font-bold tracking-tight">Reportes Financieros</h2>
                    <p className="text-muted-foreground text-sm">Visualiza ingresos, ocupación y detalle de transacciones.</p>
                </div>

                <div className="flex gap-2 items-end w-full md:w-auto">
                    <div className="grid gap-1.5">
                        <label className="text-xs font-medium">Desde</label>
                        <Input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-full md:w-40"
                        />
                    </div>
                    <div className="grid gap-1.5">
                        <label className="text-xs font-medium">Hasta</label>
                        <Input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-full md:w-40"
                        />
                    </div>
                    <Button onClick={handleGenerate} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Generar
                    </Button>
                </div>
            </div>

            {reportData ? (
                <div className="space-y-6">
                    {/* --- KPI CARDS (RESUMEN) --- */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                                <DollarSign className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">S/ {reportData.resumen.total_ingresos}</div>
                                <p className="text-xs text-muted-foreground">En el periodo seleccionado</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Vehículos Atendidos</CardTitle>
                                <Car className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{reportData.resumen.total_vehiculos}</div>
                                <p className="text-xs text-muted-foreground">Tickets pagados</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Permanencia Prom.</CardTitle>
                                <Clock className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{reportData.resumen.promedio_minutos_permanencia} min</div>
                                <p className="text-xs text-muted-foreground">Tiempo por vehículo</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">S/ {parseFloat(reportData.resumen.ticket_promedio).toFixed(2)}</div>
                                <p className="text-xs text-muted-foreground">Ingreso por operación</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --- GRÁFICO --- */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Evolución de Ingresos</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={reportData.grafica}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="fecha"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `S/${value}`}
                                        />
                                        <Tooltip
                                            formatter={(value) => [`S/ ${value}`, 'Ingresos']}
                                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                                        />
                                        <Legend />
                                        <Bar dataKey="ingresos_dia" name="Ingresos (S/)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- TABLA DE DETALLE (MIGRADA DE ADMINISTRACIÓN) --- */}
                    <Card className="col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <CardTitle>Detalle de Operaciones</CardTitle>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleExportExcel} disabled={paidTickets.length === 0}>
                                <Download className="w-4 h-4 mr-2" />
                                Exportar
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {loadingTickets ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                            ) : (
                                <div className="overflow-x-auto border rounded-md">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                                            <tr>
                                                <th className="p-3">Ticket</th>
                                                <th className="p-3">Placa</th>
                                                <th className="p-3">Vehículo</th>
                                                <th className="p-3">Entrada</th>
                                                <th className="p-3">Salida</th>
                                                <th className="p-3 text-center">Tiempo (min)</th>
                                                <th className="p-3 text-right">Monto</th>
                                                <th className="p-3 text-center">Espacio</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border bg-background">
                                            {paidTickets.length > 0 ? (
                                                paidTickets.map((t) => (
                                                    <tr key={t.id_ticket} className="hover:bg-muted/50 transition-colors">
                                                        <td className="p-3 font-medium">{t.codigo_ticket}</td>
                                                        <td className="p-3">{t.placa}</td>
                                                        <td className="p-3">{t.tipo_vehiculo}</td>
                                                        <td className="p-3 text-muted-foreground">{new Date(t.hora_entrada).toLocaleTimeString()} <span className="text-xs">{new Date(t.hora_entrada).toLocaleDateString()}</span></td>
                                                        <td className="p-3 text-muted-foreground">{new Date(t.hora_salida).toLocaleTimeString()} <span className="text-xs">{new Date(t.hora_salida).toLocaleDateString()}</span></td>
                                                        <td className="p-3 text-center">{t.tiempo_permanencia}</td>
                                                        <td className="p-3 text-right font-bold text-green-600">S/. {Number(t.monto_total).toFixed(2)}</td>
                                                        <td className="p-3 text-center"><span className="bg-background px-2 py-1 rounded">{t.codigo_espacio}</span></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="text-center p-8 text-muted-foreground">
                                                        No se encontraron tickets pagados en este rango.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg bg-background">
                    <div className="bg-background p-4 rounded-full shadow-sm mb-4">
                        <BarChart3 className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Generador de Reportes</h3>
                    <p className="text-muted-foreground max-w-sm text-center mt-1">
                        Selecciona un rango de fechas arriba para visualizar las métricas financieras, gráficos de rendimiento y el detalle de tickets.
                    </p>
                </div>
            )}
        </div>
    );
}