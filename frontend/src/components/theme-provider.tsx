import React, { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark" | "system" | "high-contrast";
// Preferred = preferencia del usuario ("light"|"dark"|"system"|"high-contrast")
// Actual = el que está realmente aplicado (light|dark)

// Definimos el contexto
interface ThemeContextType {
  theme: Theme; // preferencia del usuario
  appliedTheme: "light" | "dark"; // el que está realmente activo
  isHighContrast: boolean;
  setTheme: (theme: Theme) => void;
  toggleHighContrast: () => void;
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

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("highContrast") === "true";
    }
    return false;
  });

  // 2. Determinar el tema real aplicado
  const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">('light');

  useEffect(() => {
    function updateAppliedTheme(currentTheme: Theme) {
      if (currentTheme === "system") {
        // Detecta preferencia del sistema
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setAppliedTheme(mq.matches ? "dark" : "light");
      } else if (currentTheme === "high-contrast") {
        // High contrast follows system preference for light/dark base
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setAppliedTheme(mq.matches ? "dark" : "light");
      } else {
        setAppliedTheme(currentTheme);
      }
    }
    updateAppliedTheme(theme);
    if (theme === "system" || theme === "high-contrast") {
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
    root.classList.remove("light", "dark", "high-contrast");
    root.classList.add(appliedTheme); // Solo el tema realmente visible
    if (isHighContrast) {
      root.classList.add("high-contrast");
    }
    localStorage.setItem("theme", theme);
    localStorage.setItem("highContrast", String(isHighContrast));
  }, [appliedTheme, theme, isHighContrast]);

  const setExplicitTheme = (t: Theme) => setTheme(t);
  
  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, appliedTheme, isHighContrast, setTheme: setExplicitTheme, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  return context;
};