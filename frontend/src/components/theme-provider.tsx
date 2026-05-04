import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark" | "system";
// Preferred = preferencia del usuario ("light"|"dark"|"system")
// Actual = el que está realmente aplicado (light|dark)

// Definimos el contexto
interface ThemeContextType {
  theme: Theme; // preferencia del usuario
  appliedTheme: "light" | "dark"; // el que está realmente activo
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Intentamos leer la preferencia guardada, si no, por defecto 'system'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  // 2. Determinar el tema real aplicado
  const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">('light');

  useEffect(() => {
    function updateAppliedTheme(currentTheme: Theme) {
      if (currentTheme === "system") {
        // Detecta preferencia del sistema
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setAppliedTheme(mq.matches ? "dark" : "light");
      } else {
        setAppliedTheme(currentTheme);
      }
    }
    updateAppliedTheme(theme);
    if (theme === "system") {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setAppliedTheme(e.matches ? "dark" : "light");
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  // 3. Efecto: aplicar clase en <html> y guardar preferencia
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(appliedTheme); // Solo el tema realmente visible
    localStorage.setItem("theme", theme);
  }, [appliedTheme, theme]);

  const setExplicitTheme = (t: Theme) => setTheme(t);

  return (
    <ThemeContext.Provider value={{ theme, appliedTheme, setTheme: setExplicitTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};