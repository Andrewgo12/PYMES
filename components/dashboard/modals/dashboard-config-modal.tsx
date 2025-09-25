"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Layout, Palette, Bell, RefreshCw, Grid } from "lucide-react"
import { useState } from "react"

interface DashboardConfigModalProps {
  isOpen: boolean
  onClose: () => void
  widgets: any[]
  onWidgetsChange: (widgets: any[]) => void
}

export function DashboardConfigModal({ isOpen, onClose, widgets, onWidgetsChange }: DashboardConfigModalProps) {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState([5])
  const [theme, setTheme] = useState("dark")
  const [notifications, setNotifications] = useState(true)
  const [compactMode, setCompactMode] = useState(false)
  const [showAnimations, setShowAnimations] = useState(true)

  const widgetTypes = [
    { id: "stats", name: "Estadísticas", description: "Métricas principales" },
    { id: "activity", name: "Actividad", description: "Timeline de eventos" },
    { id: "alerts", name: "Alertas", description: "Notificaciones importantes" },
    { id: "quick-actions", name: "Acciones Rápidas", description: "Botones de acción" },
    { id: "charts", name: "Gráficos", description: "Visualizaciones de datos" },
    { id: "calendar", name: "Calendario", description: "Eventos programados" },
  ]

  const layouts = [
    { id: "default", name: "Por Defecto", description: "Layout estándar" },
    { id: "compact", name: "Compacto", description: "Más información en menos espacio" },
    { id: "wide", name: "Amplio", description: "Layout para pantallas grandes" },
    { id: "mobile", name: "Móvil", description: "Optimizado para dispositivos móviles" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración del Dashboard
          </DialogTitle>
          <DialogDescription>Personaliza la apariencia y comportamiento de tu dashboard</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Configuración de Layout */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Diseño y Layout
              </CardTitle>
              <CardDescription>Configura la disposición de los widgets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Layout</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {layouts.map((layout) => (
                      <SelectItem key={layout.id} value={layout.id}>
                        <div>
                          <div className="font-medium">{layout.name}</div>
                          <div className="text-xs text-muted-foreground">{layout.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Modo Compacto</Label>
                  <p className="text-xs text-muted-foreground">Reduce el espaciado entre elementos</p>
                </div>
                <Switch checked={compactMode} onCheckedChange={setCompactMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Animaciones</Label>
                  <p className="text-xs text-muted-foreground">Habilita transiciones suaves</p>
                </div>
                <Switch checked={showAnimations} onCheckedChange={setShowAnimations} />
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Widgets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Widgets Disponibles
              </CardTitle>
              <CardDescription>Selecciona qué widgets mostrar en el dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {widgetTypes.map((widget) => (
                  <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{widget.name}</div>
                      <div className="text-xs text-muted-foreground">{widget.description}</div>
                    </div>
                    <Switch
                      checked={widgets.some((w) => w.type === widget.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onWidgetsChange([
                            ...widgets,
                            {
                              id: widget.id,
                              type: widget.id,
                              position: { x: 0, y: widgets.length },
                              size: { w: 1, h: 1 },
                            },
                          ])
                        } else {
                          onWidgetsChange(widgets.filter((w) => w.type !== widget.id))
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Actualización */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Actualización de Datos
              </CardTitle>
              <CardDescription>Controla cómo se actualizan los datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Actualización Automática</Label>
                  <p className="text-xs text-muted-foreground">Actualiza datos en tiempo real</p>
                </div>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>

              {autoRefresh && (
                <div className="space-y-2">
                  <Label>Intervalo de Actualización: {refreshInterval[0]} segundos</Label>
                  <Slider
                    value={refreshInterval}
                    onValueChange={setRefreshInterval}
                    max={60}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1s</span>
                    <span>30s</span>
                    <span>60s</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuración de Apariencia */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Apariencia
              </CardTitle>
              <CardDescription>Personaliza colores y tema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="auto">Automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Esquema de Colores</Label>
                <div className="flex gap-2">
                  {["blue", "green", "purple", "orange"].map((color) => (
                    <Button key={color} variant="outline" size="sm" className={`w-8 h-8 p-0 bg-${color}-500`} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Notificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </CardTitle>
              <CardDescription>Controla qué notificaciones recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notificaciones Push</Label>
                  <p className="text-xs text-muted-foreground">Recibe alertas en tiempo real</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Tipos de Notificación</Label>
                {[
                  { id: "orders", label: "Nuevos Pedidos", checked: true },
                  { id: "inventory", label: "Alertas de Inventario", checked: true },
                  { id: "payments", label: "Pagos Procesados", checked: false },
                  { id: "users", label: "Nuevos Usuarios", checked: false },
                ].map((notif) => (
                  <div key={notif.id} className="flex items-center justify-between">
                    <Label className="text-sm font-normal">{notif.label}</Label>
                    <Switch defaultChecked={notif.checked} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">Restablecer</Button>
              <Button onClick={onClose}>Guardar Cambios</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
