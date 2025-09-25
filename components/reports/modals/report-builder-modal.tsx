"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Wrench,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  Filter,
  Plus,
  Trash2,
  Eye,
  Zap,
  Brain,
  Target,
} from "lucide-react"
import { useState } from "react"

interface ReportBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  report?: any
}

function ReportBuilderModal({ isOpen, onClose, report }: ReportBuilderModalProps) {
  const [reportName, setReportName] = useState(report?.name || "")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([])
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedChartType, setSelectedChartType] = useState("bar")
  const [filters, setFilters] = useState<any[]>([])
  const [groupBy, setGroupBy] = useState("")
  const [sortBy, setSortBy] = useState("")

  const dataSources = [
    { id: "sales", name: "Ventas", tables: ["orders", "order_items", "customers"] },
    { id: "inventory", name: "Inventario", tables: ["products", "stock_movements", "warehouses"] },
    { id: "financial", name: "Finanzas", tables: ["transactions", "accounts", "budgets"] },
    { id: "crm", name: "CRM", tables: ["customers", "contacts", "interactions"] },
  ]

  const availableFields = [
    { id: "date", name: "Fecha", type: "date", source: "sales" },
    { id: "amount", name: "Monto", type: "number", source: "sales" },
    { id: "quantity", name: "Cantidad", type: "number", source: "sales" },
    { id: "customer_name", name: "Cliente", type: "string", source: "sales" },
    { id: "product_name", name: "Producto", type: "string", source: "inventory" },
    { id: "category", name: "Categoría", type: "string", source: "inventory" },
    { id: "stock_level", name: "Stock", type: "number", source: "inventory" },
    { id: "revenue", name: "Ingresos", type: "number", source: "financial" },
    { id: "profit", name: "Ganancia", type: "number", source: "financial" },
  ]

  const chartTypes = [
    { id: "bar", name: "Barras", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "line", name: "Líneas", icon: <LineChart className="h-4 w-4" /> },
    { id: "pie", name: "Circular", icon: <PieChart className="h-4 w-4" /> },
    { id: "table", name: "Tabla", icon: <Table className="h-4 w-4" /> },
  ]

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "equals", value: "" }])
  }

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index))
  }

  const updateFilter = (index: number, key: string, value: string) => {
    const newFilters = [...filters]
    newFilters[index] = { ...newFilters[index], [key]: value }
    setFilters(newFilters)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            {report ? `Editar Reporte: ${report.name}` : "Constructor de Reportes"}
          </DialogTitle>
          <DialogDescription>Crea reportes personalizados con dashboards en tiempo real y drill-down</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="data">Datos</TabsTrigger>
            <TabsTrigger value="visualization">Visualización</TabsTrigger>
            <TabsTrigger value="filters">Filtros</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Nombre del Reporte</Label>
                    <Input
                      id="report-name"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Ej: Ventas Mensuales"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-category">Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Ventas</SelectItem>
                        <SelectItem value="inventory">Inventario</SelectItem>
                        <SelectItem value="financial">Finanzas</SelectItem>
                        <SelectItem value="crm">CRM</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-description">Descripción</Label>
                  <Textarea
                    id="report-description"
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Describe el propósito y contenido del reporte..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="real-time" />
                    <Label htmlFor="real-time" className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      Tiempo Real
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="predictive" />
                    <Label htmlFor="predictive" className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      Analytics Predictivo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="drill-down" />
                    <Label htmlFor="drill-down" className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      Drill-Down
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Fuentes de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dataSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={source.id}
                          checked={selectedDataSources.includes(source.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDataSources([...selectedDataSources, source.id])
                            } else {
                              setSelectedDataSources(selectedDataSources.filter((id) => id !== source.id))
                            }
                          }}
                        />
                        <Label htmlFor={source.id} className="flex-1">
                          <div className="font-medium">{source.name}</div>
                          <div className="text-xs text-muted-foreground">{source.tables.join(", ")}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Campos Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {availableFields
                      .filter((field) => selectedDataSources.includes(field.source))
                      .map((field) => (
                        <div key={field.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={field.id}
                            checked={selectedFields.includes(field.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFields([...selectedFields, field.id])
                              } else {
                                setSelectedFields(selectedFields.filter((id) => id !== field.id))
                              }
                            }}
                          />
                          <Label htmlFor={field.id} className="flex-1">
                            <div className="font-medium">{field.name}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {field.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{field.source}</span>
                            </div>
                          </Label>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Tipo de Visualización</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {chartTypes.map((chart) => (
                    <div
                      key={chart.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedChartType === chart.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedChartType(chart.id)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {chart.icon}
                        <span className="text-sm font-medium">{chart.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Agrupación</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Agrupar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Fecha</SelectItem>
                      <SelectItem value="category">Categoría</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="product">Producto</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Ordenamiento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date_desc">Fecha (Desc)</SelectItem>
                      <SelectItem value="date_asc">Fecha (Asc)</SelectItem>
                      <SelectItem value="amount_desc">Monto (Desc)</SelectItem>
                      <SelectItem value="amount_asc">Monto (Asc)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                  </span>
                  <Button size="sm" onClick={addFilter}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Filtro
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filters.map((filter, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                      <Select value={filter.field} onValueChange={(value) => updateFilter(index, "field", value)}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Campo" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields.map((field) => (
                            <SelectItem key={field.id} value={field.id}>
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={filter.operator} onValueChange={(value) => updateFilter(index, "operator", value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Operador" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Igual a</SelectItem>
                          <SelectItem value="not_equals">Diferente de</SelectItem>
                          <SelectItem value="greater">Mayor que</SelectItem>
                          <SelectItem value="less">Menor que</SelectItem>
                          <SelectItem value="contains">Contiene</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Valor"
                        value={filter.value}
                        onChange={(e) => updateFilter(index, "value", e.target.value)}
                        className="flex-1"
                      />

                      <Button size="sm" variant="outline" onClick={() => removeFilter(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {filters.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No hay filtros configurados. Haz clic en "Agregar Filtro" para comenzar.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Configuración de Programación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Hora de Ejecución</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Configuración de Exportación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Formato por Defecto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-export" />
                    <Label htmlFor="auto-export">Exportación Automática</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm">Vista Previa del Reporte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 rounded-lg bg-muted/50 text-center">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    La vista previa se generará cuando configures los datos y la visualización
                  </p>
                  <Button className="mt-4" disabled={selectedFields.length === 0}>
                    <Eye className="h-4 w-4 mr-2" />
                    Generar Vista Previa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={!reportName || selectedFields.length === 0}>
            {report ? "Actualizar Reporte" : "Crear Reporte"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ReportBuilderModal }
