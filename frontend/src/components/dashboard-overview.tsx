"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Car, ParkingCircle, TrendingUp, CalendarClock, ArrowUpRight, ArrowDownRight, Plus, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { getDashboardOverview, DashboardData } from "@/services/dashboardService"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { LiveIndicator } from "@/components/live-indicator"

// Mock data for occupancy chart (replace with real API data later)
const occupancyData = [
  { time: "08:00", ocupacion: 25 },
  { time: "09:00", ocupacion: 45 },
  { time: "10:00", ocupacion: 65 },
  { time: "11:00", ocupacion: 78 },
  { time: "12:00", ocupacion: 85 },
  { time: "13:00", ocupacion: 72 },
  { time: "14:00", ocupacion: 68 },
  { time: "15:00", ocupacion: 75 },
  { time: "16:00", ocupacion: 82 },
  { time: "17:00", ocupacion: 90 },
  { time: "18:00", ocupacion: 65 },
  { time: "19:00", ocupacion: 40 },
]

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardOverview();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Vehículos Dentro",
      value: data ? data.stats.vehiclesInside.toString() : "...",
      icon: Car,
      gradient: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-600 dark:text-blue-400",
      trend: "+12%",
      trendUp: true,
      subtitle: "En tiempo real",
    },
    {
      title: "Espacios Libres",
      value: data ? data.stats.freeSpaces.toString() : "...",
      icon: ParkingCircle,
      gradient: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
      trend: "Disponibles",
      trendUp: false,
      subtitle: "de 50 espacios",
    },
    {
      title: "Ingresos Hoy",
      value: data ? `S/. ${parseFloat(data.stats.incomeToday.toString()).toFixed(2)}` : "...",
      icon: TrendingUp,
      gradient: "from-violet-500 to-violet-600",
      bgLight: "bg-violet-50 dark:bg-violet-950/30",
      textColor: "text-violet-600 dark:text-violet-400",
      trend: "+8.2%",
      trendUp: true,
      subtitle: "Acumulado hoy",
    },
    {
      title: "Reservas",
      value: data ? data.stats.alerts.toString() : "...",
      icon: CalendarClock,
      gradient: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-600 dark:text-amber-400",
      trend: "Activas",
      trendUp: false,
      subtitle: "Reservas activas",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panel de Control</h1>
            <p className="text-muted-foreground mt-1">Bienvenido a ParkingControl — Resumen en tiempo real</p>
          </div>
          <LiveIndicator />
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            Registrar Vehículo
          </Button>
        </div>
      </div>

      {/* Stats Grid - Redesigned */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Gradient background accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
              
              <CardContent className="p-5 relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                    {loading ? (
                      <Skeleton className="h-9 w-24 mt-2" />
                    ) : (
                      <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{stat.value}</p>
                    )}
                    <div className="flex items-center gap-1.5 mt-2">
                      {stat.trendUp ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{stat.subtitle}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgLight} shadow-sm`}>
                    <Icon className={`w-5 h-5 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Ocupación por Hora</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">Tendencia de ocupación del día</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Ocupación %
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOcupacion" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="time"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => [`${value}%`, "Ocupación"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="ocupacion"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorOcupacion)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </>
              ) : data?.activity.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-10 h-10 mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
                </div>
              ) : (
                data?.activity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.type === 'entry' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Capacity Overview */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <ParkingCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Estado del Estacionamiento</h3>
                <p className="text-sm text-muted-foreground">
                  {data ? `${data.stats.vehiclesInside} vehículos de 50 espacios ocupados` : "Cargando..."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  {data ? `${Math.round((data.stats.vehiclesInside / 50) * 100)}%` : "..."}
                </p>
                <p className="text-xs text-muted-foreground">Capacidad</p>
              </div>
              <div className="w-32 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                  style={{ width: data ? `${(data.stats.vehiclesInside / 50) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
