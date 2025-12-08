import React from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

// 1. Definimos qué datos NECESITA este Layout para funcionar
interface LayoutProps {
  children: React.ReactNode;           // El contenido principal (Dashboard, Reportes, etc.)
  activeModule: string;                // ¿Qué pestaña debe estar pintada en el menú?
  onModuleChange: (module: string) => void; // Función para cambiar de pestaña
  userRole: string;                    // Rol del usuario (para filtrar el menú)
  userName: string;                    // Nombre para mostrar en el Header
  onLogout: () => void;                // Función para cerrar sesión
}

export function Layout({
  children,
  activeModule,
  onModuleChange,
  userRole,
  userName,
  onLogout
}: LayoutProps) {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">

      {/* 2. SIDEBAR DINÁMICO */}
      {/* Le pasamos el 'activeModule' para que sepa qué botón resaltar */}
      {/* Le pasamos 'userRole' para que oculte opciones prohibidas */}
      <Sidebar
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        userRole={userRole}
      />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* 3. HEADER CONECTADO */}
        {/* 'onNavigate={onModuleChange}' es la clave para que el banner funcione */}
        <Header
          userName={userName}
          onLogout={onLogout}
          onNavigate={onModuleChange}
        />

        {/* Contenido Principal con Scroll independiente */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}