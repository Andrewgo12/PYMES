"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, Smartphone, Slack, Plus, Settings, Clock } from "lucide-react"

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    slackIntegration: false,
    soundEnabled: true,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const notificationTypes = [
    {
      id: "inventory_low",
      name: "Stock Bajo",
      description: "Cuando el inventario está por debajo del mínimo",
      category: "inventory",
      enabled: true,
      channels: ["email", "push"],
      priority: "high",
    },
    {
      id: "new_order",
      name: "Nuevo Pedido",
      description: "Cuando se recibe un nuevo pedido",
      category: "orders",
      enabled: true,
      channels: ["email", "push", "slack"],
      priority: "medium",
    },
    {
      id: "payment_received",
      name: "Pago Recibido",
      description: "Cuando se confirma un pago",
      category: "payments",
      enabled: true,
      channels: ["email"],
      priority: "medium",
    },
    {
      id: "system_backup",
      name: "Backup Completado",
      description: "Cuando se completa un backup del sistema",
      category: "system",
      enabled: false,
      channels: ["email"],
      priority: "low",
    },
    {
      id: "user_login",
      name: "Inicio de Sesión",
      description: "Cuando un usuario inicia sesión",
      category: "security",
      enabled: false,
      channels: ["email"],
      priority: "low",
    },
    {
      id: "report_ready",
      name: "Reporte Listo",
      description: "Cuando un reporte programado está listo",
      category: "reports",
      enabled: true,
      channels: ["email", "push"],
      priority: "medium",
    },
  ]

  const recentNotifications = [
    { id: 1, type: "inventory_low", message: "Stock bajo: Producto ABC123", time: "Hace 5 min", read: false },
    { id: 2, type: "new_order", message: "Nuevo pedido #ORD-2024-001", time: "Hace 15 min", read: true },
    { id: 3, type: "payment_received", message: "Pago confirmado: €1,250.00", time: "Hace 1 hora", read: true },
    { id: 4, type: "report_ready", message: "Reporte mensual disponible", time: "Hace 2 horas", read: false },
    { id: 5, type: "system_backup", message: "Backup completado exitosamente", time: "Hace 3 horas", read: true },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />
      case "push":
        return <Smartphone className="h-3 w-3" />
      case "slack":
        return <Slack className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configuración de Notificaciones
          </DialogTitle>
          <DialogDescription>Alertas y comunicaciones del sistema</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings">Configuración</TabsTrigger>
            <TabsTrigger value="types">Tipos</TabsTrigger>
            <TabsTrigger value="channels">Canales</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Configuración General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">Recibir alertas por correo electrónico</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Notificaciones Push</Label>
                      <p className="text-sm text-muted-foreground">Alertas en tiempo real en el navegador</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="slack-integration">Integración con Slack</Label>
                      <p className="text-sm text-muted-foreground">Enviar alertas a canales de Slack</p>
                    </div>
                    <Switch
                      id="slack-integration"
                      checked={notificationSettings.slackIntegration}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, slackIntegration: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sound-enabled">Sonidos de Notificación</Label>
                      <p className="text-sm text-muted-foreground">Reproducir sonido con las alertas</p>
                    </div>
                    <Switch
                      id="sound-enabled"
                      checked={notificationSettings.soundEnabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, soundEnabled: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horarios Silenciosos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quiet-hours">Activar Horarios Silenciosos</Label>
                      <p className="text-sm text-muted-foreground">No enviar notificaciones en ciertos horarios</p>
                    </div>
                    <Switch
                      id="quiet-hours"
                      checked={notificationSettings.quietHours}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, quietHours: checked })
                      }
                    />
                  </div>
                  {notificationSettings.quietHours && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="quiet-start">Inicio</Label>
                        <Input
                          id="quiet-start"
                          type="time"
                          value={notificationSettings.quietStart}
                          onChange={(e) =>
                            setNotificationSettings({ ...notificationSettings, quietStart: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quiet-end">Fin</Label>
                        <Input
                          id="quiet-end"
                          type="time"
                          value={notificationSettings.quietEnd}
                          onChange={(e) =>
                            setNotificationSettings({ ...notificationSettings, quietEnd: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="types" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Tipos de Notificación</h3>
                <p className="text-sm text-muted-foreground">Configura qué eventos generan notificaciones</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Tipo
              </Button>
            </div>

            <div className="grid gap-4">
              {notificationTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Switch defaultChecked={type.enabled} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{type.name}</h4>
                            <Badge variant="outline" className={getPriorityColor(type.priority)}>
                              {type.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Canales:</span>
                            {type.channels.map((channel) => (
                              <div key={channel} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                                {getChannelIcon(channel)}
                                <span>{channel}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-from">Remitente</Label>
                    <Input id="email-from" defaultValue="noreply@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-template">Plantilla</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Por Defecto</SelectItem>
                        <SelectItem value="minimal">Minimalista</SelectItem>
                        <SelectItem value="branded">Con Marca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-enabled">Habilitado</Label>
                    <Switch id="email-enabled" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Push
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="push-title">Título por Defecto</Label>
                    <Input id="push-title" defaultValue="Sistema Empresarial" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="push-icon">Icono</Label>
                    <Input id="push-icon" defaultValue="/icon-192x192.png" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-enabled">Habilitado</Label>
                    <Switch id="push-enabled" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Slack className="h-4 w-4" />
                    Slack
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Webhook URL</Label>
                    <Input id="slack-webhook" placeholder="https://hooks.slack.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slack-channel">Canal</Label>
                    <Input id="slack-channel" defaultValue="#general" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slack-enabled">Habilitado</Label>
                    <Switch id="slack-enabled" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Historial de Notificaciones</CardTitle>
                    <CardDescription>Últimas notificaciones enviadas</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Marcar todas como leídas
                    </Button>
                    <Button variant="outline" size="sm">
                      Limpiar historial
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        notification.read ? "bg-muted/30" : "bg-primary/5 border border-primary/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${notification.read ? "bg-muted-foreground" : "bg-primary"}`}
                        ></div>
                        <div>
                          <p className="text-sm font-medium">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">Tipo: {notification.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                        {!notification.read && (
                          <Badge variant="secondary" className="mt-1">
                            No leída
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button>Guardar Configuración</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
