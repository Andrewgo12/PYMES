import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToastStore } from '@/store/toastStore'
import { useAuthStore } from '@/store/authStore'

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const { addToast } = useToastStore()
  const { changePassword } = useAuthStore()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Las contraseñas no coinciden'
      })
      return
    }

    if (newPassword.length < 6) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'La contraseña debe tener al menos 6 caracteres'
      })
      return
    }

    const success = changePassword(currentPassword, newPassword)
    
    if (success) {
      addToast({
        type: 'success',
        title: 'Contraseña actualizada',
        message: 'Tu contraseña ha sido cambiada exitosamente'
      })

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      onClose()
    } else {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'La contraseña actual es incorrecta'
      })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cambiar Contraseña"
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} type="submit" form="password-form">
            Cambiar Contraseña
          </Button>
        </>
      }
    >
      <form id="password-form" onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Contraseña Actual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="Ingresa tu contraseña actual"
        />
        <Input
          label="Nueva Contraseña"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          placeholder="Mínimo 6 caracteres"
          minLength={6}
        />
        <Input
          label="Confirmar Nueva Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Repite la nueva contraseña"
        />
      </form>
    </Modal>
  )
}
