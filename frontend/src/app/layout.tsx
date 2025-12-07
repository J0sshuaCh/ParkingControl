import React from "react";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

interface LayoutProps {
  children: React.ReactNode
  userRole?: string
}

export default function Layout({ children, userRole = "Operador" }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar
        activeModule="dashboard"
        onModuleChange={() => { /* handle module change */ }}
        userRole={userRole}
      />
      <div className="flex flex-col flex-1">
        <Header userName="Guest" onLogout={() => { /* handle logout */ }} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
