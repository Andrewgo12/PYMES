"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  TrendingUp,
  TrendingDown,
  Target,
  Maximize2,
  Download,
  Share2,
  RefreshCw,
  Filter,
  Zap,
} from "lucide-react"
import { useState } from "react"

interface ReportVisualizationModalProps {
  isOpen: boolean
  onClose: () => void
  report?: any
}

function ReportVisualizationModal({ isOpen, onClose, report }: ReportVisualizationModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedChart, setSelectedChart] = useState("bar")
  const [drillDownLevel, setDrillDownLevel] = useState(0)
  const [isRealTime, setIsRealTime] = useState(true)

  if (!report) return null

  const drillDownPath = ["Vista General", "Por Categoría", "Por Producto", "Por Cliente"]

  const chartData = {
    sales: [
      { name: "Ene", value: 45000, growth: 12.5 },
      { name: "Feb", value: 52000, growth: 15.6 },
      { name: "Mar", value: 48000, growth: -7.7 },
      { name: "Abr", value: 61000, growth: 27.1 },
      { name: "May", value: 58000, growth: -4.9 },
      { name: "Jun", value: 67000, growth: 15.5 },
    ],
    categories: [
      { name: "Electrónicos", value: 35, color: "#3b82f6" },
      { name: "Ropa", value: 25, color: "#10b981" },
      { name: "Hogar", value: 20, color: "#f59e0b" },
      { name: "Deportes", value: 15, color: "#ef4444" },
      { name: "Otros", value: 5, color: "#8b5cf6" },
    ],
    metrics: [
      { label: "Ingresos Totales", value: "€234,567", change: 12.5, trend: "up" },
      { label: "Pedidos", value: "1,234", change: 8.3, trend: "up" },
      { label: "Ticket Promedio", value: "€190.15", change: -2.1, trend: "down" },
      { label: "Conversión", value: "3.45%", change: 0.8, trend: "up" },
    ],
  }

  const insights = [
    {
      type: "positive",
      title: "Crecimiento Excepcional",
      description: "Las ventas de electrónicos han crecido un 27% este mes",
      impact: "Alto",
      action: "Aumentar inventario de productos estrella",
    },
    {
      type: "warning",
      title: "Tendencia Descendente",
      description: "El ticket promedio ha disminuido en las últimas 3 semanas",
      impact: "Medio",
      action: "Implementar estrategias de upselling",
    },
    {
      type: "info",
      title: "Oportunidad Detectada",
      description: "Los clientes nuevos representan el 45% de las ventas",
      impact: "Medio",
      action: "Crear programa de fidelización",
    },
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-green-500 bg-green-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      case "info":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "warning":
        return <TrendingDown className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Target className="h-4 w-4 text-blue-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {report.name} - Dashboard Interactivo
            {isRealTime && (
              <Badge variant="outline" className="bg-green-500 text-white">
                <Zap className="h-3 w-3 mr-1" />
                Tiempo Real
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>Visualización avanzada con drill-down y analytics predictivo</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mes</SelectItem>
                  <SelectItem value="quarter">Este Trimestre</SelectItem>
                  <SelectItem value="year">Este Año</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChart} onValueChange={setSelectedChart}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Gráfico de Barras</SelectItem>
                  <SelectItem value="line">Gráfico de Líneas</SelectItem>
                  <SelectItem value="pie">Gráfico Circular</SelectItem>
                  <SelectItem value="table">Tabla</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Pantalla Completa
              </Button>
            </div>
          </div>

          {/* Breadcrumb de Drill-Down */}
          {drillDownLevel > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Navegación:</span>
              {drillDownPath.slice(0, drillDownLevel + 1).map((level, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setDrillDownLevel(index)}
                  >
                    {level}
                  </Button>
                  {index < drillDownLevel && <span className="text-muted-foreground">/</span>}
                </div>
              ))}
            </div>
          )}

          {/* Métricas Principales */}
          <div className="grid gap-4 md:grid-cols-4">
            {chartData.metrics.map((metric, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        metric.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Gráfico Principal */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>Tendencia de Ventas</span>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <LineChart className="h-4 w-4" />
                      <PieChart className="h-4 w-4" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Gráfico Interactivo -{" "}
                        {selectedChart === "bar" ? "Barras" : selectedChart === "line" ? "Líneas" : "Circular"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Datos actualizados en tiempo real cada 30 segundos
                      </p>
                      <Button
                        className="mt-4"
                        size="sm"
                        onClick={() => setDrillDownLevel(Math.min(drillDownLevel + 1, drillDownPath.length - 1))}
                        disabled={drillDownLevel >= drillDownPath.length - 1}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Drill Down
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Distribución por Categorías */}
            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Distribución por Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{category.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* IA Insights */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Insights de IA - Analytics Predictivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getInsightColor(insight.type)}`}>
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            Impacto: {insight.impact}
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <strong>Acción:</strong> {insight.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Datos Detallados */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Table className="h-4 w-4" />
                Datos Detallados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-3 font-medium">Período</th>
                      <th className="text-right p-3 font-medium">Ventas</th>
                      <th className="text-right p-3 font-medium">Pedidos</th>
                      <th className="text-right p-3 font-medium">Ticket Promedio</th>
                      <th className="text-right p-3 font-medium">Crecimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.sales.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3 font-medium">{item.name} 2024</td>
                        <td className="p-3 text-right font-semibold">€{item.value.toLocaleString()}</td>
                        <td className="p-3 text-right">{Math.round(item.value / 190)}</td>
                        <td className="p-3 text-right">€190.15</td>
                        <td className="p-3 text-right">
                          <span className={`font-medium ${item.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {item.growth > 0 ? "+" : ""}
                            {item.growth}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ReportVisualizationModal }
