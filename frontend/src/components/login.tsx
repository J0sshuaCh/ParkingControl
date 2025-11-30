"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ParkingCircle, Loader2, Eye, EyeOff, AlertCircle, LogIn } from "lucide-react"

import { loginRequest } from "@/services/usuariosService"

interface LoginProps {
  onLogin: (name: string) => void
}

function PasswordInput({ value, onChange, disabled }: { value: string, onChange: (val: string) => void, disabled: boolean }) {
  const [show, setShow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleShow = () => {
    if (!inputRef.current) return
    const input = inputRef.current
    const start = input.selectionStart
    const end = input.selectionEnd
    setShow((prev) => !prev)
    setTimeout(() => {
      input.focus()
      if (start !== null && end !== null) input.setSelectionRange(start, end)
    }, 0)
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="••••••••"
        className="pr-10 bg-input dark:bg-background border-border text-foreground placeholder:text-muted-foreground transition-all focus:ring-2 focus:ring-primary/20 h-11"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors outline-none"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  )
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginRequest(username, password);

      // Manejo robusto de la respuesta del usuario
      if (data && data.user) {
        onLogin(data.user.nombre_completo);
      } else {
        onLogin(username);
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">

      {/* Decoración de fondo */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-primary/20 opacity-30 blur-[100px]" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        {/* Usamos bg-card para que cambie de color automáticamente en modo oscuro */}
        <Card className="p-8 bg-card border-border shadow-xl backdrop-blur-sm">

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30 transform transition-transform hover:scale-105">
              <ParkingCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Parking Control</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sistema de Control de Estacionamientos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Usuario</label>
              <Input
                type="text"
                placeholder="ej. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground h-11 transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground ml-1">Contraseña</label>
              <PasswordInput
                value={password}
                onChange={setPassword}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/15 border border-destructive/30 rounded-lg flex items-start gap-3 text-destructive text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base font-medium shadow-md shadow-primary/20 transition-all mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  Ingresar <LogIn className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}