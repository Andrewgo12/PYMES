"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Bell, TrendingDown, Package, Clock, Settings, CheckCircle, X } from "lucide-react"
import { useState } from "react"

interface InventoryAlertsModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryAlertsModal({ isOpen, onClose, items }: InventoryAlertsModalProps) {
  const [alertSettings, setAlertSettings] = useState({
    lowStock: true,
    outOfStock: true,
    overstock: true,
    expiration: true,
    slowMoving: true,
    reorderPoint: true,
  })

  const alerts = [
    {
      id: 1,
      type: "bajo_stock",
      priority: "alta",
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      currentStock: 8,
      minStock: 20,
      message: "Stock por debajo del mínimo establecido",
      date: "2024-05-20 14:30",
      status: "activa",
      action: "Reordenar 50 unidades",
    },
    {
      id: 2,
      type: "sin_stock",
      priority: "critica",
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      currentStock: 0,
      minStock: 5,
      message: "Producto completamente agotado",
      date: "2024-05-19 16:45",
      status: "activa",
      action: "Pedido urgente requerido",
    },
    {
      id: 3,
      type: "exceso_stock",
      priority: "media",
      product: "Cables USB-C",
      sku: "CBL-USBC-001",
      currentStock: 500,
      maxStock: 200,
      message: "Stock excesivo detectado",
      date: "2024-05-18 11:20",
      status: "activa",
      action: "Considerar promoción",
    },
    {
      id: 4,
      type: "movimiento_lento",
      priority: "baja",
      product: "Adaptador HDMI",
      sku: "ADP-HDMI-002",
      currentStock: 45,
      lastMovement: "2024-03-15",
      message: "Sin movimientos en 60+ días",
      date: "2024-05-17 09:15",
      status: "pendiente",
      action: "Revisar demanda",
    },
    {
      id: 5,
      type: "punto_reorden",
      priority: "media",
      product: "Teclado Mecánico",
      sku: "KBD-MECH-001",
      currentStock: 15,
      reorderPoint: 15,
      message: "Punto de reorden alcanzado",
      date: "2024-05-16 13:45",
      status: "resuelta",
      action: "Pedido realizado",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "bajo_stock":
        return <TrendingDown className="h-4 w-4 text-yellow-500" />
      case "sin_stock":
        return <Package className="h-4 w-4 text-red-500" />
      case "exceso_stock":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "movimiento_lento":
        return <Clock className="h-4 w-4 text-gray-500" />
      case "punto_reorden":
        return <Bell className="h-4 w-4 text-orange-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critica":
        return "text-red-600 bg-red-50"
      case "alta":
        return "text-orange-600 bg-orange-50"
      case "media":
        return "text-yellow-600 bg-yellow-50"
      case "baja":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activa":
        return "text-red-600 bg-red-50"
      case "pendiente":
        return "text-yellow-600 bg-yellow-50"
      case "resuelta":
        return "text-green-600 bg-green-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case "bajo_stock":
        return "Bajo Stock"
      case "sin_stock":
        return "Sin Stock"
      case "exceso_stock":
        return "Exceso Stock"
      case "movimiento_lento":
        return "Movimiento Lento"
      case "punto_reorden":
        return "Punto Reorden"
      default:
        return "Desconocido"
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "activa")
  const criticalAlerts = alerts.filter((alert) => alert.priority === "critica")
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resuelta")

  const handleResolveAlert = (alertId: number) => {
    console.log("[v0] Resolviendo alerta:", alertId)
  }

  const handleDismissAlert = (alertId: number) => {
    console.log("[v0] Descartando alerta:", alertId)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Sistema de Alertas de Inventario
          </DialogTitle>
          <DialogDescription>Monitoreo automático y notificaciones inteligentes de stock</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen de alertas */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Críticas</p>
                    <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Activas</p>
                    <p className="text-2xl font-bold text-yellow-600">{activeAlerts.length}</p>
                  </div>
                  <Bell className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resueltas</p>
                    <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Alertas Activas</TabsTrigger>
              <TabsTrigger value="critical">Críticas</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Alertas Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-red-500">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getAlertIcon(alert.type)}
                              <Badge className={`${getPriorityColor(alert.priority)} border-0`}>{alert.priority}</Badge>
                            </div>
                            <div>
                              <div className="font-medium">{alert.product}</div>
                              <div className="text-sm text-muted-foreground">{alert.sku}</div>
                              <div className="text-sm text-red-600 font-medium mt-1">{alert.message}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold">{alert.currentStock}</div>
                              <div className="text-xs text-muted-foreground">Stock Actual</div>
                            </div>

                            <div className="text-center">
                              <Badge className={`${getStatusColor(alert.status)} border-0`}>
                                {getAlertTypeLabel(alert.type)}
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">{alert.date}</div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-600 bg-transparent"
                                onClick={() => handleResolveAlert(alert.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 bg-transparent"
                                onClick={() => handleDismissAlert(alert.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Descartar
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Acción recomendada:</span>
                            <span className="text-sm font-medium text-blue-600">{alert.action}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="critical" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Alertas Críticas - Acción Inmediata Requerida
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {criticalAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                            <div>
                              <div className="font-medium text-red-700">{alert.product}</div>
                              <div className="text-sm text-muted-foreground">{alert.sku}</div>
                              <div className="text-sm text-red-600 font-medium mt-1">{alert.message}</div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">{alert.currentStock}</div>
                            <div className="text-sm text-muted-foreground">Stock Actual</div>
                            <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                              Acción Urgente
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Historial de Alertas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getAlertIcon(alert.type)}
                            <Badge className={`${getStatusColor(alert.status)} border-0`}>{alert.status}</Badge>
                          </div>
                          <div>
                            <div className="font-medium">{alert.product}</div>
                            <div className="text-sm text-muted-foreground">{alert.message}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-medium">{alert.date}</div>
                          <div className="text-sm text-muted-foreground">{getAlertTypeLabel(alert.type)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configuración de Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="lowStock" className="font-medium">
                          Alertas de Bajo Stock
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar cuando el stock esté por debajo del mínimo
                        </p>
                      </div>
                      <Switch
                        id="lowStock"
                        checked={alertSettings.lowStock}
                        onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, lowStock: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="outOfStock" className="font-medium">
                          Alertas de Sin Stock
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Notificar cuando un producto se agote completamente
                        </p>
                      </div>
                      <Switch
                        id="outOfStock"
                        checked={alertSettings.outOfStock}
                        onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, outOfStock: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="overstock" className="font-medium">
                          Alertas de Exceso de Stock
                        </Label>
                        <p className="text-sm text-muted-foreground">Notificar cuando hay exceso de inventario</p>
                      </div>
                      <Switch
                        id="overstock"
                        checked={alertSettings.overstock}
                        onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, overstock: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="slowMoving" className="font-medium">
                          Alertas de Movimiento Lento
                        </Label>
                        <p className="text-sm text-muted-foreground">Notificar productos sin movimiento por 60+ días</p>
                      </div>
                      <Switch
                        id="slowMoving"
                        checked={alertSettings.slowMoving}
                        onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, slowMoving: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reorderPoint" className="font-medium">
                          Alertas de Punto de Reorden
                        </Label>
                        <p className="text-sm text-muted-foreground">Notificar cuando se alcance el punto de reorden</p>
                      </div>
                      <Switch
                        id="reorderPoint"
                        checked={alertSettings.reorderPoint}
                        onCheckedChange={(checked) => setAlertSettings((prev) => ({ ...prev, reorderPoint: checked }))}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button>Guardar Configuración</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
