"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Download,
  Share2,
  Calendar,
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Settings,
  Brain,
  Target,
  Users,
  DollarSign,
  Package,
  Clock,
  Zap,
  Database,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReportBuilderModal } from "./modals/report-builder-modal"
import { ReportSchedulerModal } from "./modals/report-scheduler-modal"
import { ReportVisualizationModal } from "./modals/report-visualization-modal"
import { ReportExportModal } from "./modals/report-export-modal"
import { ReportAIInsightsModal } from "./modals/report-ai-insights-modal"
import { ReportBenchmarkModal } from "./modals/report-benchmark-modal"
import { ReportShareModal } from "./modals/report-share-modal"
import { ReportDataSourcesModal } from "./modals/report-data-sources-modal"

const reports = [
  {
    id: 1,
    name: "Ventas Mensuales",
    type: "sales",
    category: "Ventas",
    status: "active",
    lastRun: "2024-01-15 14:30",
    nextRun: "2024-01-16 09:00",
    frequency: "Diario",
    format: "PDF",
    recipients: 5,
    views: 234,
    size: "2.4 MB",
    accuracy: 98.5,
    insights: 12,
    drillDowns: 3,
    realTime: true,
    predictive: true,
  },
  {
    id: 2,
    name: "Inventario Crítico",
    type: "inventory",
    category: "Inventario",
    status: "scheduled",
    lastRun: "2024-01-14 08:00",
    nextRun: "2024-01-15 08:00",
    frequency: "Diario",
    format: "Excel",
    recipients: 3,
    views: 156,
    size: "1.8 MB",
    accuracy: 99.2,
    insights: 8,
    drillDowns: 2,
    realTime: true,
    predictive: false,
  },
  {
    id: 3,
    name: "Análisis de Rentabilidad",
    type: "financial",
    category: "Finanzas",
    status: "active",
    lastRun: "2024-01-15 12:00",
    nextRun: "2024-01-22 12:00",
    frequency: "Semanal",
    format: "Dashboard",
    recipients: 8,
    views: 445,
    size: "3.2 MB",
    accuracy: 97.8,
    insights: 15,
    drillDowns: 5,
    realTime: true,
    predictive: true,
  },
  {
    id: 4,
    name: "Rendimiento de Proveedores",
    type: "suppliers",
    category: "Compras",
    status: "paused",
    lastRun: "2024-01-10 16:00",
    nextRun: null,
    frequency: "Mensual",
    format: "PDF",
    recipients: 4,
    views: 89,
    size: "1.5 MB",
    accuracy: 96.3,
    insights: 6,
    drillDowns: 2,
    realTime: false,
    predictive: true,
  },
  {
    id: 5,
    name: "Satisfacción del Cliente",
    type: "customer",
    category: "CRM",
    status: "active",
    lastRun: "2024-01-15 10:30",
    nextRun: "2024-01-16 10:30",
    frequency: "Diario",
    format: "Dashboard",
    recipients: 6,
    views: 298,
    size: "2.1 MB",
    accuracy: 94.7,
    insights: 10,
    drillDowns: 4,
    realTime: true,
    predictive: true,
  },
  {
    id: 6,
    name: "Forecast de Demanda",
    type: "forecast",
    category: "Analytics",
    status: "active",
    lastRun: "2024-01-15 06:00",
    nextRun: "2024-01-16 06:00",
    frequency: "Diario",
    format: "Excel",
    recipients: 7,
    views: 167,
    size: "4.1 MB",
    accuracy: 91.2,
    insights: 18,
    drillDowns: 6,
    realTime: true,
    predictive: true,
  },
]

const categories = [
  { id: "all", name: "Todos", count: reports.length },
  { id: "ventas", name: "Ventas", count: 1 },
  { id: "inventario", name: "Inventario", count: 1 },
  { id: "finanzas", name: "Finanzas", count: 1 },
  { id: "compras", name: "Compras", count: 1 },
  { id: "crm", name: "CRM", count: 1 },
  { id: "analytics", name: "Analytics", count: 1 },
]

