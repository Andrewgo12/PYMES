"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, BarChart3 } from "lucide-react"

interface ProductHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

function ProductHistoryModal({ isOpen, onClose, product }: ProductHistoryModalProps) {
  if (!product) return null

  const priceHistory = [
    { date: "2024-01-01", price: 89.99, change: 0, reason: "Precio inicial" },
    { date: "2024-02-15", price: 94.99, change: 5.56, reason: "Aumento de demanda" },
    { date: "2024-03-10", price: 87.99, change: -7.37, reason: "Promoción temporal" },
    { date: "2024-04-05", price: 92.99, change: 5.68, reason: "Fin de promoción" },
    { date: "2024-05-20", price: 99.99, change: 7.53, reason: "Precio dinámico - alta demanda" },
  ]

  const stockHistory = [
    { date: "2024-01-01", stock: 150, movement: 0, type: "inicial", description: "Stock inicial" },
    { date: "2024-01-15", stock: 125, movement: -25, type: "venta", description: "Ventas regulares" },
    { date: "2024-02-01", stock: 200, movement: 75, type: "restock", description: "Reposición de inventario" },
    { date: "2024-02-20", stock: 180, movement: -20, type: "venta", description: "Pico de ventas" },
    { date: "2024-03-10", stock: 120, movement: -60, type: "promocion", description: "Promoción especial" },
    { date: "2024-04-01", stock: 250, movement: 130, type: "restock", description: "Reposición mayor" },
  ]

  const salesHistory = [
    { period: "Enero 2024", sales: 45, revenue: 4049.55, growth: 0 },
    { period: "Febrero 2024", sales: 52, revenue: 4939.48, growth: 15.56 },
    { period: "Marzo 2024", sales: 68, revenue: 5983.32, growth: 30.77 },
    { period: "Abril 2024", sales: 61, revenue: 5672.39, growth: 17.39 },
    { period: "Mayo 2024", sales: 74, revenue: 7399.26, growth: 64.44 },
  ]

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "venta":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "restock":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "promocion":
        return <TrendingDown className="h-4 w-4 text-orange-500" />
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getMovementColor = (type: string) => {
    switch (type) {
      case "venta":
        return "text-red-600 bg-red-50"
      case "restock":
        return "text-green-600 bg-green-50"
      case "promocion":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historial de {product.name}
          </DialogTitle>
          <DialogDescription>Análisis histórico completo de precios, stock y ventas</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="prices" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prices" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Precios
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventario
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Ventas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prices" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Evolución de Precios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Calendar className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">${entry.price}</div>
                          <div className="text-sm text-muted-foreground">{entry.reason}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {entry.change !== 0 && (
                          <Badge variant={entry.change > 0 ? "default" : "secondary"} className="mb-1">
                            {entry.change > 0 ? "+" : ""}
                            {entry.change.toFixed(2)}%
                          </Badge>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {entry.change > 0 ? "Incremento" : entry.change < 0 ? "Descuento" : "Inicial"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stock" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Movimientos de Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stockHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Calendar className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getMovementIcon(entry.type)}
                          <div>
                            <div className="font-semibold">{entry.stock} unidades</div>
                            <div className="text-sm text-muted-foreground">{entry.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {entry.movement !== 0 && (
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-lg text-sm font-medium ${getMovementColor(entry.type)}`}
                          >
                            {entry.movement > 0 ? "+" : ""}
                            {entry.movement}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Rendimiento de Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">{entry.period}</div>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{entry.sales} ventas</div>
                          <div className="text-sm text-green-600 font-medium">${entry.revenue.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {entry.growth !== 0 && (
                          <Badge variant={entry.growth > 0 ? "default" : "secondary"} className="mb-1">
                            {entry.growth > 0 ? "+" : ""}
                            {entry.growth.toFixed(2)}%
                          </Badge>
                        )}
                        <div className="text-xs text-muted-foreground">vs. mes anterior</div>
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

export { ProductHistoryModal }
