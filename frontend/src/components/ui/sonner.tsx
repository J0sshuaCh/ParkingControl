'use client'

import { useTheme } from '@/components/theme-provider'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { appliedTheme } = useTheme()

  return (
    <Sonner
      theme={appliedTheme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      richColors
      closeButton
      expand
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
