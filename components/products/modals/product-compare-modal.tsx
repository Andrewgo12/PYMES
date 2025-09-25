"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Star, Package, DollarSign, Users, Award, Target } from "lucide-react"

interface ProductCompareModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: number[]
  products: any[]
}

export function ProductCompareModal({ isOpen, onClose, selectedProducts, products }: ProductCompareModalProps) {
  const compareProducts = products.filter((p) => selectedProducts.includes(p.id)).slice(0, 4) // Máximo 4 productos

  if (compareProducts.length === 0) return null

  const metrics = [
    { key: "price", label: "Precio", icon: DollarSign, format: (value: number) => `$${value}` },
    { key: "dynamicPrice", label: "Precio Dinámico", icon: DollarSign, format: (value: number) => `$${value}` },
    { key: "stock", label: "Stock", icon: Package, format: (value: number) => `${value} unidades` },
    { key: "sales", label: "Ventas", icon: TrendingUp, format: (value: number) => `${value} vendidos` },
    { key: "rating", label: "Calificación", icon: Star, format: (value: number) => `${value}/5` },
  ]

  const getBestValue = (metric: string) => {
    const values = compareProducts.map((p) => p[metric])
    switch (metric) {
      case "price":
      case "dynamicPrice":
        return Math.min(...values)
      case "stock":
      case "sales":
      case "rating":
        return Math.max(...values)
      default:
        return Math.max(...values)
    }
  }

  const getWorstValue = (metric: string) => {
    const values = compareProducts.map((p) => p[metric])
    switch (metric) {
      case "price":
      case "dynamicPrice":
        return Math.max(...values)
      case "stock":
      case "sales":
      case "rating":
        return Math.min(...values)
      default:
        return Math.min(...values)
    }
  }

  const getPerformanceColor = (product: any, metric: string) => {
    const value = product[metric]
    const best = getBestValue(metric)
    const worst = getWorstValue(metric)

    if (value === best) return "text-green-600 bg-green-50"
    if (value === worst) return "text-red-600 bg-red-50"
    return "text-yellow-600 bg-yellow-50"
  }

  const calculateROI = (product: any) => {
    const revenue = product.sales * product.dynamicPrice
    const cost = product.sales * (product.dynamicPrice * 0.6) // Asumiendo 40% de margen
    return (((revenue - cost) / cost) * 100).toFixed(1)
  }

  const getMarketPosition = (product: any) => {
    const score = product.rating * 20 + product.sales / 10 + product.stock / 5
    if (score > 150) return { label: "Líder", color: "bg-green-500" }
    if (score > 100) return { label: "Competitivo", color: "bg-blue-500" }
    if (score > 50) return { label: "Promedio", color: "bg-yellow-500" }
    return { label: "Bajo", color: "bg-red-500" }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Comparación de Productos
          </DialogTitle>
          <DialogDescription>
            Análisis comparativo detallado de {compareProducts.length} productos seleccionados
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumen Ejecutivo */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Award className="h-4 w-4" />
                Resumen Ejecutivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {compareProducts.find((p) => p.dynamicPrice === getBestValue("dynamicPrice"))?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Mejor Precio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {compareProducts.find((p) => p.sales === getBestValue("sales"))?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Más Vendido</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {compareProducts.find((p) => p.rating === getBestValue("rating"))?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Mejor Calificado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {compareProducts.find((p) => p.stock === getBestValue("stock"))?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Mayor Stock</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Comparación Principal */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Comparación Detallada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-3 font-medium">Atributo</th>
                      {compareProducts.map((product) => (
                        <th key={product.id} className="text-center p-3 font-medium min-w-40">
                          <div className="space-y-2">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg mx-auto bg-muted"
                            />
                            <div className="font-semibold text-sm">{product.name}</div>
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric) => (
                      <tr key={metric.key} className="border-b border-border">
                        <td className="p-3 font-medium flex items-center gap-2">
                          <metric.icon className="h-4 w-4 text-muted-foreground" />
                          {metric.label}
                        </td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="p-3 text-center">
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-lg font-medium ${getPerformanceColor(product, metric.key)}`}
                            >
                              {metric.format(product[metric.key])}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Filas adicionales */}
                    <tr className="border-b border-border">
                      <td className="p-3 font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        Proveedor
                      </td>
                      {compareProducts.map((product) => (
                        <td key={product.id} className="p-3 text-center">
                          <Badge variant="outline" className="text-xs">
                            {product.supplier}
                          </Badge>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="p-3 font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        ROI Estimado
                      </td>
                      {compareProducts.map((product) => (
                        <td key={product.id} className="p-3 text-center">
                          <span className="font-semibold text-green-600">{calculateROI(product)}%</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="p-3 font-medium">Posición de Mercado</td>
                      {compareProducts.map((product) => {
                        const position = getMarketPosition(product)
                        return (
                          <td key={product.id} className="p-3 text-center">
                            <Badge className={`${position.color} text-white`}>{position.label}</Badge>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Análisis de Tendencias */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Análisis de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {compareProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded bg-muted"
                        />
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          Score: {(product.rating * 20 + product.sales / 10 + product.stock / 5).toFixed(0)}
                        </div>
                        <div className="text-xs text-muted-foreground">ROI: {calculateROI(product)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Recomendaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="font-medium text-green-700 text-sm">Mejor Inversión</div>
                    <div className="text-sm text-muted-foreground">
                      {
                        compareProducts.reduce((best, current) =>
                          Number.parseFloat(calculateROI(current)) > Number.parseFloat(calculateROI(best))
                            ? current
                            : best,
                        ).name
                      }
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium text-blue-700 text-sm">Mayor Potencial</div>
                    <div className="text-sm text-muted-foreground">
                      {compareProducts.find((p) => p.stock === getBestValue("stock"))?.name}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="font-medium text-purple-700 text-sm">Más Popular</div>
                    <div className="text-sm text-muted-foreground">
                      {compareProducts.find((p) => p.rating === getBestValue("rating"))?.name}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