export function ReportsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedReports, setSelectedReports] = useState<number[]>([])
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const openModal = (modalType: string, report?: any) => {
    setSelectedReport(report || null)
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedReport(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "scheduled":
        return "Programado"
      case "paused":
        return "Pausado"
      case "error":
        return "Error"
      default:
        return "Desconocido"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sales":
        return <TrendingUp className="h-4 w-4" />
      case "inventory":
        return <Package className="h-4 w-4" />
      case "financial":
        return <DollarSign className="h-4 w-4" />
      case "suppliers":
        return <Users className="h-4 w-4" />
      case "customer":
        return <Target className="h-4 w-4" />
      case "forecast":
        return <Brain className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || report.category.toLowerCase() === selectedCategory
    const matchesStatus = filterStatus === "all" || report.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleReportSelection = (reportId: number) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground">Dashboards en tiempo real con drill-down y analytics predictivo</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => openModal("data-sources")}>
            <Database className="h-4 w-4 mr-2" />
            Fuentes de Datos
          </Button>
          <Button variant="outline" onClick={() => openModal("ai-insights")}>
            <Brain className="h-4 w-4 mr-2" />
            IA Insights
          </Button>
          <Button onClick={() => openModal("builder")}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Reporte
          </Button>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{reports.length}</div>
                <div className="text-sm text-muted-foreground">Reportes Totales</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{reports.filter((r) => r.status === "active").length}</div>
                <div className="text-sm text-muted-foreground">Activos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{reports.filter((r) => r.realTime).length}</div>
                <div className="text-sm text-muted-foreground">Tiempo Real</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{reports.filter((r) => r.predictive).length}</div>
                <div className="text-sm text-muted-foreground">Predictivos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles y Filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar reportes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="scheduled">Programados</SelectItem>
            <SelectItem value="paused">Pausados</SelectItem>
            <SelectItem value="error">Con Error</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => openModal("benchmark")}>
          <Target className="h-4 w-4 mr-2" />
          Benchmark
        </Button>

        <Button variant="outline" onClick={() => openModal("scheduler")}>
          <Calendar className="h-4 w-4 mr-2" />
          Programador
        </Button>
      </div>

      {/* Acciones Masivas */}
      {selectedReports.length > 0 && (
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedReports.length} reporte{selectedReports.length > 1 ? "s" : ""} seleccionado
                {selectedReports.length > 1 ? "s" : ""}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openModal("export")}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm" variant="outline" onClick={() => openModal("share")}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Reportes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <Card key={report.id} className="bg-card border-border hover:shadow-lg transition-shadow">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => toggleReportSelection(report.id)}
                    className="rounded"
                  />
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getTypeIcon(report.type)}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openModal("visualization", report)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Reporte
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openModal("builder", report)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openModal("export", report)}>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openModal("share", report)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {report.status === "active" ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Activar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-card-foreground">{report.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {report.category}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(report.status)} text-white`}>
                      {getStatusText(report.status)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Frecuencia:</span>
                    <div className="font-medium">{report.frequency}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Formato:</span>
                    <div className="font-medium">{report.format}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Vistas:</span>
                    <div className="font-medium">{report.views}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Precisión:</span>
                    <div className="font-medium text-green-600">{report.accuracy}%</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    {report.insights} insights
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {report.drillDowns} drill-downs
                  </div>
                  {report.realTime && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Zap className="h-3 w-3" />
                      Tiempo real
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">Última ejecución: {report.lastRun}</div>
                  {report.nextRun && <div className="text-xs text-muted-foreground">Próxima: {report.nextRun}</div>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modales Exclusivos de Reportes */}
      <ReportBuilderModal isOpen={activeModal === "builder"} onClose={closeModal} report={selectedReport} />
      <ReportSchedulerModal isOpen={activeModal === "scheduler"} onClose={closeModal} />
      <ReportVisualizationModal isOpen={activeModal === "visualization"} onClose={closeModal} report={selectedReport} />
      <ReportExportModal
        isOpen={activeModal === "export"}
        onClose={closeModal}
        selectedReports={selectedReports}
        reports={reports}
      />
      <ReportAIInsightsModal isOpen={activeModal === "ai-insights"} onClose={closeModal} />
      <ReportBenchmarkModal isOpen={activeModal === "benchmark"} onClose={closeModal} />
      <ReportShareModal
        isOpen={activeModal === "share"}
        onClose={closeModal}
        selectedReports={selectedReports}
        reports={reports}
      />
      <ReportDataSourcesModal isOpen={activeModal === "data-sources"} onClose={closeModal} />
    </div>
  )
}
