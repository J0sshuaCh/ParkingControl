import React from "react";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar activeModule="dashboard" onModuleChange={() => { /* handle module change */ }} />
      <div className="flex flex-col flex-1">
        <Header userName="Guest" onLogout={() => { /* handle logout */ }} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
