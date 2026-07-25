"use client"

import { useState, useEffect, type Dispatch, type SetStateAction } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { CommandPalette } from "./command-palette"

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
  const [commandOpen, setCommandOpen] = useState(false)

  // Keyboard shortcut for command palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Cast Sidebar to a typed component so TypeScript knows which props it accepts
  const SidebarTyped = Sidebar as React.ComponentType<{
    activeModule: string
    onModuleChange: Dispatch<SetStateAction<string>>
    userRole: string
  }>

  const renderModule = () => {
    switch (activeModule) {
      case "overview":
        return <DashboardOverview onNavigate={setActiveModule} />
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
        if (userRole.toLowerCase() !== "administrador" && userRole.toLowerCase() !== "supervisor") return <DashboardOverview onNavigate={setActiveModule} />
        else return <ReportsModule />
      case "admin":
        // Protección extra: Si no es admin, no renderiza
        if (userRole.toLowerCase() !== "administrador") return <DashboardOverview onNavigate={setActiveModule} />
        else return <Administration />
      default:
        return <DashboardOverview onNavigate={setActiveModule} />
    }
  }

  return (
    <>
      <Layout
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        userRole={userRole}
        userName={userName}
        onLogout={onLogout}
      >
        {renderModule()}
      </Layout>
      
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNavigate={setActiveModule}
        onLogout={onLogout}
        userRole={userRole}
      />
    </>
  )
}