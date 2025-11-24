import React from "react";
import ReactDOM from "react-dom/client";
import "./app/globals.css";
// import Layout from "./app/layout"; // Si usas Next.js el layout es distinto, pero en Vite/React puro se suele usar así:
import Page from "./app/page";
import { ThemeProvider } from "./components/theme-provider"; // <--- IMPORTAR

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider> {/* <--- ENVOLVER AQUÍ */}
      <Page />
      {/* Si tu componente Page ya incluye el Sidebar y Layout, está bien. 
           Si Layout es el contenedor principal, úsalo: <Layout><Page /></Layout> */}
    </ThemeProvider>
  </React.StrictMode>
);