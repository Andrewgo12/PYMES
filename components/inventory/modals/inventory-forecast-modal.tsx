"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, Brain, Target, AlertTriangle, Calendar, Zap } from "lucide-react"
import { useState } from "react"

interface InventoryForecastModalProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
}

export function InventoryForecastModal({ isOpen, onClose, items }: InventoryForecastModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const forecasts = [
    {
      id: 1,
      product: "Laptop Dell XPS 13",
      sku: "DELL-XPS13-001",
      currentStock: 45,
      predictedDemand: 68,
      recommendedOrder: 35,
      stockoutRisk: "bajo",
      confidence: 92,
      trend: "creciente",
      seasonality: "alta",
      leadTime: 7,
      reorderPoint: 15,
      safetyStock: 10,
      forecastAccuracy: 89,
    },
    {
      id: 2,
      product: "Mouse Inalámbrico Logitech",
      sku: "LOG-MX3-002",
      currentStock: 8,
      predictedDemand: 45,
      recommendedOrder: 60,
      stockoutRisk: "alto",
      confidence: 87,
      trend: "estable",
      seasonality: "media",
      leadTime: 3,
      reorderPoint: 20,
      safetyStock: 15,
      forecastAccuracy: 94,
    },
    {
      id: 3,
      product: "Monitor 4K Samsung",
      sku: "SAM-4K27-003",
      currentStock: 0,
      predictedDemand: 25,
      recommendedOrder: 40,
      stockoutRisk: "critico",
      confidence: 85,
      trend: "creciente",
      seasonality: "baja",
      leadTime: 10,
      reorderPoint: 5,
      safetyStock: 8,
      forecastAccuracy: 91,
    },
    {
      id: 4,
      product: "Teclado Mecánico",
      sku: "KBD-MECH-001",
      quantity: 25,
      currentStock: 25,
      predictedDemand: 15,
      recommendedOrder: 0,
      stockoutRisk: "bajo",
      confidence: 78,
      trend: "decreciente",
      seasonality: "baja",
      leadTime: 5,
      reorderPoint: 12,
      safetyStock: 5,
      forecastAccuracy: 82,
    },
  ]

  const mlInsights = [
    {
      type: "demanda_estacional",
      title: "Pico de Demanda Detectado",
      description: "Se prevé un aumento del 35% en la demanda de laptops durante las próximas 3 semanas",
      impact: "alto",
      confidence: 91,
      recommendation: "Incrementar pedidos de laptops en 40 unidades",
    },
    {
      type: "patron_compra",
      title: "Patrón de Compra Identificado",
      description: "Los clientes que compran monitores tienden a comprar también teclados mecánicos",
      impact: "medio",
      confidence: 84,
      recommendation: "Mantener stock balanceado de monitores y teclados",
    },
    {
      type: "optimizacion_stock",
      title: "Oportunidad de Optimización",
      description: "Reducir stock de accesorios básicos puede liberar $15,000 en capital de trabajo",
      impact: "medio",
      confidence: 88,
      recommendation: "Reducir pedidos de accesorios básicos en 20%",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critico":
        return "text-red-600 bg-red-50"
      case "alto":
        return "text-orange-600 bg-orange-50"
      case "medio":
        return "text-yellow-600 bg-yellow-50"
      case "bajo":
        return "text-green-600 bg-green-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "creciente":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "decreciente":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "estable":
        return <BarChart3 className="h-4 w-4 text-blue-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "alto":
        return "text-red-600 bg-red-50"
      case "medio":
        return "text-yellow-600 bg-yellow-50"
      case "bajo":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const filteredForecasts = forecasts.filter((forecast) =>
    selectedCategory === "all" ? true : forecast.product.toLowerCase().includes(selectedCategory.toLowerCase()),
  )

  const totalRecommendedOrders = forecasts.reduce((sum, f) => sum + f.recommendedOrder, 0)
  const highRiskItems = forecasts.filter((f) => f.stockoutRisk === "alto" || f.stockoutRisk === "critico").length
  const averageAccuracy = forecasts.reduce((sum, f) => sum + f.forecastAccuracy, 0) / forecasts.length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Predicciones de Inventario con IA
          </DialogTitle>
          <DialogDescription>
            Análisis predictivo avanzado con Machine Learning para optimización de stock
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Métricas principales */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pedidos Recomendados</p>
                    <p className="text-2xl font-bold text-blue-600">{totalRecommendedOrders}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Alto Riesgo</p>
                    <p className="text-2xl font-bold text-red-600">{highRiskItems}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Precisión Promedio</p>
                    <p className="text-2xl font-bold text-green-600">{averageAccuracy.toFixed(1)}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Insights IA</p>
                    <p className="text-2xl font-bold text-purple-600">{mlInsights.length}</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 días</SelectItem>
                  <SelectItem value="30">30 días</SelectItem>
                  <SelectItem value="60">60 días</SelectItem>
                  <SelectItem value="90">90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="laptop">Laptops</SelectItem>
                <SelectItem value="mouse">Accesorios</SelectItem>
                <SelectItem value="monitor">Monitores</SelectItem>
                <SelectItem value="teclado">Teclados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="forecasts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="forecasts">Predicciones</TabsTrigger>
              <TabsTrigger value="insights">Insights IA</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
              <TabsTrigger value="accuracy">Precisión del Modelo</TabsTrigger>
            </TabsList>

            <TabsContent value="forecasts" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Predicciones de Demanda - Próximos {selectedPeriod} días</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredForecasts.map((forecast) => (
                      <div key={forecast.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getTrendIcon(forecast.trend)}
                              <Badge className={`${getRiskColor(forecast.stockoutRisk)} border-0`}>
                                {forecast.stockoutRisk}
                              </Badge>
                            </div>
                            <div>
                              <div className="font-medium">{forecast.product}</div>
                              <div className="text-sm text-muted-foreground">{forecast.sku}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Estacionalidad: {forecast.seasonality} | Lead Time: {forecast.leadTime} días
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-semibold">{forecast.currentStock}</div>
                              <div className="text-xs text-muted-foreground">Stock Actual</div>
                            </div>

                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{forecast.predictedDemand}</div>
                              <div className="text-xs text-muted-foreground">Demanda Prevista</div>
                            </div>

                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-600">{forecast.recommendedOrder}</div>
                              <div className="text-xs text-muted-foreground">Pedido Recomendado</div>
                            </div>

                            <div className="text-center">
                              <div className={`text-lg font-semibold ${getConfidenceColor(forecast.confidence)}`}>
                                {forecast.confidence}%
                              </div>
                              <div className="text-xs text-muted-foreground">Confianza</div>
                            </div>

                            <div className="text-right">
                              <Button size="sm" className="mb-1">
                                Generar Pedido
                              </Button>
                              <div className="text-xs text-muted-foreground">
                                Punto reorden: {forecast.reorderPoint}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Stock de Seguridad:</span>
                              <span className="font-medium ml-2">{forecast.safetyStock} unidades</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Precisión Histórica:</span>
                              <span className="font-medium ml-2">{forecast.forecastAccuracy}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tendencia:</span>
                              <span className="font-medium ml-2 capitalize">{forecast.trend}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Insights de Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mlInsights.map((insight, index) => (
                      <div key={index} className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Zap className="h-6 w-6 text-purple-500 mt-1" />
                            <div>
                              <div className="font-medium text-purple-700">{insight.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{insight.description}</div>
                              <div className="text-sm text-blue-600 font-medium mt-2">{insight.recommendation}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <Badge className={`${getImpactColor(insight.impact)} border-0`}>{insight.impact}</Badge>
                              <div className="text-xs text-muted-foreground mt-1">Impacto</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-semibold ${getConfidenceColor(insight.confidence)}`}>
                                {insight.confidence}%
                              </div>
                              <div className="text-xs text-muted-foreground">Confianza</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Acciones Inmediatas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {forecasts
                        .filter((f) => f.stockoutRisk === "critico" || f.stockoutRisk === "alto")
                        .map((forecast) => (
                          <div key={forecast.id} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-red-700">{forecast.product}</div>
                                <div className="text-sm text-muted-foreground">
                                  Riesgo: {forecast.stockoutRisk} | Stock: {forecast.currentStock}
                                </div>
                              </div>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                Pedir {forecast.recommendedOrder}
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-sm">Optimizaciones Sugeridas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="font-medium text-green-700">Reducir Stock Excesivo</div>
                        <div className="text-sm text-muted-foreground">
                          Liberar $12,500 en capital reduciendo stock de productos de baja rotación
                        </div>
                        <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                          Ver Detalles
                        </Button>
                      </div>

                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="font-medium text-blue-700">Mejorar Rotación</div>
                        <div className="text-sm text-muted-foreground">
                          Reorganizar ubicaciones puede mejorar rotación en 15%
                        </div>
                        <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                          Aplicar
                        </Button>
                      </div>

                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="font-medium text-purple-700">Automatizar Pedidos</div>
                        <div className="text-sm text-muted-foreground">
                          Configurar pedidos automáticos para 8 productos de alta rotación
                        </div>
                        <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                          Configurar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="accuracy" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Precisión del Modelo de IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecasts.map((forecast) => (
                      <div key={forecast.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{forecast.product}</div>
                            <div className="text-sm text-muted-foreground">{forecast.sku}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className={`text-lg font-semibold ${getConfidenceColor(forecast.forecastAccuracy)}`}>
                              {forecast.forecastAccuracy}%
                            </div>
                            <div className="text-xs text-muted-foreground">Precisión Histórica</div>
                          </div>

                          <div className="text-center">
                            <div className={`text-lg font-semibold ${getConfidenceColor(forecast.confidence)}`}>
                              {forecast.confidence}%
                            </div>
                            <div className="text-xs text-muted-foreground">Confianza Actual</div>
                          </div>

                          <div className="w-32">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                style={{ width: `${forecast.forecastAccuracy}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-700">Rendimiento del Modelo</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Precisión Promedio:</span>
                        <span className="font-medium ml-2 text-green-600">{averageAccuracy.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Datos Entrenamiento:</span>
                        <span className="font-medium ml-2">24 meses</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Última Actualización:</span>
                        <span className="font-medium ml-2">Hace 2 horas</span>
                      </div>
                    </div>
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
