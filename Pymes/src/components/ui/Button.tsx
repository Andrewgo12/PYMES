import React from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, isLoading, children, disabled, ...props }, ref) => {
    const isLoadingState = loading || isLoading
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95'
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow',
      secondary: 'bg-muted text-foreground hover:bg-muted/80',
      outline: 'border border-input bg-background hover:bg-muted hover:border-primary/50',
      ghost: 'hover:bg-muted hover:text-foreground',
      danger: 'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow',
      warning: 'bg-warning text-white hover:bg-warning/90 shadow-sm hover:shadow',
      error: 'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow',
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoadingState}
        {...props}
      >
        {isLoadingState ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Cargando...
          </>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
