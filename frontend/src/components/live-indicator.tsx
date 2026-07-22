"use client"

import { cn } from "@/lib/utils"

interface LiveIndicatorProps {
  isLive?: boolean
  className?: string
}

export function LiveIndicator({ isLive = true, className }: LiveIndicatorProps) {
  if (!isLive) return null

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">EN VIVO</span>
    </div>
  )
}
