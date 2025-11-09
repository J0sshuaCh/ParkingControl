"use client"

import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  userName: string
  onLogout: () => void
}

export function Header({ userName, onLogout }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
      <div>

      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{userName}</span>
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
