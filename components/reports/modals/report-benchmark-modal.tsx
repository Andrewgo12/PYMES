"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Award,
  AlertCircle,
  CheckCircle,
  Building,
  Users,
  DollarSign,
  Package,
  Zap,
} from "lucide-react"
import { useState } from "react"

interface ReportBenchmarkModalProps {
  isOpen: boolean
  onClose: () => void
}

function ReportBenchmarkModal({ isOpen, onClose }: ReportBenchmarkModalProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("retail")
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedPeriod, setSelectedPeriod] = useState("quarter")

  const benchmarkData = {
    overall: {
      score: 78,
      rank: "Top 25%",
      improvement: "+12%",
      trend: "up",
    },
    categories: [
      {
        name: "Ventas",
        score: 85,
        industry: 72,
        percentile: 82,
        trend: "up",
        improvement: "+8%",
        status: "excellent",
      },
      {
        name: "Inventario",
        score: 71,
        industry: 68,
        percentile: 65,
        trend: "up",
        improvement: "+5%",
        status: "good",
      },
      {
        name: "Rentabilidad",
        score: 79,
        industry: 75,
        percentile: 71,
        trend: "up",
        improvement: "+15%",
        status: "good",
      },
      {
        name: "Eficiencia",
        score: 66,
        industry: 70,
        percentile: 45,
        trend: "down",
        improvement: "-3%",
        status: "needs_improvement",
      },
      {
        name: "Satisfacción Cliente",
        score: 88,
        industry: 81,
        percentile: 89,
        trend: "up",
        improvement: "+6%",
        status: "excellent",
      },
    ],
    competitors: [
      {
        name: "Competidor A",
        score: 82,
        position: "Líder",
        strengths: ["Ventas", "Marketing"],
        weaknesses: ["Inventario"],
      },
      {
        name: "Competidor B",
        score: 75,
        position: "Seguidor",
        strengths: ["Eficiencia", "Costos"],
        weaknesses: ["Satisfacción"],
      },
      {
        name: "Tu Empresa",
        score: 78,
        position: "Retador",
        strengths: ["Satisfacción", "Ventas"],
        weaknesses: ["Eficiencia"],
      },
      {
        name: "Competidor C",
        score: 69,
        position: "Nicho",
        strengths: ["Inventario"],
        weaknesses: ["Ventas", "Rentabilidad"],
      },
    ],
    insights: [
      {
        type: "strength",
        title: "Liderazgo en Satisfacción del Cliente",
        description: "Tu empresa supera el promedio de la industria en un 8.6% en satisfacción del cliente",
        recommendation: "Capitalizar esta fortaleza para diferenciación competitiva",
      },
      {
        type: "opportunity",
        title: "Oportunidad en Eficiencia Operativa",
        description: "Hay un gap del 5.7% por debajo del promedio de la industria en eficiencia",
        recommendation: "Implementar automatización y optimizar procesos operativos",
      },
      {
        type: "threat",
        title: "Competidor A Ganando Terreno",
        description: "El líder del mercado ha mejorado su score en un 18% en el último trimestre",
        recommendation: "Acelerar iniciativas de crecimiento y diferenciación",
      },
    ],
  }

  const industries = [
    { id: "retail", name: "Retail/Comercio" },
    { id: "manufacturing", name: "Manufactura" },
    { id: "services", name: "Servicios" },
    { id: "technology", name: "Tecnología" },
  ]

  const companySizes = [
    { id: "small", name: "Pequeña (1-50 empleados)" },
    { id: "medium", name: "Mediana (51-250 empleados)" },
    { id: "large", name: "Grande (250+ empleados)" },
  ]

  const periods = [
    { id: "month", name: "Último Mes" },
    { id: "quarter", name: "Último Trimestre" },
    { id: "year", name: "Último Año" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100"
      case "good":
        return "text-blue-600 bg-blue-100"
      case "needs_improvement":
        return "text-yellow-600 bg-yellow-100"
      case "poor":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "Excelente"
      case "good":
        return "Bueno"
      case "needs_improvement":
        return "Mejorar"
      case "poor":
        return "Crítico"
      default:
        return "Normal"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "strength":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "opportunity":
        return <Target className="h-5 w-5 text-blue-500" />
      case "threat":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <BarChart3 className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Benchmark Competitivo
          </DialogTitle>
          <DialogDescription>Compara tu rendimiento con la industria y competidores directos</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="categories">Por Categorías</TabsTrigger>
            <TabsTrigger value="competitors">Competidores</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Controles */}
            <div className="flex items-center gap-4">
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((size) => (
                    <SelectItem key={size.id} value={size.id}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Score General */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">{benchmarkData.overall.score}</div>
                    <div className="text-blue-100">Score General</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {benchmarkData.overall.rank}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm">
                        {benchmarkData.overall.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {benchmarkData.overall.improvement}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Award className="h-16 w-16 text-white/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Métricas Clave */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">85</div>
                      <div className="text-sm text-muted-foreground">Ventas</div>
                      <div className="text-xs text-green-600">vs 72 industria</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold">71</div>
                      <div className="text-sm text-muted-foreground">Inventario</div>
                      <div className="text-xs text-blue-600">vs 68 industria</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">66</div>
                      <div className="text-sm text-muted-foreground">Eficiencia</div>
                      <div className="text-xs text-red-600">vs 70 industria</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold">88</div>
                      <div className="text-sm text-muted-foreground">Satisfacción</div>
                      <div className="text-xs text-green-600">vs 81 industria</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Radar */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Comparativa por Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Gráfico de Radar Comparativo</p>
                    <p className="text-sm text-muted-foreground mt-2">Tu empresa vs Promedio de la industria</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4">
              {benchmarkData.categories.map((category, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <Badge className={getStatusColor(category.status)}>{getStatusText(category.status)}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {category.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={category.trend === "up" ? "text-green-600" : "text-red-600"}>
                          {category.improvement}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Tu Score</div>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold">{category.score}</div>
                          <div className="flex-1">
                            <Progress value={category.score} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Promedio Industria</div>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold text-muted-foreground">{category.industry}</div>
                          <div className="flex-1">
                            <Progress value={category.industry} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Percentil</div>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold text-blue-600">{category.percentile}</div>
                          <div className="text-sm text-muted-foreground">percentil</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg bg-muted/50">
                      <div className="text-sm">
                        <strong>Análisis:</strong> Tu empresa está{" "}
                        {category.score > category.industry ? "por encima" : "por debajo"} del promedio de la industria
                        en {category.name.toLowerCase()}.{" "}
                        {category.score > category.industry
                          ? "Esta es una fortaleza competitiva."
                          : "Hay oportunidad de mejora."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Posicionamiento Competitivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benchmarkData.competitors.map((competitor, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        competitor.name === "Tu Empresa" ? "border-blue-500 bg-blue-50" : "border-border bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            <h4 className="font-semibold">{competitor.name}</h4>
                          </div>
                          <Badge variant="outline">{competitor.position}</Badge>
                        </div>
                        <div className="text-2xl font-bold">{competitor.score}</div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Fortalezas</div>
                          <div className="flex gap-1">
                            {competitor.strengths.map((strength, sIndex) => (
                              <Badge key={sIndex} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Debilidades</div>
                          <div className="flex gap-1">
                            {competitor.weaknesses.map((weakness, wIndex) => (
                              <Badge key={wIndex} variant="secondary" className="text-xs bg-red-100 text-red-800">
                                {weakness}
                              </Badge>
                            ))}
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
            <div className="space-y-4">
              {benchmarkData.insights.map((insight, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                          <div className="text-sm">
                            <strong>Recomendación:</strong> {insight.recommendation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Plan de Acción Recomendado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      priority: "Alta",
                      action: "Mejorar eficiencia operativa",
                      timeline: "3 meses",
                      impact: "Medio-Alto",
                    },
                    {
                      priority: "Media",
                      action: "Capitalizar liderazgo en satisfacción",
                      timeline: "1 mes",
                      impact: "Alto",
                    },
                    {
                      priority: "Media",
                      action: "Monitorear competidor líder",
                      timeline: "Continuo",
                      impact: "Medio",
                    },
                  ].map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className={
                            action.priority === "Alta" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {action.priority}
                        </Badge>
                        <div>
                          <div className="font-medium">{action.action}</div>
                          <div className="text-sm text-muted-foreground">
                            Timeline: {action.timeline} • Impacto: {action.impact}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
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

export { ReportBenchmarkModal }
