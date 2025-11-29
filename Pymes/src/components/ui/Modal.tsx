import React, { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className
}: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = React.useState(false)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            setIsAnimating(true)
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        } else {
            setIsAnimating(false)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen && !isAnimating) return null

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose()
        }
    }

    return createPortal(
        <div
            ref={overlayRef}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-3 transition-all duration-300",
                isOpen
                    ? "bg-background/80 backdrop-blur-md opacity-100"
                    : "bg-background/0 backdrop-blur-none opacity-0 pointer-events-none"
            )}
            onClick={handleOverlayClick}
        >
            <div
                className={cn(
                    "bg-card text-card-foreground w-full max-w-md rounded-lg shadow-2xl border-2 border-border/50 transition-all duration-300 ease-out",
                    isOpen
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 translate-y-4",
                    "hover:border-primary/20",
                    className
                )}
                style={{
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
            >
                {/* Header with gradient background - reduced padding */}
                <div className="relative flex items-center justify-between p-4 border-b-2 border-border/50 bg-gradient-to-r from-muted/40 to-muted/20">
                    <h3 className="text-base font-bold tracking-tight">
                        {title}
                    </h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-full hover:bg-muted/80 hover:rotate-90 transition-all duration-300"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cerrar</span>
                    </Button>
                </div>

                {/* Content with better scrolling - reduced padding and max height */}
                <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                    {children}
                </div>

                {/* Footer with subtle background - reduced padding */}
                {footer && (
                    <div className="flex items-center justify-end gap-2 p-4 border-t-2 border-border/50 bg-muted/10">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
