"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Calendar, User, Package, ShoppingCart, AlertTriangle, DollarSign } from "lucide-react"
import { useState } from "react"

interface DashboardTimelineModalProps {
  isOpen: boolean
  onClose: () => void
  activities: any[]
}

export function DashboardTimelineModal({ isOpen, onClose, activities }: DashboardTimelineModalProps) {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("today")

  const filters = [
    { id: "all", label: "Todos", count: activities.length },
    { id: "order", label: "Pedidos", count: 2 },
    { id: "alert", label: "Alertas", count: 1 },
    { id: "user", label: "Usuarios", count: 1 },
    { id: "payment", label: "Pagos", count: 1 },
  ]

  const timeRanges = [
    { id: "today", label: "Hoy" },
    { id: "week", label: "Esta Semana" },
    { id: "month", label: "Este Mes" },
    { id: "all", label: "Todo" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCart
      case "alert":
        return AlertTriangle
      case "user":
        return User
      case "payment":
        return DollarSign
      case "inventory":
        return Package
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "new":
        return "bg-blue-500"
      case "info":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredActivities = activities.filter(
    (activity) => selectedFilter === "all" || activity.type === selectedFilter,
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline de Eventos
          </DialogTitle>
          <DialogDescription>Historial completo de actividades y eventos del sistema</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles de Filtro */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtros:</span>
              <div className="flex gap-1">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                  >
                    {filter.label}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {filter.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Período:</span>
              <div className="flex gap-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={timeRange === range.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range.id)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type)
              return (
                <Card key={activity.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(activity.status)}`} />
                        {index < filteredActivities.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-card-foreground">{activity.action}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{activity.time}</span>
                          <span>•</span>
                          <span>Sistema Automático</span>
                        </div>

                        {/* Detalles Adicionales */}
                        <div className="bg-muted/20 rounded-lg p-3 text-sm">
                          <div className="grid gap-1 md:grid-cols-2">
                            <div>
                              <span className="text-muted-foreground">ID:</span>
                              <span className="ml-2 font-mono">#{activity.id.toString().padStart(6, "0")}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Estado:</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {activity.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Estadísticas del Timeline */}
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-sm">Estadísticas del Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{activities.length}</div>
                  <div className="text-xs text-muted-foreground">Total Eventos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {activities.filter((a) => a.status === "success").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Exitosos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {activities.filter((a) => a.status === "warning").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Advertencias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">2.3</div>
                  <div className="text-xs text-muted-foreground">Eventos/Hora</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
