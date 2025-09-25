"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  RefreshCw,
  Settings,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useState } from "react"

interface ReportAIInsightsModalProps {
  isOpen: boolean
  onClose: () => void
}

function ReportAIInsightsModal({ isOpen, onClose }: ReportAIInsightsModalProps) {
  const [selectedModel, setSelectedModel] = useState("advanced")
  const [analysisType, setAnalysisType] = useState("comprehensive")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const insights = [
    {
      id: 1,
      type: "trend",
      priority: "high",
      title: "Crecimiento Acelerado en Electrónicos",
      description:
        "Las ventas de productos electrónicos han mostrado un crecimiento del 34% en las últimas 4 semanas, superando las proyecciones en un 12%.",
      confidence: 94,
      impact: "Incremento potencial de €45,000 en ingresos mensuales",
      recommendation: "Aumentar inventario de productos electrónicos estrella y considerar expandir la categoría",
      dataPoints: ["Ventas", "Inventario", "Tendencias de mercado"],
      timeframe: "Últimas 4 semanas",
      category: "Ventas",
      rating: 4.8,
      feedback: { positive: 12, negative: 1 },
    },
    {
      id: 2,
      type: "anomaly",
      priority: "medium",
      title: "Patrón Inusual en Devoluciones",
      description:
        "Se detectó un aumento del 23% en devoluciones de productos de la categoría 'Hogar' durante los fines de semana.",
      confidence: 87,
      impact: "Posible pérdida de €8,500 si no se aborda",
      recommendation: "Revisar calidad de productos de hogar y mejorar descripciones en línea",
      dataPoints: ["Devoluciones", "Categorías", "Patrones temporales"],
      timeframe: "Últimas 6 semanas",
      category: "Calidad",
      rating: 4.2,
      feedback: { positive: 8, negative: 2 },
    },
    {
      id: 3,
      type: "opportunity",
      priority: "high",
      title: "Oportunidad de Cross-selling",
      description:
        "Los clientes que compran productos deportivos tienen un 67% de probabilidad de comprar accesorios complementarios en los siguientes 30 días.",
      confidence: 91,
      impact: "Incremento potencial del 18% en ticket promedio",
      recommendation: "Implementar recomendaciones automáticas de accesorios deportivos en el checkout",
      dataPoints: ["Comportamiento de compra", "Correlaciones", "Patrones temporales"],
      timeframe: "Análisis de 3 meses",
      category: "Marketing",
      rating: 4.6,
      feedback: { positive: 15, negative: 0 },
    },
    {
      id: 4,
      type: "prediction",
      priority: "medium",
      title: "Predicción de Demanda Estacional",
      description:
        "Se prevé un aumento del 28% en la demanda de productos de jardinería en las próximas 3 semanas debido a patrones estacionales.",
      confidence: 89,
      impact: "Oportunidad de €12,000 en ventas adicionales",
      recommendation: "Preparar stock adicional de productos de jardinería y planificar campaña de marketing",
      dataPoints: ["Datos históricos", "Estacionalidad", "Tendencias climáticas"],
      timeframe: "Próximas 3 semanas",
      category: "Inventario",
      rating: 4.4,
      feedback: { positive: 10, negative: 1 },
    },
    {
      id: 5,
      type: "risk",
      priority: "high",
      title: "Riesgo de Agotamiento de Stock",
      description:
        "5 productos clave tienen riesgo alto de agotarse en los próximos 7 días basado en la velocidad de venta actual.",
      confidence: 96,
      impact: "Posible pérdida de €22,000 en ventas",
      recommendation: "Realizar pedidos urgentes a proveedores y activar alertas de stock bajo",
      dataPoints: ["Niveles de inventario", "Velocidad de venta", "Tiempos de reposición"],
      timeframe: "Próximos 7 días",
      category: "Inventario",
      rating: 4.9,
      feedback: { positive: 18, negative: 0 },
    },
  ]

  const models = [
    { id: "basic", name: "Básico", description: "Análisis rápido con insights fundamentales" },
    { id: "advanced", name: "Avanzado", description: "Análisis profundo con ML y predicciones" },
    { id: "expert", name: "Experto", description: "Análisis completo con deep learning" },
  ]

  const analysisTypes = [
    { id: "comprehensive", name: "Análisis Integral", description: "Todos los aspectos del negocio" },
    { id: "sales", name: "Enfoque en Ventas", description: "Optimización de ingresos" },
    { id: "inventory", name: "Enfoque en Inventario", description: "Gestión de stock" },
    { id: "customer", name: "Enfoque en Cliente", description: "Comportamiento y satisfacción" },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case "anomaly":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "opportunity":
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      case "prediction":
        return <Target className="h-5 w-5 text-purple-500" />
      case "risk":
        return <TrendingDown className="h-5 w-5 text-red-500" />
      default:
        return <Brain className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return "Normal"
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return 100
        }
        return prev + 8
      })
    }, 300)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            IA Insights - Analytics Predictivo
          </DialogTitle>
          <DialogDescription>Análisis inteligente con machine learning y predicciones avanzadas</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="insights" className="space-y-4">
          <TabsList>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="configure">Configurar</TabsTrigger>
            <TabsTrigger value="models">Modelos IA</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            {/* Controles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? "animate-spin" : ""}`} />
                {isAnalyzing ? "Analizando..." : "Nuevo Análisis"}
              </Button>
            </div>

            {/* Progreso de Análisis */}
            {isAnalyzing && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Ejecutando análisis de IA...</span>
                      <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Procesando datos con modelo {models.find((m) => m.id === selectedModel)?.name}...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resumen de Insights */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">{insights.length}</div>
                      <div className="text-sm text-muted-foreground">Insights Totales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-2xl font-bold">{insights.filter((i) => i.priority === "high").length}</div>
                      <div className="text-sm text-muted-foreground">Prioridad Alta</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-sm text-muted-foreground">Confianza Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">€87K</div>
                      <div className="text-sm text-muted-foreground">Impacto Potencial</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Insights */}
            <div className="space-y-4">
              {insights.map((insight) => (
                <Card key={insight.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getInsightIcon(insight.type)}
                          <div>
                            <h3 className="font-semibold text-lg">{insight.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`${getPriorityColor(insight.priority)} text-white`}>
                                {getPriorityText(insight.priority)}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {insight.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Confianza: {insight.confidence}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {insight.rating}
                          </div>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-muted-foreground">{insight.description}</p>

                      {/* Métricas */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Impacto Estimado</div>
                          <div className="font-semibold text-green-600">{insight.impact}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Marco Temporal</div>
                          <div className="font-medium">{insight.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Fuentes de Datos</div>
                          <div className="flex gap-1">
                            {insight.dataPoints.slice(0, 2).map((point, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {point}
                              </Badge>
                            ))}
                            {insight.dataPoints.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{insight.dataPoints.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Recomendación */}
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-blue-900">Recomendación</div>
                            <div className="text-sm text-blue-800">{insight.recommendation}</div>
                          </div>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>¿Te resultó útil este insight?</span>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {insight.feedback.positive}
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              {insight.feedback.negative}
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                          <Button size="sm">Aplicar Recomendación</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configure" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Configuración de Análisis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Modelo de IA</h4>
                      <div className="space-y-3">
                        {models.map((model) => (
                          <div
                            key={model.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedModel === model.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-border hover:border-blue-300"
                            }`}
                            onClick={() => setSelectedModel(model.id)}
                          >
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-muted-foreground">{model.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Tipo de Análisis</h4>
                      <div className="space-y-3">
                        {analysisTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              analysisType === type.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-border hover:border-blue-300"
                            }`}
                            onClick={() => setAnalysisType(type.id)}
                          >
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-muted-foreground">{type.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Predicción de Ventas",
                  description: "Modelo LSTM para forecasting de ventas",
                  accuracy: "94.2%",
                  status: "Activo",
                  lastTrained: "2024-01-10",
                },
                {
                  name: "Detección de Anomalías",
                  description: "Isolation Forest para detectar patrones inusuales",
                  accuracy: "91.8%",
                  status: "Activo",
                  lastTrained: "2024-01-12",
                },
                {
                  name: "Segmentación de Clientes",
                  description: "K-means clustering para análisis de clientes",
                  accuracy: "88.5%",
                  status: "Entrenando",
                  lastTrained: "2024-01-08",
                },
              ].map((model, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">{model.name}</h4>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Precisión:</span>
                          <span className="font-medium text-green-600">{model.accuracy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estado:</span>
                          <Badge variant={model.status === "Activo" ? "default" : "secondary"}>{model.status}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Último Entrenamiento:</span>
                          <span className="font-medium">{model.lastTrained}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export { ReportAIInsightsModal }
