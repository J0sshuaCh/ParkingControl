"use client"

import { useState, type Dispatch, type SetStateAction } from "react"
import { Sidebar } from "./sidebar"
import {Header} from "./header"

import  { DashboardOverview }  from "./dashboard-overview"
 import { VehicleRegistration } from "./modules/vehicle-registration"
 import { ExitAndBilling } from "./modules/exit-and-billing"
 import { SpaceManagement } from "./modules/space-management"
 import { Administration } from "./modules/administration"
 // import { SystemConfiguration } from "./modules/system-configuration"
 // import { ShiftManagement } from "./modules/shift-management"

interface DashboardProps {
  userName: string
  onLogout: () => void
}

export function Dashboard({ userName, onLogout }: DashboardProps) {
  const [activeModule, setActiveModule] = useState("overview")

  // Cast Sidebar to a typed component so TypeScript knows which props it accepts
  const SidebarTyped = Sidebar as React.ComponentType<{
    activeModule: string
    onModuleChange: Dispatch<SetStateAction<string>>
  }>

  const renderModule = () => {
    switch (activeModule) {
       case "overview":
         return <DashboardOverview />
       case "vehicles":
         return <VehicleRegistration />
      case "billing":
        return <ExitAndBilling />
      case "spaces":
        return <SpaceManagement />
    //   case "shifts":
    //     return <ShiftManagement />
    //   case "config":
    //     return <SystemConfiguration />
      case "admin":
        return <Administration />
       default:
         return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarTyped activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={userName} onLogout={onLogout} />
        <main className="flex-1 overflow-auto bg-muted/30 p-6 animate-fade-in">{renderModule()}</main>
      </div>
    </div>
  )
}
