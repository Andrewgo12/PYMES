import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { usePreferencesStore } from '@/store/preferencesStore'
import { useThemeStore } from '@/store/themeStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordChangeModal } from '@/components/configuration/PasswordChangeModal'
import { User, Bell, Shield, Moon, Sun } from 'lucide-react'

export function ConfigurationPage() {
  const { user, updateProfile } = useAuthStore()
  const { addToast } = useToastStore()
  const { notifications, updateNotifications } = usePreferencesStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const [name, setName] = useState(user?.name || '')
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggleDarkMode = () => {
    toggleTheme()
    addToast({
      type: 'info',
      title: 'Tema actualizado',
      message: `Modo ${!isDarkMode ? 'oscuro' : 'claro'} activado.`
    })
  }

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'El nombre no puede estar vacío.'
      })
      return
    }
    
    setIsSaving(true)
    // Simular delay de guardado
    await new Promise(resolve => setTimeout(resolve, 500))
    
    updateProfile({ name: name.trim() })
    addToast({
      type: 'success',
      title: 'Perfil guardado',
      message: 'Tu información de perfil ha sido actualizada.'
    })
    setIsSaving(false)
  }

  const handleNotificationChange = (key: 'lowStockAlerts' | 'weeklySummary', value: boolean) => {
    updateNotifications({ [key]: value })
    addToast({
      type: 'info',
      title: 'Preferencia actualizada',
      message: 'Tu configuración de notificaciones ha sido guardada.'
    })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Administra tu perfil y preferencias de la aplicación.
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* Perfil */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Perfil de Usuario</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                label="Nombre Completo" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                aria-label="Nombre completo"
              />
              <Input 
                label="Correo Electrónico" 
                defaultValue={user?.email} 
                disabled 
                aria-label="Correo electrónico (deshabilitado)"
              />
            </div>
            <Button 
              onClick={handleSaveProfile}
              loading={isSaving}
              disabled={name.trim() === user?.name}
            >
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>

        {/* Preferencias */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <CardTitle>Apariencia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div>
                <p className="font-medium">Modo Oscuro</p>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode ? 'Activado' : 'Desactivado'}
                </p>
              </div>
              <Button variant="outline" onClick={handleToggleDarkMode} aria-label="Alternar modo oscuro">
                {isDarkMode ? 'Cambiar a Claro' : 'Cambiar a Oscuro'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <label htmlFor="stock-alerts" className="text-sm cursor-pointer flex-1">
                <span className="font-medium">Alertas de stock bajo</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Recibe notificaciones cuando los productos estén por debajo del stock mínimo
                </p>
              </label>
              <input 
                id="stock-alerts"
                type="checkbox" 
                checked={notifications.lowStockAlerts}
                onChange={(e) => handleNotificationChange('lowStockAlerts', e.target.checked)}
                className="accent-primary h-5 w-5 cursor-pointer transition-transform hover:scale-110" 
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <label htmlFor="weekly-summary" className="text-sm cursor-pointer flex-1">
                <span className="font-medium">Resumen semanal por correo</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Recibe un resumen de ventas e inventario cada semana
                </p>
              </label>
              <input 
                id="weekly-summary"
                type="checkbox" 
                checked={notifications.weeklySummary}
                onChange={(e) => handleNotificationChange('weeklySummary', e.target.checked)}
                className="accent-primary h-5 w-5 cursor-pointer transition-transform hover:scale-110" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Seguridad</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Mantén tu cuenta segura actualizando tu contraseña regularmente
              </p>
              <Button 
                variant="outline" 
                className="text-error hover:text-error hover:bg-error/10"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Cambiar Contraseña
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  )
}
