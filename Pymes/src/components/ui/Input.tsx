import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, type = 'text', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-semibold mb-1.5 text-foreground transition-colors duration-200">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={type}
                        className={cn(
                            'flex h-9 w-full rounded-md border-2 border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:shadow-md focus-visible:shadow-primary/10',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'transition-all duration-200',
                            'hover:border-primary/50 hover:shadow-sm',
                            icon && 'pl-9',
                            error && 'border-error focus-visible:ring-error/20 focus-visible:border-error focus-visible:shadow-error/10',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-xs text-error font-medium animate-fade-in">{error}</p>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'
