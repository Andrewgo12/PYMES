"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Plus,
  Settings,
  Clock,
  BarChart3,
  GripVertical,
  RefreshCw,
  Bell,
} from "lucide-react"
import { DashboardMetricsModal } from "./modals/dashboard-metrics-modal"
import { DashboardQuickActionsModal } from "./modals/dashboard-quick-actions-modal"
import { DashboardTimelineModal } from "./modals/dashboard-timeline-modal"
import { DashboardConfigModal } from "./modals/dashboard-config-modal"
import { DashboardAlertsModal } from "./modals/dashboard-alerts-modal"
import { DraggableWidget } from "./draggable-widget"

const stats = [
  {
    id: "sales",
    title: "Ventas Totales",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    realTimeValue: "$45,231.89",
  },
  {
    id: "products",
    title: "Productos",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Package,
    realTimeValue: "2,350",
  },
  {
    id: "customers",
    title: "Clientes",
    value: "1,234",
    change: "+19%",
    trend: "up",
    icon: Users,
    realTimeValue: "1,234",
  },
  {
    id: "orders",
    title: "Pedidos",
    value: "573",
    change: "-2%",
    trend: "down",
    icon: ShoppingCart,
    realTimeValue: "573",
  },
]

const recentActivity = [
  { id: 1, action: "Nuevo pedido #1234", time: "Hace 2 minutos", type: "order", status: "new" },
  { id: 2, action: "Producto agotado: iPhone 15", time: "Hace 15 minutos", type: "alert", status: "warning" },
  { id: 3, action: "Cliente registrado: María García", time: "Hace 1 hora", type: "user", status: "success" },
  { id: 4, action: "Pago procesado: $1,250", time: "Hace 2 horas", type: "payment", status: "success" },
  { id: 5, action: "Inventario actualizado", time: "Hace 3 horas", type: "inventory", status: "info" },
]

const quickActions = [
  { id: "new-product", label: "Nuevo Producto", icon: Package, color: "bg-blue-500" },
  { id: "new-order", label: "Nuevo Pedido", icon: ShoppingCart, color: "bg-green-500" },
  { id: "inventory-check", label: "Revisar Inventario", icon: BarChart3, color: "bg-yellow-500" },
  { id: "generate-report", label: "Generar Reporte", icon: Clock, color: "bg-purple-500" },
]

export function DashboardContent() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [widgets, setWidgets] = useState([
    { id: "stats", type: "stats", position: { x: 0, y: 0 }, size: { w: 4, h: 1 } },
    { id: "activity", type: "activity", position: { x: 0, y: 1 }, size: { w: 2, h: 2 } },
    { id: "alerts", type: "alerts", position: { x: 2, y: 1 }, size: { w: 1, h: 2 } },
    { id: "quick-actions", type: "quick-actions", position: { x: 3, y: 1 }, size: { w: 1, h: 1 } },
  ])
  const [realTimeData, setRealTimeData] = useState(stats)
  const [isRealTimeActive, setIsRealTimeActive] = useState(true)

  const updateRealTimeData = () => {
    setRealTimeData((prev) =>
      prev.map((stat) => ({
        ...stat,
        realTimeValue:
          stat.id === "sales"
            ? `$${(Number.parseFloat(stat.value.replace("$", "").replace(",", "")) + Math.random() * 100).toLocaleString()}`
            : stat.realTimeValue,
      })),
    )
  }

  useState(() => {
    if (isRealTimeActive) {
      const interval = setInterval(updateRealTimeData, 5000)
      return () => clearInterval(interval)
    }
  })

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
    <div className="space-y-6">
      {/* Header con controles de tiempo real */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta. Aquí tienes un resumen de tu negocio.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isRealTimeActive ? "default" : "outline"}
            size="sm"
            onClick={() => setIsRealTimeActive(!isRealTimeActive)}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRealTimeActive ? "animate-spin" : ""}`} />
            Tiempo Real
          </Button>
          <Button variant="outline" size="sm" onClick={() => openModal("config")}>
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
          <Button onClick={() => openModal("quick-actions")}>
            <Plus className="h-4 w-4 mr-2" />
            Acciones Rápidas
          </Button>
        </div>
      </div>

      {/* Widgets Arrastrables */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {realTimeData.map((stat) => (
          <DraggableWidget key={stat.id} id={stat.id}>
            <Card className="bg-card border-border cursor-move">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground flex items-center gap-2">
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {isRealTimeActive ? stat.realTimeValue : stat.value}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="ml-1">desde el mes pasado</span>
                </div>
              </CardContent>
            </Card>
          </DraggableWidget>
        ))}
      </div>

      {/* Sección de Comparativas */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center justify-between">
              Comparativa Mensual
              <Button variant="ghost" size="sm" onClick={() => openModal("metrics")}>
                <BarChart3 className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Este mes</span>
                <span className="font-medium text-green-500">+23%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mes anterior</span>
                <span className="font-medium">$37,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mismo mes año anterior</span>
                <span className="font-medium text-blue-500">+45%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center justify-between">
              Timeline de Eventos
              <Button variant="ghost" size="sm" onClick={() => openModal("timeline")}>
                <Clock className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : activity.status === "new"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center justify-between">
              Alertas Activas
              <Button variant="ghost" size="sm" onClick={() => openModal("alerts")}>
                <Bell className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm font-medium text-card-foreground">Stock bajo</p>
                <p className="text-xs text-muted-foreground">5 productos críticos</p>
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm font-medium text-card-foreground">Pedidos pendientes</p>
                <p className="text-xs text-muted-foreground">12 requieren atención</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas Widget */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Acciones Rápidas</CardTitle>
          <CardDescription>Accesos directos a funciones principales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                onClick={() => openModal("quick-actions")}
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modales Exclusivos del Dashboard */}
      <DashboardMetricsModal isOpen={activeModal === "metrics"} onClose={closeModal} data={realTimeData} />
      <DashboardQuickActionsModal
        isOpen={activeModal === "quick-actions"}
        onClose={closeModal}
        actions={quickActions}
      />
      <DashboardTimelineModal isOpen={activeModal === "timeline"} onClose={closeModal} activities={recentActivity} />
      <DashboardConfigModal
        isOpen={activeModal === "config"}
        onClose={closeModal}
        widgets={widgets}
        onWidgetsChange={setWidgets}
      />
      <DashboardAlertsModal isOpen={activeModal === "alerts"} onClose={closeModal} />
    </div>
  )
}
