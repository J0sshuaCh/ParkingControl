import React from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileFooterNav } from "@/components/mobile-footer-nav";
import { useIsMobile } from "@/components/ui/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">

      {/* 2. SIDEBAR - Solo visible en desktop */}
      {!isMobile && (
        <Sidebar
          activeModule={activeModule}
          onModuleChange={onModuleChange}
          userRole={userRole}
        />
      )}

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* 3. HEADER CONECTADO */}
        <Header
          userName={userName}
          onLogout={onLogout}
          onNavigate={onModuleChange}
        />
        {/* 4. MAIN - Con padding inferior extra en móvil para el footer */}
        <main 
          key={activeModule} 
          className={`flex-1 overflow-auto page-enter ${isMobile ? "p-4 pb-24" : "p-6"}`}
        >
          {children}
        </main>
      </div>

      {/* 5. FOOTER NAV - Solo visible en móvil */}
      {isMobile && (
        <MobileFooterNav
          activeModule={activeModule}
          onModuleChange={onModuleChange}
          userRole={userRole}
        />
      )}
    </div>
  );
}