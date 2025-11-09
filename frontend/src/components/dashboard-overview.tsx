"use client"

import { Card } from "@/components/ui/card"
 import { Car, ParkingCircle, TrendingUp, AlertCircle } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Vehículos Dentro",
      value: "24",
      icon: Car,
      color: "bg-blue-100 text-blue-600",
      trend: "+2 esta hora",
    },
    {
      title: "Espacios Libres",
      value: "16",
      icon: ParkingCircle,
      color: "bg-green-100 text-green-600",
      trend: "Disponibles",
    },
    {
      title: "Ingresos Hoy",
      value: "S/. 1,240",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      trend: "+15% vs ayer",
    },
    {
      title: "Alertas",
      value: "2",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-600",
      trend: "Requieren atención",
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
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
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
          {[
            { time: "09:45", action: "Vehículo ABC-123 registrado", type: "entry" },
            { time: "09:30", action: "Vehículo XYZ-789 salió del sistema", type: "exit" },
            { time: "09:15", action: "Espacio B-05 reservado", type: "reservation" },
            { time: "09:00", action: "Reporte diario generado", type: "report" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 pb-3 border-b border-border last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
