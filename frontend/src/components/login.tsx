"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ParkingCircle, Loader2, Eye, EyeOff } from "lucide-react"

interface LoginProps {
  onLogin: (name: string) => void
}

function PasswordInput({ value, onChange, disabled }: any) {
  const [show, setShow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleShow = () => {
    if (!inputRef.current) return

    const input = inputRef.current
    // Guardamos la posición del cursor
    const start = input.selectionStart
    const end = input.selectionEnd

    setShow((prev) => !prev)

    // Volvemos a aplicar el foco y posición del cursor
    setTimeout(() => {
      input.focus()
      if (start !== null && end !== null) {
        input.setSelectionRange(start, end)
      }
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
        className="pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1} // no quita el foco
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
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onLogin(username.charAt(0).toUpperCase() + username.slice(1))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <Card className="p-8 bg-white border border-border shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-md">
              <ParkingCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">ParkingControl</h1>
            <p className="text-sm text-muted-foreground mt-2">Sistema de Gestión de Estacionamientos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Usuario</label>
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
              <PasswordInput
                value={password}
                onChange={setPassword}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-medium py-2 h-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
