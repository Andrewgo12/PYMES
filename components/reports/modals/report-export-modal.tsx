"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  FileSpreadsheet,
  ImageIcon,
  Database,
  Cloud,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { useState } from "react"

interface ReportExportModalProps {
  isOpen: boolean
  onClose: () => void
  selectedReports: number[]
  reports: any[]
}

function ReportExportModal({ isOpen, onClose, selectedReports, reports }: ReportExportModalProps) {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeData: true,
    includeInsights: true,
    compressFiles: false,
    passwordProtect: false,
  })
  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      name: "Ventas Q4 2023",
      format: "PDF",
      size: "2.4 MB",
      date: "2024-01-15 14:30",
      status: "completed",
      downloads: 12,
    },
    {
      id: 2,
      name: "Inventario Mensual",
      format: "Excel",
      size: "1.8 MB",
      date: "2024-01-14 09:15",
      status: "completed",
      downloads: 8,
    },
    {
      id: 3,
      name: "Análisis Financiero",
      format: "CSV",
      size: "856 KB",
      date: "2024-01-13 16:45",
      status: "failed",
      downloads: 0,
      error: "Error de permisos de archivo",
    },
  ])

  const formatOptions = [
    { id: "pdf", name: "PDF", icon: <FileText className="h-4 w-4" />, description: "Documento con formato" },
    {
      id: "excel",
      name: "Excel",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      description: "Hoja de cálculo editable",
    },
    { id: "csv", name: "CSV", icon: <Database className="h-4 w-4" />, description: "Datos separados por comas" },
    { id: "png", name: "PNG", icon: <ImageIcon className="h-4 w-4" />, description: "Imagen de alta calidad" },
    { id: "json", name: "JSON", icon: <Database className="h-4 w-4" />, description: "Datos estructurados" },
  ]

  const deliveryMethods = [
    { id: "download", name: "Descarga Directa", icon: <Download className="h-4 w-4" /> },
    { id: "email", name: "Envío por Email", icon: <Mail className="h-4 w-4" /> },
    { id: "cloud", name: "Subir a la Nube", icon: <Cloud className="h-4 w-4" /> },
    { id: "scheduled", name: "Programar Envío", icon: <Calendar className="h-4 w-4" /> },
  ]

  const selectedReportsList = reports.filter((report) => selectedReports.includes(report.id))

  const handleExport = () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simular progreso de exportación
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportación Múltiple de Reportes
          </DialogTitle>
          <DialogDescription>
            Exporta reportes en múltiples formatos con opciones avanzadas de entrega
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="export" className="space-y-4">
          <TabsList>
            <TabsTrigger value="export">Exportar</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            {/* Reportes Seleccionados */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Reportes Seleccionados ({selectedReportsList.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedReportsList.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Checkbox checked readOnly />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.category}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Formato de Exportación */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Formato de Exportación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formatOptions.map((format) => (
                      <div
                        key={format.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          exportFormat === format.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border hover:border-blue-300"
                        }`}
                        onClick={() => setExportFormat(format.id)}
                      >
                        <div className="flex items-center gap-3">
                          {format.icon}
                          <div>
                            <div className="font-medium">{format.name}</div>
                            <div className="text-sm text-muted-foreground">{format.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Opciones de Exportación */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Opciones de Contenido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-charts"
                        checked={exportOptions.includeCharts}
                        onCheckedChange={(checked) =>
                          setExportOptions((prev) => ({ ...prev, includeCharts: !!checked }))
                        }
                      />
                      <Label htmlFor="include-charts">Incluir Gráficos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-data"
                        checked={exportOptions.includeData}
                        onCheckedChange={(checked) => setExportOptions((prev) => ({ ...prev, includeData: !!checked }))}
                      />
                      <Label htmlFor="include-data">Incluir Datos Detallados</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-insights"
                        checked={exportOptions.includeInsights}
                        onCheckedChange={(checked) =>
                          setExportOptions((prev) => ({ ...prev, includeInsights: !!checked }))
                        }
                      />
                      <Label htmlFor="include-insights">Incluir Insights de IA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="compress-files"
                        checked={exportOptions.compressFiles}
                        onCheckedChange={(checked) =>
                          setExportOptions((prev) => ({ ...prev, compressFiles: !!checked }))
                        }
                      />
                      <Label htmlFor="compress-files">Comprimir Archivos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="password-protect"
                        checked={exportOptions.passwordProtect}
                        onCheckedChange={(checked) =>
                          setExportOptions((prev) => ({ ...prev, passwordProtect: !!checked }))
                        }
                      />
                      <Label htmlFor="password-protect">Proteger con Contraseña</Label>
                    </div>
                  </div>

                  {exportOptions.passwordProtect && (
                    <div className="space-y-2 pt-2 border-t border-border">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input id="password" type="password" placeholder="Ingresa una contraseña segura" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Método de Entrega */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Método de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {deliveryMethods.map((method) => (
                    <div
                      key={method.id}
                      className="p-4 rounded-lg border border-border hover:border-blue-300 cursor-pointer transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        {method.icon}
                        <span className="text-sm font-medium">{method.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nombre del Archivo</Label>
                      <Input placeholder="reportes-exportados" />
                    </div>
                    <div className="space-y-2">
                      <Label>Calidad de Exportación</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja (Rápida)</SelectItem>
                          <SelectItem value="medium">Media (Balanceada)</SelectItem>
                          <SelectItem value="high">Alta (Mejor Calidad)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progreso de Exportación */}
            {isExporting && (
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Exportando reportes...</span>
                      <span className="text-sm text-muted-foreground">{exportProgress}%</span>
                    </div>
                    <Progress value={exportProgress} className="w-full" />
                    <div className="text-sm text-muted-foreground">
                      Procesando {selectedReportsList.length} reporte{selectedReportsList.length > 1 ? "s" : ""}...
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleExport} disabled={isExporting || selectedReportsList.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? "Exportando..." : "Exportar Reportes"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Historial de Exportaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportHistory.map((export_item) => (
                    <div key={export_item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(export_item.status)}
                        <div>
                          <div className="font-medium">{export_item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {export_item.format} • {export_item.size} • {export_item.date}
                          </div>
                          {export_item.error && <div className="text-sm text-red-600">{export_item.error}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">{export_item.downloads} descargas</div>
                        {export_item.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Plantillas de Exportación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      name: "Reporte Ejecutivo",
                      description: "PDF con resumen ejecutivo y gráficos principales",
                      format: "PDF",
                      options: ["Gráficos", "Insights", "Resumen"],
                    },
                    {
                      name: "Datos para Análisis",
                      description: "Excel con todos los datos para análisis posterior",
                      format: "Excel",
                      options: ["Datos Completos", "Múltiples Hojas", "Fórmulas"],
                    },
                    {
                      name: "Dashboard Interactivo",
                      description: "HTML con gráficos interactivos",
                      format: "HTML",
                      options: ["Interactivo", "Responsive", "Filtros"],
                    },
                    {
                      name: "Presentación",
                      description: "PowerPoint listo para presentar",
                      format: "PPTX",
                      options: ["Slides", "Gráficos", "Notas"],
                    },
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-blue-300 cursor-pointer"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.format}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <div className="flex gap-1">
                          {template.options.map((option, optIndex) => (
                            <Badge key={optIndex} variant="secondary" className="text-xs">
                              {option}
                            </Badge>
                          ))}
                        </div>
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

export { ReportExportModal }
