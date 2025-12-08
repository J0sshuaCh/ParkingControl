"use client"

import { useState, type Dispatch, type SetStateAction } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

import { DashboardOverview } from "./dashboard-overview"
import { VehicleRegistration } from "./modules/vehicle-registration"
import { ExitAndBilling } from "./modules/exit-and-billing"
import { TicketHistory } from "./modules/ticket-history"
import { SpaceManagement } from "./modules/space-management"
import { Administration } from "./modules/administration"
import { ReportsModule } from "./modules/reports"
import { Layout } from "../app/layout"


interface DashboardProps {
  userName: string
  userRole: string
  onLogout: () => void
}

export function Dashboard({ userName, userRole, onLogout }: DashboardProps) {
  const [activeModule, setActiveModule] = useState("overview")

  // Cast Sidebar to a typed component so TypeScript knows which props it accepts
  const SidebarTyped = Sidebar as React.ComponentType<{
    activeModule: string
    onModuleChange: Dispatch<SetStateAction<string>>
    userRole: string
  }>

  const renderModule = () => {
    switch (activeModule) {
      case "overview":
        return <DashboardOverview />
      case "vehicles":
        return <VehicleRegistration />
      case "billing":
        return <ExitAndBilling />
      case "history":
        return <TicketHistory />
      case "spaces":
        return <SpaceManagement />
      case "reports":
        // Protección extra: Si no es admin, no renderiza
        if (userRole.toLowerCase() !== "administrador" && userRole.toLowerCase() !== "supervisor") return <DashboardOverview />
        else return <ReportsModule />
      case "admin":
        // Protección extra: Si no es admin, no renderiza
        if (userRole.toLowerCase() !== "administrador") return <DashboardOverview />
        else return <Administration />
      default:
        return <DashboardOverview />
    }
  }

  return (
    // 3. USAMOS EL LAYOUT: Aquí ocurre la magia
    // Al pasar 'onModuleChange={setActiveModule}', el Layout se encarga de:
    // a) Decirle al Sidebar qué botón resaltar.
    // b) Decirle al Header qué hacer cuando clickean la alerta "Estacionamiento Lleno".
    <Layout
      activeModule={activeModule}
      onModuleChange={setActiveModule}
      userRole={userRole}
      userName={userName}
      onLogout={onLogout}
    >
      {/* El contenido que cambia se inyecta aquí */}
      {renderModule()}
    </Layout>
  )
}