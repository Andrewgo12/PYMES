"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Share2,
  Mail,
  Link,
  Users,
  Calendar,
  Eye,
  Download,
  Lock,
  Globe,
  Copy,
  QrCode,
  MessageSquare,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

interface ReportShareModalProps {
  isOpen: boolean
  onClose: () => void
  selectedReports: number[]
  reports: any[]
}

function ReportShareModal({ isOpen, onClose, selectedReports, reports }: ReportShareModalProps) {
  const [shareMethod, setShareMethod] = useState("email")
  const [recipients, setRecipients] = useState<string[]>([])
  const [newRecipient, setNewRecipient] = useState("")
  const [shareMessage, setShareMessage] = useState("")
  const [shareSettings, setShareSettings] = useState({
    allowDownload: true,
    allowComments: false,
    requireLogin: false,
    expiresIn: "30",
    notifyViews: true,
  })

  const selectedReportsList = reports.filter((report) => selectedReports.includes(report.id))

  const shareHistory = [
    {
      id: 1,
      report: "Ventas Mensuales",
      sharedWith: "equipo-ventas@empresa.com",
      method: "Email",
      date: "2024-01-15 14:30",
      views: 12,
      downloads: 3,
      status: "active",
      expires: "2024-02-15",
    },
    {
      id: 2,
      report: "Inventario Crítico",
      sharedWith: "Enlace Público",
      method: "Link",
      date: "2024-01-14 09:15",
      views: 45,
      downloads: 8,
      status: "active",
      expires: "2024-02-14",
    },
    {
      id: 3,
      report: "Análisis Financiero",
      sharedWith: "gerencia@empresa.com",
      method: "Email",
      date: "2024-01-13 16:45",
      views: 6,
      downloads: 2,
      status: "expired",
      expires: "2024-01-13",
    },
  ]

  const shareMethods = [
    {
      id: "email",
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      description: "Enviar por correo electrónico",
    },
    {
      id: "link",
      name: "Enlace",
      icon: <Link className="h-4 w-4" />,
      description: "Generar enlace compartible",
    },
    {
      id: "team",
      name: "Equipo",
      icon: <Users className="h-4 w-4" />,
      description: "Compartir con equipos internos",
    },
    {
      id: "schedule",
      name: "Programado",
      icon: <Calendar className="h-4 w-4" />,
      description: "Envío programado recurrente",
    },
  ]

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient])
      setNewRecipient("")
    }
  }

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email))
  }

  const generateShareLink = () => {
    return `https://empresa.com/reports/shared/${Math.random().toString(36).substr(2, 9)}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartir Reportes
          </DialogTitle>
          <DialogDescription>
            Comparte reportes con equipos, clientes o stakeholders con controles avanzados
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="share" className="space-y-4">
          <TabsList>
            <TabsTrigger value="share">Compartir</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6">
            {/* Reportes Seleccionados */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Reportes a Compartir ({selectedReportsList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedReportsList.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Checkbox checked readOnly />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.category}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Método de Compartir */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Método de Compartir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {shareMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        shareMethod === method.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border hover:border-blue-300"
                      }`}
                      onClick={() => setShareMethod(method.id)}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        {method.icon}
                        <span className="text-sm font-medium">{method.name}</span>
                        <span className="text-xs text-muted-foreground">{method.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Configuración por Método */}
            {shareMethod === "email" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Configuración de Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Destinatarios</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="email@empresa.com"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addRecipient()}
                        className="flex-1"
                      />
                      <Button onClick={addRecipient}>Agregar</Button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {recipients.map((email, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeRecipient(email)}
                        >
                          {email} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Mensaje Personalizado</Label>
                    <Textarea
                      placeholder="Hola, te comparto estos reportes para tu revisión..."
                      value={shareMessage}
                      onChange={(e) => setShareMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {shareMethod === "link" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Enlace Compartible</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>URL del Enlace</Label>
                    <div className="flex gap-2">
                      <Input value={generateShareLink()} readOnly className="flex-1" />
                      <Button variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tipo de Acceso</Label>
                      <Select defaultValue="public">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              Público
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Privado
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Contraseña (Opcional)</Label>
                      <Input type="password" placeholder="Dejar vacío para sin contraseña" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {shareMethod === "team" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Compartir con Equipos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: "Equipo de Ventas", members: 8, access: "read" },
                      { name: "Gerencia", members: 3, access: "full" },
                      { name: "Finanzas", members: 5, access: "read" },
                      { name: "Marketing", members: 6, access: "comment" },
                    ].map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Checkbox />
                          <div>
                            <div className="font-medium">{team.name}</div>
                            <div className="text-sm text-muted-foreground">{team.members} miembros</div>
                          </div>
                        </div>
                        <Select defaultValue={team.access}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="read">Solo Lectura</SelectItem>
                            <SelectItem value="comment">Comentar</SelectItem>
                            <SelectItem value="full">Acceso Completo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {shareMethod === "schedule" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Envío Programado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Frecuencia</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar frecuencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                          <SelectItem value="quarterly">Trimestral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Hora de Envío</Label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Destinatarios Recurrentes</Label>
                    <Textarea placeholder="email1@empresa.com, email2@empresa.com" rows={2} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Configuración de Permisos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Configuración de Permisos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allow-download"
                        checked={shareSettings.allowDownload}
                        onCheckedChange={(checked) =>
                          setShareSettings((prev) => ({ ...prev, allowDownload: !!checked }))
                        }
                      />
                      <Label htmlFor="allow-download" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Permitir Descarga
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allow-comments"
                        checked={shareSettings.allowComments}
                        onCheckedChange={(checked) =>
                          setShareSettings((prev) => ({ ...prev, allowComments: !!checked }))
                        }
                      />
                      <Label htmlFor="allow-comments" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Permitir Comentarios
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="require-login"
                        checked={shareSettings.requireLogin}
                        onCheckedChange={(checked) =>
                          setShareSettings((prev) => ({ ...prev, requireLogin: !!checked }))
                        }
                      />
                      <Label htmlFor="require-login" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Requerir Inicio de Sesión
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notify-views"
                        checked={shareSettings.notifyViews}
                        onCheckedChange={(checked) => setShareSettings((prev) => ({ ...prev, notifyViews: !!checked }))}
                      />
                      <Label htmlFor="notify-views" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Notificar Visualizaciones
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Expira en (días)</Label>
                      <Select
                        value={shareSettings.expiresIn}
                        onValueChange={(value) => setShareSettings((prev) => ({ ...prev, expiresIn: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 días</SelectItem>
                          <SelectItem value="30">30 días</SelectItem>
                          <SelectItem value="90">90 días</SelectItem>
                          <SelectItem value="never">Nunca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={selectedReportsList.length === 0}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir Reportes
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Historial de Compartidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shareHistory.map((share) => (
                    <div key={share.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(share.status)}
                        <div>
                          <div className="font-medium">{share.report}</div>
                          <div className="text-sm text-muted-foreground">
                            Compartido con: {share.sharedWith} • {share.method} • {share.date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Expira: {share.expires} • {share.views} vistas • {share.downloads} descargas
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          Revocar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Reportes Compartidos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-muted-foreground">Visualizaciones</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">43</div>
                      <div className="text-sm text-muted-foreground">Descargas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-sm text-muted-foreground">Usuarios Únicos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Reportes Más Compartidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Ventas Mensuales", shares: 8, views: 45 },
                    { name: "Inventario Crítico", shares: 6, views: 32 },
                    { name: "Análisis Financiero", shares: 4, views: 28 },
                    { name: "Satisfacción Cliente", shares: 3, views: 19 },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="font-medium">{report.name}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{report.shares} compartidos</span>
                        <span>{report.views} vistas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export { ReportShareModal }
