"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Play, Pause, Trash2, Plus, Settings, Mail, Bell } from "lucide-react"
import { useState } from "react"

interface ReportSchedulerModalProps {
  isOpen: boolean
  onClose: () => void
}

function ReportSchedulerModal({ isOpen, onClose }: ReportSchedulerModalProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)

  const schedules = [
    {
      id: 1,
      name: "Reporte Diario de Ventas",
      report: "Ventas Mensuales",
      frequency: "daily",
      time: "09:00",
      timezone: "Europe/Madrid",
      status: "active",
      lastRun: "2024-01-15 09:00",
      nextRun: "2024-01-16 09:00",
      recipients: ["admin@empresa.com", "ventas@empresa.com"],
      format: "PDF",
      conditions: ["sales > 1000"],
      retries: 3,
      success: 98.5,
      failures: 2,
    },
    {
      id: 2,
      name: "Inventario Semanal",
      report: "Inventario Crítico",
      frequency: "weekly",
      time: "08:00",
      timezone: "Europe/Madrid",
      status: "active",
      lastRun: "2024-01-14 08:00",
      nextRun: "2024-01-21 08:00",
      recipients: ["inventario@empresa.com"],
      format: "Excel",
      conditions: ["stock < 50"],
      retries: 2,
      success: 100,
      failures: 0,
    },
    {
      id: 3,
      name: "Análisis Mensual",
      report: "Análisis de Rentabilidad",
      frequency: "monthly",
      time: "07:00",
      timezone: "Europe/Madrid",
      status: "paused",
      lastRun: "2024-01-01 07:00",
      nextRun: "2024-02-01 07:00",
      recipients: ["finanzas@empresa.com", "gerencia@empresa.com"],
      format: "Dashboard",
      conditions: [],
      retries: 1,
      success: 95.2,
      failures: 1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "Diario"
      case "weekly":
        return "Semanal"
      case "monthly":
        return "Mensual"
      case "quarterly":
        return "Trimestral"
      default:
        return frequency
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Programador de Reportes
          </DialogTitle>
          <DialogDescription>
            Gestiona la programación automática de reportes con condiciones y notificaciones
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="schedules" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedules">Programaciones</TabsTrigger>
            <TabsTrigger value="create">Crear Nueva</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="schedules" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Programación
                </Button>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Ejecutar Ahora
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{schedules.filter((s) => s.status === "active").length} activas</span>
                <span>•</span>
                <span>{schedules.filter((s) => s.status === "paused").length} pausadas</span>
              </div>
            </div>

            <div className="grid gap-4">
              {schedules.map((schedule) => (
                <Card key={schedule.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{schedule.name}</h3>
                          <Badge variant="outline" className={`${getStatusColor(schedule.status)} text-white`}>
                            {schedule.status === "active" ? "Activo" : "Pausado"}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {getFrequencyText(schedule.frequency)}
                          </Badge>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                          <div>
                            <div className="text-sm text-muted-foreground">Reporte</div>
                            <div className="font-medium">{schedule.report}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Próxima Ejecución</div>
                            <div className="font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {schedule.nextRun}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Destinatarios</div>
                            <div className="font-medium flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {schedule.recipients.length} usuarios
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Éxito:</span>
                            <span className="text-green-600 font-medium">{schedule.success}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Fallos:</span>
                            <span className="text-red-600 font-medium">{schedule.failures}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Formato:</span>
                            <span className="font-medium">{schedule.format}</span>
                          </div>
                          {schedule.conditions.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Bell className="h-3 w-3 text-orange-500" />
                              <span className="text-orange-600 font-medium">
                                {schedule.conditions.length} condiciones
                              </span>
                            </div>
                          )}
                        </div>

                        {schedule.conditions.length > 0 && (
                          <div className="pt-2 border-t border-border">
                            <div className="text-sm text-muted-foreground mb-2">Condiciones:</div>
                            <div className="flex gap-2">
                              {schedule.conditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {schedule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Nueva Programación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nombre de la Programación</Label>
                    <Input placeholder="Ej: Reporte Diario de Ventas" />
                  </div>
                  <div className="space-y-2">
                    <Label>Reporte</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar reporte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Ventas Mensuales</SelectItem>
                        <SelectItem value="inventory">Inventario Crítico</SelectItem>
                        <SelectItem value="financial">Análisis de Rentabilidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Hora</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zona Horaria</Label>
                    <Select defaultValue="europe/madrid">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/madrid">Europe/Madrid</SelectItem>
                        <SelectItem value="america/new_york">America/New_York</SelectItem>
                        <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Destinatarios</Label>
                  <div className="flex gap-2">
                    <Input placeholder="email@empresa.com" className="flex-1" />
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">admin@empresa.com</Badge>
                    <Badge variant="secondary">ventas@empresa.com</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Formato de Exportación</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="dashboard">Dashboard Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Reintentos en Caso de Error</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 reintentos</SelectItem>
                        <SelectItem value="1">1 reintento</SelectItem>
                        <SelectItem value="3">3 reintentos</SelectItem>
                        <SelectItem value="5">5 reintentos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Condiciones de Ejecución (Opcional)</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-sales" />
                      <Label htmlFor="condition-sales">Solo ejecutar si las ventas superan un umbral</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-stock" />
                      <Label htmlFor="condition-stock">Solo ejecutar si hay productos con stock bajo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="condition-errors" />
                      <Label htmlFor="condition-errors">Solo ejecutar si no hay errores en los datos</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Crear Programación</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Historial de Ejecuciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      schedule: "Reporte Diario de Ventas",
                      date: "2024-01-15 09:00",
                      status: "success",
                      duration: "2.3s",
                      size: "2.4 MB",
                      recipients: 2,
                    },
                    {
                      id: 2,
                      schedule: "Inventario Semanal",
                      date: "2024-01-14 08:00",
                      status: "success",
                      duration: "1.8s",
                      size: "1.8 MB",
                      recipients: 1,
                    },
                    {
                      id: 3,
                      schedule: "Reporte Diario de Ventas",
                      date: "2024-01-14 09:00",
                      status: "error",
                      duration: "0.5s",
                      size: "-",
                      recipients: 0,
                      error: "Error de conexión a la base de datos",
                    },
                  ].map((execution) => (
                    <div key={execution.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            execution.status === "success" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{execution.schedule}</div>
                          <div className="text-sm text-muted-foreground">{execution.date}</div>
                          {execution.error && <div className="text-sm text-red-600">{execution.error}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Duración: {execution.duration}</span>
                        <span>Tamaño: {execution.size}</span>
                        <span>Enviado a: {execution.recipients} usuarios</span>
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

export { ReportSchedulerModal }
