import { Modal } from './Modal'
import { Button } from './Button'
import { AlertTriangle, Info, AlertCircle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'info',
  isLoading = false,
}: ConfirmDialogProps) {
  const icons = {
    danger: <AlertCircle className="h-6 w-6 text-error" />,
    warning: <AlertTriangle className="h-6 w-6 text-warning" />,
    info: <Info className="h-6 w-6 text-primary" />,
  }

  const buttonVariants = {
    danger: 'error' as const,
    warning: 'warning' as const,
    info: 'default' as const,
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[variant]}
            onClick={onConfirm}
            disabled={isLoading}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">{icons[variant]}</div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </Modal>
  )
}
