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
        const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] border-2'

        const variants = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary',
            primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary',
            outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground border-transparent',
            danger: 'bg-error text-white hover:bg-error/90 border-error',
            warning: 'bg-warning text-white hover:bg-warning/90 border-warning',
            error: 'bg-error text-white hover:bg-error/90 border-error',
        }

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-9 px-4 text-sm',
            lg: 'h-10 px-5 text-base',
            icon: 'h-9 w-9',
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
