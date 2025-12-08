"use client"

import { Card } from "@/components/ui/card"
import { Car, ParkingCircle, TrendingUp, CalendarClock } from "lucide-react"
import { useEffect, useState } from "react"
import { getDashboardOverview, DashboardData } from "@/services/dashboardService"

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
      color: "bg-blue-100 text-blue-600",
      trend: "En tiempo real",
    },
    {
      title: "Espacios Libres",
      value: data ? data.stats.freeSpaces.toString() : "...",
      icon: ParkingCircle,
      color: "bg-green-100 text-green-600",
      trend: "Disponibles",
    },
    {
      title: "Ingresos Hoy",
      value: data ? `S/. ${parseFloat(data.stats.incomeToday.toString()).toFixed(2)}` : "...",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      trend: "Acumulado hoy",
    },
    {
      title: "Reservas",
      value: data ? data.stats.alerts.toString() : "...",
      icon: CalendarClock,
      color: "bg-orange-100 text-orange-600",
      trend: "Reservas activas",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Control</h1>
        <p className="text-muted-foreground">Bienvenido a ParkingControl - Resumen del sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="p-6 bg-card border border-border hover:shadow-lg transition-smooth cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{loading ? "..." : stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-smooth`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-card border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          {loading ? (
            <p className="text-muted-foreground">Cargando actividad...</p>
          ) : data?.activity.length === 0 ? (
            <p className="text-muted-foreground">No hay actividad reciente.</p>
          ) : (
            data?.activity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 pb-3 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'entry' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )))}
        </div>
      </Card>
    </div>
  )
}
