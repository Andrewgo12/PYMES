import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useToastStore } from '@/store/toastStore'
import { usePreferencesStore } from '@/store/preferencesStore'
import { useThemeStore } from '@/store/themeStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordChangeModal } from '@/components/configuration/PasswordChangeModal'
import { User, Bell, Shield, Moon, Sun, Mail, CheckCircle2 } from 'lucide-react'

export function ConfigurationPage() {
  const { user, updateProfile } = useAuthStore()
  const { addToast } = useToastStore()
  const { notifications, updateNotifications } = usePreferencesStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Sincronizar con cambios en el usuario
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  const handleToggleDarkMode = () => {
    toggleTheme()
    addToast({
      type: 'success',
      title: 'Tema Actualizado',
      message: `Modo ${!isDarkMode ? 'oscuro' : 'claro'} aplicado globalmente en todo el proyecto.`
    })
  }

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      addToast({
        type: 'error',
        title: 'Error de Validación',
        message: 'El nombre no puede estar vacío.'
      })
      return
    }

    if (!email.trim() || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Error de Validación',
        message: 'Por favor ingresa un correo electrónico válido.'
      })
      return
    }
    
    setIsSaving(true)
    // Simular delay de guardado
    await new Promise(resolve => setTimeout(resolve, 800))
    
    updateProfile({ name: name.trim(), email: email.trim() })
    addToast({
      type: 'success',
      title: 'Perfil Actualizado',
      message: 'Tu información se ha guardado y se aplicará en toda la aplicación.'
    })
    setIsSaving(false)
  }

  const handleNotificationChange = (key: 'lowStockAlerts' | 'weeklySummary', value: boolean) => {
    updateNotifications({ [key]: value })
    
    const messages = {
      lowStockAlerts: value 
        ? 'Recibirás notificaciones cuando los productos estén por debajo del stock mínimo.' 
        : 'Las alertas de stock bajo han sido desactivadas.',
      weeklySummary: value
        ? `Recibirás un resumen semanal en ${email}.`
        : 'El resumen semanal por correo ha sido desactivado.'
    }
    
    addToast({
      type: 'info',
      title: 'Preferencia Actualizada',
      message: messages[key]
    })
  }

  const hasChanges = name.trim() !== user?.name || email.trim() !== user?.email

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Administra tu perfil, la apariencia de la aplicación y tus preferencias personales.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Todas las opciones de esta sección se aplican de manera global en todo el proyecto.
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
            <p className="text-sm text-muted-foreground mt-2">
              Configura la información básica de tu cuenta.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input 
                  label="Nombre Completo" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  aria-label="Nombre completo"
                  icon={<User className="h-4 w-4" />}
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Puedes modificar tu nombre tal y como deseas que aparezca dentro de la aplicación.
                </p>
              </div>
              <div>
                <Input 
                  label="Correo Electrónico" 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Correo electrónico"
                  icon={<Mail className="h-4 w-4" />}
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Actualiza el correo con el que recibes notificaciones y accedes a tu cuenta.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button 
                onClick={handleSaveProfile}
                loading={isSaving}
                disabled={!hasChanges}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
              {hasChanges && (
                <p className="text-sm text-muted-foreground">
                  Tus datos se actualizarán en toda la aplicación de inmediato.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Apariencia */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <CardTitle>Apariencia</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Controla la apariencia visual de toda la aplicación.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between p-4 border-2 border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-base">
                    {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
                  </p>
                  <Badge variant={isDarkMode ? 'default' : 'secondary'} className="text-xs">
                    {isDarkMode ? 'Activado' : 'Desactivado'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Cambia entre tema claro y oscuro.
                </p>
                <p className="text-xs text-muted-foreground">
                  Al modificar esta opción, toda la interfaz del proyecto se actualiza automáticamente, incluyendo:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4">
                  <li>• Colores de fondo</li>
                  <li>• Colores de texto</li>
                  <li>• Botones y bordes</li>
                  <li>• Iconos e imágenes sensibles al tema</li>
                  <li>• Todas las vistas, componentes y pantallas del sistema</li>
                </ul>
              </div>
              <Button 
                variant="outline" 
                onClick={handleToggleDarkMode} 
                aria-label="Alternar modo oscuro"
                className="ml-4"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Cambiar a Claro
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Cambiar a Oscuro
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Se aplicará instantáneamente a todos los módulos del proyecto.
            </p>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card className="hover-lift">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Define qué alertas deseas recibir.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:bg-muted/50 transition-colors">
              <label htmlFor="stock-alerts" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Alertas de stock bajo</span>
                  {notifications.lowStockAlerts && (
                    <Badge variant="success" className="text-xs">Activo</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Activa o desactiva las notificaciones cuando un producto esté por debajo del stock mínimo.
                </p>
                <p className="text-xs text-muted-foreground">
                  Se enviarán notificaciones locales reales según tu configuración.
                </p>
              </label>
              <input 
                id="stock-alerts"
                type="checkbox" 
                checked={notifications.lowStockAlerts}
                onChange={(e) => handleNotificationChange('lowStockAlerts', e.target.checked)}
                className="accent-primary h-6 w-6 cursor-pointer transition-transform hover:scale-110 ml-4 mt-1" 
              />
            </div>
            
            <div className="flex items-start justify-between p-4 rounded-lg border-2 border-border hover:bg-muted/50 transition-colors">
              <label htmlFor="weekly-summary" className="cursor-pointer flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Resumen semanal por correo</span>
                  {notifications.weeklySummary && (
                    <Badge variant="success" className="text-xs">Activo</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Recibe un informe automático con ventas e inventario cada semana.
                </p>
                <p className="text-xs text-muted-foreground">
                  Este resumen se enviará al correo configurado en tu perfil: <strong>{email}</strong>
                </p>
              </label>
              <input 
                id="weekly-summary"
                type="checkbox" 
                checked={notifications.weeklySummary}
                onChange={(e) => handleNotificationChange('weeklySummary', e.target.checked)}
                className="accent-primary h-6 w-6 cursor-pointer transition-transform hover:scale-110 ml-4 mt-1" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card className="hover-lift border-2 border-error/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-error" />
              <CardTitle className="text-error">Seguridad</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Mantén tu cuenta protegida.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-error/5 rounded-lg border border-error/20">
                <p className="text-sm font-medium mb-2">Cambiar Contraseña</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Permite actualizar tu contraseña de forma segura.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4 ml-4">
                  <li>• Se guarda la nueva contraseña real en el sistema</li>
                  <li>• Se cierra la sesión en otros dispositivos</li>
                  <li>• Se mantiene la estética visual del módulo para que coincida con el tema aplicado (claro u oscuro)</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="text-error hover:text-error hover:bg-error/10 border-error/30"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Cambiar Contraseña
                </Button>
              </div>
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

function Badge({ variant = 'default', className = '', children }: { variant?: 'default' | 'secondary' | 'success'; className?: string; children: React.ReactNode }) {
  const variants = {
    default: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    success: 'bg-success/10 text-success'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
