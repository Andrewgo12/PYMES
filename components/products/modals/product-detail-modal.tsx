"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, DollarSign, Star, QrCode, Edit, Copy, Share, TrendingUp, BarChart3 } from "lucide-react"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  if (!product) return null

  const specifications = [
    { label: "Marca", value: product.supplier },
    { label: "Modelo", value: product.name },
    { label: "SKU", value: product.sku },
    { label: "Código de Barras", value: product.barcode },
    { label: "Peso", value: "0.5 kg" },
    { label: "Dimensiones", value: "15 x 7 x 1 cm" },
    { label: "Garantía", value: "12 meses" },
    { label: "País de Origen", value: "Estados Unidos" },
  ]

  const salesData = [
    { period: "Última semana", sales: 23, revenue: "$22,977" },
    { period: "Último mes", sales: 89, revenue: "$93,441" },
    { period: "Últimos 3 meses", sales: 234, revenue: "$245,766" },
    { period: "Este año", sales: 567, revenue: "$595,233" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalle del Producto
          </DialogTitle>
          <DialogDescription>Información completa y análisis del producto</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header del Producto */}
          <div className="flex gap-6">
            <div className="w-64 h-64 bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="text-muted-foreground">{product.supplier}</p>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">(156 reseñas)</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-2xl font-bold text-green-600">${product.dynamicPrice}</div>
                        <div className="text-sm text-muted-foreground">Precio Dinámico</div>
                        {product.dynamicPrice !== product.price && (
                          <div className="text-xs text-muted-foreground line-through">
                            Precio base: ${product.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-2xl font-bold">{product.stock}</div>
                        <div className="text-sm text-muted-foreground">Unidades en Stock</div>
                        <div className="text-xs text-muted-foreground">
                          Estado:{" "}
                          {product.status === "active"
                            ? "Activo"
                            : product.status === "low_stock"
                              ? "Stock Bajo"
                              : "Agotado"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Producto
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  Código QR
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs de Información */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="variants">Variantes</TabsTrigger>
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Información General</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SKU:</span>
                      <span className="font-mono">{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Código de Barras:</span>
                      <span className="font-mono">{product.barcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Proveedor:</span>
                      <span>{product.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última Actualización:</span>
                      <span>{product.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Métricas de Rendimiento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ventas Totales:</span>
                      <span className="font-semibold">{product.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ingresos Generados:</span>
                      <span className="font-semibold text-green-600">
                        ${(product.sales * product.dynamicPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rotación de Inventario:</span>
                      <span className="font-semibold">8.5x/año</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Margen de Ganancia:</span>
                      <span className="font-semibold text-green-600">35%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="variants" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Variantes de Almacenamiento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {product.variants.map((variant: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{variant}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Stock: {Math.floor(Math.random() * 50) + 10}</Badge>
                            <span className="text-sm font-semibold text-green-600">
                              ${(product.dynamicPrice + index * 100).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Variantes de Color</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {product.colors.map((color: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-400" />
                            <span className="font-medium">{color}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Stock: {Math.floor(Math.random() * 30) + 5}</Badge>
                            <span className="text-sm text-muted-foreground">Disponible</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="grid gap-4">
                {salesData.map((data, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                          <div>
                            <div className="font-semibold">{data.period}</div>
                            <div className="text-sm text-muted-foreground">{data.sales} unidades vendidas</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{data.revenue}</div>
                          <div className="text-sm text-muted-foreground">Ingresos</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Especificaciones Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between p-2 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{spec.label}:</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Análisis de Tendencias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tendencia de Ventas:</span>
                      <span className="font-semibold text-green-600">↗ +15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Demanda Estacional:</span>
                      <span className="font-semibold">Alta</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Competitividad:</span>
                      <span className="font-semibold text-yellow-600">Media</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Predicción 30 días:</span>
                      <span className="font-semibold text-green-600">+23%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Métricas Avanzadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tiempo Promedio en Stock:</span>
                      <span className="font-semibold">45 días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa de Conversión:</span>
                      <span className="font-semibold">12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor de Vida del Cliente:</span>
                      <span className="font-semibold">$2,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROI del Producto:</span>
                      <span className="font-semibold text-green-600">185%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
