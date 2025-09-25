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
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Key,
  Fingerprint,
  Smartphone,
  Globe,
  Activity,
} from "lucide-react"

interface SecurityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: "strong",
    sessionTimeout: "30",
    ipWhitelist: false,
    auditLog: true,
    encryptionAtRest: true,
    sslOnly: true,
    bruteForceProtection: true,
  })

  const securityEvents = [
    { id: 1, type: "login", user: "Ana García", ip: "192.168.1.100", time: "Hace 5 min", status: "success" },
    { id: 2, type: "failed_login", user: "Unknown", ip: "203.0.113.45", time: "Hace 15 min", status: "blocked" },
    {
      id: 3,
      type: "password_change",
      user: "Carlos López",
      ip: "192.168.1.101",
      time: "Hace 1 hora",
      status: "success",
    },
    {
      id: 4,
      type: "permission_change",
      user: "Ana García",
      ip: "192.168.1.100",
      time: "Hace 2 horas",
      status: "success",
    },
    { id: 5, type: "failed_login", user: "Unknown", ip: "203.0.113.45", time: "Hace 3 horas", status: "blocked" },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed_login":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "password_change":
        return <Key className="h-4 w-4 text-blue-500" />
      case "permission_change":
        return <Shield className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getEventDescription = (type: string) => {
    switch (type) {
      case "login":
        return "Inicio de sesión exitoso"
      case "failed_login":
        return "Intento de inicio de sesión fallido"
      case "password_change":
        return "Cambio de contraseña"
      case "permission_change":
        return "Cambio de permisos"
      default:
        return "Evento de seguridad"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configuración de Seguridad
          </DialogTitle>
          <DialogDescription>Políticas de seguridad y audit trail del sistema</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="policies" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="policies">Políticas</TabsTrigger>
            <TabsTrigger value="authentication">Autenticación</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Políticas de Contraseña
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Nivel de Seguridad</Label>
                    <Select
                      value={securitySettings.passwordPolicy}
                      onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordPolicy: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Básico (8 caracteres)</SelectItem>
                        <SelectItem value="medium">Medio (10 caracteres + números)</SelectItem>
                        <SelectItem value="strong">Fuerte (12 caracteres + símbolos)</SelectItem>
                        <SelectItem value="enterprise">Empresarial (16 caracteres + 2FA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="brute-force">Protección Fuerza Bruta</Label>
                      <p className="text-sm text-muted-foreground">Bloquea IPs tras 5 intentos fallidos</p>
                    </div>
                    <Switch
                      id="brute-force"
                      checked={securitySettings.bruteForceProtection}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, bruteForceProtection: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Acceso y Conexiones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ssl-only">Solo HTTPS</Label>
                      <p className="text-sm text-muted-foreground">Fuerza conexiones seguras</p>
                    </div>
                    <Switch
                      id="ssl-only"
                      checked={securitySettings.sslOnly}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, sslOnly: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="ip-whitelist">Lista Blanca de IPs</Label>
                      <p className="text-sm text-muted-foreground">Restringe acceso por IP</p>
                    </div>
                    <Switch
                      id="ip-whitelist"
                      checked={securitySettings.ipWhitelist}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipWhitelist: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption-rest">Encriptación en Reposo</Label>
                      <p className="text-sm text-muted-foreground">Datos encriptados en BD</p>
                    </div>
                    <Switch
                      id="encryption-rest"
                      checked={securitySettings.encryptionAtRest}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, encryptionAtRest: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nivel de seguridad actual */}
            <Card>
              <CardHeader>
                <CardTitle>Nivel de Seguridad Actual</CardTitle>
                <CardDescription>Evaluación general de la configuración de seguridad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Puntuación de Seguridad</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-32" />
                      <span className="font-medium">85/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>2FA Activo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SSL Forzado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Audit Log</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>IP Whitelist</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" />
                    Autenticación de Dos Factores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Habilitar 2FA</Label>
                      <p className="text-sm text-muted-foreground">Requerido para todos los usuarios</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Métodos Disponibles</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-4 w-4" />
                          <span>Aplicación Móvil</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Key className="h-4 w-4" />
                          <span>Códigos de Backup</span>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Autenticación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Usuarios con 2FA</span>
                      <span className="font-medium">18/24 (75%)</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Inicios exitosos hoy</p>
                        <p className="font-medium">142</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Intentos fallidos</p>
                        <p className="font-medium text-red-500">8</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Registro de Auditoría
                    </CardTitle>
                    <CardDescription>Historial completo de eventos de seguridad</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="audit-log">Audit Log Activo</Label>
                    <Switch
                      id="audit-log"
                      checked={securitySettings.auditLog}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLog: checked })}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {securityEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getEventIcon(event.type)}
                        <div>
                          <p className="text-sm font-medium">{getEventDescription(event.type)}</p>
                          <p className="text-xs text-muted-foreground">
                            Usuario: {event.user} • IP: {event.ip}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={event.status === "success" ? "default" : "destructive"}>{event.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Amenazas Detectadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">3</div>
                    <p className="text-sm text-muted-foreground">Últimas 24 horas</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">IPs Bloqueadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">12</div>
                    <p className="text-sm text-muted-foreground">Total activas</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sesiones Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">18</div>
                    <p className="text-sm text-muted-foreground">Usuarios conectados</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Seguridad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Múltiples intentos de acceso fallidos</p>
                      <p className="text-xs text-muted-foreground">IP: 203.0.113.45 - Hace 15 min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium">Usuario sin 2FA accedió al sistema</p>
                      <p className="text-xs text-muted-foreground">Usuario: María Rodríguez - Hace 2 horas</p>
                    </div>
                  </div>
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
