"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Calendar } from "lucide-react"

interface DashboardMetricsModalProps {
  isOpen: boolean
  onClose: () => void
  data: any[]
}

export function DashboardMetricsModal({ isOpen, onClose, data }: DashboardMetricsModalProps) {
  const periods = ["Hoy", "Esta Semana", "Este Mes", "Este Año"]
  const chartTypes = ["Líneas", "Barras", "Circular", "Área"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Métricas Avanzadas
          </DialogTitle>
          <DialogDescription>Análisis detallado de métricas con comparativas y tendencias</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controles de Período */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Período:</span>
            <div className="flex gap-1">
              {periods.map((period) => (
                <Button key={period} variant="outline" size="sm">
                  {period}
                </Button>
              ))}
            </div>
          </div>

          {/* Métricas Detalladas */}
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((metric) => (
              <Card key={metric.id} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    {metric.title}
                    <metric.icon className="h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold">{metric.realTimeValue}</div>
                    <div className="flex items-center gap-2">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Objetivo mensual:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Promedio industria:</span>
                        <span className="font-medium">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mejor día:</span>
                        <span className="font-medium text-green-500">+34%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tipos de Gráfico */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Visualización</h3>
            <div className="flex gap-2">
              {chartTypes.map((type) => (
                <Button key={type} variant="outline" size="sm">
                  {type === "Líneas" && <LineChart className="h-4 w-4 mr-2" />}
                  {type === "Barras" && <BarChart3 className="h-4 w-4 mr-2" />}
                  {type === "Circular" && <PieChart className="h-4 w-4 mr-2" />}
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Área de Gráfico Simulada */}
          <Card className="bg-muted/20 border-dashed border-2 border-muted">
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Gráfico interactivo se mostraría aquí</p>
              <p className="text-xs text-muted-foreground mt-2">
                Integración con librerías de gráficos como Chart.js o D3.js
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
