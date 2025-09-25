"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Users,
  DollarSign,
  TrendingDown,
} from "lucide-react"
import { useState } from "react"

interface DashboardAlertsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DashboardAlertsModal({ isOpen, onClose }: DashboardAlertsModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const alerts = [
    {
      id: 1,
      title: "Stock Crítico - iPhone 15",
      description: "Solo quedan 3 unidades en inventario",
      priority: "high",
      status: "active",
      type: "inventory",
      timestamp: "Hace 5 minutos",
      icon: Package,
      action: "Reabastecer",
    },
    {
      id: 2,
      title: "Pedidos Pendientes de Procesamiento",
      description: "12 pedidos esperando confirmación desde hace 2 horas",
      priority: "medium",
      status: "active",
      type: "orders",
      timestamp: "Hace 2 horas",
      icon: Clock,
      action: "Procesar",
    },
    {
      id: 3,
      title: "Caída en Conversiones",
      description: "Las conversiones han bajado un 15% en las últimas 24h",
      priority: "medium",
      status: "active",
      type: "analytics",
      timestamp: "Hace 1 día",
      icon: TrendingDown,
      action: "Analizar",
    },
    {
      id: 4,
      title: "Nuevo Cliente VIP Registrado",
      description: "Cliente con historial de compras altas se ha registrado",
      priority: "low",
      status: "resolved",
      type: "customer",
      timestamp: "Hace 3 horas",
      icon: Users,
      action: "Contactar",
    },
    {
      id: 5,
      title: "Pago Fallido - Pedido #1234",
      description: "Error en procesamiento de pago por $2,450",
      priority: "high",
      status: "active",
      type: "payment",
      timestamp: "Hace 30 minutos",
      icon: DollarSign,
      action: "Revisar",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return AlertTriangle
      case "resolved":
        return CheckCircle
      case "dismissed":
        return XCircle
      default:
        return Bell
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === "all" || alert.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus

    return matchesSearch && matchesPriority && matchesStatus
  })

  const activeAlertsCount = alerts.filter((a) => a.status === "active").length
  const highPriorityCount = alerts.filter((a) => a.priority === "high" && a.status === "active").length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Centro de Alertas
            <Badge variant="destructive" className="ml-2">
              {activeAlertsCount} activas
            </Badge>
          </DialogTitle>
          <DialogDescription>Gestiona todas las alertas y notificaciones del sistema</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de Alertas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-red-500">{highPriorityCount}</div>
                    <div className="text-sm text-muted-foreground">Alta Prioridad</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">
                      {alerts.filter((a) => a.priority === "medium" && a.status === "active").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Media Prioridad</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {alerts.filter((a) => a.status === "resolved").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Resueltas Hoy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles de Filtro */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar alertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="resolved">Resueltas</SelectItem>
                <SelectItem value="dismissed">Descartadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lista de Alertas */}
          <div className="space-y-3">
            {filteredAlerts.map((alert) => {
              const StatusIcon = getStatusIcon(alert.status)
              return (
                <Card key={alert.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Indicador de Prioridad */}
                      <div className={`w-1 h-16 rounded-full ${getPriorityColor(alert.priority)}`} />

                      {/* Icono de Tipo */}
                      <div className="p-2 bg-muted rounded-lg">
                        <alert.icon className="h-5 w-5 text-muted-foreground" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-card-foreground">{alert.title}</h3>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getPriorityBadge(alert.priority)}>
                              {alert.priority === "high" ? "Alta" : alert.priority === "medium" ? "Media" : "Baja"}
                            </Badge>
                            <StatusIcon
                              className={`h-4 w-4 ${
                                alert.status === "active"
                                  ? "text-red-500"
                                  : alert.status === "resolved"
                                    ? "text-green-500"
                                    : "text-gray-500"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                          <div className="flex gap-2">
                            {alert.status === "active" && (
                              <>
                                <Button size="sm" variant="outline">
                                  Descartar
                                </Button>
                                <Button size="sm">{alert.action}</Button>
                              </>
                            )}
                            {alert.status === "resolved" && (
                              <Badge variant="outline" className="text-green-500">
                                Resuelta
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Acciones Masivas */}
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-sm">Acciones Masivas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Marcar Todas como Leídas
                </Button>
                <Button variant="outline" size="sm">
                  Resolver Seleccionadas
                </Button>
                <Button variant="outline" size="sm">
                  Exportar Alertas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
