import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";

// Definimos el contexto
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Intentamos leer la preferencia guardada, si no, por defecto 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  // 2. Efecto: Cada vez que cambia el tema, actualizamos la clase en el <html>
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark"); // Limpiamos clases previas
    root.classList.add(theme);              // Agregamos la actual
    localStorage.setItem("theme", theme);   // Guardamos en memoria local
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};